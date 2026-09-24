import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { DatabaseService } from '../services/database';
import { SEO } from './SEO';

interface AuthFormProps {
  onSuccess: () => void;
  onSwitchToForgotPassword: () => void;
  onBack: () => void;
}

export function AuthForm({ onSuccess, onSwitchToForgotPassword, onBack }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      if (isLogin) {
        const result = await DatabaseService.signIn(email, password);
        if (result.success) {
          setSuccess('Successfully signed in!');
          setTimeout(() => {
            onSuccess();
          }, 1000);
        } else {
          setError(result.error || 'Sign in failed');
        }
      } else {
        const result = await DatabaseService.signUp(email, password, fullName);
        if (result.success) {
          setSuccess('Account created successfully! Please check your email to verify your account.');
          setTimeout(() => {
            setIsLogin(true);
            setSuccess('');
          }, 3000);
        } else {
          setError(result.error || 'Sign up failed');
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title={isLogin ? 'Sign In' : 'Create Account'}
        description="Sign in to your TALENTO executive search portal or create a new account."
        canonicalUrl="https://www.talento.agency/#auth"
        noindex={true}
      />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="TALENTO Logo"
            width="140"
            height="48"
            className="mx-auto h-16 w-auto"
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="font-medium text-talento-600 dark:text-talento-400 hover:text-talento-500 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required={!isLogin}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-700"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-700"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-700"
                    placeholder="Your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <p className="text-green-700 dark:text-green-400 text-sm">{success}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-talento-600 hover:bg-talento-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-talento-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="text-sm text-talento-600 dark:text-talento-400 hover:text-talento-500 transition-colors font-medium"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={onBack}
                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
