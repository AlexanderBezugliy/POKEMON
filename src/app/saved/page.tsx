    'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PagesComponents from '@/components/page/PagesComponents';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useGetUserDataQuery } from '../../../redux/userDataApi';


const SavedPage = () => {
    const { saved } = useSelector((state: RootState) => state.pokemonListsSlice);

    const { user, isLoading: isUserLoading } = useUser();
    // Получаем состояние загрузки из useGetUserDataQuery
    const { isLoading: isDataLoading } = useGetUserDataQuery(undefined, { skip: !user });
    // isUserLoading || isDataLoading будет true, пока идёт загрузка
    const isLoading = isUserLoading || isDataLoading;

    return (
        <main>
            <PagesComponents pokemonFS={saved} title="Saved Pokémon" isLoading={isLoading} />
        </main>
    );
};

export default SavedPage;