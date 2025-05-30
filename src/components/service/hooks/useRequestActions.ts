
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';
import { useRequestSimulation } from './useRequestSimulation';

export const useRequestActions = () => {
  const { setOngoingRequest } = useApp();
  const { simulateServiceCompletion } = useRequestSimulation();

  const handleAcceptQuote = (
    type: string,
    employeeLocation: { lat: number; lng: number } | undefined,
    setShowPriceQuote: (show: boolean) => void,
    setShowRealTimeUpdate: (show: boolean) => void,
    setStatus: (status: 'pending' | 'accepted' | 'declined') => void
  ) => {
    // Update ongoing request with employee info
    const updatedRequest = {
      id: Date.now().toString(),
      type,
      status: 'accepted' as const,
      timestamp: new Date().toLocaleString(),
      location: 'Sofia Center, Bulgaria',
      employeeId: 'emp123',
      employeeName: 'John Smith',
      employeePhone: '+359888123456',
      employeeLocation: employeeLocation
    };
    
    setOngoingRequest(updatedRequest);
    setShowPriceQuote(false);
    setShowRealTimeUpdate(true);
    setStatus('accepted');
    
    toast({
      title: "Quote Accepted",
      description: "An employee is on the way to help you."
    });

    simulateServiceCompletion(updatedRequest.id, type);
  };

  const handleDeclineQuote = (
    setShowPriceQuote: (show: boolean) => void
  ) => {
    setShowPriceQuote(false);
    setOngoingRequest(null);
    toast({
      title: "Quote Declined",
      description: "Your request remains active for other employees to respond."
    });
  };

  const handleCancelRequest = (
    setShowPriceQuote: (show: boolean) => void
  ) => {
    setShowPriceQuote(false);
    setOngoingRequest(null);
    toast({
      title: "Request Cancelled",
      description: "Your service request has been cancelled."
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Calling Support",
      description: "Connecting you with our support team..."
    });
    
    setTimeout(() => {
      window.location.href = "tel:+15555555555";
    }, 500);
  };

  return {
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  };
};
