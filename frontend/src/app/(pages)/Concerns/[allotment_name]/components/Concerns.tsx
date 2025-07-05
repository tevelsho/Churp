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
  allotmentName
}: RedditPostProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showHoverBox, setShowHoverBox] = useState(false);

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
      {showHoverBox && (
        <div className="absolute -top-12 z-50 transition-all duration-300">
          <div className="bg-white border border-gray-200 px-3 py-2 rounded-md shadow-lg text-sm text-gray-700">
            <p>This post has been viewed recently.</p>
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
              className="px-2 py-1 rounded-lg bg-[#4A61C0] text-lg select-none relative"
              onMouseEnter={() => setShowHoverBox(true)}
              onMouseLeave={() => setShowHoverBox(false)}
            >
              👀
            </div>
            <div
              className="px-2 py-1 rounded-lg bg-[#C8E6C9] text-lg select-none relative"
              onMouseEnter={() => setShowHoverBox(true)}
              onMouseLeave={() => setShowHoverBox(false)}
            >
              🌳
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{title}</h2>
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
          }));
          setPosts(mapped);
        }
      });
  }, []);

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
        />
      ))}
    </div>
  );
}
