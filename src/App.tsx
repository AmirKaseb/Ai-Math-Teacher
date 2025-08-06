import React, { useState, useCallback } from 'react';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Send, Loader2 } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { Sidebar } from './components/Sidebar';
import { LoginForm } from './components/LoginForm';

interface Message {
  text: string;
  isAi: boolean;
  timestamp: Date;
}

function App() {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signInWithGoogle = useCallback(async () => {
    if (isSigningIn) return;
    
    try {
      setIsSigningIn(true);
      setAuthError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      console.error('Auth error:', error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-blocked') {
          setAuthError('Popup was blocked. Please allow popups and try again.');
        } else if (error.code === 'auth/cancelled-popup-request') {
          setAuthError(null); // User cancelled, no need to show error
        } else {
          setAuthError('Failed to sign in. Please try again.');
        }
      } else {
        setAuthError('Failed to sign in. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  }, [isSigningIn]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setMessages([]);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    const userMessage: Message = {
      text: input,
      isAi: false,
      timestamp: new Date(),
    };

    try {
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          text: "I'm an AI assistant. How can I help you today?",
          isAi: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <LoginForm 
        onSignIn={signInWithGoogle} 
        error={authError}
        isLoading={isSigningIn}
      />
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={[]}
        onSelectChat={() => {}}
        onNewChat={() => {}}
        onSignOut={handleSignOut}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                message={msg.text}
                isAi={msg.isAi}
                timestamp={msg.timestamp}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;