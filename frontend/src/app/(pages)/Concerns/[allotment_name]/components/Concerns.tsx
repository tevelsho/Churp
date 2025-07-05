'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaCommentAlt, FaShareAlt, FaBookmark } from 'react-icons/fa';

interface ConcernsProps {
  allotmentName: string;
}

interface RedditPostProps {
  communityIcon: string;
  communityName: string;
  postTime: string;
  title: string;
  content: string;
  initialUpvotes: number;
  comments: number;
  initialSaved: boolean;
  id: string;
  allotmentName?: string;
  imageUrl?: string;
}

function RedditPost({
  communityIcon,
  communityName,
  postTime,
  title,
  content,
  initialUpvotes,
  comments,
  initialSaved,
  id,
  allotmentName,
  imageUrl
}: RedditPostProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  // Separate states for each hover box
  const [showEyeHoverBox, setShowEyeHoverBox] = useState(false);
  const [showTreeHoverBox, setShowTreeHoverBox] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvoted) {
      setUpvotes(prev => prev - 1);
      setUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setUpvoted(true);
      if (downvoted) {
        setDownvotes(prev => prev - 1);
        setDownvoted(false);
      }
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downvoted) {
      setDownvotes(prev => prev - 1);
      setDownvoted(false);
    } else {
      setDownvotes(prev => prev + 1);
      setDownvoted(true);
      if (upvoted) {
        setUpvotes(prev => prev - 1);
        setUpvoted(false);
      }
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(prev => !prev);
  };

  const handlePostClick = () => {
    window.location.href = `/Concerns/${allotmentName}/${id}`;
  };

  return (
    <div className="relative">
      {showEyeHoverBox && (
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
          <div className="bg-[#4A61C0]/70 px-3 py-2 rounded-xl shadow-lg text-sm text-white"> 
            <p className="font-bold mb-1">Viewed by:</p>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 w-40">
                <span className="px-2 py-1 rounded-md bg-[#4A61C0] text-lg">👦🏻</span>
                <span className="text-white font-semibold">Alex</span>
              </div>
              <div className="flex items-center space-x-2 w-40">
                <span className="px-2 py-1 rounded-md bg-[#4A61C0] text-lg">👧🏽</span>
                <span className="text-white font-semibold">Maria</span>
              </div>
              <div className="flex items-center space-x-2 w-40">
                <span className="px-2 py-1 rounded-md bg-[#4A61C0] text-lg">👨🏿</span>
                <span className="text-white font-semibold">David</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTreeHoverBox && (
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
          <div className="bg-[#2E6C3A]/70 px-3 py-2 rounded-xl shadow-lg text-sm text-white"> 
            <p className="font-bold mb-1">Viewed by:</p>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 w-40">
                <span className="px-2 py-1 rounded-md bg-[#2E6C3A] text-lg">👨🏼‍🦰</span>
                <span className="text-white font-semibold">Jonas</span>
              </div>
              <div className="flex items-center space-x-2 w-40">
                <span className="px-2 py-1 rounded-md bg-[#2E6C3A] text-lg">👩🏻‍🦰</span>
                <span className="text-white font-semibold">Lucy</span>
              </div>
              <div className="flex items-center space-x-2 w-40">
                <span className="px-2 py-1 rounded-md bg-[#2E6C3A] text-lg">👨🏽‍🦲</span> 
                <span className="text-white font-semibold">James</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg overflow-hidden border border-gray-200 mb-6 hover:cursor-pointer" onClick={handlePostClick}>
        <div className="max-w-screen-xl flex items-center pl-4 p-2 border-b border-gray-200 relative">
          <div className="flex items-center space-x-2 flex-grow">
            {communityIcon && (
              <img src={communityIcon} alt="Community Icon" className="w-5 h-5 rounded-full" />
            )}
            <span className="text-sm font-semibold text-gray-800">{communityName}</span>
            <span className="text-xs text-gray-500">• {postTime}</span>
          </div>
          <div className="flex space-x-2">
            <div
              className="px-2 py-1 rounded-lg bg-[#4A61C0]/70 text-lg select-none relative"
              onMouseEnter={() => setShowEyeHoverBox(true)}
              onMouseLeave={() => setShowEyeHoverBox(false)}
            >
              👀
            </div>
            <div
              className="px-2 py-1 rounded-lg bg-[#2E6C3A]/70 text-lg select-none relative"
              onMouseEnter={() => setShowTreeHoverBox(true)}
              onMouseLeave={() => setShowTreeHoverBox(false)}
            >
              🌳
            </div>
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
            <IoMdThumbsUp className={`h-4 w-4 ${upvoted ? 'text-[#4A61C0]' : 'text-gray-400'}`} />
            <span className="text-sm font-semibold text-gray-800">{upvotes}</span>
          </button>

          <button
            onClick={handleDownvote}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            <IoMdThumbsDown className={`h-4 w-4 ${downvoted ? 'text-[#4A61C0]' : 'text-gray-400'}`} />
            <span className="text-sm font-semibold text-gray-800">{downvotes}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200">
            <FaCommentAlt className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-semibold">{comments}</span>
          </button>

          <button
            onClick={handleSaveToggle}
            className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            <FaBookmark className={`h-4 w-4 ${isSaved ? 'text-[#4A61C0]' : 'text-gray-400'}`} />
            <span className="text-sm font-semibold">Save</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200">
            <FaShareAlt className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Concerns({ allotmentName }: ConcernsProps) {
  const [posts, setPosts] = useState<RedditPostProps[]>([]);

  useEffect(() => {
    fetch(`/backend/concerns?allotmentName=${allotmentName}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((post: any) => ({
            communityIcon: post.community_icon,
            communityName: post.community_name,
            postTime: new Date(post.created_at).toLocaleString(),
            title: post.title,
            content: post.content,
            initialUpvotes: post.upvotes ?? 0,
            comments: post.comments_count ?? 0,
            initialSaved: post.saved ?? false,
            id: post.id,
            imageUrl: post.image_url || '/pest.jpg',
          }));
          setPosts(mapped);
        }
      });
  }, [allotmentName]);

  return (
    <div className="w-full font-inter">
      {posts.map((post, index) => (
        <RedditPost
          key={index}
          id={post.id}
          communityIcon={post.communityIcon}
          communityName={post.communityName}
          postTime={post.postTime}
          title={post.title}
          content={post.content}
          initialUpvotes={post.initialUpvotes}
          comments={post.comments}
          initialSaved={post.initialSaved}
          allotmentName={allotmentName}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}
