"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { arrowAngleRight } from "../../utils/icons";
import { typeColor } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { toggleFavorite, toggleSaved } from "../../redux/slice/PokemonsSlice";
import { Bookmark, Heart, Ruler, Weight } from "lucide-react";
import { Pokemon, PokemonType } from "../../types/pokemon";
import Link from "next/link";

interface PokemonCardProps {
    pokemon: Pokemon;
}
const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const router = useRouter();
    // 2. Получаем dispatch для отправки экшенов
    const dispatch = useDispatch<AppDispatch>();
    // 3. Получаем списки из Redux store с помощью useSelector
    const { favorites, saved } = useSelector(
        (state: RootState) => state.pokemonListsSlice
    );
    // 4. Проверяем, есть ли текущий покемон в списках (используем useMemo для оптимизации)
    const isLiked = useMemo(
        () => favorites.some((p) => p.id === pokemon.id),
        [favorites, pokemon.id]
    );

    const isBookmarked = useMemo(
        () => saved.some((p) => p.id === pokemon.id),
        [saved, pokemon.id]
    );

    const handleLikeClick = () => dispatch(toggleFavorite(pokemon));
    const handleBookmarkClick = () => dispatch(toggleSaved(pokemon));

    return (
        <div className="group relative block">
            <div className="relative p-4 bg-white rounded-xl border-2 border-blue-500 shadow-sm 
                            flex flex-col gap-2 group-hover:animate-wiggle group-hover:animate-ease-in-out 
                            transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 bg-white rounded-tl-xl rounded-tr-xl">
                        <button
                            className="bg-gray-200 p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out"
                            onClick={handleLikeClick}
                        >
                            <Heart
                                fill={isLiked ? "red" : "none"}
                                size={22}
                                className=""
                            />
                        </button>
                        <button
                            className="bg-gray-200 p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out"
                            onClick={handleBookmarkClick}
                        >
                            <Bookmark
                                fill={isBookmarked ? "blue" : "none"}
                                size={20}
                            />
                        </button>
                    </div>

                    <button
                        onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
                        // href={`/pokemon/${pokemon?.name}`}
                        className="p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 text-gray-300 border-gray-300 hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out"
                    >
                        {arrowAngleRight}
                    </button>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Image
                            src={
                                pokemon?.sprites?.other?.home?.front_default ||
                                pokemon?.sprites?.front_default
                            }
                            alt="pokemon image"
                            width={200}
                            height={200}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <div className="mb-2 flex gap-2">
                            <p className="flex flex-col items-center justify-between text-xs uppercase font-semibold text-gray-500">
                                <Ruler className="text-blue-500" />
                                {pokemon?.height} m
                            </p>
                            <p className="flex flex-col items-center justify-between text-xs uppercase font-semibold text-gray-500">
                                <Weight className="text-blue-500" />
                                {pokemon?.weight} kg
                            </p>
                            <p className="flex flex-col items-center justify-between text-xs uppercase font-semibold text-gray-500">
                                <span className="text-lg text-blue-500">
                                    XP
                                </span>
                                {pokemon?.base_experience} xp
                            </p>
                        </div>

                        <h2 className="text-2xl text-gray-800 capitalize font-bold text-center">
                            {pokemon?.name}
                        </h2>

                        <div className="flex justify-center gap-2">
                            {pokemon?.types?.map(
                                (type: PokemonType, index: number) => (
                                    <p
                                        key={index}
                                        className="text-xs uppercase font-semibold text-white px-5 py-1 rounded-full"
                                        style={{
                                            backgroundColor:
                                                typeColor[type?.type?.name],
                                        }}
                                    >
                                        {type.type.name}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
