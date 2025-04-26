// src/hook/useAutoSuggest.ts

import { fetchSuggest } from "@/api/suggestApi";
import type { RenderableSuggestItem } from "@/types/suggest";
import { useCallback, useEffect, useRef, useState } from "react";

interface Cache {
  [key: string]: {
    data: RenderableSuggestItem[];
    timestamp: number;
  };
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DEBOUNCE_DELAY = 300; // 300ms debounce delay

export function useAutoSuggest(query: string) {
  const [suggestions, setSuggestions] = useState<RenderableSuggestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const cache = useRef<Cache>({});
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const fetchSuggestions = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    const cacheKey = keyword.toLowerCase();
    const cached = cache.current[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setSuggestions(cached.data);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchSuggest(keyword);

      if (!data) {
        console.error("No data received from suggest API");
        return;
      }

      const transformed: RenderableSuggestItem[] = [
        ...(data.jobs || []).map((job) => ({
          key: `job-${job}`,
          group: "Job" as const,
          value: job,
        })),
        ...(data.companies || []).map((company) => ({
          key: `company-${company}`,
          group: "Company" as const,
          value: company,
        })),
        ...(data.locations || []).map((location) => ({
          key: `location-${location}`,
          group: "Location" as const,
          value: location,
        })),
      ];

      // 更新缓存
      if (transformed.length > 0) {
        cache.current[cacheKey] = {
          data: transformed,
          timestamp: Date.now(),
        };

        // 清理过期缓存
        const now = Date.now();
        Object.keys(cache.current).forEach((key) => {
          if (now - cache.current[key].timestamp > CACHE_DURATION) {
            delete cache.current[key];
          }
        });
      }

      setSuggestions(transformed);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 使用 useEffect 处理防抖
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // 如果查询为空，直接清除建议
    if (!query.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    // 设置新的防抖定时器
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(query);
    }, DEBOUNCE_DELAY);

    // 清理函数
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, fetchSuggestions]);

  return {
    suggestions,
    loading,
    open,
    setOpen,
  };
}
