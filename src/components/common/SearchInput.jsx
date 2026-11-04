import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  className = '',
  iconPosition = 'right',
  ...props
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      {iconPosition === 'left' && (
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#F4F7FE] md:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl md:rounded-2xl border border-slate-200/80 focus:border-[#4318FF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 transition-all py-2 md:py-2.5 ${
          iconPosition === 'left' ? 'pl-10 pr-9' : 'pl-4 pr-10'
        }`}
        {...props}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-8 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {iconPosition === 'right' && (
        <Search className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      )}
    </div>
  );
};

export default SearchInput;

