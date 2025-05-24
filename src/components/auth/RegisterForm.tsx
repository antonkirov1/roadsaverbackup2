
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Globe } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface RegisterFormProps {
  onRegister: (userData: { username: string; email: string; password: string; gender?: string; phoneNumber?: string }) => void;
  onCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onCancel }) => {
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+359');
  const [gender, setGender] = useState('man');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Phone number validation
  const validatePhoneNumber = (phone: string): { isValid: boolean; message: string } => {
    if (phone.length !== 13 || !phone.startsWith('+359')) {
      return { isValid: false, message: 'Phone number must be exactly 13 characters starting with +359' };
    }
    return { isValid: true, message: 'Phone number is valid' };
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    const validation = validatePhoneNumber(value);
    setPhoneError(validation.isValid ? '' : validation.message);
  };

  // Password validation
  const validatePassword = (pass: string): { isValid: boolean; message: string } => {
    if (pass.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }

    if (!/[A-Z]/.test(pass)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }

    return { isValid: true, message: 'Password is valid' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !email || !password || !confirmPassword || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      toast({
        title: "Phone Number Error",
        description: phoneValidation.message,
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast({
        title: "Password Error",
        description: passwordValidation.message,
        variant: "destructive",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // For demo purposes, we'll simulate registration
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully",
      });
      onRegister({ username, email, password, gender, phoneNumber });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-clash">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
            className="h-10 w-10 bg-green-600 text-white hover:bg-green-700"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-600 px-1 rounded">
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join RoadSaver for emergency road assistance
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">Phone Number *</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="+359XXXXXXXXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  className="border-2 focus:ring-green-600 focus:border-green-600"
                />
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                <p className="text-xs text-muted-foreground">Must be 13 characters starting with +359</p>
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="man" id="man" />
                    <Label htmlFor="man" className="text-sm">Man</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="woman" id="woman" />
                    <Label htmlFor="woman" className="text-sm">Woman</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-specified" id="not-specified" />
                    <Label htmlFor="not-specified" className="text-sm">Not specified</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">
                  Password
                  <span className="block text-xs text-muted-foreground mt-1">
                    Must be at least 8 characters with 1 uppercase letter
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-2 pr-10 focus:ring-green-600 focus:border-green-600"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-500" />
                    ) : (
                      <Eye size={18} className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Back to Login
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isLoading || phoneError !== ''}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
