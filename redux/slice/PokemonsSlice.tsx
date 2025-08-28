import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../types/pokemon";
import { RootState } from "../store";




interface PokemonListsState {
    favorites: Pokemon[];
    saved: Pokemon[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PokemonListsState = {
    favorites: [],
    saved: [],
    // Добавим статус сохранения
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

// 1. Создаем Thunk для сохранения данных
export const saveUserData = createAsyncThunk(
    'pokemonUserLists/saveUserData',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const { favorites, saved } = state.pokemonListsSlice;
        
        const response = await fetch('/api/user-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorites, saved }),
        });
        
        return response.json();
    }
);

const pokempnListSlice = createSlice({
    name: "pokemonsList",
    initialState,
    reducers: { // reducers - это функции, которые описывают, как можно изменять состояние
        // FAVORITE
        // addToFavorite: (state, action: PayloadAction<Pokemon>) => {
        //     const existingPokemon = state.favorites.some((p) => p.id === action.payload.id);
        //     //предотвращает случайное добавление одного и того же покемона
        //     if (!existingPokemon) {
        //         state.favorites.push(action.payload);
        //     }
        // },
        // removeFavorite: (state, action: PayloadAction<Pokemon>) => {
        //     state.favorites.filter((p) => p.id !== action.payload.id);
        // },
        // // SAVED
        // addToSaved: (state, action: PayloadAction<Pokemon>) => {
        //     const existingPokemon = state.saved.some((p) => p.id === action.payload.id);
        //     //предотвращает случайное добавление одного и того же покемона
        //     if (!existingPokemon) {
        //         state.saved.push(action.payload);
        //     }
        // },
        // removeSaved: (state, action: PayloadAction<Pokemon>) => {
        //     state.saved.filter((p) => p.id !== action.payload.id);
        // },
// -------------------------------------------
        // Новый редьюсер, чтобы установить начальные данные, полученные с сервера
        setInitialData: (state, action: PayloadAction<{ favorites: Pokemon[], saved: Pokemon[] }>) => {
            state.favorites = action.payload.favorites || [];
            state.saved = action.payload.saved || [];
        },

        // Редьюсер для добавления/удаления из FAVORITE
        toggleFavorite: (state, action: PayloadAction<Pokemon>) => {
            const existingIndexPokemon = state.favorites.findIndex((p) => p.id === action.payload.id);

            if (existingIndexPokemon >= 0) {
                state.favorites.splice(existingIndexPokemon, 1);
            } else {
                state.favorites.push(action.payload);
            }
        },
        // Редьюсер для добавления/удаления из SAVED
        toggleSaved: (state, action: PayloadAction<Pokemon>) => {
            const existingIndexPokemon = state.saved.findIndex((p) => p.id === action.payload.id);

            if (existingIndexPokemon >= 0) {
                state.saved.splice(existingIndexPokemon, 1);
            } else {
                state.saved.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveUserData.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(saveUserData.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { 
    // addToFavorite, 
    // removeFavorite, 
    // addToSaved, 
    // removeSaved,

    toggleFavorite,
    toggleSaved,
    setInitialData,
    
} = pokempnListSlice.actions;

export default pokempnListSlice.reducer;
