    'use client';
import React from "react";
import { Pokemon } from "../../types/pokemon";
import PokemonCard from "./PokemonCard";
import { arrowAngleDown } from "../../utils/icons";



interface Props {
    filteredAndSortedPokemon: Pokemon[];
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    isFetching: boolean;
    pokemonListDetails: Pokemon[];
}
const MainPokemonsList = ({ filteredAndSortedPokemon, setOffset, isFetching, isLoading, pokemonListDetails }: Props) => {

    // Функция для загрузки следующей страницы
    const loadMore = () => {
        // увеличиваем offset RTK Query сам сделает запрос и добавит данные в кеш
        setOffset((prevOffset: number) => prevOffset + 40);
    };

    return (
        <section>
            <div className="min-h-[91vh]">
                <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredAndSortedPokemon.map((pokemon: Pokemon) => (
                        <PokemonCard 
                            key={pokemon.name} 
                            pokemon={pokemon} 
                        />
                    ))}
                </div>
            </div>

            {!isLoading && pokemonListDetails.length > 0 && (
                <div className="mt-4 mb-10 flex items-center justify-center">
                    <button
                        onClick={loadMore}
                        disabled={isFetching} 
                        className="py-2 px-6 flex items-center gap-2 bg-[#6c5ce7] rounded-full shadow-md font-medium
                        hover:bg-green-400 text-white transition-all duration-300 ease-in-out disabled:bg-gray-400"
                    >
                        <span className="text-left">
                            {arrowAngleDown}
                        </span>
                        {isFetching ? "Загружается..." : "Загрузить еще"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default MainPokemonsList;
