
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';

export const useRequestSimulation = () => {
  const { setOngoingRequest, addToHistory } = useApp();

  const simulateEmployeeResponse = (
    requestId: string,
    timestamp: string,
    type: string,
    userLocation: { lat: number; lng: number },
    setPriceQuote: (price: number) => void,
    setShowPriceQuote: (show: boolean) => void,
    setShowRealTimeUpdate: (show: boolean) => void,
    setStatus: (status: 'pending' | 'accepted' | 'declined') => void,
    setDeclineReason: (reason: string) => void
  ) => {
    const isAccepted = Math.random() > 0.3;
    
    setTimeout(() => {
      if (isAccepted) {
        // Generate random price quote
        const randomPrice = Math.floor(Math.random() * 100) + 50; // 50-150 BGN
        setPriceQuote(randomPrice);
        setShowPriceQuote(true);
        setShowRealTimeUpdate(false);
        
        toast({
          title: "Price Quote Received",
          description: `You received a price quote of ${randomPrice} BGN.`
        });
        
      } else {
        const declinedRequest = {
          id: requestId,
          type,
          status: 'declined' as const,
          timestamp: new Date().toLocaleString(),
          location: 'Sofia Center, Bulgaria'
        };
        
        setOngoingRequest(declinedRequest);
        setStatus('declined');
        setDeclineReason("I apologize, but all of our service technicians are currently occupied with other emergencies. We expect to have someone available in approximately 15-20 minutes. If this is an urgent matter, please contact our emergency hotline for immediate assistance.");
        toast({
          title: "Request Declined",
          description: "Your request was declined by our team.",
          variant: "destructive"
        });
        
        // Clear ongoing request after decline
        setTimeout(() => {
          setOngoingRequest(null);
        }, 5000);
      }
    }, 3000);
  };

  const simulateServiceCompletion = (requestId: string, type: string) => {
    setTimeout(() => {
      const completedRequest = {
        id: requestId,
        type,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        completedTime: new Date().toLocaleTimeString(),
        status: 'completed' as const,
        user: 'Current User',
        employee: 'John Smith'
      };
      
      addToHistory(completedRequest);
      setOngoingRequest(null);
      
      toast({
        title: "Service Completed",
        description: "Your request has been completed successfully."
      });
    }, 30000);
  };

  return { simulateEmployeeResponse, simulateServiceCompletion };
};
