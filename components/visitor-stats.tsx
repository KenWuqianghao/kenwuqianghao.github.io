"use client"

import React, { useEffect, useState } from 'react'
import { Eye, Calendar, Users } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function VisitorStats() {
  const [totalVisits, setTotalVisits] = useState<number>(0)
  const [todayVisits, setTodayVisits] = useState<number>(0)
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
      }
      
      // Update the display counts
      setTotalVisits(totalCount);
      setTodayVisits(todayCount);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="px-2 py-1 flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-md">
          <Users size={12} className="text-gray-300 dark:text-gray-600" />
          <Skeleton className="h-4 w-8 bg-gray-200 dark:bg-gray-700"/>
        </div>
        <div className="px-2 py-1 flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-md">
          <Calendar size={12} className="text-gray-300 dark:text-gray-600" />
          <Skeleton className="h-4 w-8 bg-gray-200 dark:bg-gray-700"/>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-800">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-default px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
              <Users size={12} className="text-red-500 dark:text-red-400" />
              <span>{totalVisits.toLocaleString()} total</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Total visitors since launch</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-default px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
              <Calendar size={12} className="text-red-500 dark:text-red-400" />
              <span>{todayVisits.toLocaleString()} today</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Visitors today</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
} 