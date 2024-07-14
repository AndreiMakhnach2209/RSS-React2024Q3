import { Pokemon, PokemonListApiResponse } from "./types";

function isPokemonListApiResponse(
  obj: Record<string, unknown> | null
): obj is PokemonListApiResponse {
  return (
    !!obj &&
    "count" in obj &&
    "next" in obj &&
    "previous" in obj &&
    "results" in obj
  );
}

function isPokemon(obj: Record<string, unknown> | null): obj is Pokemon {
  return (
    !!obj && "id" in obj && "name" in obj && "sprites" in obj && "types" in obj
  );
}

export { isPokemonListApiResponse, isPokemon };
