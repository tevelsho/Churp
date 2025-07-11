'use client';
import React, { useState, useEffect } from 'react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { FaCommentAlt, FaShareAlt } from 'react-icons/fa';
import { usePathname, useParams } from 'next/navigation';
import { supabase } from '../../../../../backend/lib/supabaseClient';

interface RedditPostProps {
  authorIcon: string;
  randomUserName: string;
  postTime: string;
  title: string;
  content: string;
  initialUpvotes: number;
  initialDownvotes: number;
  comments: number;
  id: string;
  allotmentName?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
}

function RedditPost({
  authorIcon,
  randomUserName,
  postTime,
  content,
  initialUpvotes,
  initialDownvotes,
  comments,
  id,
  allotmentName,
  imageUrl,
  onButtonClick
}: RedditPostProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
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


  //This function verifies the phone number before sending otp to post author phone number
  const sendOTP = async () => {
  setMessage('');

  // Get user input phone number (already set in state)
  const userInput = phone.replace(/\D/g, ''); // strip non-digits

  if (userInput.length !== 8) {
    setMessage('Please enter a valid 8-digit SG phone number.');
    return;
  }

  // Step 1: Fetch phone number from Supabase
  const { data, error } = await supabase
    .from('submission')
    .select(`id, user (mobilenumber)`)
    .eq('id', id)
    .single<SubmissionWithUser>();

  if (error || !data?.user?.mobilenumber) {
    setMessage('Unable to verify phone number from database.');
    return;
  }

  const dbPhone = data.user.mobilenumber.replace(/\D/g, '');

  // Step 2: Compare entered vs stored
  if (userInput !== dbPhone) {
    setMessage('Entered phone number does not match our records.');
    return;
  }

  const fullPhone = `+65${dbPhone}`;
  setPhone(fullPhone);

  // Step 3: Send OTP
  try {
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: fullPhone }),
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


  //This function verifies 6 digit phone number sent to author
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

  //makes a comnment post when phone number is verified
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
      if (onButtonClick) onButtonClick();
      changeButton("form")
      setCode("")
      setPhone("")
      setReplyText("")
      console.log('Reply posted successfully:', data);
    }
  };

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
      .from('submission')
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
      .from('submission')
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
      .from('submission')
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
      .from('submission')
      .update({
        dislikes: newDownvotes,
        likes: newUpvotes,
      })
      .eq('id', id);

    if (error) console.error('Failed to update dislikes/upvotes:', error.message);
  }
};


  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="max-w-screen-xl flex items-center relative">
          <div className="flex items-center mb-4 space-x-2 flex-grow">
             {authorIcon && (
              <img src={authorIcon} alt="Community Icon" className="w-5 h-5 rounded-full" />
            )}
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

          <button className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200" 
          onClick={() => setShowReplyBox(prev => !prev)}>
            <FaCommentAlt className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold">{comments}</span>
          </button>

          <button onClick={handleCopy} className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200">
            <FaShareAlt className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold">{copied ? 'Copied!' : 'Share'}</span>
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
            {button === 'form' ? (
              <input
                type="text"
                placeholder="Enter phone number"
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] text-sm max-w-[160px]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              ) : (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] text-sm max-w-[120px]"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              )}
              <button
                className="bg-[#4A61C0] text-white text-sm px-4 py-2 rounded-md hover:bg-[#3b4e9a]"
               onClick={button === 'form' ? sendOTP : verifyOTP}
              >
                {button === 'form' ? 'Get OTP' : 'Comment'}
              </button>
              {/* Message display below OTP/Phone button */}
                {message && (
                  <div className="text-sm text-red-600 mt-2 px-1">
                    {message}
                  </div>
                )}
          
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

  const generateRandomUsername = () => {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const num = 1000 + Math.floor(Math.random() * 9000);
      return `${adj}-${noun}-${num}`;
    };

  function generateRandomAnimalIcon(): string {
  const animalIcons = [
    'https://cdn-icons-png.flaticon.com/512/616/616408.png', // Lion
    'https://cdn-icons-png.flaticon.com/512/616/616430.png', // Dog
    'https://cdn-icons-png.flaticon.com/512/616/616421.png', // Cat
    'https://cdn-icons-png.flaticon.com/512/616/616423.png', // Panda
    'https://cdn-icons-png.flaticon.com/512/616/616420.png', // Fox
    'https://cdn-icons-png.flaticon.com/512/616/616427.png', // Elephant
    'https://cdn-icons-png.flaticon.com/512/616/616428.png', // Koala
    'https://cdn-icons-png.flaticon.com/512/616/616429.png', // Bear
    'https://cdn-icons-png.flaticon.com/512/616/616431.png', // Owl
    'https://cdn-icons-png.flaticon.com/512/616/616426.png', // Tiger
  ];

  const randomIndex = Math.floor(Math.random() * animalIcons.length);
  return animalIcons[randomIndex]; // ✅ add this return
}

  useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await fetch(`/backend/concern?allotmentName=${decodeURIComponent(allotment_name)}&id=${id}`);
      const post = await res.json();

      if (post) {
        // Clean image URL
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

        // Format date
        const formattedTime = new Date(post.publishedat).toLocaleString('en-SG', {
          timeZone: 'Asia/Singapore',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        // Count responses from Supabase
        let responseCount = 0;
        const { count, error } = await supabase
          .from('response')
          .select('*', { count: 'exact', head: true })
          .eq('submission_id', post.id);

        if (error) {
          console.error('Error counting responses:', error.message);
        } else {
          responseCount = count ?? 0;
        }

        const mappedPost = {
          authorIcon: generateRandomAnimalIcon(),
          randomUserName: generateRandomUsername(),
          postTime: formattedTime,
          title: post.title,
          content: post.content,
          initialUpvotes: post.likes ?? 0,
          initialDownvotes: post.dislikes ?? 0,
          comments: responseCount,
          id: post.id,
          imageUrl: cleanedUrl,
          ack_status: post.ack_status,
        };

        setPost(mappedPost);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  fetchPost();
}, [allotment_name, id]);


  return (
    <div className="w-full font-inter">
      {newPost && (
        <RedditPost
          id={newPost.id}
          authorIcon={newPost.authorIcon}
          randomUserName={newPost.randomUserName}
          postTime={newPost.postTime}
          title={newPost.title}
          content={newPost.content}
          initialUpvotes={newPost.initialUpvotes}
          initialDownvotes={newPost.initialDownvotes}
          comments={newPost.comments}
          imageUrl={newPost.imageUrl}
          onButtonClick={onButtonClick}
        />
      )}
    </div>
  );
}
