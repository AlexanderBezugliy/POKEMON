import React from "react";
import PokemonCard from "../PokemonCard";
import { Pokemon } from "../../../types/pokemon";



interface PagesComponentsProps {
    pokemonFS: Pokemon[],
    title: string,
    isLoading: boolean,
}
const PagesComponents = ({ pokemonFS, title, isLoading }: PagesComponentsProps) => {
    return (
        <div className="p-8">
            <div className="flex justify-center">
                <h1 className="text-orange-500 text-4xl font-bold text-center px-6 py-4 bg-white rounded-2xl border-2 border-blue-500">
                    {title}
                </h1>
            </div>
            

            {isLoading ? (
                <div className="h-[50vh] flex justify-center items-center">
                    <div className="loader"></div> 
                </div>
            ) : pokemonFS.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-2xl">Your favorites list is empty.</p>
                    <p>Click the heart icon on a Pokémon to add it here!</p>
                </div>
            ) : (
                <div className="px-8 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {pokemonFS.map((pokemon: Pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PagesComponents;
