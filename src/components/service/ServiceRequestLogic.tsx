
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';
import { serviceMessages } from './constants/serviceMessages';
import { ServiceType } from './types/serviceRequestState';
import { useServiceValidation } from './hooks/useServiceValidation';
import { useRequestSimulation } from './hooks/useRequestSimulation';
import { useRequestActions } from './hooks/useRequestActions';
import { usePriceQuoteSnapshot } from '@/hooks/usePriceQuoteSnapshot';

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
  const { storeSnapshot, loadSnapshot, storedSnapshot } = usePriceQuoteSnapshot();

  // Initialize states with values from ongoing request if it exists
  const [message, setMessage] = useState(serviceMessages[type] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRealTimeUpdate, setShowRealTimeUpdate] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [priceQuote, setPriceQuote] = useState<number>(0);
  const [originalPriceQuote, setOriginalPriceQuote] = useState<number>(0);
  const [employeeLocation, setEmployeeLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [declineReason, setDeclineReason] = useState('');
  const [currentEmployeeName, setCurrentEmployeeName] = useState<string>('');
  const [declinedEmployees, setDeclinedEmployees] = useState<string[]>([]);
  const [hasDeclinedOnce, setHasDeclinedOnce] = useState(false);
  const [employeeRevisionAttempts, setEmployeeRevisionAttempts] = useState<{[key: string]: number}>({});

  // Update local states when ongoing request changes
  useEffect(() => {
    if (ongoingRequest) {
      if (ongoingRequest.priceQuote !== undefined) {
        setPriceQuote(ongoingRequest.priceQuote);
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
      
      if (ongoingRequest.id) {
        loadSnapshot(ongoingRequest.id);
      }
    }
  }, [ongoingRequest, originalPriceQuote, loadSnapshot]);

  const handleSubmit = () => {
    if (!validateMessage(message, type)) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const requestId = Date.now().toString();
      const timestamp = new Date().toISOString();
      
      // Reset tracking for new request
      setDeclinedEmployees([]);
      setEmployeeRevisionAttempts({});
      setHasDeclinedOnce(false);
      
      const newOngoingRequest = {
        id: requestId,
        type,
        status: 'pending' as const,
        timestamp: new Date().toLocaleString(),
        location: 'Sofia Center, Bulgaria',
        declinedEmployees: []
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
        async (quote: number) => {
          console.log('Employee sent quote:', quote);
          setPriceQuote(quote);
          setOriginalPriceQuote(quote);
          
          const employeeName = currentEmployeeName;
          await storeSnapshot(requestId, type, quote, employeeName, false);
          
          setOngoingRequest(prev => {
            if (!prev) return null;
            return { 
              ...prev, 
              priceQuote: quote,
              employeeName: employeeName
            };
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
          setOngoingRequest(prev => prev ? { 
            ...prev, 
            employeeName: employeeName 
          } : null);
          setHasDeclinedOnce(false);
        },
        []
      );
    }, 1500);
  };

  const handleAcceptQuote = () => acceptQuote(type, userLocation, setShowPriceQuote, setShowRealTimeUpdate, setStatus, setEmployeeLocation);
  
  const handleDeclineQuote = (isSecondDecline: boolean = false) => {
    if (isSecondDecline && currentEmployeeName) {
      // Second decline - move to new employee
      const updatedDeclinedEmployees = [...declinedEmployees, currentEmployeeName];
      setDeclinedEmployees(updatedDeclinedEmployees);
      
      // Reset states for new employee search
      setShowPriceQuote(false);
      setShowRealTimeUpdate(true);
      setStatus('pending');
      setHasDeclinedOnce(false);
      setPriceQuote(originalPriceQuote);
      
      const updatedRequest = {
        ...ongoingRequest,
        declinedEmployees: updatedDeclinedEmployees,
        status: 'pending' as const,
        priceQuote: originalPriceQuote,
        employeeName: undefined
      };
      setOngoingRequest(updatedRequest);
      
      toast({
        title: "Quote Declined",
        description: "Looking for another available employee..."
      });
      
      // Simulate new employee response
      setTimeout(() => {
        const requestId = Date.now().toString();
        const timestamp = new Date().toISOString();
        
        simulateEmployeeResponse(
          requestId,
          timestamp,
          type,
          userLocation,
          (quote: number) => {
            console.log('New employee quote:', quote, 'using original:', originalPriceQuote);
            setPriceQuote(originalPriceQuote);
            setOngoingRequest(prev => {
              if (!prev) return null;
              return { 
                ...prev, 
                priceQuote: originalPriceQuote 
              };
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
            setOngoingRequest(prev => prev ? { 
              ...prev, 
              employeeName: employeeName 
            } : null);
            setHasDeclinedOnce(false);
          },
          updatedDeclinedEmployees
        );
      }, 2000);
    } else if (!hasDeclinedOnce) {
      // First decline - employee gets one chance to revise
      setHasDeclinedOnce(true);
      const currentAttempts = employeeRevisionAttempts[currentEmployeeName] || 0;
      
      if (currentAttempts === 0) {
        // Employee hasn't sent a revision yet, give them a chance
        setEmployeeRevisionAttempts(prev => ({
          ...prev,
          [currentEmployeeName]: 1
        }));
        
        toast({
          title: "Quote Declined",
          description: `${currentEmployeeName} will send you a revised quote.`
        });
        
        // Simulate employee sending revised quote
        setTimeout(() => {
          const revisedQuote = Math.max(10, originalPriceQuote - Math.floor(Math.random() * 15) - 5);
          setPriceQuote(revisedQuote);
          setOngoingRequest(prev => prev ? { 
            ...prev, 
            priceQuote: revisedQuote 
          } : null);
          
          toast({
            title: "Revised Quote Received",
            description: `${currentEmployeeName} sent a revised quote of ${revisedQuote} BGN.`
          });
        }, 3000);
      } else {
        // Employee already sent a revision, proceed to second decline
        toast({
          title: "Quote Declined",
          description: "You can decline once more or accept the quote."
        });
      }
    }
  };
  
  const handleCancelRequest = () => cancelRequest(setShowPriceQuote);

  const showStoredPriceQuote = () => {
    if (storedSnapshot) {
      setShowPriceQuote(true);
    }
  };

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
    handleContactSupport,
    storedSnapshot,
    showStoredPriceQuote
  };
};
