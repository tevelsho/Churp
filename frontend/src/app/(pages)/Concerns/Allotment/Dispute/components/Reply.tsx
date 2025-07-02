'use client';
import React, { useState } from 'react';
import { TbArrowBigUp, TbArrowBigUpFilled, TbArrowBigDown, TbArrowBigDownFilled } from 'react-icons/tb';
import { FaShare, FaRegBookmark } from 'react-icons/fa6';

interface ReplyData {
  id: string;
  author: string;
  postTime: string;
  content: string;
  indentationLevel: number;
  authorIcon?: string;
}

const dummyReplies: ReplyData[] = [
  {
    id: '1',
    author: 'RN (Jamie)',
    postTime: '2 hr ago',
    content: `Also, just to follow up, we're currently working on a clearer, standardized signage system for all boundary markers to prevent future conflicts like this. We’re also drafting a quick-reference guide for informal conflict resolution steps before it escalates. Thanks again for helping us improve the space for everyone!`,
    indentationLevel: 1,
    authorIcon: 'https://placehold.co/20x20/6A1B9A/fff?text=JA',
  },
  {
    id: '2',
    author: 'RN (Alex)',
    postTime: '1 hr ago',
    content: `Hi! Thanks for raising this! We’ve looked into your concern regarding plot C-12. We've since clarified boundary markers with both parties, and a committee member personally met with your neighbour to realign their plot. The encroaching plants have been trimmed back as of this morning. Let us know if you notice any further issues.`,
    indentationLevel: 2,
    authorIcon: 'https://placehold.co/20x20/0D47A1/fff?text=AX',
  },
];

function ReplyCard({
  author,
  postTime,
  content,
  indentationLevel,
  authorIcon = 'https://placehold.co/20x20/808080/fff?text=U',
}: ReplyData) {
  const [upvoteStatus, setUpvoteStatus] = useState<'upvoted' | 'downvoted' | null>(null);
  const [currentUpvotes, setCurrentUpvotes] = useState(0);

  const handleUpvote = () => {
    if (upvoteStatus === 'upvoted') {
      setCurrentUpvotes(p => p - 1);
      setUpvoteStatus(null);
    } else if (upvoteStatus === 'downvoted') {
      setCurrentUpvotes(p => p + 2);
      setUpvoteStatus('upvoted');
    } else {
      setCurrentUpvotes(p => p + 1);
      setUpvoteStatus('upvoted');
    }
  };

  const handleDownvote = () => {
    if (upvoteStatus === 'downvoted') {
      setCurrentUpvotes(p => p + 1);
      setUpvoteStatus(null);
    } else if (upvoteStatus === 'upvoted') {
      setCurrentUpvotes(p => p - 2);
      setUpvoteStatus('downvoted');
    } else {
      setCurrentUpvotes(p => p - 1);
      setUpvoteStatus('downvoted');
    }
  };

  const indentPx = indentationLevel * 60;

  return (
    <div className="relative mb-6 pl-2" style={{ marginLeft: `${indentPx}px` }}>
      {indentationLevel > 0 && (
        <div
          className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gray-300"
          style={{ height: 'calc(100% + 16px)' }}
        />
      )}
      <div className="flex items-center space-x-2 mb-2">
        <img src={authorIcon} alt="Author Icon" className="w-5 h-5 rounded-full" />
        <span className="text-sm font-semibold text-gray-800">{author}</span>
        <span className="text-xs text-gray-500">• {postTime}</span>
      </div>

      <div className="text-sm text-gray-700 mb-2">
        {content}
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <button onClick={handleUpvote}>
            {upvoteStatus === 'upvoted' ? (
              <TbArrowBigUpFilled className="h-4 w-4 text-gray-500" />
            ) : (
              <TbArrowBigUp className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <span>{currentUpvotes}</span>
          <button onClick={handleDownvote}>
            {upvoteStatus === 'downvoted' ? (
              <TbArrowBigDownFilled className="h-4 w-4 text-gray-500" />
            ) : (
              <TbArrowBigDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        <button className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 rounded-full px-2 py-1">
          <FaRegBookmark className="h-4 w-4" />
          <span>Save</span>
        </button>

        <button className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 rounded-full px-2 py-1">
          <FaShare className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
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
