    'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useGetUserDataQuery } from '../../redux/userDataApi';
import { saveUserData, setInitialData } from '../../redux/slice/PokemonsSlice';

import { debounce } from 'lodash';


const UserDataLoader = () => {
    // Хук от Auth0 который предоставляет информацию о текущем пользователе
    const { user } = useUser();

    const dispatch = useDispatch<AppDispatch>();
    //skip: true -не делать запрос если пользователя нет
    //Хук RTK Query который автоматически запускает GET на сервер: если user существует(skip: !user) 
    //Когда данные приходят он сохраняет их в userData
    const { data: userData } = useGetUserDataQuery(undefined, {
        skip: !user,
    });
    
    const { favorites, saved } = useSelector((state: RootState) => state.pokemonListsSlice);
    //Флаг чтобы убедиться что начальные данные загружены только один раз
    const isInitialDataLoaded = useRef(false);
    //Когда данные с сервера приходят диспатчим(action) чтобы заполнить стейт
    useEffect(() => {
        if (userData && !isInitialDataLoaded.current) {
            dispatch(setInitialData(userData));
            isInitialDataLoaded.current = true;
        }
    }, [userData, dispatch]);
    //Создаем debounced-функцию для сохранения
    //чтобы избежать слишком частых запросов к серверу
    //Если пользователь быстро добавит 5 покемонов debounce отправит только один запрос а не пять
    const debouncedSave = useRef(
        debounce(() => {
            dispatch(saveUserData());
        }, 1500) //через 1.5 секунды после изменения
    ).current;

    //Следим за изменениями в favorites/saved
    //Если они изменились вызываем debounced
    useEffect(() => {
        //Не сохраняем пока начальные данные не загрузятся чтобы избежать перезаписи
        if (!isInitialDataLoaded.current) {
            return;
        }
        
        debouncedSave();

        return () => {
            debouncedSave.cancel(); //Отменяем таймер при размонтировании
        };
    }, [favorites, saved, debouncedSave]);


    return null; // Этот компонент ничего не рендерит
};

export default UserDataLoader;