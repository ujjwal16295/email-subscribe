"use client"
import React, { useState } from 'react';
import { Mail, Check, AlertCircle, Loader2, Sparkles } from 'lucide-react';

// Configuration - Replace this URL with your backend URL
const API_BASE_URL = 'http://localhost:3001/api'; // Change this to your backend URL

const EmailSubscriptionSite = () => {
  const [formData, setFormData] = useState({
    email: '',
    topic: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [hoveredTopic, setHoveredTopic] = useState(null);

  const topics = [
    { value: 'education', label: 'Education', icon: '📚', description: 'Learn & Grow' },
    { value: 'health', label: 'Health', icon: '🏥', description: 'Stay Healthy' },
    { value: 'exercise', label: 'Exercise', icon: '💪', description: 'Get Fit' },
    { value: 'technology', label: 'Technology', icon: '💻', description: 'Stay Updated' },
    { value: 'finance', label: 'Finance', icon: '💰', description: 'Manage Money' },
    { value: 'lifestyle', label: 'Lifestyle', icon: '🌟', description: 'Live Better' },
    { value: 'food', label: 'Food', icon: '🍎', description: 'Eat Well' },
    { value: 'travel', label: 'Travel', icon: '✈️', description: 'Explore World' }
  ];

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don't stop when you're tired. Stop when you're done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It's going to be hard, but hard does not mean impossible.",
    "Don't wait for opportunity. Create it."
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.topic) {
      newErrors.topic = 'Please select a topic';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setSubmitStatus('success');
      setFormData({ email: '', topic: '' });
      
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTopicSelect = (topicValue) => {
    setFormData(prev => ({
      ...prev,
      topic: topicValue
    }));
    
    if (errors.topic) {
      setErrors(prev => ({
        ...prev,
        topic: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 relative overflow-hidden">
      {/* Scrolling Quotes Background - Responsive positioning */}
      
      {/* Row 1 - Desktop: 42% from top, Mobile: 62% from top */}
      <div className="fixed top-[42%] md:top-[42%] sm:top-[62%] left-0 w-full z-0 pointer-events-none">
        <div className="relative overflow-hidden py-1">
          <div className="animate-scroll-reverse flex whitespace-nowrap">
            {motivationalQuotes.slice(12, 16).map((quote, index) => (
              <span
                key={`row1-first-${index}`}
                className="inline-block px-4 md:px-8 text-sm md:text-lg font-light text-orange-200/35 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
            {motivationalQuotes.slice(12, 16).map((quote, index) => (
              <span
                key={`row1-second-${index}`}
                className="inline-block px-4 md:px-8 text-sm md:text-lg font-light text-orange-200/35 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 - Desktop: 47% from top, Mobile: 67% from top */}
      <div className="fixed top-[47%] md:top-[47%] sm:top-[67%] left-0 w-full z-0 pointer-events-none">
        <div className="relative overflow-hidden py-1">
          <div className="animate-scroll flex whitespace-nowrap">
            {motivationalQuotes.slice(0, 8).map((quote, index) => (
              <span
                key={`row2-first-${index}`}
                className="inline-block px-4 md:px-8 text-base md:text-xl font-light text-amber-300/50 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
            {motivationalQuotes.slice(0, 8).map((quote, index) => (
              <span
                key={`row2-second-${index}`}
                className="inline-block px-4 md:px-8 text-base md:text-xl font-light text-amber-300/50 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 - Desktop: 52% from top, Mobile: 72% from top */}
      <div className="fixed top-[52%] md:top-[52%] sm:top-[72%] left-0 w-full z-0 pointer-events-none">
        <div className="relative overflow-hidden py-1">
          <div className="animate-scroll flex whitespace-nowrap">
            {motivationalQuotes.slice(8).map((quote, index) => (
              <span
                key={`row3-first-${index}`}
                className="inline-block px-4 md:px-8 text-lg md:text-2xl font-light text-orange-400/60 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
            {motivationalQuotes.slice(8).map((quote, index) => (
              <span
                key={`row3-second-${index}`}
                className="inline-block px-4 md:px-8 text-lg md:text-2xl font-light text-orange-400/60 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4 - Desktop: 57% from top, Mobile: 77% from top */}
      <div className="fixed top-[57%] md:top-[57%] sm:top-[77%] left-0 w-full z-0 pointer-events-none">
        <div className="relative overflow-hidden py-1">
          <div className="animate-scroll-reverse flex whitespace-nowrap">
            {motivationalQuotes.slice(4, 12).map((quote, index) => (
              <span
                key={`row4-first-${index}`}
                className="inline-block px-4 md:px-8 text-base md:text-xl font-light text-yellow-400/40 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
            {motivationalQuotes.slice(4, 12).map((quote, index) => (
              <span
                key={`row4-second-${index}`}
                className="inline-block px-4 md:px-8 text-base md:text-xl font-light text-yellow-400/40 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5 - Desktop: 62% from top, Mobile: 82% from top */}
      <div className="fixed top-[62%] md:top-[62%] sm:top-[82%] left-0 w-full z-0 pointer-events-none">
        <div className="relative overflow-hidden py-1">
          <div className="animate-scroll flex whitespace-nowrap">
            {motivationalQuotes.slice(0, 6).map((quote, index) => (
              <span
                key={`row5-first-${index}`}
                className="inline-block px-4 md:px-8 text-sm md:text-lg font-light text-amber-200/30 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
            {motivationalQuotes.slice(0, 6).map((quote, index) => (
              <span
                key={`row5-second-${index}`}
                className="inline-block px-4 md:px-8 text-sm md:text-lg font-light text-amber-200/30 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 6 - Desktop: 67% from top, Mobile: 87% from top */}
      <div className="fixed top-[67%] md:top-[67%] sm:top-[87%] left-0 w-full z-0 pointer-events-none">
        <div className="relative overflow-hidden py-1">
          <div className="animate-scroll-reverse flex whitespace-nowrap">
            {motivationalQuotes.slice(6, 10).map((quote, index) => (
              <span
                key={`row6-first-${index}`}
                className="inline-block px-4 md:px-8 text-sm md:text-lg font-light text-yellow-300/25 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
            {motivationalQuotes.slice(6, 10).map((quote, index) => (
              <span
                key={`row6-second-${index}`}
                className="inline-block px-4 md:px-8 text-sm md:text-lg font-light text-yellow-300/25 select-none"
              >
                &ldquo;{quote}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center pt-16 pb-8 relative z-20">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6">
            NewsletterHub
          </h1>
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-xl text-amber-800 font-medium mb-2">
              Discover curated content tailored to your interests
            </p>
            <p className="text-lg text-orange-700">
              Choose your passion and get the best stories delivered to your inbox
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-16 relative z-20">
          {/* Topic Selection Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-amber-900 mb-8">
              Choose Your Interest
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.value}
                  onClick={() => handleTopicSelect(topic.value)}
                  onMouseEnter={() => setHoveredTopic(topic.value)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className={`relative cursor-pointer group transition-all duration-300 ${
                    isSubmitting ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  <div
                    className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-3 transition-all duration-300 transform ${
                      formData.topic === topic.value
                        ? 'border-orange-500 shadow-orange-200 shadow-2xl scale-105 bg-gradient-to-br from-orange-50/90 to-amber-50/90'
                        : 'border-orange-200 hover:border-orange-400 hover:shadow-xl hover:scale-105'
                    } ${
                      hoveredTopic === topic.value
                        ? 'shadow-2xl shadow-orange-300'
                        : ''
                    }`}
                  >
                    {/* Sparkle animation on hover */}
                    {hoveredTopic === topic.value && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="h-6 w-6 text-orange-500 animate-bounce" />
                      </div>
                    )}
                    
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl opacity-0 transition-opacity duration-300 ${
                        hoveredTopic === topic.value ? 'opacity-20' : ''
                      }`}
                    />
                    
                    <div className="relative z-10 text-center">
                      <div
                        className={`text-4xl mb-3 transition-transform duration-300 ${
                          hoveredTopic === topic.value ? 'animate-pulse scale-110' : ''
                        }`}
                      >
                        {topic.icon}
                      </div>
                      <h3
                        className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
                          formData.topic === topic.value
                            ? 'text-orange-700'
                            : hoveredTopic === topic.value
                            ? 'text-orange-600'
                            : 'text-amber-800'
                        }`}
                      >
                        {topic.label}
                      </h3>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          formData.topic === topic.value
                            ? 'text-orange-600'
                            : hoveredTopic === topic.value
                            ? 'text-orange-500'
                            : 'text-amber-600'
                        }`}
                      >
                        {topic.description}
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    {formData.topic === topic.value && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* Hover glow effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 blur-xl transition-opacity duration-300 -z-10 ${
                        hoveredTopic === topic.value ? 'opacity-20' : ''
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.topic && (
              <div className="text-center mt-4">
                <p className="text-red-600 font-medium">{errors.topic}</p>
              </div>
            )}
          </div>

          {/* Email Subscription Section */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-orange-200">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-green-800 font-medium">
                    Successfully subscribed!
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <p className="text-red-800 font-medium">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full w-fit mx-auto mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  Get Started Today
                </h3>
                <p className="text-amber-700">
                  Enter your email to receive amazing content
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-amber-900 placeholder-amber-400 ${
                      errors.email ? 'border-red-300' : 'border-orange-200 hover:border-orange-300'
                    }`}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.email || !formData.topic}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    isSubmitting || !formData.email || !formData.topic
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:scale-105 hover:shadow-lg active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-amber-600 mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-scroll-reverse {
          animation: scroll-reverse 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EmailSubscriptionSite;