'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaShareAlt } from 'react-icons/fa';
import { usePathname, useParams } from 'next/navigation';
import { IoReload } from "react-icons/io5";
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
  const [showReplyBox, setShowReplyBox] = useState(false); 
  const [replyText, setReplyText] = useState(''); 


  //Share button
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin;
  const fullUrl = origin + pathname;
  const [copied, setCopied] = useState(false);

  //twilio
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [message, setMessage] = useState('');
  type SubmissionWithUser = {
    id: number;
    user: {
      mobilenumber: string;
    };
  };

  //button change
  const [button, changeButton] = useState<'form' | 'code'>('form');

  const sendOTP = async () => {
    setMessage('');
    // console.log(submission_id)
    // Step 1: Fetch mobilenumber using submissionId
    const { data, error } = await supabase
    .from('submission')
    .select(`id, user (mobilenumber)`)
    .eq('id', submission_id)
    .single<SubmissionWithUser>(); 
    let phone = data?.user?.mobilenumber?.replace(/\D/g, ''); // remove all non-digit characters

    if (!phone || phone.length !== 8) {
      setMessage('Invalid Singapore mobile number.');
      return;
    }
    phone = `+65${phone}`;
    // console.log(phone)
    setPhone(phone)

    // Step 2: Send OTP
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const responseData = await res.json().catch(() => ({})); // handle no JSON

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
      } else {
        setMessage(data.message || 'Verification failed.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
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

  return (
    <div className="mb-6">
      <div className="flex items-center mb-1 pl-1">
        <div className="w-5 h-5 mr-2"></div>
        <img src={authorIcon} alt="Author Icon" className="w-5 h-5 rounded-full mr-2" />
        <span className="text-sm font-semibold text-gray-800 mr-2">{admin_id}</span>
        <span className="text-xs text-gray-500 mr-3">{`• ${postTime}`}</span>
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap bg-red-100 text-red-700">
          {ack_status || 'No title'}
        </span>
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

            <button
              onClick={() => setShowReplyBox(prev => !prev)}
              className="flex items-center space-x-2 text-white bg-[#4A61C0] rounded-md px-4 py-2 hover:bg-[#3b4e9a]"
            >
              <span className="text-sm font-semibold">Reply</span>
            </button>
          </div>

          {showReplyBox && (
            <div className="pl-1 mt-4" style={{ marginLeft: '28px' }}>
              <textarea
                rows={3}
                className="w-full p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0]"
                placeholder="Write your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex items-center space-x-2 mt-3 max-w-screen-xs">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] text-sm max-w-[120px]"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                    className="bg-[#4A61C0] text-white text-sm px-4 py-2 rounded-md hover:bg-[#3b4e9a]"
                    onClick={button === 'form' ? sendOTP : verifyOTP}
                  >
                    {button === 'form' ? 'Get OTP' : 'Verify OTP'}
                  </button>
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <IoReload className="text-[#4A61C0] h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Reply() {
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

            return {
              authorIcon: "https://placehold.co/20x20/808080/fff?text=U",
              id: response.id,
              submission_id: response.submission_id,
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
