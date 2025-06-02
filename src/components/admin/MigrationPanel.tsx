import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { MigrationHelper } from '@/utils/migrationHelper';
import { UserAccountService } from '@/services/userAccountService';
import { EmployeeAccountService } from '@/services/employeeAccountService';
import { Database, Users, UserCheck, RefreshCw, UserCog } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const MigrationPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [migrationStats, setMigrationStats] = useState({
    pendingUsers: 0,
    existingUsers: 0,
    employees: 0,
    simulationEmployees: 0
  });

  const handleMigrateSampleData = async () => {
    setIsLoading(true);
    try {
      const success = await MigrationHelper.runCompleteMigration();
      if (success) {
        toast({
          title: "Migration Successful",
          description: "Sample user and employee data has been migrated to the database."
        });
      } else {
        toast({
          title: "Migration Issues",
          description: "Some migration steps failed. Check console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "Migration Failed",
        description: "An error occurred during migration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      refreshStats();
    }
  };

  const handleProcessPendingUsers = async () => {
    setIsLoading(true);
    try {
      const success = await MigrationHelper.processPendingUserMigrations();
      if (success) {
        toast({
          title: "Processing Complete",
          description: "Pending users have been moved to existing accounts."
        });
      } else {
        toast({
          title: "Processing Issues",
          description: "Some users could not be processed. Check console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Failed",
        description: "An error occurred while processing pending users.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      refreshStats();
    }
  };

  const refreshStats = async () => {
    try {
      const [pendingUsers, employees, existingUsers] = await Promise.all([
        UserAccountService.getPendingNewUsers(), 
        EmployeeAccountService.getAllEmployees(),
        UserAccountService.getExistingUsers()
      ]);
      
      // Get simulation employees count
      const { data: simulationEmployees } = await supabase
        .from('employee_simulation')
        .select('*');
      
      setMigrationStats({
        pendingUsers: pendingUsers.length,
        existingUsers: existingUsers?.length || 0,
        employees: employees.length,
        simulationEmployees: simulationEmployees?.length || 0
      });
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  React.useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">RoadSaver Account Manager Panel</h1>
        <p className="text-muted-foreground">
          Manage user and employee accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationStats.existingUsers}</div>
            <p className="text-xs text-muted-foreground">
              Existing users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationStats.employees}</div>
            <p className="text-xs text-muted-foreground">
              Existing Employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simulation</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationStats.simulationEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Simulation employees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Migration Actions */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>1. Migrate Sample Data</CardTitle>
            <CardDescription>
              Add sample user and employee accounts to the database for testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleMigrateSampleData} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Migrating...
                </>
              ) : (
                'Migrate Sample Data'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Process Pending Users</CardTitle>
            <CardDescription>
              Move users from new_user_accounts to existing_user_accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleProcessPendingUsers} 
              disabled={isLoading || migrationStats.pendingUsers === 0} 
              variant="outline" 
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Process ${migrationStats.pendingUsers} Pending Users`
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Refresh Statistics</CardTitle>
            <CardDescription>
              Update the statistics display with current database counts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refreshStats} disabled={isLoading} variant="secondary" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Stats
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MigrationPanel;
