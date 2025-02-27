import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPokemonsInDetail } from "@/server/pokemon";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

const PokemonDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) => {
  const { id } = await params;
  if (!params || !id) return <p className="text-center">Invalid Pokemon ID</p>;

  
  const pokemonId: number = Number(id[0]);
  const pokemon = await getPokemonsInDetail(pokemonId);

  return (
    <div className="container mx-auto flex flex-col items-center gap-6 my-10 p-4 md:p-8">
      <div className="w-full">
        <Link href={"/pokemon"} className=" place-self-start">
          Back
        </Link>
      </div>
      <div className="flex items-center flex-col md:flex-row gap-4 justify-evenly w-full">
        <div className="flex justify-between flex-col h-full gap-4">
          <Card className="w-full max-w-sm md:max-w-md shadow-lg">
            <CardContent className="flex justify-center p-6">
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                height={400}
                width={400}
                alt={pokemon.name}
                priority
                className="rounded-lg"
              />
            </CardContent>
          </Card>
          <h1 className="text-4xl md:text-5xl capitalize font-bold text-gray-800 text-center">
            {pokemon.name} <span className="text-gray-500">#{pokemonId}</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3">
            {pokemon.types.map(
              ({ type }: { type: { name: string } }, index: number) => (
                <Badge
                  key={index}
                  className="px-4 py-2 capitalize bg-gray-300 text-gray-900"
                >
                  {type.name}
                </Badge>
              )
            )}
          </div>
        </div>

        <div className="w-full max-w-2xl text-center space-y-6">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Abilities</h2>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {pokemon.abilities.map(
                  (
                    { ability }: { ability: { name: string } },
                    index: number
                  ) => (
                    <Badge
                      key={index}
                      className="px-4 py-2 capitalize bg-blue-300 text-blue-900"
                    >
                      {ability.name}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {pokemon.stats.map(
                  (
                    {
                      base_stat,
                      stat,
                    }: { base_stat: number; stat: { name: string } },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex justify-between border p-2 rounded-md bg-white shadow"
                    >
                      <span className="capitalize">{stat.name}</span>
                      <span className="font-semibold">{base_stat}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Additional Info</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center mt-2">
                <div>
                  <h3 className="text-lg font-semibold">Base Exp</h3>
                  <p className="text-gray-700">{pokemon.base_experience}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Weight</h3>
                  <p className="text-gray-700">{pokemon.weight} kg</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Height</h3>
                  <p className="text-gray-700">{pokemon.height} m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Moves</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {pokemon.moves
              // .slice(0, 10)
              .map(({ move }: { move: { name: string } }, index: number) => (
                <Badge
                  key={index}
                  className="px-4 py-2 capitalize bg-green-300 text-green-900 hover:text-white cursor-default"
                >
                  {index + 1}. {move.name}
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetailPage;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;

  if (!id) {
    return { title: 'Pokemon Details' };
  }

  const pokemonId = Number(id);
  if (isNaN(pokemonId)) {
    return { title: 'Pokemon Details' };
  }

  const pokemon = await getPokemonsInDetail(pokemonId);

  return {
    title: `${pokemon.name.toUpperCase()} - Pokemon Details`,
    description: `Explore details of ${pokemon.name} including stats, abilities, moves, and more.`,
    openGraph: {
      images: [pokemon.sprites.other['official-artwork'].front_default],
    },
  };
};
