import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<{ name: string; url: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<
    { name: string; url: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1304"
        );
        const data = await response.json();
        setPokemon(data.results);
        setFilteredPokemon(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemon();
  }, []);

  const handleSearch = debounce((query: string) => {
    if (!query) {
      setFilteredPokemon(pokemon.slice(0, 5));
      return;
    }
    const filtered = pokemon
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFilteredPokemon(filtered);
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const commandSymbol = isMac ? "⌘ + K" : "Ctrl + K";

  return (
    <div className="py-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full !m-0">
          <div
            onClick={() => setIsOpen(true)}
            className="border p-2 rounded w-full text-left"
          >
            <p className="pl-2 text-gray-400 cursor-text">
              Search Pokemon<kbd className="ml-2">{commandSymbol}</kbd>
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Pokemon</DialogTitle>
            <DialogDescription>
              <input
                type="text"
                placeholder="Search Pokemon..."
                value={searchTerm}
                onChange={onChange}
                className="border p-2 rounded w-full"
              />
            </DialogDescription>
          </DialogHeader>
          <ul className="mt-4">
            {filteredPokemon.map((p) => {
              const pokemonId = p.url.split("/").filter(Boolean).pop();
              return (
                <li
                  key={p.name}
                  className="p-2 border-b hover:bg-slate-100 rounded-xl cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => router.push(`/pokemon/${pokemonId}`)}
                >
                  {p.name}
                </li>
              );
            })}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
