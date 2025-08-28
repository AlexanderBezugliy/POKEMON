import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../types/pokemon';



interface UserData {
    favorites: Pokemon[];
    saved: Pokemon[];
}

export const userDataApi = createApi({
    reducerPath: 'userDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    //тег-КЕШИРОВАНИЯ,чтобы сказать RTK Query-все данные связанные с пользователем относятся к одному тегу
    tagTypes: ['UserData'], // Тег для кеширования <------
    endpoints: (builder) => ({
        //запрос на ПОЛУЧЕНИЕ ДАННЫХ
        getUserData: builder.query<UserData, void>({
            // говорит что для получения данных нужно отправить GET на /api/user-data
            query: () => 'user-data',
            //Сообщает RTK Query что ответ на этот запрос предоставляет данные помеченные тегом 'UserData'
            providesTags: ['UserData'], // Связываем запрос с тегом
        }),
    }),
});

export const { 
    useGetUserDataQuery,

} = userDataApi;