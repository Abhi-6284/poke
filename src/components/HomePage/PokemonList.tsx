"use client";

import { getPokemons } from "@/server/pokemon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Search from "./Search";

const PokemonList = () => {
  const router = useRouter();
  const [responses, setResponses] = useState<{
    results: { name: string; url: string }[];
    previous: string | null;
    next: string | null;
  } | null>(null);

  const [currentUrl, setCurrentUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );

  // Fetch Pokémon list or a single Pokémon based on search query
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons(currentUrl);
      console.log("data :: ", );
      
      setResponses(data);
    };

    fetchData();
  }, [currentUrl]);

  if (!responses) return <p className="text-center text-2xl">Loading...</p>;

  return (
    <div className="container mx-auto flex flex-col gap-5 my-10 p-4">
      <h4 className="text-center text-7xl font-bold my-10">Pokemon</h4>
      <Search />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {responses.results.length > 0 ? (
          responses.results.map((result) => {
            const pokemonId = result.url.split("/").filter(Boolean).pop();
            const p_id = String(pokemonId).padStart(6, "0");
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
          <p className="text-center col-span-full text-2xl">No Pokémon found</p>
        )}
      </div>
      <div className="flex w-full justify-between *:px-10 *:border *:py-2 *:rounded-full">
        <button
          disabled={!responses.previous}
          onClick={() =>
            responses.previous && setCurrentUrl(responses.previous)
          }
          className={`${
            !responses.previous
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
        <button
          disabled={!responses.next}
          onClick={() => responses.next && setCurrentUrl(responses.next)}
          className={`${
            !responses.next
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
