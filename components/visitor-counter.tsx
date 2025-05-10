"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Users } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function VisitorCounter() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null)
  const [showPlusOne, setShowPlusOne] = useState(false)
  const initialLoadRef = useRef(true) // To prevent +1 on first ever component mount after storage clear

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const counterKey = 'visitor_counter_total_pill_v1'; // Unique key for this component
      const sessionKey = 'visitor_counter_session_pill_v1'; // Unique session key
      
      let currentTotalCount = parseInt(localStorage.getItem(counterKey) || '0', 10);
      const isNewSession = !sessionStorage.getItem(sessionKey);
      
      if (isNewSession) {
        currentTotalCount += 1;
        localStorage.setItem(counterKey, currentTotalCount.toString());
        sessionStorage.setItem(sessionKey, 'counted_pill_v1');
        
        if (!initialLoadRef.current) {
          setShowPlusOne(true);
          setTimeout(() => setShowPlusOne(false), 1500); 
        }
      }
      
      setTotalVisits(currentTotalCount);
      initialLoadRef.current = false;
    }
  }, []);

  if (totalVisits === null) {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700/60">
        <Users size={12} className="text-gray-400 dark:text-gray-500" />
        <Skeleton className="h-3 w-8 bg-gray-300 dark:bg-gray-600 rounded-sm"/>
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-default">
              <Users size={13} className="text-red-500 dark:text-red-400" />
              <span className="font-medium">{totalVisits.toLocaleString()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" align="center" sideOffset={15}>
            <p className="text-xs">Total views</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showPlusOne && (
        <span 
          className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-xxs bg-red-500 text-white rounded-full shadow-lg animate-plus-one-counter"
        >
          +1
        </span>
      )}
      <style jsx global>{`
        .text-xxs {
          font-size: 0.65rem;
          line-height: 0.85rem;
        }
        @keyframes plus-one-animation-counter {
          0% {
            opacity: 0;
            transform: translate(-50%, 5px);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -3px);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -3px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
        }
        .animate-plus-one-counter {
          animation: plus-one-animation-counter 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
} 