'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Search from './Search';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonData {
  results: Pokemon[];
  previous: string | null;
  next: string | null;
}

const PokemonList = ({ initialData }: { initialData: PokemonData }) => {
  const router = useRouter();
  const [data, setData] = useState<PokemonData>(initialData);

  const fetchData = async (url: string) => {
    const res = await fetch(url);
    const newData = await res.json();
    setData(newData);
  };

  return (
    <div className="container mx-auto flex flex-col gap-5 my-10 p-4">
      <h4 className="text-center text-7xl font-bold my-10">Pokemon</h4>
      <Search />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {data.results.length > 0 ? (
          data.results.map((result) => {
            const pokemonId = result.url.split('/').filter(Boolean).pop();
            const p_id = String(pokemonId).padStart(6, '0');
            return (
              <div
                key={pokemonId}
                className="hover:shadow-xl p-4 border rounded-xl transition-all duration-300 ease-in-out"
              >
                <p>#{p_id}</p>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                  height={500}
                  width={500}
                  alt={result.name}
                  onClick={() => router.push(`/pokemon/${pokemonId}`)}
                />
                <p className="text-center capitalize">{result.name}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-2xl">
            No Pokemon found
          </p>
        )}
      </div>
      <div className="flex w-full justify-between *:px-10 *:border *:py-2 *:rounded-full">
        <button
          disabled={!data.previous}
          onClick={() => data.previous && fetchData(data.previous)}
          className={`${
            !data.previous
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Prev
        </button>
        <button
          disabled={!data.next}
          onClick={() => data.next && fetchData(data.next)}
          className={`${
            !data.next
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
