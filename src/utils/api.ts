
import { RequestHistoryItem } from '@/types/history';

const mockRequestHistory: RequestHistoryItem[] = [
  { 
    id: 1, 
    type: 'flat-tyre', 
    date: '2024-01-15', 
    time: '14:30',
    completedTime: '15:45',
    status: 'completed',
    user: 'John Doe',
    employee: 'Mike Johnson'
  },
  { 
    id: 2, 
    type: 'out-of-fuel', 
    date: '2024-01-10', 
    time: '09:15',
    completedTime: '10:30',
    status: 'completed',
    user: 'Jane Smith',
    employee: 'Sarah Wilson'
  },
  { 
    id: 3, 
    type: 'car-battery', 
    date: '2024-01-05', 
    time: '16:20',
    completedTime: '17:15',
    status: 'completed',
    user: 'Bob Brown',
    employee: 'Tom Davis'
  },
  { 
    id: 4, 
    type: 'tow-truck', 
    date: '2024-01-02', 
    time: '11:45',
    completedTime: '13:00',
    status: 'completed',
    user: 'Alice Green',
    employee: 'Chris Lee'
  },
  { 
    id: 5, 
    type: 'other-car-problems', 
    date: '2023-12-28', 
    time: '08:20',
    completedTime: '09:30',
    status: 'completed',
    user: 'David White',
    employee: 'Emma Brown'
  }
];

export const fetchRequestHistory = (): Promise<RequestHistoryItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: Fetched request history");
      resolve(mockRequestHistory);
    }, 1000); // Simulate 1 second delay
  });
};

