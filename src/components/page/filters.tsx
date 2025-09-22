
'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

type FiltersProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    allCategories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
};

export function Filters({ searchTerm, setSearchTerm, allCategories, selectedCategories, onCategoryChange }: FiltersProps) {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-lg bg-secondary border shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Filter Ideas</h3>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="search" className="mb-2 block font-medium">Search</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                type="text"
                                placeholder="e.g. 'eco-friendly'"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    {allCategories.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-3">Categories</h4>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {allCategories.map(category => (
                                    <div key={category} className="flex items-center">
                                        <Checkbox
                                            id={category}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => onCategoryChange(category)}
                                        />
                                        <Label htmlFor={category} className="ml-2 font-normal capitalize cursor-pointer">
                                            {category}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
