"use client"

import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0)
  const [showAnimation, setShowAnimation] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple counter implementation that ensures it works properly
    if (typeof window !== 'undefined') {
      // Generate a unique ID for today
      const today = new Date().toISOString().split('T')[0];
      const counterKey = 'visitor_count';
      const todayKey = `visitor_today_${today}`;
      const sessionKey = 'visitor_session';
      
      // Check if we've counted this session already
      const isNewSession = !sessionStorage.getItem(sessionKey);
      
      // Get or initialize counter values
      let totalCount = parseInt(localStorage.getItem(counterKey) || '0', 10);
      let todayCount = parseInt(localStorage.getItem(todayKey) || '0', 10);
      
      // If it's a brand new session, count the visit
      if (isNewSession) {
        // Increment counters
        totalCount += 1;
        todayCount += 1;
        
        // Save the updated counts
        localStorage.setItem(counterKey, totalCount.toString());
        localStorage.setItem(todayKey, todayCount.toString());
        
        // Mark this session as counted
        sessionStorage.setItem(sessionKey, 'true');
        
        // Show the +1 animation
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2000);
      }
      
      // Update the display count
      setCount(totalCount);
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex items-center gap-1.5 relative">
      <Badge 
        variant="outline" 
        className="bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 py-1 px-2 rounded-full border-gray-200 dark:border-gray-700 flex items-center gap-1 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transform hover:scale-105 min-w-[80px] justify-center"
      >
        <Eye size={12} className="text-red-500 dark:text-red-400" />
        {loading ? (
          <span className="text-xs animate-pulse">?</span>
        ) : (
          <span className="text-xs">{count.toLocaleString()} visitors</span>
        )}
      </Badge>
      
      {showAnimation && (
        <div 
          className="absolute -right-2 -top-6 text-xs font-semibold text-green-500 animate-fadeUp"
        >
          +1
        </div>
      )}
    </div>
  )
} 