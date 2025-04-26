// ✅ src/components/AutoSuggestInput.tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useCallback, useRef, useState } from "react";

interface SuggestionItem {
  key: string;
  value: string;
  group?: string;
}

interface AutoSuggestInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  suggestions: SuggestionItem[];
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  try {
    const parts = text.split(
      new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    );
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 dark:bg-yellow-800">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (e) {
    return text;
  }
}

export default function AutoSuggestInput({
  value,
  onChange,
  onSearch,
  suggestions,
  loading = false,
  placeholder = "Search...",
  className = "w-full",
}: AutoSuggestInputProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const composing = useRef(false);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setOpen(false);
      setSelectedIndex(-1);
      onSearch?.();
    },
    [onChange, onSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (composing.current) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setSelectedIndex((prev) =>
              prev < suggestions.length - 1 ? prev + 1 : -1
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setSelectedIndex(suggestions.length - 1);
          } else {
            setSelectedIndex((prev) =>
              prev > -1 ? prev - 1 : suggestions.length - 1
            );
          }
          break;
        case "Enter":
          e.preventDefault();
          if (
            open &&
            selectedIndex >= 0 &&
            selectedIndex < suggestions.length
          ) {
            handleSelect(suggestions[selectedIndex].value);
          } else {
            onSearch?.();
          }
          break;
        case "Escape":
          e.preventDefault();
          if (open) {
            setOpen(false);
            setSelectedIndex(-1);
          } else {
            onChange("");
          }
          break;
        case "Tab":
          if (
            open &&
            selectedIndex >= 0 &&
            selectedIndex < suggestions.length
          ) {
            e.preventDefault();
            handleSelect(suggestions[selectedIndex].value);
          }
          break;
      }
    },
    [open, suggestions, selectedIndex, handleSelect, onSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // 不管是否在输入中文，都立即更新值
      onChange(newValue);

      if (newValue.trim()) {
        setOpen(true);
        setSelectedIndex(-1);
      } else {
        setOpen(false);
      }
    },
    [onChange]
  );

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <Input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => {
              composing.current = true;
            }}
            onCompositionEnd={() => {
              composing.current = false;
            }}
            onFocus={() => value.trim() && setOpen(true)}
            placeholder={placeholder}
            className={className}
          />
        </PopoverTrigger>
        <PopoverContent
          className="p-0 z-50 bg-popover shadow-md border rounded-md"
          align="start"
          sideOffset={4}
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command>
            <CommandList>
              {loading ? (
                <CommandEmpty>Loading...</CommandEmpty>
              ) : suggestions.length === 0 ? (
                <CommandEmpty>No suggestions found</CommandEmpty>
              ) : (
                <>
                  {Object.entries(
                    suggestions.reduce<Record<string, SuggestionItem[]>>(
                      (acc, item) => {
                        const group = item.group || "default";
                        if (!acc[group]) acc[group] = [];
                        acc[group].push(item);
                        return acc;
                      },
                      {}
                    )
                  ).map(([group, items]) => {
                    if (group === "default") {
                      return items.map((item, index) => (
                        <CommandItem
                          key={item.key}
                          value={item.value}
                          onMouseEnter={() => setSelectedIndex(index)}
                          onSelect={() => handleSelect(item.value)}
                          className={
                            suggestions.indexOf(item) === selectedIndex
                              ? "bg-accent"
                              : ""
                          }
                        >
                          {highlightMatch(item.value, value)}
                        </CommandItem>
                      ));
                    }

                    return (
                      <CommandGroup key={group} heading={group}>
                        {items.map((item) => (
                          <CommandItem
                            key={item.key}
                            value={item.value}
                            onMouseEnter={() =>
                              setSelectedIndex(suggestions.indexOf(item))
                            }
                            onSelect={() => handleSelect(item.value)}
                            className={
                              suggestions.indexOf(item) === selectedIndex
                                ? "bg-accent"
                                : ""
                            }
                          >
                            {highlightMatch(item.value, value)}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
