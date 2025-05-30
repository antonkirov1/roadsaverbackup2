import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';

const serviceMessages = {
  'flat-tyre': 'I have a flat tyre and need assistance',
  'out-of-fuel': 'I am out of fuel and need assistance',
  'car-battery': 'My car battery is dead. I need assistance.',
  'tow-truck': 'I have a major problem with my car and need a tow truck',
  'other-car-problems': '',
  'emergency': 'I need emergency assistance immediately',
  'support': 'I need to speak with customer support',
};

export const useServiceRequest = (
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery',
  userLocation: { lat: number; lng: number }
) => {
  const { setOngoingRequest, addToHistory } = useApp();
  const [message, setMessage] = useState(serviceMessages[type] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRealTimeUpdate, setShowRealTimeUpdate] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [priceQuote, setPriceQuote] = useState<number>(0);
  const [employeeLocation, setEmployeeLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [declineReason, setDeclineReason] = useState('');

  const handleSubmit = () => {
    const requiresDescription = type === 'other-car-problems';
    const messageMinLength = requiresDescription ? 20 : 0;
    const messageMaxLength = 300;

    if (requiresDescription && (message.length < messageMinLength || message.length > messageMaxLength)) {
      toast({
        title: "Invalid Description",
        description: `Description must be between ${messageMinLength} and ${messageMaxLength} characters.`,
        variant: "destructive"
      });
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
        location: 'Sofia Center, Bulgaria'
      };
      
      setOngoingRequest(ongoingRequest);
      setStatus('pending');
      setIsSubmitting(false);
      setShowRealTimeUpdate(true);
      toast({
        title: "Request Sent",
        description: "Your request has been sent to our team."
      });
      
      simulateEmployeeResponse(requestId, timestamp);
    }, 1500);
  };

  const simulateEmployeeResponse = (requestId: string, timestamp: string) => {
    const employeePos = {
      lat: userLocation.lat + (Math.random() - 0.5) * 0.01,
      lng: userLocation.lng + (Math.random() - 0.5) * 0.01
    };
    
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

  const handleAcceptQuote = () => {
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

    // Simulate completion after 30 seconds
    setTimeout(() => {
      const completedRequest = {
        id: updatedRequest.id,
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

  const handleDeclineQuote = () => {
    setShowPriceQuote(false);
    setOngoingRequest(null);
    toast({
      title: "Quote Declined",
      description: "Your request remains active for other employees to respond."
    });
  };

  const handleCancelRequest = () => {
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
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  };
};
