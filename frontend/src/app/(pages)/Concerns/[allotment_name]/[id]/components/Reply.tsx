'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaShareAlt, FaBookmark } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

interface ReplyData {
  id: string;
  author: string;
  postTime: string;
  content: string;
  indentationLevel: number;
  authorIcon?: string;
  initialUpvotes?: number;
  initialSaved?: boolean;
  title?: string;
}

const dummyReplies: ReplyData[] = [
  {
    id: '1',
    author: 'RN (Jamie)',
    postTime: '1 hr ago',
    title: 'Update on signage system',
    content: `Also, just to follow up, we're currently working on a clearer, standardized signage system for all boundary markers to prevent future conflicts like this. We're also drafting a quick-reference guide for informal conflict resolution steps before it escalates. Thanks again for helping us improve the space for everyone!`,
    indentationLevel: 1,
    authorIcon: 'https://placehold.co/20x20/6A1B9A/fff?text=JA',
    initialUpvotes: 12,
    initialSaved: false,
  },
  {
    id: '2',
    author: 'RN (Alex)',
    postTime: '8 hr ago',
    title: 'Boundary markers clarified',
    content: `Hi! Thanks for raising this! We've looked into your concern regarding plot C-12. We've since clarified boundary markers with both parties, and a committee member personally met with your neighbour to realign their plot. The encroaching plants have been trimmed back as of this morning. Let us know if you notice any further issues.`,
    indentationLevel: 2,
    authorIcon: 'https://placehold.co/20x20/0D47A1/fff?text=AX',
    initialUpvotes: 27,
    initialSaved: true,
  },
];

function ReplyCard({
  author,
  postTime,
  content,
  indentationLevel,
  authorIcon = 'https://placehold.co/20x20/808080/fff?text=U',
  initialUpvotes = 0,
  initialSaved = false,
  title = '',
}: ReplyData) {
  const [collapsed, setCollapsed] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);

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
    <div className="mb-6">
      {/* Main content with arrow and profile pic on same axis */}
      <div className="flex items-center mb-1 pl-1">
        {/* Arrow button or spacer */}
        <div className="flex items-center justify-center w-5 h-5 mr-2">
          {indentationLevel > 0 && (
            <button
              onClick={toggleCollapse}
              aria-expanded={!collapsed}
              aria-label={`${collapsed ? 'Expand' : 'Collapse'} reply`}
              className="flex items-center justify-center transition-transform duration-300 w-5 h-5"
              style={{
                fontSize: '1.3rem',
                color: '#B0B0B0',
                transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
              }}
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>
        
        <img src={authorIcon} alt="Author Icon" className="w-5 h-5 rounded-full mr-2" />
        <span className="text-sm font-semibold text-gray-800 mr-2">{author}</span>
        <span className="text-xs text-gray-500 mr-3">{`• ${postTime}`}</span>

        {/* Title inline when collapsed or expanded */}
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap bg-red-100 text-red-700">
          {title || 'No title'}
        </span>
      </div>

      {/* Content and buttons only visible if expanded */}
      {!collapsed && (
        <>
          <div className="text-sm text-gray-700 whitespace-pre-wrap mt-4 mb-4 pl-1" 
               style={{ marginLeft: '28px' }}>
            {content}
          </div>

          <div className="flex items-center space-x-3 pl-1" 
               style={{ marginLeft: '28px' }}>
            <button
              onClick={handleUpvote}
              className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              <IoMdThumbsUp className={`h-4 w-4 ${upvoted ? 'text-[#4A61C0]' : 'text-gray-400'}`} />
              <span className="text-sm font-semibold text-gray-800">{upvotes}</span>
            </button>

            <button
              onClick={handleDownvote}
              className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              <IoMdThumbsDown className={`h-4 w-4 ${downvoted ? 'text-[#4A61C0]' : 'text-gray-400'}`} />
              <span className="text-sm font-semibold text-gray-800">{downvotes}</span>
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
        </>
      )}
    </div>
  );
}

export default function Reply() {
  return (
    <div className="mt-6">
      {dummyReplies.map(reply => (
        <ReplyCard key={reply.id} {...reply} />
      ))}
    </div>
  );
}