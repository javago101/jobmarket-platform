// src/store/useJobSearchStore.ts
import { create } from "zustand";

interface JobSearchState {
  query: string;
  location: string;
  company: string;
  workMode: string;
  page: number;
  limit: number;
  setQuery: (q: string) => void;
  setLocation: (l: string) => void;
  setCompany: (c: string) => void;
  setWorkMode: (m: string) => void;
  setPage: (p: number) => void;
}

const useJobSearchStore = create<JobSearchState>((set) => ({
  query: "",
  location: "",
  company: "",
  workMode: "",
  page: 1,
  limit: 5,

  setQuery: (query) => set({ query, page: 1 }),
  setLocation: (location) => set({ location, page: 1 }),
  setCompany: (company) => set({ company, page: 1 }),
  setWorkMode: (mode) => set({ workMode: mode, page: 1 }),
  setPage: (page) => set({ page }),
}));

export default useJobSearchStore;
