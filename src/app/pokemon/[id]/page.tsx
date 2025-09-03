    "use client";
import React from "react";
import { typeColor } from "../../../../utils/colors";
import { volumeHigh } from "../../../../utils/icons";
import { ArrowLeftCircle, Ruler, Weight } from "lucide-react";
import Image from "next/image";
import { useGetPokemonByNameQuery } from "../../../../redux/pokemonApi";
import { PokemonAbility, PokemonStat, PokemonType } from "../../../../types/pokemon";
import { useParams, useRouter } from "next/navigation";




const PokemonDetails = () => {
    const params = useParams();
    const id = params.id as string;
    const { data: activePokemon, isLoading, error } = useGetPokemonByNameQuery(id);

    const router = useRouter();

    if (isLoading) {
        return (
            <div className="h-[80vh] flex justify-center items-center">
                <div className="loader"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="h-[80vh] flex justify-center items-center">
                <p>An error occurred</p>
            </div>
        );
    }
    if (!activePokemon) {
        return (
            <div className="h-[80vh] flex justify-center items-center">
                <p>Pokemon not found.</p>
            </div>
        );
    }

    return (
        <section
            className="rounded-3xl mt-6 mb-6 px-4 mx-2 md:mx-4 md:px-16 py-8 min-h-[90vh] flex flex-col-reverse md:flex-row gap-8"
            style={{
                background: typeColor[activePokemon?.types[Math.floor(Math.random() * activePokemon?.types.length)].type.name],
            }}
        >
            {/* Блок с информацией о покемоне */}
            <div className="flex flex-col flex-1 gap-6">
                {/* CRY VALUME */}
                <div className="flex gap-4 flex-wrap">
                    <button
                        className="px-4 py-2 flex-grow flex-shrink-0 flex items-center gap-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full hover:bg-white/90 transition-all duration-300 ease-in-out"
                        onClick={() => {
                            const audio = new Audio(activePokemon?.cries.legacy);
                            audio.play();
                        }}
                    >
                        {volumeHigh} Old Cry
                    </button>
                    <button
                        className="px-4 py-2 flex-grow flex-shrink-0 flex items-center gap-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full hover:bg-white/90 transition-all duration-300 ease-in-out"
                        onClick={() => {
                            const audio = new Audio(activePokemon?.cries.latest);
                            audio.play();
                        }}
                    >
                        {volumeHigh} New Cry
                    </button>
                </div>

                {/* Название */}
                <h1 className="text-4xl md:text-6xl font-bold capitalize text-white drop-shadow-sm">
                    {activePokemon?.name}
                </h1>

                {/* Свойства: Способности, Типы */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <h2 className="text-xl md:text-2xl font-bold">Abilities</h2>
                        <ul className="flex flex-wrap gap-2">
                            {activePokemon?.abilities.map((ability: PokemonAbility, index: number) => (
                                <li key={index} className="px-4 py-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full">
                                    {ability.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <h2 className="text-xl md:text-2xl font-bold">Types</h2>
                        <ul className="flex flex-wrap gap-2">
                            {activePokemon?.types.map((type: PokemonType, index: number) => (
                                <li key={index} className="px-4 py-2 text-sm font-bold bg-zinc-700 text-white rounded-full">
                                    {type.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Базовые характеристики */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl font-bold">Base Stats</h2>
                    <ul className="flex flex-col gap-2">
                        {activePokemon?.stats.map((stat: PokemonStat, index: number) => (
                            <li key={index} className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <span className="capitalize text-sm font-semibold md:text-base">
                                        {stat.stat.name}
                                    </span>
                                    <span className="font-bold text-sm md:text-base">
                                        {stat.base_stat}
                                    </span>
                                </div>
                                <div className="w-full h-2 md:h-3 bg-white/15 rounded-md overflow-hidden mt-1">
                                    <div className={`h-full rounded-md bg-white`} style={{ width: `${(stat.base_stat / 200) * 100}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Характеристики: рост, вес, опыт */}
                <div className="flex flex-wrap gap-4 mt-2">
                    <p className="p-4 flex-1 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
                        <span className="text-xs flex items-center gap-2">
                            <Ruler size={18} />
                            Height
                        </span>
                        {activePokemon?.height} m
                    </p>
                    <p className="p-4 flex-1 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
                        <span className="text-xs flex items-center gap-2">
                            <Weight size={18} />
                            Weight
                        </span>
                        {activePokemon?.weight} kg
                    </p>
                    <p className="p-4 flex-1 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
                        <span className="text-xs flex items-center gap-2">
                            <Weight size={18} />
                            Base Ex
                        </span>
                        {activePokemon?.base_experience} xp
                    </p>
                </div>
            </div>

            {/* Блок с изображением */}
            <div className="relative flex-1 flex justify-center items-center h-96 md:h-auto">
                <Image
                    src={`/icons/${activePokemon?.types[0].type.name}.svg`}
                    alt="pokemon type"
                    width={700}
                    height={700}
                    className="absolute opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <Image
                    src={
                        activePokemon?.sprites?.other?.home?.front_shiny ||
                        activePokemon?.sprites?.other?.showdown?.front_default ||
                        activePokemon?.sprites?.front_default || ""
                    }
                    alt="pokemon image"
                    width={500}
                    height={500}
                    className="relative z-10 filter drop-shadow-lg"
                />

                <button
                    onClick={() => router.push('/')}
                    className="absolute -top-2 left-2 md:top-0 md:left-auto md:right-0 text-yellow-400 hover:text-white cursor-pointer"
                >
                    <ArrowLeftCircle className="w-[55px] h-[55px]"/>
                    <p className="hidden md:block">back</p>
                </button>
            </div>
        </section>
    );
};

export default PokemonDetails;
