import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Phone, Settings, Star, Shield, LogOut, ChevronRight, Video, Lock, FileText, Bell, HelpCircle } from 'lucide-react';
import { storage } from '../utils/localStorage';
import { socialLinks, generateTelegramLink } from '../utils/socialLinks';

interface MinePageProps {
    onLogout: () => void;
}

interface UserProfile {
  name: string;
  age: number;
  phone: string;
  city: string;
  state: string;
  password: string;
  signedUpAt: string;
  userId?: string;
}

export const MinePage: React.FC<MinePageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    // Load user profile from improved storage
    const profile = storage.get<UserProfile>('user_profile');
    if (profile) {
      setUserProfile(profile);
      console.log('👤 User profile loaded:', profile.name);
    }
  }, []);

  // Using a mock user for the profile
  const me = {
      id: 'me',
      creditScore: 80,
      points: 0.00,
      phone: userProfile?.phone || '123456123456'
  };

  return (
    <div className="min-h-full bg-gray-50 pb-20 relative font-sans text-gray-900">
        {/* Header Background */}
        <div className="bg-white pb-6 pt-8 px-6 shadow-sm rounded-b-[2rem]">
             <div className="flex items-center">
                 <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary p-0.5 mr-4 shadow-md">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="Me" className="w-full h-full object-cover rounded-full" />
                 </div>
                 <div className="flex-1">
                     <div className="text-xl font-bold text-gray-900 mb-1">{userProfile?.name || 'Guest'}</div>
                     <div className="text-sm text-gray-600">ID: {userProfile?.userId || 'N/A'}</div>
                 </div>
                 <button type="button" onClick={() => navigate('/messages')} className="bg-[#25D366] rounded-full p-2 text-white shadow-md cursor-pointer hover:opacity-80 transition">
                     <Phone size={20} />
                 </button>
             </div>
        </div>

        {/* User Details Section - Removed */}
        {/* Content Container */}
        <div className="px-4 mt-6">
            {/* Activity Points */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex justify-between items-start mb-2 relative z-10">
                    <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Points Balance</span>
                        <div className="text-4xl font-bold mt-1">{me.points.toFixed(2)}</div>
                    </div>
                    <button type="button" onClick={() => navigate('/messages')} className="bg-white/20 hover:bg-white/30 transition text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center">
                        Redeem <ChevronRight size={12} className="ml-1" />
                    </button>
                </div>
            </div>

            {/* Grid Menu */}
            <h3 className="text-gray-900 font-bold mb-3 ml-1">Services</h3>
            <div className="bg-white rounded-2xl p-4 grid grid-cols-3 gap-y-6 shadow-soft border border-gray-100 mb-6">
                {[
                    { icon: Video, label: 'Private Videos', color: 'text-pink-500', bg: 'bg-pink-50', service: 'support' },
                    { icon: Lock, label: 'Login Password', color: 'text-blue-500', bg: 'bg-blue-50', service: 'password' },
                    { icon: Shield, label: 'Payment PIN', color: 'text-purple-500', bg: 'bg-purple-50', service: 'pin' },
                    { icon: FileText, label: 'Funding Details', color: 'text-orange-500', bg: 'bg-orange-50', service: 'funding' },
                    { icon: Bell, label: 'Announcements', color: 'text-yellow-500', bg: 'bg-yellow-50', service: 'announcement' },
                    { icon: Phone, label: 'Support 24/7', color: 'text-green-500', bg: 'bg-green-50', service: 'support' },
                ].map((item, i) => (
                    <a 
                        key={i} 
                        href={socialLinks.telegramSupport}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center space-y-2 cursor-pointer group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-active:scale-95 hover:shadow-md`}>
                            <item.icon size={24} className={item.color} />
                        </div>
                        <span className="text-[11px] font-medium text-gray-600 text-center">{item.label}</span>
                    </a>
                ))}
            </div>

            {/* Logout */}
            <button type="button" onClick={onLogout} className="w-full bg-white border border-gray-200 text-red-500 py-3.5 rounded-xl font-bold shadow-sm hover:bg-red-50 transition mb-6">
                Log Out
            </button>
        </div>
    </div>
  );
};