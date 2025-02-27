import PokemonList from "@/components/HomePage/PokemonList";

const PokemonPage = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await res.json();

  return <PokemonList initialData={data} />;
};

export default PokemonPage;
