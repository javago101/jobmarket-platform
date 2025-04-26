// ✅ src/components/JobSearchForm.tsx
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAutoSuggest } from "@/hook/useAutoSuggest";
import useJobSearchStore from "@/store/useJobSearchStore";
import { useState } from "react";
import AutoSuggestInput from "./AutoSuggestInput";

export default function JobSearchForm() {
  const { setQuery, workMode, setWorkMode } = useJobSearchStore();
  const [inputValue, setInputValue] = useState("");
  const { suggestions, loading } = useAutoSuggest(inputValue);

  const handleSubmit = () => {
    setQuery(inputValue);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="flex-1">
        <AutoSuggestInput
          value={inputValue}
          onChange={setInputValue}
          onSearch={handleSubmit}
          suggestions={suggestions.map((item) => ({
            key: `${item.group}-${item.value}`,
            value: item.value,
            group: item.group,
          }))}
          loading={loading}
          placeholder="Search jobs, companies, or locations..."
          className="w-full pr-10"
        />
      </div>

      <div className="flex flex-row gap-3">
        <Select value={workMode} onValueChange={setWorkMode}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Work Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Onsite">On-site</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit} className="w-full md:w-32">
          🔍 Search
        </Button>
      </div>
    </div>
  );
}
