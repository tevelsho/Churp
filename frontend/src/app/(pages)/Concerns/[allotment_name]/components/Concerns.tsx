  'use client';
  import React, { useState, useEffect } from 'react';
  import { TbArrowBigUp, TbArrowBigUpFilled, TbArrowBigDown, TbArrowBigDownFilled } from 'react-icons/tb';
  import { FaRegComments, FaShare, FaRegBookmark, FaBookmark } from 'react-icons/fa6';

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
    allotmentName: string;
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
    const [currentUpvotes, setCurrentUpvotes] = useState(initialUpvotes);
    const [isSaved, setIsSaved] = useState(initialSaved);
    const [upvoteStatus, setUpvoteStatus] = useState<'upvoted' | 'downvoted' | null>(null);

    const handleUpvote = () => {
      if (upvoteStatus === 'upvoted') {
        setCurrentUpvotes(prev => prev - 1);
        setUpvoteStatus(null);
      } else if (upvoteStatus === 'downvoted') {
        setCurrentUpvotes(prev => prev + 2);
        setUpvoteStatus('upvoted');
      } else {
        setCurrentUpvotes(prev => prev + 1);
        setUpvoteStatus('upvoted');
      }
    };

    const handleDownvote = () => {
      if (upvoteStatus === 'downvoted') {
        setCurrentUpvotes(prev => prev + 1);
        setUpvoteStatus(null);
      } else if (upvoteStatus === 'upvoted') {
        setCurrentUpvotes(prev => prev - 2);
        setUpvoteStatus('downvoted');
      } else {
        setCurrentUpvotes(prev => prev - 1);
        setUpvoteStatus('downvoted');
      }
    };

    const handleSaveToggle = () => {
      setIsSaved(prev => !prev);
    };
    // suggest using something more verbose like dispute_is for easier search
    const handlePostClick = () => {
      window.location.href = `/Concerns/${allotmentName}/${id}`;
    };

    return (
      <div className="rounded-md overflow-hidden border border-gray-200 mb-6 hover:cursor-pointer" onClick={handlePostClick}>
        <div className="flex items-center p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 flex-grow">
            {communityIcon && (
              <img src={communityIcon} alt="Community Icon" className="w-5 h-5 rounded-full" />
            )}
            <span className="text-sm font-semibold text-gray-800">{communityName}</span>
            <span className="text-xs text-gray-500">• {postTime}</span>
            {/* {visitStatus && (
              <span className="text-xs text-gray-500 hidden sm:block">• {visitStatus}</span>
            )} */}
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-lg">
              👀
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-700 text-sm leading-relaxed">
          <p>{content}</p>
        </div>

        <div className="flex items-center p-3 sm:p-4 border-t border-gray-200 space-x-2 sm:space-x-4">
          <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-1">
            <button
              onClick={handleUpvote}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              {upvoteStatus === 'upvoted' ? (
                <TbArrowBigUpFilled className="h-4 w-4 text-gray-500" />
              ) : (
                <TbArrowBigUp className="h-4 w-4 text-gray-500" />
              )}
            </button>
            <span className="text-sm font-semibold text-gray-800">{currentUpvotes}</span>
            <button
              onClick={handleDownvote}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              {upvoteStatus === 'downvoted' ? (
                <TbArrowBigDownFilled className="h-4 w-4 text-gray-500" />
              ) : (
                <TbArrowBigDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>

          <button className="flex items-center space-x-1 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200">
            <FaRegComments className="h-4 w-4" />
            <span className="text-sm font-semibold">{comments}</span>
          </button>

          <button
            onClick={handleSaveToggle}
            className="flex items-center space-x-1 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          >
            {isSaved ? (
              <FaBookmark className="h-4 w-4" />
            ) : (
              <FaRegBookmark className="h-4 w-4" />
            )}
            <span className="text-sm font-semibold">Save</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200">
            <FaShare className="h-4 w-4" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>
      </div>
    );
  }

  export default function Concerns({ allotmentName }: ConcernsProps) {
    // const dummyPosts: RedditPostProps[] = [
    //   {
    //     id: 'Some Complain', 
    //     communityIcon: 'https://placehold.co/20x20/4CAF50/fff?text=CG',
    //     communityName: 'User',
    //     postTime: '3 hr. ago',
    //     title: 'Ongoing Dispute Over Community Garden Plot Boundaries',
    //     content: `I'm a long-time member of the Sunshine Community Garden, and lately, there's been a persistent issue with plot boundaries. My plot (C-12) keeps getting encroached upon by my neighbor's plants, despite clear markers. I've tried speaking with them, but the issue continues. It's affecting my harvest and overall enjoyment. Is there a garden committee or a formal dispute resolution process I can follow? This is getting really frustrating.`,
    //     initialUpvotes: 45,
    //     comments: 18,
    //     initialSaved: false,
    //   },
    // ];
      const [posts, setPosts] = useState<RedditPostProps[]>([]);
    const [loading, setLoading] = useState(true);
    // for now we can leave it like this, but this code here can just reference a function in backend. 
    // just need to create a server action .ts file
    // can refer to this https://github.com/diwosuwanto/cloudflare-r2-with-nextjs-upload-download-delete/tree/main/src
    useEffect(() => {
      fetch('/bidackend/concerns')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            // Map Supabase data to RedditPostProps
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
          } else {
            console.error('Invalid data:', data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setLoading(false);
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
            // visitStatus={post.visitStatus}
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
