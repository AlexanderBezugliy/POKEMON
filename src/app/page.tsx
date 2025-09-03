    'use client';
import React, { useMemo, useState } from "react";
import { useGetPokemonListQuery } from "../../redux/pokemonApi";
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";
import MainPokemonsList from "@/components/MainPokemonsList";
import { PokemonAbility, PokemonType } from "../../types/pokemon";
import PokemonCard from "@/components/PokemonCard";
import { arrowAngleDown } from "../../utils/icons";



const POKEMONS_TO_SHOW = 24;

const Home = () => {
    // const [offset, setOffset] = useState(0);
    const [displayCount, setDisplayCount] = useState(POKEMONS_TO_SHOW);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        type: "",
        ability: "",
        weight: "",
        height: "",
        sortOrder: "",
    });

    const { data: allPokemonData = [], isLoading } = useGetPokemonListQuery();
    // Используем хук RTK Query для получения данных
    // isFetching будет true при первом запросе и при каждом последующем (когда нажимаем "load more")
    // isLoading будет true только при самом первом запросе
    // const { data: pokemonListDetails = [], isLoading, isFetching } = useGetPokemonListQuery({
    //     limit: 12,
    //     offset: offset,
    // });
    

    // Мемоизируем фильтрацию и сортировку, чтобы они не пересчитывались при каждом рендере
    const filteredAndSortedPokemon = useMemo(() => {
        let filteredPokemon = [...allPokemonData];
        const { type, ability, weight, height, sortOrder } = filters;
        const query = searchQuery.toLowerCase();
        // Поиск по имени
        if (query) {
            filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
        }
        // Фильтры
        if (query || type || ability || weight || height) {
            filteredPokemon = allPokemonData.filter(pokemon => {
               // Поиск по имени
               if (query && !pokemon.name.toLowerCase().includes(query)) return false;
               // Фильтр по типу
               if (type && !pokemon.types.some((t: PokemonType) => t.type.name === type)) return false;
               // Фильтр по способности
               if (ability && !pokemon.abilities.some((a: PokemonAbility) => a.ability.name === ability)) return false;
               // Фильтр по весу
               if (weight && pokemon.weight < parseInt(weight, 10)) return false;
               // Фильтр по росту
               if (height && pokemon.height < parseInt(height, 10)) return false;
               
               return true;
           });
       }
        // if (type) {
        //     filteredPokemon = filteredPokemon.filter((p) => p.types.some((t: PokemonType) => t.type.name === type));
        // }
        // if (ability) {
        //     filteredPokemon = filteredPokemon.filter((p) => p.abilities.some((a: PokemonAbility) => a.ability.name === ability));
        // }
        // if (weight) {
        //     filteredPokemon = filteredPokemon.filter((p) => p.weight >= parseInt(weight, 10));
        // }
        // if (height) {
        //     filteredPokemon = filteredPokemon.filter((p) => p.height >= parseInt(height, 10));
        // }
        // Сортировка
        if (sortOrder) {
            filteredPokemon.sort((a, b) => {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            });
        }
        
        return filteredPokemon;
    }, [allPokemonData, searchQuery, filters]);

    const pokemonsToDisplay = filteredAndSortedPokemon.slice(0, displayCount);

    const loadMore = () => {
        setDisplayCount(prevCount => prevCount + POKEMONS_TO_SHOW);
    };

    const handleFilterChange = (key: string, value: string) => {
        // setDisplayCount(POKEMONS_TO_SHOW);
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setDisplayCount(POKEMONS_TO_SHOW);
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setFilters({ type: "", ability: "", weight: "", height: "", sortOrder: "" });
        setSearchQuery("");
        // setDisplayCount(POKEMONS_TO_SHOW);
    };

    return (
        <main>
            <section className="mt-4 490px:mt-10 flex items-center justify-center">
                <SearchForm 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </section>

            <section>
                <Filters 
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClear={clearFilters}
                />
            </section>

            {/* <MainPokemonsList
                filteredAndSortedPokemon={filteredAndSortedPokemon}
                // setOffset={setOffset}
                isLoading={isLoading}
                isFetching={isFetching}
                allPokemonData={allPokemonData}
            />  */}
            <section className="px-4 md:px-16 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center mt-10"><p className="loader"></p></div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {pokemonsToDisplay.map(pokemon => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                )}
                
                {!isLoading && pokemonsToDisplay.length === 0 && (
                     <p className="text-center text-white text-xl font-bold mt-10">No Pokemon found matching... 😢</p>
                )}
            </section>

            {/* Кнопка "Load More" */}
            {!isLoading && displayCount < filteredAndSortedPokemon.length && (
                 <div className="mt-4 mb-10 flex items-center justify-center">
                    <button
                        onClick={loadMore}
                        className="py-2 px-6 flex items-center gap-2 bg-[#6c5ce7] rounded-full shadow-md font-medium
                        hover:bg-green-400 text-white transition-all duration-300 ease-in-out"
                    >
                        <span className="text-left">{arrowAngleDown}</span>Load More
                    </button>
                </div>
            )}
            
        </main>
    );
};

export default Home;
