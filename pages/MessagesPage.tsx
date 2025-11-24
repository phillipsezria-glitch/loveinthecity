import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Copy, Check, Zap, Clock, Shield, MessageSquare, ChevronRight, Heart, Sparkles, AlertCircle, HelpCircle, Lock, ChevronLeft } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';

interface UserProfile {
  name: string;
  age: number;
  phone: string;
  signedUpAt: string;
}

export const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const telegramUrl = 'https://t.me/findlovenow';
  const [searchParams] = useSearchParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    issue: 'reserve',
    selectedProfile: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  // Load user profile data from storage on component mount
  useEffect(() => {
    const profile = storage.get<UserProfile>('user_profile');
    if (profile) {
      setUserProfile(profile);
      setFormData(prev => ({
        ...prev,
        name: profile.name,
        phone: profile.phone
      }));
    }

    // Check if coming from a partner profile (partner ID in URL params)
    const partnerId = searchParams.get('partnerId');
    if (partnerId) {
      setFormData(prev => ({
        ...prev,
        selectedProfile: partnerId,
        issue: 'reserve'
      }));
      setShowQuickActions(false);
    }
  }, [searchParams]);

  const generateMessage = () => {
    const issueText = {
      reserve: 'I would like to reserve a date with',
      password: 'I need help changing my login password',
      pin: 'I need to reset my payment PIN',
      funding: 'I have a question about funding details',
      announcement: 'I would like to know about announcements',
      support: 'I need general support'
    };

    const selectedUser = MOCK_USERS.find(u => u.id === formData.selectedProfile);
    const baseMessage = `${issueText[formData.issue as keyof typeof issueText]}${selectedUser ? ` with ${selectedUser.name}, ${selectedUser.age} years old` : ''}`;
    
    return `Hello! My name is ${formData.name || 'User'}. ${baseMessage}. ${formData.message ? `Additional details: ${formData.message}` : ''}`;
  };

  const message = generateMessage();

  const copyToClipboard = () => {
    const selectedUser = MOCK_USERS.find(u => u.id === formData.selectedProfile);
    const fullMessage = `📋 CUSTOMER INFO:\nName: ${formData.name || 'N/A'}\nAge: ${userProfile?.age || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\n${selectedUser ? `\n💑 PARTNER INTEREST:\nName: ${selectedUser.name}\nAge: ${selectedUser.age}\nLocation: ${selectedUser.residence}\n` : ''}\n💬 MESSAGE:\n${message}`;
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Open Telegram after a brief delay to ensure copy completes
    setTimeout(() => {
      window.open(telegramUrl, '_blank');
    }, 300);
  };

  const handleQuickAction = (type: string) => {
    setFormData(prev => ({ ...prev, issue: type }));
    setShowQuickActions(false);
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 via-purple-50 to-white p-4 font-sans text-gray-900 pb-20">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button 
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <div className="text-center flex-1">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles size={14} />
            24/7 Support
          </div>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Premium Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
          Find Love Now Support
        </h1>
        <p className="text-gray-600 text-base font-medium">Get instant help on anything</p>
      </div>

      {/* Quick Actions Grid */}
      {showQuickActions && (
        <div className="mb-10 grid grid-cols-1 gap-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">What can we help with?</p>
          
          <button
            onClick={() => handleQuickAction('reserve')}
            className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-pink-400 hover:shadow-xl hover:bg-pink-50/30 active:scale-95 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <Heart size={24} className="text-pink-600" fill="currentColor" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900">Make a Reservation</p>
              <p className="text-xs text-gray-500">Book a date with someone</p>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-pink-400 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={() => handleQuickAction('password')}
            className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-xl hover:bg-blue-50/30 active:scale-95 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <Lock size={24} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900">Account Security</p>
              <p className="text-xs text-gray-500">Change password or reset PIN</p>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={() => handleQuickAction('support')}
            className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-purple-400 hover:shadow-xl hover:bg-purple-50/30 active:scale-95 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <MessageCircle size={24} className="text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900">General Support</p>
              <p className="text-xs text-gray-500">Any other questions</p>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
          </button>
        </div>
      )}

      {/* Service Info Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-2xl p-5 mb-8 shadow-xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Zap size={22} className="flex-shrink-0" />
          </div>
          <div>
            <h3 className="font-black mb-1 text-lg">Lightning Response Time</h3>
            <p className="text-sm text-white/90">Our support team replies within minutes via Telegram</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-3xl p-7 mb-6 border border-gray-200 shadow-sm">
        <h3 className="font-black text-xl text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-3">
            <MessageSquare size={22} className="text-white" />
          </div>
          Send Your Request
        </h3>

        {/* Name Input */}
        <div className="mb-5">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block tracking-wider">Your Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
          />
        </div>

        {/* Phone Input */}
        <div className="mb-5">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block tracking-wider">Phone Number</label>
          <input
            type="tel"
            placeholder="Your contact number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
          />
        </div>

        {/* Issue Type */}
        <div className="mb-5">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block tracking-wider">Category</label>
          <select
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
          >
            <option value="reserve">📅 Make a Reservation</option>
            <option value="password">🔐 Change Password</option>
            <option value="pin">🔑 Reset PIN</option>
            <option value="funding">💰 Funding Details</option>
            <option value="announcement">📢 Announcements</option>
            <option value="support">❓ General Support</option>
          </select>
        </div>

        {/* Profile Selection (if reserving) */}
        {formData.issue === 'reserve' && (
          <div className="mb-5 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
            <label className="text-xs font-bold text-gray-700 uppercase mb-2 block tracking-wider">Select Profile</label>
            <select
              value={formData.selectedProfile}
              onChange={(e) => setFormData({ ...formData, selectedProfile: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-pink-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none transition font-medium"
            >
              <option value="">🔍 Choose a profile...</option>
              {MOCK_USERS.filter(u => u.id !== 'support').map(user => (
                <option key={user.id} value={user.id}>
                  ❤️ {user.name}, {user.age} - {user.residence}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Additional Message */}
        <div className="mb-5">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block tracking-wider">Message (Optional)</label>
          <textarea
            placeholder="Any additional details..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-purple-500 focus:bg-white focus:outline-none transition resize-none h-24 font-medium"
          />
        </div>

        {/* Generated Message Preview */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-[11px] font-black text-purple-900 uppercase mb-3 tracking-wider flex items-center gap-2">
            <Sparkles size={14} />
            Preview Message
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">{message}</p>
        </div>

        {/* Merged Copy & Send Button */}
        <button
          type="button"
          onClick={copyToClipboard}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-3 active:scale-95 shadow-lg group"
        >
          {copied ? (
            <>
              <Check size={22} />
              <div className="text-left">
                <div className="text-sm font-black">Copied & Opening!</div>
                <div className="text-xs font-medium opacity-90">Paste in Telegram...</div>
              </div>
            </>
          ) : (
            <>
              <Copy size={22} />
              <div className="text-left">
                <div className="text-sm font-black">Copy & Open Telegram</div>
                <div className="text-xs font-medium opacity-90">One-tap messaging</div>
              </div>
              <Send size={20} className="ml-auto group-hover:translate-x-1 transition" />
            </>
          )}
        </button>
      </div>

      {/* Benefits Section */}
      <div className="space-y-3 mb-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Why Choose Telegram?</p>
        
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-yellow-300 hover:shadow-md transition">
          <div className="p-2.5 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex-shrink-0">
            <Zap size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">Instant Responses</p>
            <p className="text-xs text-gray-600 mt-0.5">We reply within minutes, not hours</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition">
          <div className="p-2.5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex-shrink-0">
            <Shield size={20} className="text-green-600" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">100% Secure</p>
            <p className="text-xs text-gray-600 mt-0.5">End-to-end encrypted conversations</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex-shrink-0">
            <MessageCircle size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">Direct Contact</p>
            <p className="text-xs text-gray-600 mt-0.5">Chat directly with our support team</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h4 className="font-black text-gray-900 mb-5 flex items-center gap-2">
          <HelpCircle size={22} className="text-purple-600" />
          How It Works
        </h4>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Fill Your Details</p>
              <p className="text-xs text-gray-600">Enter your name, phone, and request type</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Click & Copy</p>
              <p className="text-xs text-gray-600">Tap the button to copy and open Telegram</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Paste & Send</p>
              <p className="text-xs text-gray-600">Paste your message and get instant support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
