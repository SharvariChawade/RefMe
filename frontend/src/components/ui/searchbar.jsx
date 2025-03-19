import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative w-full max-w-2xl">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center">
        <Search className="text-gray-500 h-5 w-5" />
      </div>

      {/* Input Field */}
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    );
};

export default SearchBar;
