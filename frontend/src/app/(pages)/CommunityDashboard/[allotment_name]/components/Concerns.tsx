'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaCommentAlt, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { supabase } from '../../../../backend/lib/supabaseClient';

interface ConcernsProps {
  allotmentName: string;
  searchTerm: string;
}

interface RedditPostProps {
  authorIcon: string,
  randomUserName: string;
  postTime: string;
  title: string;
  content: string;
  initialUpvotes: number;
  initialDownvotes: number;
  comments: number;
  id: string;
  allotmentName?: string;
  imageUrl?: string;
  ack_status: string;
}

function RedditPost({
  authorIcon,
  randomUserName,
  postTime,
  title,
  content,
  initialUpvotes,
  initialDownvotes,
  comments,
  ack_status,
  id,
  allotmentName,
  imageUrl
}: RedditPostProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  // Separate states for each hover box
  const [showEyeHoverBox, setShowEyeHoverBox] = useState(false);
  const [showResolveHoverBox, setShowResolveHoverBox] = useState(false);
  const [showToolsHoverBox, setShowToolsHoverBox] = useState(false);
  //Copy link variables
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin;
  const fullUrl = origin + pathname  + "/" + id
  const anonymousUsername = React.useMemo(() => {
    const adjectives = ['cool', 'brave', 'witty', 'fast', 'silent'];
    const nouns = ['panda', 'eagle', 'tiger', 'otter', 'fox'];

    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    hash = Math.abs(hash);

    const adj = adjectives[hash % adjectives.length];
    const noun = nouns[(hash >> 3) % nouns.length];
    const num = 1000 + (hash % 9000);

    return `${adj}-${noun}-${num}`;
  }, [id]);
  
  
  const handleCopy = () => {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
  
      // Reset back to "Share" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    };
    
  const handleUpvote = async (e: React.MouseEvent) => {
  e.stopPropagation();

  if (upvoted) {
    setUpvotes(prev => prev - 1);
    setUpvoted(false);

    const { error } = await supabase
      .from('submission')
      .update({ likes: upvotes - 1 })
      .eq('id', id);

    if (error) console.error('Failed to update upvotes:', error.message);

  } else {
    setUpvotes(prev => prev + 1);
    setUpvoted(true);

    let newUpvotes = upvotes + 1;
    let newDownvotes = downvotes;

    if (downvoted) {
      setDownvotes(prev => prev - 1);
      setDownvoted(false);
      newDownvotes = downvotes - 1;
    }

    const { error } = await supabase
      .from('submission')
      .update({
        likes: newUpvotes,
        dislikes: newDownvotes,
      })
      .eq('id', id);

    if (error) console.error('Failed to update upvotes/dislikes:', error.message);
  }
};

  const handleDownvote = async (e: React.MouseEvent) => {
  e.stopPropagation();

  let newDownvotes = downvotes;
  let newUpvotes = upvotes;

  if (downvoted) {
    // Undo downvote
    setDownvotes(prev => prev - 1);
    setDownvoted(false);
    newDownvotes = downvotes - 1;

    const { error } = await supabase
      .from('submission')
      .update({ dislikes: newDownvotes })
      .eq('id', id);

    if (error) console.error('Failed to update dislikes:', error.message);

  } else {
    // Add downvote
    setDownvotes(prev => prev + 1);
    setDownvoted(true);
    newDownvotes = downvotes + 1;

    if (upvoted) {
      setUpvotes(prev => prev - 1);
      setUpvoted(false);
      newUpvotes = upvotes - 1;
    }

    const { error } = await supabase
      .from('submission')
      .update({
        dislikes: newDownvotes,
        likes: newUpvotes,
      })
      .eq('id', id);

    if (error) console.error('Failed to update dislikes/upvotes:', error.message);
  }
};


  const handlePostClick = () => {
    window.location.href = `/CommunityDashboard/${allotmentName}/${id}`;
  };

  return (
    <div className="relative">
      {showEyeHoverBox && (
      <div className="absolute -top-10 right-13 z-50 transition-all duration-300">
        <div className="bg-[#4A61C0]/70 px-3 py-2 rounded-xl shadow-lg text-sm text-white">
          <p className="font-bold mb-1">Residential Network is looking into it</p>
        </div>
      </div>
    )}

      {showResolveHoverBox && (
        <div className="absolute -top-10 right-3 z-50 transition-all duration-300">
          <div className="bg-[#4A61C0]/70 px-3 py-2 rounded-xl shadow-lg text-sm text-white"> 
            <p className="font-bold mb-1">Resolved by Residential Network</p>
          </div>
        </div>
      )}

      {showToolsHoverBox && (
        <div className="absolute -top-10 right-3 z-50 transition-all duration-300">
          <div className="bg-[#4A61C0]/70 px-3 py-2 rounded-xl shadow-lg text-sm text-white"> 
            <p className="font-bold mb-1">Residential Network is working on it</p>
          </div>
        </div>
      )}

      <div className="rounded-lg overflow-hidden border border-gray-200 mb-6 hover:cursor-pointer" onClick={handlePostClick}>
        <div className="max-w-screen-xl flex items-center pl-4 p-2 border-b border-gray-200 relative">
          <div className="flex items-center space-x-2 flex-grow">
            {authorIcon && (
              <img src={authorIcon} alt="Community Icon" className="w-5 h-5 rounded-full" />
            )}
            <span className="text-sm font-semibold text-gray-800">{randomUserName}</span>
            <span className="text-xs text-gray-500">• {postTime}</span>
          </div>
          <div className="flex space-x-2">
           {ack_status === 'looking into it' && (
                <div
                  className="px-2 py-1 rounded-lg bg-[#4A61C0]/70 text-lg select-none relative"
                  onMouseEnter={() => setShowEyeHoverBox(true)}
                  onMouseLeave={() => setShowEyeHoverBox(false)}
                >
                  👀
                </div>
              )}
              {ack_status === 'resolved' && (
                <div
                  className="px-2 py-1 rounded-lg bg-[#4A61C0]/70 text-lg select-none relative"
                  onMouseEnter={() => setShowResolveHoverBox(true)}
                  onMouseLeave={() => setShowResolveHoverBox(false)}
                >
                  ✅
                </div>
              )}
              {ack_status === 'working on it' && (
                <div
                  className="px-2 py-1 rounded-lg bg-[#4A61C0]/70 text-lg select-none relative"
                  onMouseEnter={() => setShowToolsHoverBox(true)}
                  onMouseLeave={() => setShowToolsHoverBox(false)}
                >
                  🛠️
                </div>
              )}
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2">{title}</h2>
          {imageUrl && (
            <div className="py-2">
              <img
                src={imageUrl}
                alt="Post Image"
                className="w-full h-144 object-cover rounded-lg"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found'; }}
              />
            </div>
          )}
        </div>

        <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-700 text-sm leading-relaxed">
          <p>{content}</p>
        </div>

        <div className="flex items-center p-3 border-t border-gray-200 space-x-3 sm:space-x-4">
          <button
            onClick={handleUpvote}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            <IoMdThumbsUp className={`h-4 w-4 ${upvoted ? 'text-[#4A61C0]' : 'text-gray-600'}`} />
            <span className="text-sm font-semibold text-gray-800">{upvotes}</span>
          </button>

          <button
            onClick={handleDownvote}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            <IoMdThumbsDown className={`h-4 w-4 ${downvoted ? 'text-[#4A61C0]' : 'text-gray-600'}`} />
            <span className="text-sm font-semibold text-gray-800">{downvotes}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200">
            <FaCommentAlt className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold">{comments}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200" onClick={handleCopy}>
            <FaShareAlt className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold">{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}



export default function Concerns({ allotmentName, searchTerm }: ConcernsProps) {
  const [posts, setPosts] = useState<RedditPostProps[]>([]);
  
  useEffect(() => {
    const adjectives = ['cool', 'brave', 'witty', 'fast', 'silent'];
    const nouns = ['panda', 'eagle', 'tiger', 'otter', 'fox'];

    const generateRandomUsername = () => {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const num = 1000 + Math.floor(Math.random() * 9000);
      return `${adj}-${noun}-${num}`;
    };

    function generateRandomAnimalIcon(): string {
    const animalIcons = [
    'https://cdn-icons-png.flaticon.com/512/616/616408.png', // Lion
    'https://cdn-icons-png.flaticon.com/512/616/616430.png', // Dog
    'https://cdn-icons-png.flaticon.com/512/616/616421.png', // Cat
    'https://cdn-icons-png.flaticon.com/512/616/616423.png', // Panda
    'https://cdn-icons-png.flaticon.com/512/616/616420.png', // Fox
    'https://cdn-icons-png.flaticon.com/512/616/616427.png', // Elephant
    'https://cdn-icons-png.flaticon.com/512/616/616428.png', // Koala
    'https://cdn-icons-png.flaticon.com/512/616/616429.png', // Bear
    'https://cdn-icons-png.flaticon.com/512/616/616431.png', // Owl
    'https://cdn-icons-png.flaticon.com/512/616/616426.png', // Tiger
  ];

  const randomIndex = Math.floor(Math.random() * animalIcons.length);
  return animalIcons[randomIndex];
}

    const fetchData = async () => {
      try {
        const res = await fetch(`/backend/concerns?allotmentName=${allotmentName}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const mapped = await Promise.all(
            data.map(async (post: any) => {
              let cleanedUrl = '';

              try {
                if (post.imageurl) {
                  const decoded = decodeURIComponent(post.imageurl);
                  const parsed = JSON.parse(decoded);
                  if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
                    cleanedUrl = parsed[0];
                  }
                }
              } catch (e) {
                console.warn('Invalid image_url:', post.imageurl);
              }

              const formattedTime = new Date(post.publishedat).toLocaleString('en-SG', {
                timeZone: 'Asia/Singapore',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              });

              let responseCount = 0;
              const { count, error } = await supabase
                .from('response')
                .select('*', { count: 'exact', head: true })
                .eq('submission_id', post.id);

              if (error) {
                console.error('Error counting responses:', error.message);
              } else {
                responseCount = count ?? 0;
              }

              return {
                authorIcon: generateRandomAnimalIcon(),
                randomUserName: generateRandomUsername(), // random username assigned once per post
                postTime: formattedTime,
                title: post.title,
                content: post.content,
                initialUpvotes: post.likes ?? 0,
                initialDownvotes: post.dislikes ?? 0,
                comments: responseCount,
                id: post.id,
                imageUrl: cleanedUrl,
                ack_status: post.ack_status
              };
            })
          );

          setPosts(mapped);
        }
      } catch (err) {
        console.error('Fetch or processing error:', err);
      }
    };

    fetchData();
  }, [allotmentName]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full font-inter">
      {filteredPosts.map((post, index) => (
        <RedditPost
          authorIcon={post.authorIcon}
          key={index}
          id={post.id}
          randomUserName={post.randomUserName}
          postTime={post.postTime}
          title={post.title}
          content={post.content}
          initialUpvotes={post.initialUpvotes}
          initialDownvotes={post.initialDownvotes}
          comments={post.comments}
          allotmentName={allotmentName}
          imageUrl={post.imageUrl}
          ack_status={post.ack_status}
        />
      ))}
    </div>
  );
}
