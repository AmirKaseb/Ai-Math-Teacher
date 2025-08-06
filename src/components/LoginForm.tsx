import React, { useState } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { AlertCircle, Loader2, Mail } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface LoginFormProps {
  onSignIn: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSignIn, error: googleError, isLoading }) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [basicAuthLoading, setBasicAuthLoading] = useState(false);

  const handleBasicLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBasicAuthLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      console.error('Basic auth error:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to sign in');
      } else {
        setError('Failed to sign in');
      }
    } finally {
      setBasicAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all hover:scale-105">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to AI Chat
              </h1>
              <p className="mt-2 text-gray-600">
                Sign in to start your conversation with AI
              </p>
            </div>

            {(error || googleError) && (
              <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error || googleError}</p>
              </div>
            )}

            <form onSubmit={handleBasicLogin} className="w-full space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={basicAuthLoading}
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={basicAuthLoading}
                />
              </div>
              <button
                type="submit"
                disabled={basicAuthLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:opacity-90 transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {basicAuthLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {basicAuthLoading ? 'Signing in...' : 'Sign in with Email'}
                </span>
              </button>
            </form>

            <div className="w-full flex items-center gap-4 my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={onSignIn}
              disabled={isLoading}
              className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-xl hover:bg-gray-50 transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
              )}
              <span className="font-medium">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};