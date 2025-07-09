'use client';

import { IoFilterCircle } from "react-icons/io5";
import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
}

const filterOptions: FilterOption[] = [
  { id: '120a', label: '120A' },
  { id: '224', label: '224' },
];

interface FilterItemProps {
  item: FilterOption;
  checkedFilters: Set<string>;
  onCheckboxChange: (id: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ item, checkedFilters, onCheckboxChange }) => {
  return (
    <div className="flex items-center py-2 pl-2">
      <label className="flex items-center cursor-pointer flex-grow">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 accent-[#4A61C0] border-gray-800 focus:ring-[#4A61C0]"
          checked={checkedFilters.has(item.id)}
          onChange={() => onCheckboxChange(item.id)}
        />
        <span className="ml-2 text-sm text-[#445072] select-none">{item.label}</span>
      </label>
    </div>
  );
};

const Filter: React.FC = () => {
  const [checkedFilters, setCheckedFilters] = useState<Set<string>>(new Set());
  const hasFilters = checkedFilters.size > 0;

  const handleCheckboxChange = (id: string) => {
    setCheckedFilters(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  return (
    <div className="relative text-left">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          <IoFilterCircle size={18} className="mr-2 text-[#293044]" />
          <h3 className="text-sm font-base text-[#293044]">Filter</h3>
        </div>
        {hasFilters && (
          <>
            <span className="text-sm font-base text-[#293044] select-none">|</span>
            <button
              onClick={() => setCheckedFilters(new Set())}
              className="text-sm font-medium text-[#4A61C0] hover:text-[#3b4e9a] cursor-pointer transition-opacity duration-300 ease-in-out"
            >
              Clear
            </button>
          </>
        )}
      </div>

      {filterOptions.map(item => (
        <FilterItem
          key={item.id}
          item={item}
          checkedFilters={checkedFilters}
          onCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default Filter;
