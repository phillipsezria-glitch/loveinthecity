import React from 'react';
import { MOCK_CONVERSATIONS } from '../constants';
import { Search, Headset } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50 p-4 font-sans text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <div className="bg-white p-2 rounded-full shadow-sm">
            <Search size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 text-center shadow-soft">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Headset className="text-primary" size={28} />
          </div>
          <h2 className="font-bold text-lg mb-2">Customer Service Center</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Contact us to reserve dates, verify accounts, or get social media details for your matches.
          </p>
      </div>

      {/* Messages List - Only Support */}
      <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Inbox</h2>
      <div className="space-y-1">
        {MOCK_CONVERSATIONS.map((convo) => (
          <div key={convo.id} className="flex items-center p-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 active:scale-98 transition cursor-pointer shadow-sm">
            <div className="relative mr-4">
                <img src={convo.user.images[0]} alt={convo.user.name} className="w-12 h-12 rounded-full object-cover" />
                {convo.user.isVip && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-[8px] text-white font-bold px-1 rounded-sm border border-white">OFFICIAL</div>
                )}
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 truncate text-sm">{convo.user.name}</h3>
                    <span className="text-[10px] text-gray-400">{convo.lastMessage.timestamp}</span>
                </div>
                <p className={`text-xs truncate ${convo.lastMessage.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {convo.lastMessage.text}
                </p>
            </div>
            
            {convo.lastMessage.unread && (
                <div className="ml-2 w-2.5 h-2.5 bg-primary rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};