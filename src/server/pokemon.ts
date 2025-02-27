"use server";

export const getPokemons = async (url: string) => {
  try {
    const result = await fetch(url || "https://pokeapi.co/api/v2/pokemon");
    return result.json();
  } catch (error) {
    console.log("Error :: ", error);
  }
};

export const getPokemonsInDetail = async (id: number) => {
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return result.json();
  } catch (error) {
    console.log("Error :: ", error);
  }
};
