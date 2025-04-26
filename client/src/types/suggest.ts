// /types/suggest.ts

// Suggestion item (for job, company, location)
export interface SuggestItem {
  type: "job" | "company" | "location";
  value: string;
  label?: string; // Optional display label (defaults to value)
}

// Raw API response format
export interface SuggestResponse {
  jobs: string[];
  companies: string[];
  locations: string[];
}

// Grouped and structured format (for UI rendering)
export interface StructuredSuggestItem {
  group: "Job" | "Company" | "Location";
  items: string[];
}

// Final flat structure used by the input component
export interface RenderableSuggestItem {
  key: string;
  group: "Job" | "Company" | "Location";
  value: string;
}
