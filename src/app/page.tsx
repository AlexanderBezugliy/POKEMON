    'use client';
import React, { useMemo, useState } from "react";
import { useGetPokemonListQuery } from "../../redux/pokemonApi";
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";
import MainPokemonsList from "@/components/MainPokemonsList";
import { PokemonAbility, PokemonType } from "../../types/pokemon";



const Home = () => {
    const [offset, setOffset] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        type: "",
        ability: "",
        weight: "",
        height: "",
        sortOrder: "",
    });
    // Используем хук RTK Query для получения данных
    // isFetching будет true при первом запросе и при каждом последующем (когда нажимаем "load more")
    // isLoading будет true только при самом первом запросе
    const { data: pokemonListDetails = [], isLoading, isFetching } = useGetPokemonListQuery({
        limit: 12,
        offset: offset,
    });
    // Функция для загрузки следующей страницы
    // const loadMore = () => {
    //     // Мы просто увеличиваем offset, а RTK Query сам сделает запрос и добавит данные в кеш
    //     setOffset((prevOffset) => prevOffset + 40);
    // };
    // Обработчики для фильтров и поиска
    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setFilters({ type: "", ability: "", weight: "", height: "", sortOrder: "" });
        setSearchQuery("");
    };

    // Мемоизируем фильтрацию и сортировку, чтобы они не пересчитывались при каждом рендере
    const filteredAndSortedPokemon = useMemo(() => {
        let filteredPokemon = [...pokemonListDetails];
        const { type, ability, weight, height, sortOrder } = filters;
        const query = searchQuery.toLowerCase();
        // Поиск по имени
        if (query) {
            filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
        }
        // Фильтры
        if (type) {
            filteredPokemon = filteredPokemon.filter((p) => p.types.some((t: PokemonType) => t.type.name === type));
        }
        if (ability) {
            filteredPokemon = filteredPokemon.filter((p) => p.abilities.some((a: PokemonAbility) => a.ability.name === ability));
        }
        if (weight) {
            filteredPokemon = filteredPokemon.filter((p) => p.weight >= parseInt(weight, 10));
        }
        if (height) {
            filteredPokemon = filteredPokemon.filter((p) => p.height >= parseInt(height, 10));
        }
        // Сортировка
        if (sortOrder) {
            filteredPokemon.sort((a, b) => {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            });
        }
        
        return filteredPokemon;
    }, [pokemonListDetails, searchQuery, filters]);

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

            <MainPokemonsList
                filteredAndSortedPokemon={filteredAndSortedPokemon}
                setOffset={setOffset}
                isLoading={isLoading}
                isFetching={isFetching}
                pokemonListDetails={pokemonListDetails}

            />
            
        </main>
    );
};

export default Home;
