import React from "react";
import { search } from "../../utils/icons";


interface SearchFormProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchForm = ({ value, onChange }: SearchFormProps) => {
    return (
        <form className="relative w-[80%] md:w-[40%]">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search Pokemon!"
                className="u-shadow-1 w-full py-3 px-6 rounded-xl border-2 border-blue-500 text-lg outline-none text-gray-800"
            />
            <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-gray-300 pointer-events-none">
                {search}
            </span>
        </form>
    );
};

export default SearchForm;
