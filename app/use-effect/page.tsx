/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { fetchUserData } from '@/app/actions';
import Link from 'next/link';

export default function UseEffectPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetchUserData('456').then(setUser);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useEffect Example</h1>
      <div className="mb-6">
        <p>
          This example demonstrates how to use a server action within a `useEffect` hook to fetch
          data when the component mounts.
        </p>
        <p className="mt-4">
          The `fetchUserData` server action is called inside the `useEffect` hook when the component
          mounts. The returned data is then used to update the component's state, causing a
          re-render with the fetched user data.
        </p>
      </div>
      {user ? (
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="mt-4">
        <Link
          href="/"
          className="text-blue-500 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
