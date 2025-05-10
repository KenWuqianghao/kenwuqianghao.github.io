"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Users, Calendar } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function VisitorStats() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null)
  const [todayVisits, setTodayVisits] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const totalCounterKey = 'visitor_count_total_v2'; // New key for clarity
      const todayDateKey = `visitor_today_date_v2_${new Date().toISOString().split('T')[0]}`;
      const sessionKey = 'visitor_session_counted_v2';
      
      let currentTotalCount = parseInt(localStorage.getItem(totalCounterKey) || '0', 10);
      let currentTodayCount = parseInt(localStorage.getItem(todayDateKey) || '0', 10);
      const isNewSession = !sessionStorage.getItem(sessionKey);
      
      if (isNewSession) {
        currentTotalCount += 1;
        currentTodayCount += 1;
        localStorage.setItem(totalCounterKey, currentTotalCount.toString());
        localStorage.setItem(todayDateKey, currentTodayCount.toString());
        sessionStorage.setItem(sessionKey, 'true');
      }
      
      setTotalVisits(currentTotalCount);
      setTodayVisits(currentTodayCount);
    }
  }, []);

  if (totalVisits === null || todayVisits === null) {
    return (
      <div className="flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 p-1">
        <div className="flex items-center gap-1">
          <Users size={12} className="text-gray-300 dark:text-gray-600" />
          <Skeleton className="h-4 w-10 bg-gray-200 dark:bg-gray-700"/>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-gray-300 dark:text-gray-600" />
          <Skeleton className="h-4 w-10 bg-gray-200 dark:bg-gray-700"/>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group flex items-center gap-1 cursor-default text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
              <Users size={12} className="transition-colors duration-300" />
              <span className="transition-colors duration-300">
                {totalVisits.toLocaleString()} Total
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Total portfolio views all time</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group flex items-center gap-1 cursor-default text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
              <Calendar size={12} className="transition-colors duration-300" />
              <span className="transition-colors duration-300">
                {todayVisits.toLocaleString()} Today
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Portfolio views today</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
} 