// ✅ /api/suggestApi.ts
import type { SuggestResponse } from "@/types/suggest";
import axios from "./axiosInstance";

export const fetchSuggest = async (
  keyword: string
): Promise<SuggestResponse> => {
  const { data } = await axios.get<SuggestResponse>("/api/suggest", {
    params: { keyword },
  });
  return data;
};
