'use client';
import React, { useState } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaCommentAlt, FaShareAlt, FaBookmark } from 'react-icons/fa';

interface RedditPostProps {
  communityIcon: string;
  communityName: string;
  postTime: string;
  visitStatus?: string;
  title: string;
  content: string;
  initialUpvotes: number;
  comments: number;
  initialSaved: boolean;
  id: string;
}

function RedditPost({
  communityIcon,
  communityName,
  postTime,
  content,
  initialUpvotes,
  comments,
  initialSaved,
}: RedditPostProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

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

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="max-w-screen-xl flex items-center relative">
          <div className="flex items-center mb-4 space-x-2 flex-grow">
            {communityIcon && (
              <img src={communityIcon} alt="Community Icon" className="w-4 h-4 rounded-full" />
            )}
            <span className="text-sm font-semibold text-gray-800">{communityName}</span>
            <span className="text-xs text-gray-500">• {postTime}</span>
          </div>
        </div>

        <div className="pb-3 sm:pb-4 text-gray-700 text-sm leading-relaxed">
          <p>{content}</p>
        </div>

        <div className="flex items-center space-x-3 ">
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

export default function Concerns() {
  const dummyPosts: RedditPostProps[] = [
    {
      id: 'community-garden-plot-dispute-1',
      communityIcon: 'https://placehold.co/20x20/4CAF50/fff?text=CG',
      communityName: 'Alice Chen',
      postTime: '2 days ago',
      title: 'Ongoing Dispute Over Community Garden Plot Boundaries',
      content: `I'm a long-time member of the Sunshine Community Garden, and lately, there's been a persistent issue with plot boundaries. My plot (C-12) keeps getting encroached upon by my neighbor's plants, despite clear markers. I've tried speaking with them, but the issue continues. It's affecting my harvest and overall enjoyment. Is there a garden committee or a formal dispute resolution process I can follow? This is getting really frustrating.`,
      initialUpvotes: 45,
      comments: 18,
      initialSaved: false,
    },
  ];

  return (
    <div className="w-full font-inter">
      {dummyPosts.map((post, index) => (
        <RedditPost
          key={index}
          id={post.id}
          communityIcon={post.communityIcon}
          communityName={post.communityName}
          postTime={post.postTime}
          visitStatus={post.visitStatus}
          title={post.title}
          content={post.content}
          initialUpvotes={post.initialUpvotes}
          comments={post.comments}
          initialSaved={post.initialSaved}
        />
      ))}
    </div>
  );
}
