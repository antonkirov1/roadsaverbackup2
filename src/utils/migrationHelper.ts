
import { UserAccountService } from '@/services/userAccountService';
import { EmployeeAccountService } from '@/services/employeeAccountService';

// This utility helps migrate existing app data to the new database structure
export class MigrationHelper {
  // Sample data that might exist in your app - replace with actual data source
  private static sampleUsers = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      phone_number: '+359888123456',
      gender: 'male'
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password456',
      phone_number: '+359888654321',
      gender: 'female'
    }
  ];

  private static sampleEmployees = [
    {
      username: 'emp_alex',
      email: 'alex@roadsaver.com',
      phone_number: '+359888111222',
      employee_role: 'technician',
      status: 'active' as const
    },
    {
      username: 'emp_maria',
      email: 'maria@roadsaver.com',
      phone_number: '+359888333444',
      employee_role: 'supervisor',
      status: 'active' as const
    }
  ];

  // Migrate sample user data to new_user_accounts
  static async migrateSampleUsers() {
    console.log('Starting user migration...');
    
    try {
      for (const user of this.sampleUsers) {
        try {
          await UserAccountService.createNewUserAccount(user);
          console.log(`Migrated user: ${user.username}`);
        } catch (error) {
          console.error(`Failed to migrate user ${user.username}:`, error);
        }
      }
      
      console.log('User migration completed');
      return true;
    } catch (error) {
      console.error('Error during user migration:', error);
      return false;
    }
  }

  // Migrate sample employee data to employee_accounts
  static async migrateSampleEmployees() {
    console.log('Starting employee migration...');
    
    try {
      for (const employee of this.sampleEmployees) {
        try {
          await EmployeeAccountService.createEmployeeAccount(employee);
          console.log(`Migrated employee: ${employee.username}`);
        } catch (error) {
          console.error(`Failed to migrate employee ${employee.username}:`, error);
        }
      }
      
      console.log('Employee migration completed');
      return true;
    } catch (error) {
      console.error('Error during employee migration:', error);
      return false;
    }
  }

  // Process pending user migrations (move from new to existing)
  static async processPendingUserMigrations() {
    console.log('Processing pending user migrations...');
    
    try {
      const pendingUsers = await UserAccountService.getPendingNewUsers();
      
      for (const user of pendingUsers) {
        try {
          await UserAccountService.migrateUserToExisting(user.id);
          console.log(`Processed user: ${user.username}`);
        } catch (error) {
          console.error(`Failed to process user ${user.username}:`, error);
        }
      }
      
      console.log('Pending user migrations processed');
      return true;
    } catch (error) {
      console.error('Error processing pending migrations:', error);
      return false;
    }
  }

  // Run complete migration process
  static async runCompleteMigration() {
    console.log('=== Starting Complete Migration Process ===');
    
    // Step 1: Migrate sample users to new_user_accounts
    const userMigrationSuccess = await this.migrateSampleUsers();
    
    // Step 2: Migrate sample employees
    const employeeMigrationSuccess = await this.migrateSampleEmployees();
    
    // Step 3: Process pending user migrations (optional, can be done later)
    // Uncomment the line below if you want to immediately move users to existing_user_accounts
    // const processingSuccess = await this.processPendingUserMigrations();
    
    console.log('=== Migration Process Summary ===');
    console.log(`User migration: ${userMigrationSuccess ? 'SUCCESS' : 'FAILED'}`);
    console.log(`Employee migration: ${employeeMigrationSuccess ? 'SUCCESS' : 'FAILED'}`);
    
    return userMigrationSuccess && employeeMigrationSuccess;
  }
}
