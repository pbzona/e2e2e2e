/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { submitFeedback } from '@/app/actions';
import Link from 'next/link';

export default function FormSubmissionPage() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const result = await submitFeedback(formData);
    setMessage(result.message);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Form Submission Example</h1>
      <div className="mb-6">
        <p>
          This example demonstrates how to use a server action with a form submission. The form uses
          the `action` prop to specify the server action to be called when the form is submitted.
        </p>

        <p className="mt-4">
          The `submitFeedback` server action is called automatically when the form is submitted. The
          result is then used to update the component's state, displaying a success message to the
          user.
        </p>
      </div>
      <form
        action={handleSubmit}
        className="mb-6"
      >
        <textarea
          name="feedback"
          placeholder="Enter your feedback"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Feedback
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      <Link
        href="/"
        className="text-blue-500 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
}
