'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaShareAlt } from 'react-icons/fa';
import { usePathname, useParams } from 'next/navigation';
import { supabase } from '../../../../../backend/lib/supabaseClient';

interface ReplyData {
  authorIcon: string,
  id: string;
  submission_id: string;
  admin_id: string;
  postTime: string;
  content: string;
  imageUrl: string;
  likes: number;
  dislikes: number;
  ack_status: string;
  flagged: string;
}

function ReplyCard({
  authorIcon,
  id,
  submission_id,
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
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);


  //Share button
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin;
  const fullUrl = origin + pathname;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
  
    if (upvoted) {
      setUpvotes(prev => prev - 1);
      setUpvoted(false);
  
      const { error } = await supabase
        .from('response')
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
        .from('response')
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
        .from('response')
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
        .from('response')
        .update({
          dislikes: newDownvotes,
          likes: newUpvotes,
        })
        .eq('id', id);
  
      if (error) console.error('Failed to update dislikes/upvotes:', error.message);
    }
  };
  return (
    <div className="mb-6">
      <div className="flex items-center mb-1 pl-1">
        <div className="w-5 h-5 mr-2"></div>
        <img src={authorIcon} alt="Author Icon" className="w-5 h-5 rounded-full mr-2" />
        <span className="text-sm font-semibold text-gray-800 mr-2">{admin_id}</span>
        <span className="text-xs text-gray-500 mr-3">{`• ${postTime}`}</span>
      </div>

      {!collapsed && (
        <>
          <div className="text-sm text-gray-700 whitespace-pre-wrap mt-4 mb-4 pl-1" style={{ marginLeft: '28px' }}>
            {content}
          </div>

          <div className="flex items-center space-x-3 pl-1" style={{ marginLeft: '28px' }}>
            <button
              onClick={handleUpvote}
              className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200"
            >
              <IoMdThumbsUp className={`h-4 w-4 ${upvoted ? 'text-[#4A61C0]' : 'text-gray-600'}`} />
              <span className="text-sm font-semibold text-gray-800">{upvotes}</span>
            </button>

            <button
              onClick={handleDownvote}
              className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200"
            >
              <IoMdThumbsDown className={`h-4 w-4 ${downvoted ? 'text-[#4A61C0]' : 'text-gray-600'}`} />
              <span className="text-sm font-semibold text-gray-800">{downvotes}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200"
            >
              <FaShareAlt className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-semibold">{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Reply({ trigger }: { trigger: boolean }) {
  const params = useParams();
  const { id } = params as { id: string };
  const [responses, setResponse] = useState<ReplyData[]>([]);

  useEffect(() => {
    fetch(`/backend/responses?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((response: any) => {
            let cleanedUrl = '';
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
            const formattedTime = new Date(response.created_at).toLocaleString('en-SG', {
                timeZone: 'Asia/Singapore',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              });

            return {
              authorIcon: "https://placehold.co/20x20/808080/fff?text=U",
              id: response.id,
              submission_id: response.submission_id,
              admin_id: response.user?.username,
              postTime: formattedTime,
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
  }, [trigger]);

  return (
    <div className="mt-6">
      {responses.map(reply => (
        <ReplyCard key={reply.id} {...reply} />
      ))}
    </div>
  );
}
