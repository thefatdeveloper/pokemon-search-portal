// Basic Pokemon information
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  species: NamedAPIResource;
}

// Type for a named resource that has a URL
export interface NamedAPIResource {
  name: string;
  url: string;
}

// Pokemon type information
export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

// Pokemon sprites
export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string;
  back_shiny: string;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string;
    };
  };
}

// Pokemon ability
export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

// Pokemon stat
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

// Pokemon species
export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolution_chain: {
    url: string;
  };
  generation: NamedAPIResource;
  names: {
    name: string;
    language: NamedAPIResource;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
}

// API response for paginated results
export interface PaginatedResults<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Search parameters for Pokemon API
export interface PokemonSearchParams {
  name?: string;
  type?: string;
  limit?: number;
  offset?: number;
}