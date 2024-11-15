"use client";
import { useState } from 'react';
import { supabase } from '../../_lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isConfirmationSent, setIsConfirmationSent] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setError(null); // Clear previous errors
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            setIsConfirmationSent(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
            
            <div className="w-full max-w-sm bg-white rounded-lg p-8 shadow-lg">
                {isConfirmationSent ? (
                    <div className="text-center">
                        <h2 className="text-lg font-semibold mb-4">Confirmation Required</h2>
                        <p className="mb-4 text-gray-700">
                            Please check your email and confirm your account to complete the registration.
                        </p>
                        <button 
                            onClick={() => router.push('/login')}
                            className="mt-4 w-full py-2 bg-yellow text-black font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
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
                            onClick={handleSignup}
                            className="w-full py-2 bg-yellow text-black font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                        >
                            Sign Up
                        </button>
                        
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </>
                )}

                {!isConfirmationSent && (
                    <p className="mt-4 text-gray-700">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">Login</a>
                    </p>
                )}
            </div>
        </div>
    );
}
