import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Trash2, Edit2, Check, X, Building2 } from 'lucide-react';
import { storage } from '../utils/localStorage';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  category: string;
}

export const PartnersPage: React.FC = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    category: 'Hotels'
  });

  useEffect(() => {
    const savedPartners = storage.get<Partner[]>('partners');
    if (savedPartners) {
      setPartners(savedPartners);
    }
  }, []);

  const savePartners = (updatedPartners: Partner[]) => {
    setPartners(updatedPartners);
    storage.set('partners', updatedPartners);
  };

  const handleAddPartner = () => {
    if (!formData.name.trim()) {
      alert('Please enter partner name');
      return;
    }

    if (editingId) {
      const updatedPartners = partners.map(p =>
        p.id === editingId
          ? { ...p, ...formData }
          : p
      );
      savePartners(updatedPartners);
      setEditingId(null);
    } else {
      const newPartner: Partner = {
        id: `partner-${Date.now()}`,
        ...formData
      };
      savePartners([...partners, newPartner]);
    }

    setFormData({ name: '', description: '', logo: '', website: '', category: 'Hotels' });
    setShowForm(false);
  };

  const handleEdit = (partner: Partner) => {
    setFormData({
      name: partner.name,
      description: partner.description,
      logo: partner.logo,
      website: partner.website,
      category: partner.category
    });
    setEditingId(partner.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this partner?')) {
      savePartners(partners.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-full bg-gray-50 pb-24 font-sans text-gray-900">
      {/* Header */}
      <div className="bg-white pt-6 px-4 pb-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <button 
            type="button"
            onClick={() => navigate('/messages')}
            className="mr-3 text-primary hover:bg-primary/10 p-2 rounded-full transition"
          >
            <Building2 size={32} />
          </button>
          Our Partners
        </h1>
        <p className="text-gray-600 text-sm">Trusted businesses helping you find love</p>
      </div>

      {/* Add Partner Button */}
      <div className="p-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', description: '', logo: '', website: '', category: 'Hotels' });
          }}
          className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:opacity-90 transition"
        >
          <Plus size={20} />
          <span>{showForm ? 'Cancel' : 'Add New Partner'}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mx-4 mb-6 bg-white rounded-2xl p-6 border-2 border-primary/20 shadow-md">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Partner' : 'Add New Partner'}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Partner Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Luxury Hotels Inc."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this partner and what they offer..."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Logo URL</label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              >
                <option>Hotels</option>
                <option>Restaurants</option>
                <option>Entertainment</option>
                <option>Travel</option>
                <option>Events</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddPartner}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-bold flex items-center justify-center space-x-2 hover:opacity-90 transition"
              >
                <Check size={18} />
                <span>{editingId ? 'Update' : 'Add'}</span>
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', description: '', logo: '', website: '', category: 'Hotels' });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-gray-300 transition"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partners List */}
      <div className="px-4 space-y-4">
        {partners.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">No partners yet. Add your first one!</p>
          </div>
        ) : (
          partners.map(partner => (
            <div key={partner.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex gap-4">
                {partner.logo && (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-lg">{partner.name}</h3>
                      <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mt-1">
                        {partner.category}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(partner)}
                        className="text-blue-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {partner.description && (
                    <p className="text-gray-600 text-sm mb-2">{partner.description}</p>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
