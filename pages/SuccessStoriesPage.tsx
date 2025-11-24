import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Trash2, Edit2, Check, X, Star } from 'lucide-react';
import { storage } from '../utils/localStorage';

interface SuccessStory {
  id: string;
  couple: string;
  story: string;
  image: string;
  date: string;
  rating: number;
}

export const SuccessStoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    couple: '',
    story: '',
    image: '',
    rating: 5
  });

  useEffect(() => {
    const savedStories = storage.get<SuccessStory[]>('successStories');
    if (savedStories && savedStories.length > 0) {
      setStories(savedStories);
    } else {
      // Initialize with sample success stories
      const sampleStories: SuccessStory[] = [
        {
          id: 'story-1',
          couple: 'Michael & Emily',
          story: 'We met on FUNLOVES and immediately felt a spark. After six months of getting to know each other, Michael proposed at sunset on a beach. Now we\'re planning our wedding and couldn\'t be happier. This platform gave us the gift of finding each other!',
          image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
          date: '9/15/2024',
          rating: 5
        },
        {
          id: 'story-2',
          couple: 'David & Sarah',
          story: 'Long-distance seemed impossible, but we made it work. After meeting through FUNLOVES, we visited each other every month. Last year, David moved to be with me, and now we\'re living our best life together in the city we both love.',
          image: 'https://images.unsplash.com/photo-1621624688988-196429f95f4c?q=80&w=600&auto=format&fit=crop',
          date: '8/20/2024',
          rating: 5
        },
        {
          id: 'story-3',
          couple: 'James & Lisa',
          story: 'We were both skeptical about online dating, but FUNLOVES felt different from day one. Our first date turned into a 12-hour conversation at a coffee shop. Three years later, we\'re married with our first baby on the way!',
          image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=600&auto=format&fit=crop',
          date: '7/10/2024',
          rating: 5
        },
        {
          id: 'story-4',
          couple: 'Robert & Jennifer',
          story: 'Both widowed, we weren\'t looking for love again. But through FUNLOVES, we found each other and a second chance at happiness. We now travel the world together and inspire others that it\'s never too late for love.',
          image: 'https://images.unsplash.com/photo-1529633304379-ef67ff64f34c?q=80&w=600&auto=format&fit=crop',
          date: '6/05/2024',
          rating: 5
        },
        {
          id: 'story-5',
          couple: 'Christopher & Amanda',
          story: 'Best friends who became soulmates! We matched on FUNLOVES, but the real magic was discovering we shared the same dreams, values, and love for adventure. Now we\'re engaged and planning our dream honeymoon in Italy.',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
          date: '5/18/2024',
          rating: 5
        }
      ];
      setStories(sampleStories);
      storage.set('successStories', sampleStories);
    }
  }, []);

  const saveStories = (updatedStories: SuccessStory[]) => {
    setStories(updatedStories);
    storage.set('successStories', updatedStories);
  };

  const handleAddStory = () => {
    if (!formData.couple.trim() || !formData.story.trim()) {
      alert('Please fill in couple name and story');
      return;
    }

    if (editingId) {
      const updatedStories = stories.map(s =>
        s.id === editingId
          ? { ...s, couple: formData.couple, story: formData.story, image: formData.image, rating: formData.rating }
          : s
      );
      saveStories(updatedStories);
      setEditingId(null);
    } else {
      const newStory: SuccessStory = {
        id: `story-${Date.now()}`,
        couple: formData.couple,
        story: formData.story,
        image: formData.image,
        date: new Date().toLocaleDateString(),
        rating: formData.rating
      };
      saveStories([...stories, newStory]);
    }

    setFormData({ couple: '', story: '', image: '', rating: 5 });
    setShowForm(false);
  };

  const handleEdit = (story: SuccessStory) => {
    setFormData({
      couple: story.couple,
      story: story.story,
      image: story.image,
      rating: story.rating
    });
    setEditingId(story.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this success story?')) {
      saveStories(stories.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 to-purple-50 pb-24 font-sans text-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-pink-600 pt-8 px-4 pb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <button 
            type="button"
            onClick={() => navigate('/messages')}
            className="mr-3 hover:bg-white/20 p-2 rounded-full transition"
          >
            <Heart size={32} fill="white" />
          </button>
          Success Stories
        </h1>
        <p className="text-pink-100">Real love stories from our community</p>
      </div>

      {/* Add Story Button */}
      <div className="p-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ couple: '', story: '', image: '', rating: 5 });
          }}
          className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:shadow-lg transition"
        >
          <Plus size={20} />
          <span>{showForm ? 'Cancel' : 'Add Success Story'}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mx-4 mb-6 bg-white rounded-2xl p-6 border-2 border-primary/20 shadow-lg">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Story' : 'Share Your Love Story'}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Couple Names *</label>
              <input
                type="text"
                value={formData.couple}
                onChange={(e) => setFormData({ ...formData, couple: e.target.value })}
                placeholder="e.g., John & Sarah"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Story *</label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Share your love story... How did you meet? What makes your relationship special?"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                rows={5}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Couple Photo URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/couple-photo.jpg"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddStory}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-bold flex items-center justify-center space-x-2 hover:opacity-90 transition"
              >
                <Check size={18} />
                <span>{editingId ? 'Update' : 'Share'}</span>
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ couple: '', story: '', image: '', rating: 5 });
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

      {/* Stories List */}
      <div className="px-4 space-y-4">
        {stories.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">No success stories yet. Be the first to share yours!</p>
          </div>
        ) : (
          stories.map(story => (
            <div key={story.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-pink-100 hover:shadow-lg transition">
              {story.image && (
                <img
                  src={story.image}
                  alt={story.couple}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{story.couple}</h3>
                    <p className="text-xs text-gray-500">{story.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(story)}
                      className="text-blue-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-3 leading-relaxed">{story.story}</p>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < story.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-2">({story.rating}/5)</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
