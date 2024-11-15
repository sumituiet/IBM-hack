// src/app/forgot-password/page.js
"use client";

import { useState } from 'react';
import { supabase } from '../../_lib/supabaseClient';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setMessage('Password reset email sent!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Reset Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <button onClick={handleResetPassword} className="btn">Send Reset Link</button>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
