import React, { useState, useEffect, Suspense } from 'react';
import { Heart } from 'lucide-react';
import { LazySuccessStories } from '../utils/lazyLoad';

// Loading component for success stories
const StoriesLoading = () => (
  <div className="p-4 space-y-5">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      {[...Array(3)].map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100 mb-4">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-3"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-3"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const CommunityPage: React.FC = () => {
  const [stories, setStories] = useState<any[]>([]);

  return (
    <div className="min-h-full bg-gray-50 pb-4 font-sans text-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold mx-auto">Success Stories</h1>
      </div>

      {/* Feed */}
      <Suspense fallback={<StoriesLoading />}>
        <LazyStoriesComponent setStories={setStories} />
      </Suspense>
    </div>
  );
};

// Separate component for loading stories
const LazyStoriesComponent: React.FC<{ setStories: (stories: any[]) => void }> = ({ setStories }) => {
  useEffect(() => {
    // Load stories asynchronously
    import('../constants/successStories').then(module => {
      setStories(module.SUCCESS_STORIES);
    });
  }, [setStories]);

  return (
    <div className="p-4 space-y-5">
      {/* Success Stories Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Success Stories</h2>
        <Suspense fallback={<StoriesLoading />}>
          <SuccessStoriesList />
        </Suspense>
      </div>
    </div>
  );
};

const SuccessStoriesList = React.lazy(() => 
  import('../constants/successStories').then(({ SUCCESS_STORIES }) => ({
    default: () => (
      <>
        {SUCCESS_STORIES.map(story => (
          <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100 mb-4">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-3">
                  <Heart size={16} fill="currentColor" />
                </div>
                <h2 className="font-bold text-gray-900 text-sm leading-tight flex-1">
                  {story.title}
                </h2>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {story.content}
              </p>
              
              <div className="rounded-xl overflow-hidden mb-3">
                <img 
                  src={story.image} 
                  alt="Success Story" 
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <span className="text-primary text-xs font-bold bg-pink-50 px-2 py-1 rounded">Verified Match</span>
                <span className="text-gray-400 text-xs">{story.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }))
);