import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonListResponse } from '../types/pokemon';


const ALL_POKEMON_LIMIT = 151; // 256 / max pokemons - 1300

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonList: builder.query<Pokemon[], void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                // Сначала получаем полный список имен и URL
                const listResult = await fetchWithBQ(`pokemon?limit=${ALL_POKEMON_LIMIT}`);

                if (listResult.error) return { error: listResult.error };

                const pokemonList = listResult.data as PokemonListResponse;

                // Затем для каждого покемона в списке запрашиваем его детальную информацию
                // Promise.all выполнит все запросы параллельно, что намного быстрее
                const pokemonDetailsPromises = pokemonList.results.map(pokemon => 
                    fetchWithBQ(`pokemon/${pokemon.name}`)
                );
                
                const pokemonDetailsResults = await Promise.all(pokemonDetailsPromises);

                // Извлекаем данные из результатов
                const pokemonsWithDetails = pokemonDetailsResults.map(result => result.data as Pokemon);
                
                return { data: pokemonsWithDetails };
            },
            // Эта функция больше не нужна, так как мы не делаем "load more" с сервера
            // merge: (...) => { ... } 
        }),
        // ПОЛУЧЕНИЕ ВСЕХ ПОКЕМОНОВ С ДЕТАЛЯМИ (для главной страницы)
        // getPokemonList: builder.query<Pokemon[], { limit: number; offset: number }>({
        //     // queryFn позволяет выполнять сложную логику, например, несколько запросов
        //     async queryFn({ limit, offset }, _queryApi, _extraOptions, fetchWithBQ) {
        //         // Сначала получаем список имен и URL
        //         const listResult = await fetchWithBQ(`pokemon?limit=${limit}&offset=${offset}`);

        //         if (listResult.error) return { error: listResult.error };

        //         const pokemonList = listResult.data as PokemonListResponse;
        //         // Затем для каждого покемона в списке запрашиваем его детальную информацию
        //         const pokemonDetailsPromises = pokemonList.results.map(pokemon => fetchWithBQ(`pokemon/${pokemon.name}`));
        //         const pokemonDetailsResults = await Promise.all(pokemonDetailsPromises);
        //         const pokemonsWithDetails = pokemonDetailsResults.map(result => result.data as Pokemon);
                
        //         return { data: pokemonsWithDetails };
        //     },
        //     // Эта опция говорит RTK Query, как объединять новые данные с кешем
        //     // Важно для "бесконечной прокрутки" или "load more"
        //     merge: (currentCache, newItems) => {
        //         // Просто добавляем новые элементы в конец существующего кеша
        //         // currentCache.push(...newItems);

        //         // Создаем Map, чтобы отсеять дубликаты
        //         const uniquePokemonMap = new Map();
        //         currentCache.forEach(pokemon => uniquePokemonMap.set(pokemon.name, pokemon));
        //         newItems.forEach(pokemon => uniquePokemonMap.set(pokemon.name, pokemon));
        //         // Превращаем уникальные данные обратно в массив
        //         const mergedData = Array.from(uniquePokemonMap.values());
        //         // Очищаем старый кэш и добавляем в него уникальные данные
        //         currentCache.length = 0;
        //         currentCache.push(...mergedData);
        //     },
        //     // Говорим RTK, что для этого эндпоинта нужно использовать один и тот же кеш,
        //     // игнорируя аргументы (limit, offset). Это нужно для правильной работы `merge`.
        //     serializeQueryArgs: ({ endpointName }) => {
        //         return endpointName;
        //     },
        //     // Эта опция удаляет аргументы из ключа кеша.
        //     // Без этого каждая страница (offset=0, offset=40) создаст отдельный кеш.
        //     forceRefetch({ currentArg, previousArg }) {
        //         return currentArg !== previousArg;
        //     },
        // }),

        // ПОЛУЧЕНИЕ ОДНОГО ПОКЕМОНА ПО ИМЕНИ (информация)
        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`,
        }),
    })
})

export const { 
    useGetPokemonListQuery, 
    useGetPokemonByNameQuery,
    
} = pokemonApi;
