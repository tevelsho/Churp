'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaShareAlt, FaBookmark } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { usePathname, useParams } from 'next/navigation';




interface ReplyData {
  authorIcon: string,
  id: string;
  admin_id: string;
  postTime: string;
  content: string;
  imageUrl: string;
  likes: number;
  dislikes: number;
  ack_status: string;
  flagged: string;
}

// const dummyReplies: ReplyData[] = [
//   {
//     id: '1',
//     author: 'RN (Jamie)',
//     postTime: '1 hr ago',
//     title: 'Update on signage system',
//     content: `Also, just to follow up, we're currently working on a clearer, standardized signage system for all boundary markers to prevent future conflicts like this. We're also drafting a quick-reference guide for informal conflict resolution steps before it escalates. Thanks again for helping us improve the space for everyone!`,
//     indentationLevel: 1,
//     authorIcon: 'https://placehold.co/20x20/6A1B9A/fff?text=JA',
//     initialUpvotes: 12,
//     initialSaved: false,
//   },
//   {
//     id: '2',
//     author: 'RN (Alex)',
//     postTime: '8 hr ago',
//     title: 'Boundary markers clarified',
//     content: `Hi! Thanks for raising this! We've looked into your concern regarding plot C-12. We've since clarified boundary markers with both parties, and a committee member personally met with your neighbour to realign their plot. The encroaching plants have been trimmed back as of this morning. Let us know if you notice any further issues.`,
//     indentationLevel: 2,
//     authorIcon: 'https://placehold.co/20x20/0D47A1/fff?text=AX',
//     initialUpvotes: 27,
//     initialSaved: true,
//   },
// ];

function ReplyCard({
  authorIcon,
  id,
  admin_id,
  postTime,
  content,
  imageUrl,
  likes,
  dislikes,
  ack_status,
  flagged
}: ReplyData) {
  const [collapsed, setCollapsed] = useState(false);
  const [upvotes, setUpvotes] = useState(likes);
  const [downvotes, setDownvotes] = useState(dislikes);
  // const [isSaved, setIsSaved] = useState(initialSaved);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin;
  const fullUrl = origin + pathname 
  const [copied, setCopied] = useState(false);
  
  
  const handleCopy = () => {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
  
      // Reset back to "Share" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    };

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

  // const handleSaveToggle = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setIsSaved(prev => !prev);
  // };

  return (
    <div className="mb-6">
      {/* Main content with arrow and profile pic on same axis */}
      <div className="flex items-center mb-1 pl-1">
        {/* Arrow button or spacer */}
        <div className="flex items-center justify-center w-5 h-5 mr-2">
          {/* {indentationLevel > 0 && (
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
          )} */}
        </div>
        
        <img src={authorIcon} alt="Author Icon" className="w-5 h-5 rounded-full mr-2" />
        <span className="text-sm font-semibold text-gray-800 mr-2">{admin_id}</span>
        <span className="text-xs text-gray-500 mr-3">{`• ${postTime}`}</span>

        {/* Title inline when collapsed or expanded */}
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap bg-red-100 text-red-700">
          {ack_status || 'No title'}
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

            {/* <button
              onClick={handleSaveToggle}
              className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              <FaBookmark className={`h-4 w-4 ${isSaved ? 'text-[#4A61C0]' : 'text-gray-400'}`} />
              <span className="text-sm font-semibold">Save</span>
            </button> */}

            <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200" onClick={handleCopy}>
              <FaShareAlt className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-semibold">{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Reply() {
  const params = useParams();
  const { id } = params as {  id: string };
  const [responses, setResponse] = useState<ReplyData[]>([]);
  useEffect(() => {
    fetch(`/backend/responses?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((response: any) => {
            // Default fallback 
            let cleanedUrl = '';
            
  
            //decoding the image_url from supabase to load image on frontend
            try {
              if (response.image_urls) {
                const decoded = decodeURIComponent(response.image_urls);
                const parsed = JSON.parse(decoded);
                if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
                  cleanedUrl = parsed[0];
                }
              }
            } catch (e) {
              console.warn('Invalid image_url:', response.image_urls);
            }
  
            //mapping from supabase to each post
            return {
             
              authorIcon: "https://placehold.co/20x20/808080/fff?text=U",
              id: response.id,
              admin_id: response.user?.username,
              postTime: response.created_at,
              content: response.message,
              imageUrl: response.image_urls,
              likes: response.likes,
              dislikes: response.dislikes,
              ack_status: response.ack_status,
              flagged: response.flagged
            };
          });
  
          setResponse(mapped);
        }
      });
  }, []);


  return (
    <div className="mt-6">
      {responses.map(reply => (
        <ReplyCard key={reply.id} {...reply} />
      ))}
    </div>
  );
}