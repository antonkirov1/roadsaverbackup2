
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';

export const useRequestSimulation = () => {
  const { setOngoingRequest, addToHistory } = useApp();

  const generateEmployeeLocation = (userLocation: { lat: number; lng: number }) => {
    // Generate a random location within 2-5 km radius of user location
    const radius = (Math.random() * 3 + 2) / 111; // Convert km to degrees (rough approximation)
    const angle = Math.random() * 2 * Math.PI;
    
    return {
      lat: userLocation.lat + radius * Math.cos(angle),
      lng: userLocation.lng + radius * Math.sin(angle)
    };
  };

  const generateEmployeeName = (declinedEmployees: string[] = []) => {
    const employeeNames = [
      'Alexander Petrov',
      'Maria Dimitrova',
      'Nikolay Georgiev',
      'Elena Stoeva',
      'Dimitar Ivanov',
      'Svetlana Koleva',
      'Georgi Todorov',
      'Ana Mihaylova',
      'Plamen Atanasov',
      'Valentina Popova',
      'Stefan Kostov',
      'Desislava Yaneva',
      'Hristo Marinov',
      'Gabriela Ilieva',
      'Borislav Dimitrov',
      'Radoslava Petrova',
      'Kaloyan Stanev',
      'Milena Vasileva',
      'Veselin Nikolov',
      'Teodora Hristova'
    ];
    
    // Filter out declined employees
    const availableEmployees = employeeNames.filter(name => !declinedEmployees.includes(name));
    
    if (availableEmployees.length === 0) {
      return 'Support Team'; // Fallback if all employees are declined
    }
    
    return availableEmployees[Math.floor(Math.random() * availableEmployees.length)];
  };

  const simulateEmployeeResponse = (
    requestId: string,
    timestamp: string,
    type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery',
    userLocation: { lat: number; lng: number },
    setPriceQuote: (price: number) => void,
    setShowPriceQuote: (show: boolean) => void,
    setShowRealTimeUpdate: (show: boolean) => void,
    setStatus: (status: 'pending' | 'accepted' | 'declined') => void,
    setDeclineReason: (reason: string) => void,
    setEmployeeLocation?: (location: { lat: number; lng: number }) => void,
    setCurrentEmployeeName?: (name: string) => void,
    declinedEmployees: string[] = []
  ) => {
    // Always accept for simulation purposes when looking for new employees
    const isAccepted = true;
    
    setTimeout(() => {
      if (isAccepted) {
        // Generate employee location immediately when request is being processed
        const employeeLocation = generateEmployeeLocation(userLocation);
        if (setEmployeeLocation) {
          setEmployeeLocation(employeeLocation);
        }
        
        // Generate employee name (excluding declined ones)
        const employeeName = generateEmployeeName(declinedEmployees);
        if (setCurrentEmployeeName) {
          setCurrentEmployeeName(employeeName);
        }
        
        // Generate random price quote
        const randomPrice = Math.floor(Math.random() * 100) + 50; // 50-150 BGN
        setPriceQuote(randomPrice);
        setShowPriceQuote(true);
        setShowRealTimeUpdate(false);
        
        // Update ongoing request with employee location and name
        const updatedRequest = {
          id: requestId,
          type,
          status: 'pending' as const,
          timestamp: new Date().toLocaleString(),
          location: 'Sofia Center, Bulgaria',
          employeeLocation: employeeLocation,
          currentEmployeeName: employeeName,
          declinedEmployees: declinedEmployees,
          employeeName: employeeName,
          employeePhone: '+359 888 123 456'
        };
        
        setOngoingRequest(updatedRequest);
        
        toast({
          title: "Price Quote Received",
          description: `You received a price quote of ${randomPrice} BGN from ${employeeName}.`
        });
        
      } else {
        // This branch is kept for consistency but won't be used in the current flow
        const declinedRequest = {
          id: requestId,
          type,
          status: 'declined' as const,
          timestamp: new Date().toLocaleString(),
          location: 'Sofia Center, Bulgaria',
          declinedEmployees: declinedEmployees
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

  return { simulateEmployeeResponse, simulateServiceCompletion, generateEmployeeName };
};
