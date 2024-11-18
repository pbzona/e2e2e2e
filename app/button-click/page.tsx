/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { toggleLike } from '@/app/actions';
import Link from 'next/link';

export default function ButtonClickPage() {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const result = await toggleLike(liked);
    console.log('Result:', result);
    setLiked(result.liked);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Button Click Example</h1>
      <div className="mb-6 space-y-4">
        <p>
          This example shows how to invoke a server action when a button is clicked. The
          `toggleLike` server action is called directly from the click event handler.
        </p>
        <p>
          When the button is clicked, the `handleLike` function is called, which invokes the
          `toggleLike` server action. The component's state is then updated based on the result
          returned from the server action.
        </p>
        <p>
          Check out the{' '}
          <Link
            href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#event-handlers"
            className="underline text-blue-600"
          >
            docs
          </Link>{' '}
          for more information.
        </p>
      </div>
      <button
        onClick={handleLike}
        id="likeButton"
        className={`px-4 py-2 rounded ${liked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
      <div className="mt-4">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
