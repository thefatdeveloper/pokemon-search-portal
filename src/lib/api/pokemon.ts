import axios from 'axios';
import type { 
  Pokemon, 
  PokemonSpecies, 
  PaginatedResults, 
  NamedAPIResource,
  PokemonSearchParams 
} from '@/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a Pokemon by its name or ID
 */
export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
}

/**
 * Fetches a Pokemon species by its name or ID
 */
export async function getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon species:', error);
    throw error;
  }
}

/**
 * Fetches a paginated list of Pokemon
 */
export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PaginatedResults<NamedAPIResource>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}

/**
 * Fetches all Pokemon types
 */
export async function getPokemonTypes(): Promise<PaginatedResults<NamedAPIResource>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/type`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon types:', error);
    throw error;
  }
}

/**
 * Type definition for Pokemon type response
 */
interface PokemonTypeResponse {
  pokemon: Array<{
    pokemon: NamedAPIResource;
    slot: number;
  }>;
  // Add other properties as needed
}

/**
 * Fetches Pokemon by type
 */
export async function getPokemonByType(type: string): Promise<PokemonTypeResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon of type ${type}:`, error);
    throw error;
  }
}

/**
 * Searches Pokemon based on parameters
 */
export async function searchPokemon({ name, type, limit = 20, offset = 0 }: PokemonSearchParams): Promise<Pokemon[]> {
  try {
    // If searching by type
    if (type) {
      const typeData = await getPokemonByType(type);
      const pokemonInType = typeData.pokemon.slice(offset, offset + limit);
      
      // Fetch full Pokemon data for each result
      const pokemonPromises = pokemonInType.map((p: { pokemon: NamedAPIResource; slot: number }) => 
        getPokemon(p.pokemon.name)
      );
      
      return Promise.all(pokemonPromises);
    }
    
    // If searching by name (or no specific search)
    let pokemonList;
    
    if (name) {
      // We'll get all Pokemon and filter client-side since PokeAPI doesn't support partial name search
      pokemonList = await getPokemonList(1000, 0);
      
      const filteredResults = pokemonList.results.filter(p => 
        p.name.includes(name.toLowerCase())
      ).slice(offset, offset + limit);
      
      const pokemonPromises = filteredResults.map(p => getPokemon(p.name));
      return Promise.all(pokemonPromises);
    }
    
    // Just get paginated results if no specific search
    pokemonList = await getPokemonList(limit, offset);
    
    const pokemonPromises = pokemonList.results.map(p => getPokemon(p.name));
    return Promise.all(pokemonPromises);
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    throw error;
  }
}