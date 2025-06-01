
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';
import { serviceMessages } from './constants/serviceMessages';
import { ServiceType } from './types/serviceRequestState';
import { useServiceValidation } from './hooks/useServiceValidation';
import { useRequestSimulation } from './hooks/useRequestSimulation';
import { useRequestActions } from './hooks/useRequestActions';

export const useServiceRequest = (
  type: ServiceType,
  userLocation: { lat: number; lng: number }
) => {
  const { setOngoingRequest, ongoingRequest } = useApp();
  const { validateMessage } = useServiceValidation();
  const { simulateEmployeeResponse } = useRequestSimulation();
  const {
    handleAcceptQuote: acceptQuote,
    handleDeclineQuote: declineQuote,
    handleCancelRequest: cancelRequest,
    handleContactSupport
  } = useRequestActions();

  // Initialize states with values from ongoing request if it exists
  const [message, setMessage] = useState(serviceMessages[type] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRealTimeUpdate, setShowRealTimeUpdate] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [priceQuote, setPriceQuote] = useState<number>(ongoingRequest?.priceQuote || 0);
  const [employeeLocation, setEmployeeLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [declineReason, setDeclineReason] = useState('');
  const [currentEmployeeName, setCurrentEmployeeName] = useState<string>(ongoingRequest?.employeeName || '');
  const [declinedEmployees, setDeclinedEmployees] = useState<string[]>(ongoingRequest?.declinedEmployees || []);
  const [hasDeclinedOnce, setHasDeclinedOnce] = useState(false);
  const [lastEmployeeName, setLastEmployeeName] = useState<string>('');

  const handleSubmit = () => {
    if (!validateMessage(message, type)) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const requestId = Date.now().toString();
      const timestamp = new Date().toISOString();
      
      // Create ongoing request
      const ongoingRequest = {
        id: requestId,
        type,
        status: 'pending' as const,
        timestamp: new Date().toLocaleString(),
        location: 'Sofia Center, Bulgaria',
        declinedEmployees: declinedEmployees
      };
      
      setOngoingRequest(ongoingRequest);
      setStatus('pending');
      setIsSubmitting(false);
      setShowRealTimeUpdate(true);
      toast({
        title: "Request Sent",
        description: "Your request has been sent to our team."
      });
      
      simulateEmployeeResponse(
        requestId,
        timestamp,
        type,
        userLocation,
        (quote: number) => {
          setPriceQuote(quote);
          // Immediately update ongoing request with the price quote
          setOngoingRequest(prev => {
            if (!prev) return null;
            const updatedRequest = { 
              ...prev, 
              priceQuote: quote 
            };
            console.log('Setting price quote in ongoing request:', quote, updatedRequest);
            return updatedRequest;
          });
        },
        setShowPriceQuote,
        setShowRealTimeUpdate,
        setStatus,
        setDeclineReason,
        setEmployeeLocation,
        (employeeName: string) => {
          setCurrentEmployeeName(employeeName);
          // Update ongoing request with employee name
          setOngoingRequest(prev => prev ? { 
            ...prev, 
            employeeName: employeeName 
          } : null);
          // Reset decline counter for every new employee
          setHasDeclinedOnce(false);
          setLastEmployeeName(employeeName);
        },
        declinedEmployees
      );
    }, 1500);
  };

  const handleAcceptQuote = () => acceptQuote(type, userLocation, setShowPriceQuote, setShowRealTimeUpdate, setStatus, setEmployeeLocation);
  
  const handleDeclineQuote = (isSecondDecline: boolean = false) => {
    if (isSecondDecline && currentEmployeeName) {
      // Add current employee to declined list
      const updatedDeclinedEmployees = [...declinedEmployees, currentEmployeeName];
      setDeclinedEmployees(updatedDeclinedEmployees);
      
      // Reset all states for new employee search
      setShowPriceQuote(false);
      setShowRealTimeUpdate(true);
      setStatus('pending');
      setHasDeclinedOnce(false); // Reset decline counter
      setPriceQuote(0); // Reset price quote
      
      // Update ongoing request with declined employee and reset price quote
      const updatedRequest = {
        ...ongoingRequest,
        declinedEmployees: updatedDeclinedEmployees,
        status: 'pending' as const,
        priceQuote: undefined,
        employeeName: undefined
      };
      setOngoingRequest(updatedRequest);
      
      toast({
        title: "Quote Declined",
        description: "Looking for another available employee..."
      });
      
      // Simulate new employee response after a delay
      setTimeout(() => {
        const requestId = Date.now().toString();
        const timestamp = new Date().toISOString();
        
        simulateEmployeeResponse(
          requestId,
          timestamp,
          type,
          userLocation,
          (quote: number) => {
            setPriceQuote(quote);
            // Update ongoing request with the new price quote
            setOngoingRequest(prev => {
              if (!prev) return null;
              const updatedRequest = { 
                ...prev, 
                priceQuote: quote 
              };
              console.log('Setting new price quote in ongoing request:', quote, updatedRequest);
              return updatedRequest;
            });
          },
          setShowPriceQuote,
          setShowRealTimeUpdate,
          setStatus,
          setDeclineReason,
          setEmployeeLocation,
          (employeeName: string) => {
            setCurrentEmployeeName(employeeName);
            // Update ongoing request with new employee name
            setOngoingRequest(prev => prev ? { 
              ...prev, 
              employeeName: employeeName 
            } : null);
            // Reset decline counter for every new employee
            setHasDeclinedOnce(false);
            setLastEmployeeName(employeeName);
          },
          updatedDeclinedEmployees
        );
      }, 2000);
    } else {
      // First decline - just set the flag
      setHasDeclinedOnce(true);
      // Don't call declineQuote here as it cancels the request
      toast({
        title: "Quote Declined",
        description: "You can decline once more or accept the quote."
      });
    }
  };
  
  const handleCancelRequest = () => cancelRequest(setShowPriceQuote);

  return {
    message,
    setMessage,
    isSubmitting,
    showRealTimeUpdate,
    showPriceQuote,
    setShowPriceQuote,
    priceQuote: ongoingRequest?.priceQuote || priceQuote, // Always prefer the ongoing request price
    employeeLocation,
    status,
    declineReason,
    currentEmployeeName: ongoingRequest?.employeeName || currentEmployeeName, // Always prefer the ongoing request employee
    declinedEmployees,
    hasDeclinedOnce,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  };
};
