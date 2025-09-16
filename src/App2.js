import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Music, Plus } from 'lucide-react';

const VideoItem = ({ video, isActive }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black flex justify-center">
      {/* Video Container */}
      <div className="relative w-full max-w-sm bg-black">
        {/* Black Video Placeholder */}
        <div className="w-full h-full bg-black"></div>
        
        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white mb-3">
            <div className="flex items-center mb-2">
              <span className="font-semibold text-base">@{video.username}</span>
              {!following && (
                <button
                  onClick={() => setFollowing(true)}
                  className="ml-3 px-4 py-1 bg-red-500 text-white text-sm font-semibold rounded"
                >
                  Follow
                </button>
              )}
            </div>
            <p className="text-sm mb-2">{video.description}</p>
            <div className="flex items-center">
              <Music size={14} className="mr-2" />
              <span className="text-xs">{video.music}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-12 h-12 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {video.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <Plus size={12} className="text-white" />
          </div>
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-full ${liked ? 'text-red-500' : 'text-white'}`}
          >
            <Heart size={32} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <span className="text-white text-xs font-semibold mt-1">
            {(video.likes + (liked ? 1 : 0)).toLocaleString()}
          </span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <button className="p-3 text-white">
            <MessageCircle size={32} />
          </button>
          <span className="text-white text-xs font-semibold mt-1">
            {video.comments.toLocaleString()}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button className="p-3 text-white">
            <Share size={32} />
          </button>
          <span className="text-white text-xs font-semibold mt-1">
            {video.shares.toLocaleString()}
          </span>
        </div>

        {/* More Button */}
        <button className="p-3 text-white">
          <MoreHorizontal size={32} />
        </button>
      </div>
    </div>
  );
};

const TikTokMVP = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock video data
  const generateVideo = (id) => ({
    id,
    username: `user${Math.floor(Math.random() * 1000)}`,
    description: [
      "Just another day in paradise 🌴 #vibes #mood",
      "Can't believe this worked! 😂 #fyp #viral",
      "When you realize it's Monday tomorrow 😭 #relatable",
      "POV: You're scrolling TikTok at 3AM 🕐 #nightowl",
      "This trend is everything! 💫 #trending #foryou"
    ][Math.floor(Math.random() * 5)],
    music: [
      "original sound - user" + Math.floor(Math.random() * 100),
      "Trending Audio • Artist Name",
      "Popular Song - Famous Artist",
      "Viral Sound • Creator"
    ][Math.floor(Math.random() * 4)],
    likes: Math.floor(Math.random() * 100000) + 1000,
    comments: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 1000) + 50,
  });

  // Initialize with some videos
  useEffect(() => {
    const initialVideos = Array.from({ length: 5 }, (_, i) => generateVideo(i));
    setVideos(initialVideos);
  }, []);

  // Load more videos when needed
  const loadMoreVideos = () => {
    if (isLoading) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const newVideos = Array.from({ length: 5 }, (_, i) => 
        generateVideo(videos.length + i)
      );
      setVideos(prev => [...prev, ...newVideos]);
      setIsLoading(false);
    }, 500);
  };

  // Handle scroll for infinite loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPosition = scrollTop + clientHeight;
      const threshold = scrollHeight - clientHeight * 2;

      if (scrollPosition >= threshold && !isLoading) {
        loadMoreVideos();
      }

      // Update current video index based on scroll position
      const videoHeight = clientHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      setCurrentVideoIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [videos.length, isLoading]);

  // Smooth scroll to specific video
  const scrollToVideo = (index) => {
    const container = containerRef.current;
    if (!container) return;
    
    container.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center items-center pt-12 pb-4">
        <div className="flex space-x-8">
          <button className="text-gray-400 font-semibold">Live</button>
          <button className="text-white font-bold text-lg">For You</button>
          <button className="text-gray-400 font-semibold">Following</button>
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="snap-start">
            <VideoItem 
              video={video} 
              isActive={index === currentVideoIndex}
            />
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="w-full h-20 flex items-center justify-center bg-black">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Bottom Navigation
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 px-6 py-2">
        <div className="flex justify-between items-center">
          <div className="text-white text-xs">Home</div>
          <div className="text-gray-400 text-xs">Discover</div>
          <div className="bg-white rounded-lg p-2">
            <Plus size={20} className="text-black" />
          </div>
          <div className="text-gray-400 text-xs">Inbox</div>
          <div className="text-gray-400 text-xs">Profile</div>
        </div>
      </div> */}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TikTokMVP;