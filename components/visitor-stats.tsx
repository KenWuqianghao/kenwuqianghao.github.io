"use client"

import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Removed: import { CounterAPI } from 'counterapi';

const ABACUS_NAMESPACE = "kenwu-portfolio"; // Using Abacus convention
const ABACUS_KEY = "total-page-views";  // Using Abacus convention

// Removed: const counter = new CounterAPI();

export default function VisitorStats() {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTotalPlusOne, setShowTotalPlusOne] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setLoading(true);
    const sessionKey = 'visitor_session_counted_v5_abacus'; // Updated session key for Abacus
    const isNewSession = !sessionStorage.getItem(sessionKey);

    async function fetchAndSetCounts() {
      let currentTotalCount: number | null = null;
      const hitUrl = `https://abacus.jasoncameron.dev/hit/${ABACUS_NAMESPACE}/${ABACUS_KEY}`;
      const getUrl = `https://abacus.jasoncameron.dev/get/${ABACUS_NAMESPACE}/${ABACUS_KEY}`;

      try {
        if (isNewSession) {
          console.log("New session, hitting Abacus URL:", hitUrl);
          const hitResponse = await fetch(hitUrl);
          console.log("Abacus Hit Response Status:", hitResponse.status, hitResponse.statusText);

          if (hitResponse.ok) {
            try {
              const data = await hitResponse.json();
              console.log("Abacus Hit Response Data:", data);
              if (typeof data.value !== 'undefined') {
                currentTotalCount = data.value;
                setShowTotalPlusOne(true);
                setTimeout(() => setShowTotalPlusOne(false), 1500);
                sessionStorage.setItem(sessionKey, 'true');
              } else {
                console.error("Abacus hit response did not contain .value property:", data);
                // Fallback to GET if .value is missing after successful hit
                const getResponseFallback = await fetch(getUrl);
                if (getResponseFallback.ok) {
                  const getData = await getResponseFallback.json();
                  if (typeof getData.value !== 'undefined') currentTotalCount = getData.value;
                }
              }
            } catch (jsonError) {
              console.error("Failed to parse JSON from Abacus hitResponse:", jsonError);
              const textResponse = await hitResponse.text();
              console.error("Non-JSON Abacus hitResponse body:", textResponse);
            }
          } else {
            console.error("Abacus hit request failed. Status:", hitResponse.status, hitResponse.statusText);
            const errorText = await hitResponse.text();
            console.error("Abacus hit request error body:", errorText);
            // Fallback to GET if HIT fails
            const getResponseFallback = await fetch(getUrl);
            if (getResponseFallback.ok) {
              const getData = await getResponseFallback.json();
              if (typeof getData.value !== 'undefined') currentTotalCount = getData.value;
            }
          }
        } else {
          // Fetch current total count without incrementing for existing session
          console.log("Existing session, getting from Abacus URL:", getUrl);
          const getResponse = await fetch(getUrl);
          console.log("Abacus Get Response Status:", getResponse.status, getResponse.statusText);

          if (getResponse.ok) {
            try {
              const data = await getResponse.json();
              console.log("Abacus Get Response Data:", data);
              if (typeof data.value !== 'undefined') {
                currentTotalCount = data.value;
              } else {
                 console.error("Abacus get response did not contain .value property:", data);
              }
            } catch (jsonError) {
              console.error("Failed to parse JSON from Abacus getResponse:", jsonError);
              const textResponse = await getResponse.text();
              console.error("Non-JSON Abacus getResponse body:", textResponse);
            }
          } else {
            console.error("Abacus get request failed. Status:", getResponse.status, getResponse.statusText);
            const errorText = await getResponse.text();
            console.error("Abacus get request error body:", errorText);
          }
        }
      } catch (error: any) {
        // This outer catch handles fundamental fetch failures (e.g., network down, DNS resolution completely fails)
        console.error("Fundamental error with Abacus fetch (network/DNS issue?):", error.message, error);
      }

      if (currentTotalCount !== null) {
        setTotalVisits(currentTotalCount);
      }
      setLoading(false);
    }

    fetchAndSetCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 p-1">
        <div className="flex items-center gap-1">
          <Users size={12} className="text-gray-300 dark:text-gray-600" />
          <Skeleton className="h-4 w-10 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  if (totalVisits === null) {
    return (
        <div className="flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 p-1">
            <div className="flex items-center gap-1">
                <Users size={12} className="text-gray-400 dark:text-gray-500" />
                <span>Error loading views</span>
            </div>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group relative flex items-center gap-1 cursor-default text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
              <Users size={12} className="transition-colors duration-300" />
              <span className="transition-colors duration-300">
                {totalVisits.toLocaleString()} Total
              </span>
              {showTotalPlusOne && (
                <span className="absolute -top-3.5 right-0 text-green-500 opacity-100 transition-all duration-1000 ease-out transform translate-y-0 animate-fade-out-up">
                  +1
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={20}>
            <p className="text-xs">Total portfolio views (via Abacus)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

// Ensure CSS for animate-fade-out-up is in your global CSS. 