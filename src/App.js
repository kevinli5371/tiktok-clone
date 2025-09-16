import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Music, Plus } from 'lucide-react';

// --- added: import your local MP4s ---
// Option A: videos in src/videos (bundled)
import vid1 from './videos/kevin1.mp4';
import vid2 from './videos/clash.mp4';
import vid3 from './videos/la.mp4';
import vid4 from './videos/kevin2.mp4';
import vid5 from './videos/dog.mp4';
import vid6 from './videos/code.mp4';

const VIDEO_SOURCES = [vid1, vid2, vid3, vid4, vid5, vid6];

const VideoItem = ({ video, isActive }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const videoRef = useRef(null);

  // Play/pause video based on isActive
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Optional: reset to start
      }
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-screen bg-black flex justify-center">
      <div className="relative w-full max-w-sm bg-black">
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />

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
    src: VIDEO_SOURCES[id % VIDEO_SOURCES.length],
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

  // --- added: hardcoded videos to seed the feed ---
  const HARDCODED_VIDEOS = [
    {
      id: 'h1',
      src: vid1,
      username: 'kevinsnmszt',
      description: 'another post practice #OOTD',
      music: 'original sound',
      likes: 13400,
      comments: 210,
      shares: 77,
    },
    {
      id: 'h2',
      src: vid2,
      username: 'clasher698',
      description: 'PEKKA GOBLIN',
      music: 'original sound',
      likes: 9821,
      comments: 156,
      shares: 42,
    },
    {
      id: 'h3',
      src: vid3,
      username: 'annooe',
      description: 'lahacks with james',
      music: 'Viral Sound • Creator',
      likes: 42190,
      comments: 890,
      shares: 310,
    },
    {
        id: 'h4',
        src: vid4,
        username: 'kevinsnmszt',
        description: '#relatable #bigmen',
        music: 'Viral Sound • Creator',
        likes: 42190,
        comments: 890,
        shares: 310,
      },
      {
        id: 'h5',
        src: vid6,
        username: 'ivan.wllb',
        description: 'my first project',
        music: 'Viral Sound • Creator',
        likes: 42190,
        comments: 890,
        shares: 310,
      },
      {
        id: 'h6',
        src: vid5,
        username: 'doggycharlyy',
        description: 'still looking..',
        music: 'Viral Sound • Creator',
        likes: 42190,
        comments: 890,
        shares: 310,
      },
  ];

  // Initialize with some videos
  useEffect(() => {
    const initialVideos = Array.from({ length: 12 }, (_, i) => generateVideo(i));
    setVideos(initialVideos);
  }, []);

  // Load more videos when needed
  const loadMoreVideos = () => {
    if (isLoading) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const newVideos = Array.from({ length: 6 }, (_, i) => 
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
