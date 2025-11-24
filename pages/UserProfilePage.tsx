import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../constants';
import { ChevronLeft, Heart, Star, MapPin } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = MOCK_USERS.find(u => u.id === id);

  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-full bg-gray-50 text-gray-900 pb-6 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-40 shadow-sm">
            <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <span className="font-bold text-lg">{user.name}</span>
            <div className="w-6"></div> {/* Spacer */}
        </div>

        {/* Info Block */}
        <div className="bg-white p-5 mb-3 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin size={14} className="mr-1" />
                        {user.residence || 'USA'} • {user.age} y/o
                    </div>
                    
                    <div className="flex space-x-2 mb-4">
                        {user.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-pink-50 rounded-full p-2.5 mb-1">
                        <Heart className="text-primary fill-current" size={22} />
                    </div>
                    <span className="text-xs font-bold text-gray-600">{user.likes || 999}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Height</p>
                    <p className="font-semibold">{user.height}</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Bust</p>
                    <p className="font-semibold">{user.bust}</p>
                 </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-xs font-bold mr-2 text-gray-500">Rating:</span>
                    <div className="flex text-yellow-400">
                        {[...Array(user.chargeRange || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                </div>
                <button 
                  onClick={() => navigate('/messages')}
                  className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-gray-800 transition active:scale-95"
                >
                    Reserve Now
                </button>
            </div>
        </div>

        {/* Gallery Thumbnails */}
        <div className="bg-white p-4 mb-3 shadow-sm">
            <h3 className="font-bold text-sm mb-3 text-gray-900">Gallery</h3>
            <div className="grid grid-cols-4 gap-2">
                {user.images.map((img, i) => (
                     <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-100">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                     </div>
                ))}
                {[...Array(Math.max(0, 4 - user.images.length))].map((_, i) => (
                    <div key={`filler-${i}`} className="aspect-square bg-gray-100 rounded-lg"></div>
                ))}
            </div>
        </div>

        {/* Large Portrait Image */}
        <div className="w-full aspect-[3/4] bg-white">
            <img src={user.images[0]} className="w-full h-full object-cover" alt="Portrait" />
        </div>
    </div>
  );
};