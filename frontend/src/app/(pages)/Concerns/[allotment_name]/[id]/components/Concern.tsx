'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaCommentAlt, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { useParams } from 'next/navigation';

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
  imageUrl?: string;
}

function RedditPost({
  communityIcon,
  communityName,
  postTime,
  content,
  initialUpvotes,
  comments,
  initialSaved,
  imageUrl
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
  const params = useParams();
  const { allotment_name, id } = params as { allotment_name: string; id: string };
  const [newPost, setPost] = useState<RedditPostProps | null>(null);

  useEffect(() => {
  

  fetch(`/backend/concern?allotmentName=${decodeURIComponent(allotment_name)}&id=${id}`)
    .then((res) => res.json())
    .then((post) => {
      if (post) {
        let cleanedUrl = '';

        try {
          if (post.image_url) {
            const decoded = decodeURIComponent(post.image_url);
            const parsed = JSON.parse(decoded);
            if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
              cleanedUrl = parsed[0];
            }
          }
        } catch (e) {
          console.warn('Invalid image_url:', post.image_url);
        }

        const mappedPost = {
          communityIcon: post.community_icon,
          communityName: post.community_name,
          postTime: new Date(post.created_at).toLocaleString(),
          title: post.title,
          content: post.content,
          initialUpvotes: post.upvotes ?? 0,
          comments: post.comments_count ?? 0,
          initialSaved: post.saved ?? false,
          id: post.id,
          imageUrl: cleanedUrl,
        };

        setPost(mappedPost);
      }
    })
    .catch((err) => {
      console.error('Error fetching post:', err);
    });
}, [allotment_name, id]);

  // const dummyPosts: RedditPostProps[] = [
    // {
    //   id: 'community-garden-plot-dispute-1',
    //   communityIcon: 'https://placehold.co/20x20/4CAF50/fff?text=CG',
    //   communityName: 'Alice Chen',
    //   postTime: '2 days ago',
    //   title: 'Ongoing Dispute Over Community Garden Plot Boundaries',
    //   content: `I'm a long-time member of the Sunshine Community Garden, and lately, there's been a persistent issue with plot boundaries. My plot (C-12) keeps getting encroached upon by my neighbor's plants, despite clear markers. I've tried speaking with them, but the issue continues. It's affecting my harvest and overall enjoyment. Is there a garden committee or a formal dispute resolution process I can follow? This is getting really frustrating.`,
    //   initialUpvotes: 45,
    //   comments: 18,
    //   initialSaved: false,
    // },
  // ];

  return (
    <div className="w-full font-inter">
    {newPost && (
      <RedditPost
        id={newPost.id}
        communityIcon={newPost.communityIcon}
        communityName={newPost.communityName}
        postTime={newPost.postTime}
        visitStatus={newPost.visitStatus}
        title={newPost.title}
        content={newPost.content}
        initialUpvotes={newPost.initialUpvotes}
        comments={newPost.comments}
        initialSaved={newPost.initialSaved}
        imageUrl={newPost.imageUrl}
      />
    )}
  </div>
  );
}
