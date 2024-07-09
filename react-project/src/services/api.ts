import { Pokemon, PokemonListApiResponse } from "../types/types";

export default class API {
  private static instance: API | null = null;

  private url = "https://pokeapi.co/api/v2/pokemon/";

  public static getInstance = (): API => {
    if (!this.instance) this.instance = new API();
    return this.instance;
  };

  public async getAllPokemons(): Promise<PokemonListApiResponse> {
    try {
      const response = await fetch(`${this.url}/?limit=1500`);
      if (response.status === 200) {
        const data = await response.json();
        return data as PokemonListApiResponse;
      }
      throw new Error("Something went wrong.");
    } catch (error) {
      throw new Error("Something went wrong.");
    }
  }

  public async getPokemon(identifier: string): Promise<Pokemon> {
    try {
      const response = await fetch(this.url + identifier);
      if (response.status === 200) {
        const data = await response.json();
        return data as Pokemon;
      }
      throw new Error("Something went wrong.");
    } catch (error) {
      throw new Error("Something went wrong.");
    }
  }
}
