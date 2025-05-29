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
        // Update ongoing request with employee info
        setOngoingRequest(prev => prev ? {
          ...prev,
          status: 'accepted',
          employeeId: 'emp123',
          employeeName: 'John Smith',
          employeePhone: '+359888123456',
          employeeLocation: employeePos
        } : null);
        
        setEmployeeLocation(employeePos);
        setStatus('accepted');
        toast({
          title: "Request Accepted",
          description: "An employee is on the way to help you."
        });
        
        simulateEmployeeMovement(employeePos);
        
        // Simulate completion after 30 seconds
        setTimeout(() => {
          const completedRequest = {
            id: requestId,
            type,
            date: new Date().toLocaleDateString(),
            time: new Date(timestamp).toLocaleTimeString(),
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
        
      } else {
        setOngoingRequest(prev => prev ? { ...prev, status: 'declined' } : null);
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

  const simulateEmployeeMovement = (startPos: { lat: number; lng: number }) => {
    const steps = 10;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        clearInterval(interval);
        return;
      }
      
      const newPos = {
        lat: startPos.lat + (userLocation.lat - startPos.lat) * (currentStep / steps),
        lng: startPos.lng + (userLocation.lng - startPos.lng) * (currentStep / steps)
      };
      
      setEmployeeLocation(newPos);
    }, 2000);
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
    employeeLocation,
    status,
    declineReason,
    handleSubmit,
    handleContactSupport
  };
};
