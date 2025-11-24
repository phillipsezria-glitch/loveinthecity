import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Phone, ArrowRight } from 'lucide-react';
import { storage } from '../utils/localStorage';

interface LoginPageProps {
  onLogin: () => void;
}

interface LoginFormData {
  phone: string;
  password: string;
}

interface UserProfile {
  name: string;
  age: number;
  phone: string;
  city: string;
  state: string;
  password: string;
  userId: string;
  signedUpAt: string;
  lastLoginAt?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    // Check if all fields are empty
    const allFieldsEmpty = !formData.phone.trim() && !formData.password.trim();

    if (allFieldsEmpty) {
      newErrors.phone = 'Please fill in all required fields';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = newErrors.phone || 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Valid phone number required (minimum 10 digits)';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🔍 Login form data:', formData);

    if (!validateForm()) {
      console.log('❌ Login validation failed');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in local storage (from signup)
      const userProfile = storage.get('user_profile') as UserProfile | null;
      
      if (userProfile && userProfile.name) {
        // Verify phone and password match
        if (userProfile.phone === formData.phone && userProfile.password === formData.password) {
          console.log('✅ User found and credentials match:', userProfile.name);
          
          // Update login time
          const updatedProfile: UserProfile = {
            ...userProfile,
            lastLoginAt: new Date().toISOString()
          };
          storage.set('user_profile', updatedProfile, 30 * 24 * 60 * 60 * 1000);
          
          // Call parent login handler to set token
          onLogin();
          
          console.log('✅ Login successful for:', userProfile.name);
        } else {
          console.log('❌ Invalid credentials');
          setErrors({ phone: 'Invalid phone number or password' });
        }
      } else {
        // No user found - redirect to signup
        console.log('❌ No user found, redirecting to signup');
        setErrors({ phone: 'No account found. Please sign up first.' });
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ phone: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-full w-full bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-gray-900">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-[40%] left-[20%] w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>

      <div className="w-full max-w-sm flex flex-col items-center relative z-10">
        
        {/* Brand Logo */}
        <div className="mb-8 flex flex-col items-center animate-fade-in-up">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-glow rotate-3 flex items-center justify-center mb-6">
                <Heart className="text-primary fill-primary" size={40} />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-sm text-center">Find Love Now</h1>
            <p className="text-white/90 text-lg font-medium mt-2">Where connections happen</p>
        </div>

        {/* Login Form Card */}
        <form onSubmit={handleLogin} className="w-full bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl">
            <div className="space-y-5">
                <div>
                    <label className="block text-gray-500 text-xs font-bold ml-3 mb-1 uppercase">Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone" 
                        className={`w-full bg-gray-50 border-2 rounded-2xl py-4 px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium ${
                            errors.phone
                                ? 'border-red-400 focus:border-red-500 focus:bg-red-50'
                                : 'border-gray-100 focus:border-primary focus:bg-white'
                        }`}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-medium ml-3">{errors.phone}</p>
                    )}
                </div>
                
                <div>
                    <label className="block text-gray-500 text-xs font-bold ml-3 mb-1 uppercase">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password" 
                        className={`w-full bg-gray-50 border-2 rounded-2xl py-4 px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium ${
                            errors.password
                                ? 'border-red-400 focus:border-red-500 focus:bg-red-50'
                                : 'border-gray-100 focus:border-primary focus:bg-white'
                        }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1 font-medium ml-3">{errors.password}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button type="button" onClick={() => navigate('/messages')} className="text-primary text-sm font-bold hover:underline">Forgot Password?</button>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span>Logging in...</span>
                    ) : (
                        <>
                            Start Dating
                            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </form>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col items-center space-y-4">
            <button type="button" onClick={() => navigate('/signup')} className="text-white font-bold text-sm bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition backdrop-blur-md">
                Create New Account
            </button>
            
            <div className="flex items-center text-white/80 text-xs space-x-1">
                 <Phone size={12} />
                 <span>Need help? Contact Support</span>
            </div>
        </div>

      </div>
    </div>
  );
};