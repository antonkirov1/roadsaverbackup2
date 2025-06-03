import React, { useEffect } from 'react';
import { useEmployeeInteraction } from '../../hooks/useEmployeeInteraction';

interface EmployeeInteractionComponentProps {
  requestId: string;
  onEmployeeChange?: (employee: any) => void;
  onStatusChange?: (status: string) => void;
}

export const EmployeeInteractionComponent: React.FC<EmployeeInteractionComponentProps> = ({
  requestId,
  onEmployeeChange,
  onStatusChange
}) => {
  const {
    currentEmployee,
    declineCount,
    isRequestActive,
    isLoading,
    error,
    handleDecline,
    handleAccept,
    initializeEmployee
  } = useEmployeeInteraction(requestId);

  useEffect(() => {
    initializeEmployee();
  }, [initializeEmployee]);

  useEffect(() => {
    onEmployeeChange?.(currentEmployee);
  }, [currentEmployee, onEmployeeChange]);

  useEffect(() => {
    onStatusChange?.(isRequestActive ? 'active' : 'completed');
  }, [isRequestActive, onStatusChange]);

  if (error) {
    return (
      <div className="employee-interaction error">
        <p>Error: {error}</p>
        <button onClick={initializeEmployee}>Retry</button>
      </div>
    );
  }

  if (!currentEmployee && isLoading) {
    return <div className="employee-interaction loading">Loading employee...</div>;
  }

  if (!currentEmployee) {
    return <div className="employee-interaction">No available employees</div>;
  }

  return (
    <div className="employee-interaction">
      <div className="employee-info">
        <h3>Current Employee: {currentEmployee.name}</h3>
        <p>Department: {currentEmployee.department}</p>
        <p>Role: {currentEmployee.role}</p>
        <p>Decline Count: {declineCount}/2</p>
        {declineCount === 1 && (
          <p className="warning">Next decline will assign a new employee</p>
        )}
      </div>
      
      <div className="interaction-buttons">
        <button 
          onClick={handleDecline}
          disabled={isLoading || !isRequestActive}
          className="decline-btn"
        >
          {isLoading ? 'Processing...' : 'Decline'}
        </button>
        
        <button 
          onClick={handleAccept}
          disabled={isLoading || !isRequestActive}
          className="accept-btn"
        >
          Accept
        </button>
      </div>

      {declineCount > 0 && (
        <div className="decline-info">
          <p>Declined {declineCount} time{declineCount > 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  );
};