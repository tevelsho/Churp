'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaCommentAlt, FaShareAlt } from 'react-icons/fa';
import { IoReload } from "react-icons/io5";
import { usePathname, useParams } from 'next/navigation';
import { supabase } from '../../../../../backend/lib/supabaseClient';

interface RedditPostProps {
  randomUserName: string;
  postTime: string;
  title: string;
  content: string;
  initialUpvotes: number;
  comments: number;
  initialSaved: boolean;
  id: string;
  allotmentName?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
}

function RedditPost({
  randomUserName,
  postTime,
  title,
  content,
  initialUpvotes,
  comments,
  initialSaved,
  id,
  allotmentName,
  imageUrl,
  onButtonClick
}: RedditPostProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(0);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin;
  const fullUrl = origin + pathname;
  const [copied, setCopied] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [message, setMessage] = useState('');
  const [button, changeButton] = useState<'form' | 'code'>('form');

  type SubmissionWithUser = {
    id: number;
    user: {
      mobilenumber: string;
    };
  };

  const sendOTP = async () => {
    setMessage('');
    const { data, error } = await supabase
      .from('submission')
      .select(`id, user (mobilenumber)`)
      .eq('id', id)
      .single<SubmissionWithUser>();

    let phone = data?.user?.mobilenumber?.replace(/\D/g, '');

    if (!phone || phone.length !== 8) {
      setMessage('Invalid Singapore mobile number.');
      return;
    }
    phone = `+65${phone}`;
    setPhone(phone);

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const responseData = await res.json().catch(() => ({}));

      if (res.ok) {
        setStep('code');
        changeButton('code');
        setMessage('OTP sent!');
      } else {
        setMessage(responseData.message || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
    }
  };

  const verifyOTP = async () => {
    setMessage('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.verified) {
        setMessage('Phone verified successfully!');
        const { data: userData } = await supabase
          .from('submission')
          .select('user_id')
          .eq('id', id)
          .single();
        postReply(userData?.user_id);
      } else {
        setMessage(data.message || 'Verification failed.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const postReply = async (user_id: string) => {
    const res = await fetch('/backend/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission_id: id,
        admin_id: user_id,
        replyText: replyText,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Error posting reply:', data.error);
    } else {
      console.log('Reply posted successfully:', data);
    }
  };

  const verifyAndPostReply = async () => {
    setMessage('');
    try {
      const { data: userData, error } = await supabase
        .from('submission')
        .select('user_id')
        .eq('id', id)
        .single();

      if (error || !userData?.user_id) {
        setMessage('Failed to get user info.');
        return;
      }

      const postRes = await fetch('/backend/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: id,
          admin_id: userData.user_id,
          replyText: replyText,
        }),
      });

      const postResult = await postRes.json();

      if (!postRes.ok) {
        setMessage('Failed to post reply.');
        return;
      }

      setMessage('Reply submitted successfully!');
      setReplyText('');
      setCode('');
      setStep('phone');
      changeButton('form');
      if (onButtonClick) onButtonClick();

    } catch (err) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="max-w-screen-xl flex items-center relative">
          <div className="flex items-center mb-4 space-x-2 flex-grow">
            <span className="text-sm font-semibold text-gray-800">{randomUserName}</span>
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

        <div className="flex items-center space-x-3 flex-wrap md:flex-nowrap">
          <button onClick={handleUpvote} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <IoMdThumbsUp className={`h-4 w-4 ${upvoted ? 'text-[#4A61C0]' : 'text-gray-600'}`} />
            <span className="text-sm font-semibold text-gray-800">{upvotes}</span>
          </button>

          <button onClick={handleDownvote} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <IoMdThumbsDown className={`h-4 w-4 ${downvoted ? 'text-[#4A61C0]' : 'text-gray-600'}`} />
            <span className="text-sm font-semibold text-gray-800">{downvotes}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200">
            <FaCommentAlt className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold">{comments}</span>
          </button>

          <button onClick={handleCopy} className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200">
            <FaShareAlt className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold">{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => setShowReplyBox(prev => !prev)}
            className="flex items-center space-x-2 text-white bg-[#4A61C0] rounded-md px-4 py-2 hover:bg-[#3b4e9a] mt-2 md:mt-0"
          >
            <span className="text-sm font-semibold">Reply</span>
          </button>
        </div>

        {showReplyBox && (
          <div className="pl-1 mt-4 md:pl-1 px-2">
            <textarea
              rows={3}
              className="w-full p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0]"
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex items-center space-x-2 mt-3 flex-wrap md:flex-nowrap">
              <input
                type="text"
                placeholder="Enter OTP"
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] text-sm max-w-[120px]"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="bg-[#4A61C0] text-white text-sm px-4 py-2 rounded-md hover:bg-[#3b4e9a]"
              >
                {button === 'form' ? 'Get OTP' : 'Verify OTP'}
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <IoReload className="text-[#4A61C0] h-4 w-4" />
              </button>
              <button
                className="bg-[#4A61C0] text-white text-sm px-4 py-2 rounded-md hover:bg-[#3b4e9a]"
              >
                By Pass button temporarily
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Concerns({ onButtonClick }: { onButtonClick: () => void }) {
  const params = useParams();
  const { allotment_name, id } = params as { allotment_name: string; id: string };
  const [newPost, setPost] = useState<RedditPostProps | null>(null);
  const adjectives = ['cool', 'brave', 'witty', 'fast', 'silent'];
  const nouns = ['panda', 'eagle', 'tiger', 'otter', 'fox'];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const anonymousUsername = `${randomAdj}-${randomNoun}-${randomNum}`;

  useEffect(() => {
    fetch(`/backend/concern?allotmentName=${decodeURIComponent(allotment_name)}&id=${id}`)
      .then((res) => res.json())
      .then((post) => {
        if (post) {
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

          const mappedPost = {
            randomUserName: "",
            postTime: post.publishedat,
            title: post.title,
            content: post.content,
            initialUpvotes: post.likes ?? 0,
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

  return (
    <div className="w-full font-inter">
      {newPost && (
        <RedditPost
          id={newPost.id}
          randomUserName={anonymousUsername}
          postTime={newPost.postTime}
          title={newPost.title}
          content={newPost.content}
          initialUpvotes={newPost.initialUpvotes}
          comments={newPost.comments}
          initialSaved={newPost.initialSaved}
          imageUrl={newPost.imageUrl}
          onButtonClick={onButtonClick}
        />
      )}
    </div>
  );
}
