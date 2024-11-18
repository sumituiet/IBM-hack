"use client";
import { useState } from 'react';
import { supabase } from '../../_lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else router.push('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
            
            <div className="w-full max-w-sm bg-gray-800 rounded-lg p-8 shadow-lg bg-australia">
            <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                >
                    Login
                </button>
                
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                
                <button
                    onClick={() => router.push('/signup')}
                    className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                >
                    Sign up
                </button>
                <button
                    onClick={() => router.push('/forgot-password')}
                    className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                >
                    Reset password
                </button>
                

            </div>
        </div>
    );
}
