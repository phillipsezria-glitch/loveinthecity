import React, { useState, useEffect } from 'react';
import { Settings, Users, MessageSquare, TrendingUp, LogOut, Plus, Trash2, Edit2, Check, X, Building2, Heart, Star } from 'lucide-react';
import { storage } from '../utils/localStorage';

interface AdminUser {
  userId: string;
  name: string;
  status: 'active' | 'vip' | 'banned';
  signedUpAt: string;
}

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  category: string;
}

interface SuccessStory {
  id: string;
  couple: string;
  story: string;
  image: string;
  date: string;
  rating: number;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  vipPrice: number;
  maxProfiles: number;
}

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'partners' | 'stories' | 'settings'>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Find Love Now',
    siteDescription: 'Find your perfect match today',
    maintenanceMode: false,
    vipPrice: 9.99,
    maxProfiles: 1000
  });
  
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [editingPartner, setEditingPartner] = useState<string | null>(null);
  const [editingStory, setEditingStory] = useState<string | null>(null);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    category: 'Hotels'
  });
  
  const [storyForm, setStoryForm] = useState({
    couple: '',
    story: '',
    image: '',
    rating: 5
  });

  // Load all data from localStorage on mount
  useEffect(() => {
    // Load users using improved storage
    const adminUsers: AdminUser[] = [];
    const mainProfile = storage.get<any>('user_profile');
    if (mainProfile) {
      adminUsers.push({
        userId: mainProfile.userId || 'main_user',
        name: mainProfile.name || 'Unknown',
        status: mainProfile.status || 'active',
        signedUpAt: mainProfile.signedUpAt || 'N/A'
      });
    }
    setUsers(adminUsers);

    // Load partners using improved storage
    const savedPartners = storage.get<Partner[]>('partners');
    if (savedPartners) {
      setPartners(savedPartners);
    }

    // Load stories using improved storage
    const savedStories = storage.get<SuccessStory[]>('successStories');
    if (savedStories) {
      setStories(savedStories);
    }

    // Load site settings using improved storage
    const savedSettings = storage.get<SiteSettings>('site_settings');
    if (savedSettings) {
      setSettings(savedSettings);
    }

    console.log('📊 Admin dashboard data loaded');
  }, []);

  // User Management
  const updateUserStatus = (userId: string, newStatus: 'active' | 'vip' | 'banned') => {
    const updatedUsers = users.map(u => 
      u.userId === userId ? { ...u, status: newStatus } : u
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    
    const userData = storage.get<any>('user_profile') || {};
    if (userData.userId === userId) {
      userData.status = newStatus;
      storage.set('user_profile', userData);
    }
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(u => u.userId !== userId);
    setUsers(updatedUsers);
    storage.remove('user_profile');
  };

  // Partner Management
  const handleAddPartner = () => {
    if (!partnerForm.name.trim()) {
      alert('Please enter partner name');
      return;
    }

    if (editingPartner) {
      const updatedPartners = partners.map(p =>
        p.id === editingPartner
          ? { ...p, ...partnerForm }
          : p
      );
      setPartners(updatedPartners);
      storage.set('partners', updatedPartners);
      setEditingPartner(null);
    } else {
      const newPartner: Partner = {
        id: `partner-${Date.now()}`,
        ...partnerForm
      };
      const updated = [...partners, newPartner];
      setPartners(updated);
      storage.set('partners', updated);
    }

    setPartnerForm({ name: '', description: '', logo: '', website: '', category: 'Hotels' });
    setShowPartnerForm(false);
  };

  const handleEditPartner = (partner: Partner) => {
    setPartnerForm({
      name: partner.name,
      description: partner.description,
      logo: partner.logo,
      website: partner.website,
      category: partner.category
    });
    setEditingPartner(partner.id);
    setShowPartnerForm(true);
  };

  const deletePartner = (id: string) => {
    if (confirm('Delete this partner?')) {
      const updated = partners.filter(p => p.id !== id);
      setPartners(updated);
      storage.set('partners', updated);
    }
  };

  // Story Management
  const handleAddStory = () => {
    if (!storyForm.couple.trim() || !storyForm.story.trim()) {
      alert('Please fill in couple name and story');
      return;
    }

    if (editingStory) {
      const updatedStories = stories.map(s =>
        s.id === editingStory
          ? { ...s, couple: storyForm.couple, story: storyForm.story, image: storyForm.image, rating: storyForm.rating }
          : s
      );
      setStories(updatedStories);
      storage.set('successStories', updatedStories);
      setEditingStory(null);
    } else {
      const newStory: SuccessStory = {
        id: `story-${Date.now()}`,
        couple: storyForm.couple,
        story: storyForm.story,
        image: storyForm.image,
        date: new Date().toLocaleDateString(),
        rating: storyForm.rating
      };
      const updated = [...stories, newStory];
      setStories(updated);
      storage.set('successStories', updated);
    }

    setStoryForm({ couple: '', story: '', image: '', rating: 5 });
    setShowStoryForm(false);
  };

  const handleEditStory = (story: SuccessStory) => {
    setStoryForm({
      couple: story.couple,
      story: story.story,
      image: story.image,
      rating: story.rating
    });
    setEditingStory(story.id);
    setShowStoryForm(true);
  };

  const deleteStory = (id: string) => {
    if (confirm('Delete this story?')) {
      const updated = stories.filter(s => s.id !== id);
      setStories(updated);
      storage.set('successStories', updated);
    }
  };

  // Settings Management
  const saveSettings = () => {
    storage.set('site_settings', settings);
    setEditingSettings(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Settings size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex">
          {[
            { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
            { id: 'users' as const, label: `Users (${users.length})`, icon: Users },
            { id: 'partners' as const, label: `Partners (${partners.length})`, icon: Building2 },
            { id: 'stories' as const, label: `Stories (${stories.length})`, icon: Heart },
            { id: 'settings' as const, label: 'Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition border-b-2 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Users</p>
                  <p className="text-4xl font-bold mt-2">{users.length}</p>
                </div>
                <Users size={40} className="text-blue-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">VIP Members</p>
                  <p className="text-4xl font-bold mt-2">{users.filter(u => u.status === 'vip').length}</p>
                </div>
                <TrendingUp size={40} className="text-purple-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Partners</p>
                  <p className="text-4xl font-bold mt-2">{partners.length}</p>
                </div>
                <Building2 size={40} className="text-green-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Success Stories</p>
                  <p className="text-4xl font-bold mt-2">{stories.length}</p>
                </div>
                <Heart size={40} className="text-red-500 opacity-50" />
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">User ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Signed Up</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map(user => (
                  <tr key={user.userId} className="hover:bg-gray-700 transition">
                    <td className="px-6 py-4 text-sm font-mono text-gray-300 truncate">{user.userId}</td>
                    <td className="px-6 py-4 text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-sm">
                      {editingUser === user.userId ? (
                        <select
                          value={user.status}
                          onChange={(e) => updateUserStatus(user.userId, e.target.value as any)}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                        >
                          <option value="active">Active</option>
                          <option value="vip">VIP</option>
                          <option value="banned">Banned</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === 'vip' ? 'bg-purple-600 text-white' :
                          user.status === 'banned' ? 'bg-red-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {user.status.toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(user.signedUpAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      {editingUser === user.userId ? (
                        <>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="text-green-500 hover:text-green-400 inline-flex items-center space-x-1"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="text-gray-400 hover:text-gray-300 inline-flex items-center space-x-1"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingUser(user.userId)}
                            className="text-blue-500 hover:text-blue-400 inline-flex items-center space-x-1"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteUser(user.userId)}
                            className="text-red-500 hover:text-red-400 inline-flex items-center space-x-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-8 text-center text-gray-400">No users found</div>
            )}
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div>
            <button
              onClick={() => {
                setShowPartnerForm(!showPartnerForm);
                setEditingPartner(null);
                setPartnerForm({ name: '', description: '', logo: '', website: '', category: 'Hotels' });
              }}
              className="mb-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>{showPartnerForm ? 'Cancel' : 'Add Partner'}</span>
            </button>

            {showPartnerForm && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">{editingPartner ? 'Edit Partner' : 'Add New Partner'}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Partner Name"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={partnerForm.description}
                    onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                    rows={3}
                  />
                  <input
                    type="url"
                    placeholder="Logo URL"
                    value={partnerForm.logo}
                    onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                  />
                  <input
                    type="url"
                    placeholder="Website"
                    value={partnerForm.website}
                    onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                  />
                  <select
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  >
                    <option>Hotels</option>
                    <option>Restaurants</option>
                    <option>Entertainment</option>
                    <option>Travel</option>
                    <option>Events</option>
                    <option>Other</option>
                  </select>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddPartner}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
                    >
                      <Check className="inline mr-2" size={18} />
                      {editingPartner ? 'Update' : 'Add'}
                    </button>
                    <button
                      onClick={() => {
                        setShowPartnerForm(false);
                        setEditingPartner(null);
                        setPartnerForm({ name: '', description: '', logo: '', website: '', category: 'Hotels' });
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition"
                    >
                      <X className="inline mr-2" size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map(partner => (
                <div key={partner.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{partner.name}</h3>
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-1 inline-block">{partner.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPartner(partner)}
                        className="text-blue-500 hover:text-blue-400 p-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deletePartner(partner.id)}
                        className="text-red-500 hover:text-red-400 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {partner.description && (
                    <p className="text-gray-400 text-sm mb-2">{partner.description}</p>
                  )}
                  {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                      Visit →
                    </a>
                  )}
                </div>
              ))}
            </div>
            {partners.length === 0 && (
              <div className="text-center text-gray-400 py-8">No partners yet</div>
            )}
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div>
            <button
              onClick={() => {
                setShowStoryForm(!showStoryForm);
                setEditingStory(null);
                setStoryForm({ couple: '', story: '', image: '', rating: 5 });
              }}
              className="mb-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>{showStoryForm ? 'Cancel' : 'Add Story'}</span>
            </button>

            {showStoryForm && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">{editingStory ? 'Edit Story' : 'Add New Story'}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Couple Names (e.g., John & Sarah)"
                    value={storyForm.couple}
                    onChange={(e) => setStoryForm({ ...storyForm, couple: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                  />
                  <textarea
                    placeholder="Their Love Story"
                    value={storyForm.story}
                    onChange={(e) => setStoryForm({ ...storyForm, story: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                    rows={4}
                  />
                  <input
                    type="url"
                    placeholder="Couple Photo URL"
                    value={storyForm.image}
                    onChange={(e) => setStoryForm({ ...storyForm, image: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500"
                  />
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setStoryForm({ ...storyForm, rating: star })}
                          className="transition"
                        >
                          <Star
                            size={24}
                            className={star <= storyForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddStory}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
                    >
                      <Check className="inline mr-2" size={18} />
                      {editingStory ? 'Update' : 'Add'}
                    </button>
                    <button
                      onClick={() => {
                        setShowStoryForm(false);
                        setEditingStory(null);
                        setStoryForm({ couple: '', story: '', image: '', rating: 5 });
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition"
                    >
                      <X className="inline mr-2" size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map(story => (
                <div key={story.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                  {story.image && (
                    <img src={story.image} alt={story.couple} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{story.couple}</h3>
                        <p className="text-xs text-gray-500">{story.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStory(story)}
                          className="text-blue-500 hover:text-blue-400 p-2"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteStory(story.id)}
                          className="text-red-500 hover:text-red-400 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{story.story}</p>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < story.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {stories.length === 0 && (
              <div className="text-center text-gray-400 py-8">No stories yet</div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl">
            {!editingSettings ? (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Site Name</p>
                    <p className="text-xl font-bold">{settings.siteName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Site Description</p>
                    <p className="text-xl font-bold">{settings.siteDescription}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Maintenance Mode</p>
                    <p className="text-xl font-bold">{settings.maintenanceMode ? '🔴 ON' : '🟢 OFF'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">VIP Price</p>
                    <p className="text-xl font-bold">${settings.vipPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Max Profiles</p>
                    <p className="text-xl font-bold">{settings.maxProfiles}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingSettings(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition flex items-center space-x-2"
                >
                  <Edit2 size={18} />
                  <span>Edit Settings</span>
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Site Description</label>
                  <input
                    type="text"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Maintenance Mode</label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Enable Maintenance Mode</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">VIP Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.vipPrice}
                    onChange={(e) => setSettings({ ...settings, vipPrice: parseFloat(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Profiles</label>
                  <input
                    type="number"
                    value={settings.maxProfiles}
                    onChange={(e) => setSettings({ ...settings, maxProfiles: parseInt(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={saveSettings}
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition flex items-center space-x-2"
                  >
                    <Check size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setEditingSettings(false)}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium transition flex items-center space-x-2"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
