import { Input } from "./ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="px-6 py-4 bg-gray-50">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Enter district / county / state"
          className="pl-10 bg-white"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  )
}