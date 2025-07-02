import { IoIosArrowForward } from "react-icons/io";
import { IoFilterCircle } from "react-icons/io5";
import React, { useState } from 'react';

interface FilterOption {
    id: string;
    label: string;
    children?: FilterOption[];
}

const filterOptions: FilterOption[] = [
    {
        id: 'category',
        label: 'Region',
        children: [
            { id: 'category-electronics', label: 'North' },
            { id: 'category-clothing', label: 'North-East' },
            { id: 'category-home', label: 'East' },
            { id: 'category-electronics', label: 'West' },
            { id: 'category-clothing', label: 'Central' },
        ],
    },
    {
        id: 'category',
        label: 'Garden',
        children: [
            { id: 'tengah', label: 'Tengah' },
            { id: 'jurong-east', label: 'Jurong East' },
            { id: 'bukit-batok', label: 'Bukit Batok' },
            { id: 'toa-payoh', label: 'Toa Payoh' },
        ],
    },
    {
        id: 'category',
        label: 'Type',
        children: [
            { id: 'theft', label: 'Theft' },
            { id: 'allotment', label: 'Allotment' },
            { id: 'pest-control', label: 'Pest Control' },
            { id: 'others', label: 'Others' },
        ],
    },
    {
        id: 'category',
        label: 'Date',
        children: [
            { id: 'last-24h', label: 'Last 24h' },
            { id: 'last-week', label: 'Last Week' },
            { id: 'last-year', label: 'Last Year' },
            { id: 'older', label: 'Older' },
        ],
    },
];

interface FilterItemProps {
    item: FilterOption;
    checkedFilters: Set<string>;
    onCheckboxChange: (id: string, hasChildren: boolean) => void;
    depth?: number;
}

const FilterItem: React.FC<FilterItemProps> = ({ item, checkedFilters, onCheckboxChange, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren: boolean = !!(item.children && item.children.length > 0);
    const paddingLeft = `${depth * 1.5}rem`;

    return (
        <div className="flex flex-col text-left" style={{ paddingLeft }}>
            <div className="flex items-center py-2">
                {hasChildren && (
                    <button
                        className="p-1 text-[#445072] rounded-full"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-controls={`filter-group-${item.id}`}
                    >
                        <IoIosArrowForward
                            size={16}
                            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                        />
                    </button>
                )}
                <label className="flex items-center cursor-pointer ml-2 flex-grow">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-sm appearance-none border border-gray-300 checked:bg-[#4A61C0] checked:border-transparent focus:outline-none"
                        checked={checkedFilters.has(item.id)}
                        onChange={() => onCheckboxChange(item.id, hasChildren)}
                    />
                    <span className="ml-2 text-sm text-[#445072] select-none">
                        {item.label}
                    </span>
                </label>
            </div>
            {hasChildren && isExpanded && (
                <div id={`filter-group-${item.id}`} className="ml-4">
                    {item.children!.map((child: FilterOption) => (
                        <FilterItem
                            key={child.id}
                            item={child}
                            checkedFilters={checkedFilters}
                            onCheckboxChange={onCheckboxChange}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Filter: React.FC = () => {
    const [checkedFilters, setCheckedFilters] = useState<Set<string>>(new Set());
    const hasFilters = checkedFilters.size > 0;

    const getAllChildIds = (items: FilterOption[]): string[] => {
        let ids: string[] = [];
        items.forEach(item => {
            ids.push(item.id);
            if (item.children) {
                ids = ids.concat(getAllChildIds(item.children));
            }
        });
        return ids;
    };

    const handleCheckboxChange = (id: string, hasChildren: boolean) => {
        setCheckedFilters(prevCheckedFilters => {
            const newCheckedFilters = new Set(prevCheckedFilters);
            if (newCheckedFilters.has(id)) {
                newCheckedFilters.delete(id);
                if (hasChildren) {
                    const itemToUncheck = filterOptions.find(opt => opt.id === id) ||
                        filterOptions.flatMap(opt => opt.children || [])
                            .find(child => child.id === id);
                    if (itemToUncheck && itemToUncheck.children) {
                        const childIdsToUncheck = getAllChildIds(itemToUncheck.children);
                        childIdsToUncheck.forEach(childId => newCheckedFilters.delete(childId));
                    }
                }
            } else {
                newCheckedFilters.add(id);
                if (hasChildren) {
                    const itemToCheck = filterOptions.find(opt => opt.id === id) ||
                        filterOptions.flatMap(opt => opt.children || [])
                            .find(child => child.id === id);
                    if (itemToCheck && itemToCheck.children) {
                        const childIdsToCheck = getAllChildIds(itemToCheck.children);
                        childIdsToCheck.forEach(childId => newCheckedFilters.add(childId));
                    }
                }
            }
            return newCheckedFilters;
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
            <div>
                {filterOptions.map((item: FilterOption) => (
                    <FilterItem
                        key={item.id}
                        item={item}
                        checkedFilters={checkedFilters}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default Filter;