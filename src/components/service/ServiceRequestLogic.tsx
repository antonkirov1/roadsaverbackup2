import { useState, useEffect } from 'react';
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
  const [priceQuote, setPriceQuote] = useState<number>(0);
  const [originalPriceQuote, setOriginalPriceQuote] = useState<number>(0); // Store the very first price quote
  const [employeeLocation, setEmployeeLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [declineReason, setDeclineReason] = useState('');
  const [currentEmployeeName, setCurrentEmployeeName] = useState<string>('');
  const [declinedEmployees, setDeclinedEmployees] = useState<string[]>([]);
  const [hasDeclinedOnce, setHasDeclinedOnce] = useState(false);
  const [lastEmployeeName, setLastEmployeeName] = useState<string>('');

  // Update local states when ongoing request changes
  useEffect(() => {
    if (ongoingRequest) {
      if (ongoingRequest.priceQuote !== undefined) {
        setPriceQuote(ongoingRequest.priceQuote);
        // Set original price quote if it hasn't been set yet
        if (originalPriceQuote === 0) {
          setOriginalPriceQuote(ongoingRequest.priceQuote);
        }
      }
      if (ongoingRequest.employeeName) {
        setCurrentEmployeeName(ongoingRequest.employeeName);
      }
      if (ongoingRequest.declinedEmployees) {
        setDeclinedEmployees(ongoingRequest.declinedEmployees);
      }
    }
  }, [ongoingRequest, originalPriceQuote]);

  const handleSubmit = () => {
    if (!validateMessage(message, type)) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const requestId = Date.now().toString();
      const timestamp = new Date().toISOString();
      
      // Create ongoing request
      const newOngoingRequest = {
        id: requestId,
        type,
        status: 'pending' as const,
        timestamp: new Date().toLocaleString(),
        location: 'Sofia Center, Bulgaria',
        declinedEmployees: declinedEmployees
      };
      
      setOngoingRequest(newOngoingRequest);
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
          console.log('Employee sent quote:', quote);
          setPriceQuote(quote);
          // Store the original price quote only on the first response
          setOriginalPriceQuote(quote);
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
          console.log('Employee assigned:', employeeName);
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
      
      // Reset all states for new employee search but PRESERVE the original price quote
      setShowPriceQuote(false);
      setShowRealTimeUpdate(true);
      setStatus('pending');
      setHasDeclinedOnce(false); // Reset decline counter
      // ALWAYS use the original price quote - never let it change
      setPriceQuote(originalPriceQuote);
      
      // Update ongoing request with declined employee but keep the ORIGINAL price quote
      const updatedRequest = {
        ...ongoingRequest,
        declinedEmployees: updatedDeclinedEmployees,
        status: 'pending' as const,
        // Always preserve the original price quote
        priceQuote: originalPriceQuote,
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
            console.log('New employee would send quote:', quote, 'but using original:', originalPriceQuote);
            // ALWAYS use the original price quote, ignore the new quote
            setPriceQuote(originalPriceQuote);
            // Update ongoing request with the ORIGINAL price quote
            setOngoingRequest(prev => {
              if (!prev) return null;
              const updatedRequest = { 
                ...prev, 
                priceQuote: originalPriceQuote 
              };
              console.log('Preserving original price quote in ongoing request:', originalPriceQuote, updatedRequest);
              return updatedRequest;
            });
          },
          setShowPriceQuote,
          setShowRealTimeUpdate,
          setStatus,
          setDeclineReason,
          setEmployeeLocation,
          (employeeName: string) => {
            console.log('New employee assigned:', employeeName);
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
    priceQuote: originalPriceQuote > 0 ? originalPriceQuote : (ongoingRequest?.priceQuote ?? priceQuote),
    employeeLocation,
    status,
    declineReason,
    currentEmployeeName: ongoingRequest?.employeeName || currentEmployeeName,
    declinedEmployees,
    hasDeclinedOnce,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  };
};
