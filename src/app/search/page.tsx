'use client';
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container } from '@/components/layout/common/Container';
import { Section } from '@/components/layout/common/Section';
import { Divider } from '@/components/layout/common/Divider';
import { SearchBar } from '@/components/search/SearchBar';
import { searchPokemon } from '@/lib/api/pokemon';
import type { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

export default function SearchPage() {
  const [_query, setQuery] = useState('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load initial Pokemon
  useEffect(() => {
    const fetchInitialPokemon = async () => {
      try {
        setLoading(true);
        const results = await searchPokemon({ limit: 20 });
        setPokemonList(results);
        setError(null);
      } catch (err) {
        console.error('Error fetching initial Pokemon:', err);
        setError('Failed to load Pokémon. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialPokemon();
  }, []);
  
  // Handle search
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    try {
      setLoading(true);
      if (!searchQuery.trim()) {
        // Fetch default list if search is cleared
        const results = await searchPokemon({ limit: 20 });
        setPokemonList(results);
      } else {
        const results = await searchPokemon({ name: searchQuery });
        setPokemonList(results);
      }
      setError(null);
    } catch (err) {
      console.error('Error searching Pokemon:', err);
      setError('Failed to search Pokémon. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <Section className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Pokémon Search</h1>
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search by name..." />
          </div>
          
          <Divider />
          
          {/* Results section */}
          <div className="mt-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Pokémon...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : pokemonList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No Pokémon found. Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemonList.map((pokemon) => (
                  <div 
                    key={pokemon.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-4">
                        <Image
                          src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                          alt={pokemon.name}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold capitalize mb-2">{pokemon.name}</h3>
                      <div className="flex gap-2 mb-3">
                        {pokemon.types.map((type) => (
                          <span 
                            key={type.type.name}
                            className="inline-block text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                      <div className="w-full grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>Height: {pokemon.height / 10}m</div>
                        <div>Weight: {pokemon.weight / 10}kg</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </Container>
    </div>
  );
}