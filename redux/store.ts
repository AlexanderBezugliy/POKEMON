import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonApi';
import pokemonListsReducer from './slice/PokemonsSlice'; 
import { userDataApi } from './userDataApi';


export const store = configureStore({
    reducer: {
        // управляет состоянием связаным с запросом к АПИ покемонов
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        // управляет состоянием для запросов связанные с данными пользователя
        [userDataApi.reducerPath]: userDataApi.reducer,
        // собственный редьюсер который хранит favorites[]/saved[]
        pokemonListsSlice: pokemonListsReducer,
    },
    // Добавляем middleware от RTK Query. Он управляет кешированием, инвалидацией и т.д.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                                            .concat(pokemonApi.middleware)
                                            .concat(userDataApi.middleware),
});

// определяем типы глобального состояния для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;