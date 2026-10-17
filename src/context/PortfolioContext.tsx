"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PortfolioData, portfolioData as defaultPortfolioData } from "@/data/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  refreshData: () => Promise<void>;
  updateLocalData: (newData: PortfolioData) => void;
  isLoading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

interface PortfolioProviderProps {
  children: React.ReactNode;
  initialData?: PortfolioData;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  initialData,
}) => {
  const [data, setData] = useState<PortfolioData>(initialData || defaultPortfolioData);
  const [isLoading, setIsLoading] = useState(false);

  // Sync if initialData changes from server component re-render
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  // Method to fetch fresh CMS state from /api/admin/content
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/content", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.warn("[PortfolioContext] Failed to fetch live CMS data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Method to optimistically update state locally
  const updateLocalData = useCallback((newData: PortfolioData) => {
    setData(newData);
  }, []);

  // Listen for internal and cross-tab update events
  useEffect(() => {
    // 1. In-tab custom event
    const handleCustomUpdate = () => {
      refreshData();
    };
    window.addEventListener("cms-data-updated", handleCustomUpdate);

    // 2. Cross-tab BroadcastChannel
    let broadcastChannel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        broadcastChannel = new BroadcastChannel("gadex_cms_channel");
        broadcastChannel.onmessage = (event) => {
          if (event.data?.type === "CMS_UPDATED") {
            refreshData();
          }
        };
      } catch (e) {
        console.warn("[PortfolioContext] BroadcastChannel unavailable:", e);
      }
    }

    return () => {
      window.removeEventListener("cms-data-updated", handleCustomUpdate);
      if (broadcastChannel) {
        broadcastChannel.close();
      }
    };
  }, [refreshData]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        refreshData,
        updateLocalData,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

/**
 * Custom hook to consume live dynamic CMS portfolio data.
 * Falls back gracefully to defaultPortfolioData if used outside PortfolioProvider.
 */
export function usePortfolioData(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    return {
      data: defaultPortfolioData,
      refreshData: async () => {},
      updateLocalData: () => {},
      isLoading: false,
    };
  }
  return context;
}
