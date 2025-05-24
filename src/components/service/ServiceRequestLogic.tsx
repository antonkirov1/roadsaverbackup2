
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

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
      setStatus('pending');
      setIsSubmitting(false);
      setShowRealTimeUpdate(true);
      toast({
        title: "Request Sent",
        description: "Your request has been sent to our team."
      });
      
      simulateEmployeeResponse();
    }, 1500);
  };

  const simulateEmployeeResponse = () => {
    const employeePos = {
      lat: userLocation.lat + (Math.random() - 0.5) * 0.01,
      lng: userLocation.lng + (Math.random() - 0.5) * 0.01
    };
    
    const isAccepted = Math.random() > 0.3;
    
    setTimeout(() => {
      if (isAccepted) {
        setEmployeeLocation(employeePos);
        setStatus('accepted');
        toast({
          title: "Request Accepted",
          description: "An employee is on the way to help you."
        });
        
        simulateEmployeeMovement(employeePos);
      } else {
        setStatus('declined');
        setDeclineReason("I apologize, but all of our service technicians are currently occupied with other emergencies. We expect to have someone available in approximately 15-20 minutes. If this is an urgent matter, please contact our emergency hotline for immediate assistance.");
        toast({
          title: "Request Declined",
          description: "Your request was declined by our team.",
          variant: "destructive"
        });
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
