
export interface PokemonListResponse {
    results: { 
        name: string; 
        url: string 
    }[];
}

// ССылка на сам ресурс {name, url}
export interface NamedAPIResource {
    name: string;
    url: string;
}
  
// ABILITY
export interface PokemonAbility {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}
  
// STAT
export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}
  
//  Тип для спрайтов (изображений)
export interface PokemonSprites {
    front_default: string ;
    back_default: string ;
    other: {
      home: {
        front_default: string | null;
        front_shiny: string | null;
      };
      showdown: {
        front_default: string | null;
      };
    };
}
  
// CRYYYYYY
export interface PokemonCries {
    latest: string;
    legacy: string;
}
  
// POKEMON TYPE
export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}
  
// INFO / DETAILS
export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: PokemonAbility[];
    cries: PokemonCries;
    forms: NamedAPIResource[];
    is_default: boolean;
    location_area_encounters: string;
    order: number;
    species: NamedAPIResource;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
}

// FILTERS Pokemons
export interface FiltersProps {
    filters: {
        type: string;
        ability: string;
        weight: string;
        height: string;
        sortOrder: string;
    };
    onFilterChange: (key: string, value: string) => void;
    onClear: () => void;
}