import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CircleDot, Delete, Ruler, SortAsc, Weight, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FiltersProps } from "../../types/pokemon";


const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
];
const pokemonAbilities = [
    "Overgrow",
    "Blaze",
    "Torrent",
    "Shield Dust",
    "Shed Skin",
    "Compound Eyes",
    "Swarm",
    "Keen Eye",
    "Run Away",
    "Intimidate",
    "Static",
    "Sand Veil",
    "Synchronize",
    "Levitate",
    "Pressure",
    "Adaptability",
    "Multiscale",
    "Sturdy",
    "Inner Focus",
    "Guts",
];

const Filters = ({ filters, onFilterChange, onClear }: FiltersProps) => {
    return (
        <div className="mt-8 px-16 py-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
                {/* TYPES */}
                <Select
                    value={filters.type}
                    onValueChange={(value) => onFilterChange("type", value)}
                >
                    <SelectTrigger className="u-shadow-2 w-[180px] text-gray-500 font-bold border border-blue-500 bg-white rounded-lg focus:ring-2 focus:ring-gray-200">
                        <div className="flex items-center gap-1">
                            <CircleDot className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Types" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {pokemonTypes.map((type, index: number) => (
                            <SelectItem key={index} value={type.toLowerCase()}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                {/* ABILITY */}
                <Select
                    value={filters.ability}
                    onValueChange={(value) => onFilterChange("ability", value)}
                >
                    <SelectTrigger className="u-shadow-2 w-[180px] text-gray-500 font-bold border border-blue-500 bg-white rounded-lg focus:ring-2 focus:ring-gray-200">
                        <div className=" flex items-center gap-1">
                            <Zap className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Abilities" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {pokemonAbilities.map((ability) => (
                            <SelectItem
                                key={ability}
                                value={ability.toLowerCase()}
                            >
                                {ability}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* WEIGHT */}
                <div className="relative rounded-lg border border-blue-500">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="number"
                        placeholder="Weight"
                        value={filters.weight}
                        className="u-shadow-2 w-[180px] pl-9 text-gray-500 font-bold border-none outline-none bg-white rounded-lg focus-visible:ring-2 focus-visible:ring-gray-200"
                        onChange={(e) => onFilterChange("weight", e.target.value)}
                    />
                </div>

                {/* HEIGHT */}
                <div className="relative rounded-lg border border-blue-500">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="number"
                        placeholder="Height"
                        value={filters.height}
                        onChange={(e) => onFilterChange("height", e.target.value)}
                        className="u-shadow-2 w-[180px] pl-9 text-gray-500 font-bold border-none outline-none bg-white rounded-lg focus-visible:ring-2 focus-visible:ring-gray-200"
                    />
                </div>

                {/* ORDER */}
                <Select
                    value={filters.sortOrder}
                    onValueChange={(value) => onFilterChange("sortOrder", value)}
                >
                    <SelectTrigger className="u-shadow-2 w-[180px] text-gray-500 font-bold border border-blue-500 bg-white rounded-lg focus:ring-2 focus:ring-gray-200">
                        <div className="flex items-center gap-1">
                            <SortAsc className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Sort Order" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* CLEAR button */}
            <Button
                onClick={onClear}
                className="u-shadow-2 font-bold bg-[#6c5ce7] rounded-lg flex items-center gap-1"
            >
                <Delete className="mr-2 h-5 w-5" />Clear Filters
            </Button>
        </div>
    );
};

export default Filters;
