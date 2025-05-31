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

  const [message, setMessage] = useState(serviceMessages[type] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRealTimeUpdate, setShowRealTimeUpdate] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [priceQuote, setPriceQuote] = useState<number>(0);
  const [employeeLocation, setEmployeeLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [declineReason, setDeclineReason] = useState('');
  const [currentEmployeeName, setCurrentEmployeeName] = useState<string>('');
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
        setPriceQuote,
        setShowPriceQuote,
        setShowRealTimeUpdate,
        setStatus,
        setDeclineReason,
        setEmployeeLocation,
        (employeeName: string) => {
          setCurrentEmployeeName(employeeName);
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
      
      // Keep the request active but trigger a new employee response
      setShowPriceQuote(false);
      setShowRealTimeUpdate(true);
      
      // Reset decline counter for the next employee
      setHasDeclinedOnce(false);
      
      // Update ongoing request with declined employee
      const updatedRequest = {
        ...ongoingRequest,
        declinedEmployees: updatedDeclinedEmployees
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
          setPriceQuote,
          setShowPriceQuote,
          setShowRealTimeUpdate,
          setStatus,
          setDeclineReason,
          setEmployeeLocation,
          (employeeName: string) => {
            setCurrentEmployeeName(employeeName);
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
      declineQuote(setShowPriceQuote);
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
    priceQuote,
    employeeLocation,
    status,
    declineReason,
    currentEmployeeName,
    declinedEmployees,
    hasDeclinedOnce,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  };
};
