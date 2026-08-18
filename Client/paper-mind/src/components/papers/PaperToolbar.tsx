import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortMode =
  | "newest"
  | "oldest"
  | "title"
  | "pages";

export function PaperToolbar({
  value,
  onChange,
  sort,
  onSortChange,
}: {
  value: string;
  onChange: (v: string) => void;
  sort: SortMode;
  onSortChange: (v: SortMode) => void;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:max-w-md">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search papers..."
          className="pl-10"
        />

      </div>

      <Select
        value={sort}
        onValueChange={(v) =>
          onSortChange(v as SortMode)
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">
            Newest
          </SelectItem>

          <SelectItem value="oldest">
            Oldest
          </SelectItem>

          <SelectItem value="title">
            Title
          </SelectItem>

          <SelectItem value="pages">
            Pages
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}