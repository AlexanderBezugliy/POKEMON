    'use client';
import React from "react";
import PagesComponents from "@/components/page/PagesComponents";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useGetUserDataQuery } from "../../../redux/userDataApi";



const FavoritesPokemon = () => {
    const { favorites } = useSelector((state: RootState) => state.pokemonListsSlice);
    //Хук Auth0(для управления состоянием аутентификации пользователя на клиенте)
    const { user, isLoading: isUserLoading } = useUser();
    // Получаем состояние загрузки из useGetUserDataQuery
    const { isLoading: isDataLoading } = useGetUserDataQuery(undefined, { skip: !user });
    // isUserLoading || isDataLoading будет true сначала во время аутентификации затем во время загрузки данных из базы
    const isLoading = isUserLoading || isDataLoading;

    return (
        <main>
            <PagesComponents pokemonFS={favorites} title="Favorite Pokémon" isLoading={isLoading} />
        </main>
    );
};

export default FavoritesPokemon;
