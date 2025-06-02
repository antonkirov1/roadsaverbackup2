
import { toast } from "@/components/ui/use-toast";
import { useEmployeeSimulation } from '@/hooks/useEmployeeSimulation';

export const useRequestSimulation = () => {
  const { getRandomEmployee } = useEmployeeSimulation();

  const simulateEmployeeResponse = (
    requestId: string,
    timestamp: string,
    type: string,
    userLocation: { lat: number; lng: number },
    onPriceQuote: (quote: number) => void,
    setShowPriceQuote: (show: boolean) => void,
    setShowRealTimeUpdate: (show: boolean) => void,
    setStatus: (status: 'pending' | 'accepted' | 'declined') => void,
    setDeclineReason: (reason: string) => void,
    setEmployeeLocation: (location: { lat: number; lng: number }) => void,
    onEmployeeAssigned: (employeeName: string) => void,
    excludedEmployees: string[] = []
  ) => {
    console.log('Starting employee simulation, excluded employees:', excludedEmployees);
    
    // Step 1: Finding employee (2-4 seconds)
    setTimeout(() => {
      const selectedEmployee = getRandomEmployee(excludedEmployees);
      
      if (!selectedEmployee) {
        toast({
          title: "No employees available",
          description: "All employees are currently busy. Please try again later.",
          variant: "destructive"
        });
        setStatus('declined');
        setDeclineReason('No available employees');
        return;
      }

      console.log('Employee assigned:', selectedEmployee.full_name);
      onEmployeeAssigned(selectedEmployee.full_name);
      
      toast({
        title: "Employee Found",
        description: `${selectedEmployee.full_name} is reviewing your request.`
      });

      // Step 2: Employee responds with quote (3-5 seconds)
      setTimeout(() => {
        const basePrice = getServiceBasePrice(type);
        const variation = Math.floor(Math.random() * 20) - 10;
        const finalPrice = Math.max(10, basePrice + variation);
        
        console.log('Employee sending quote:', finalPrice);
        onPriceQuote(finalPrice);
        setShowRealTimeUpdate(false);
        setShowPriceQuote(true);
        
        toast({
          title: "Price Quote Received",
          description: `${selectedEmployee.full_name} sent a quote of ${finalPrice} BGN.`
        });
      }, Math.random() * 2000 + 3000);
      
    }, Math.random() * 2000 + 2000);
  };

  const getServiceBasePrice = (type: string): number => {
    const prices = {
      'flat-tyre': 35,
      'out-of-fuel': 25,
      'car-battery': 40,
      'tow-truck': 60,
      'other-car-problems': 45,
      'emergency': 80,
      'support': 20
    };
    return prices[type as keyof typeof prices] || 30;
  };

  return {
    simulateEmployeeResponse
  };
};
