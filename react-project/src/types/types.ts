interface PokemonListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

interface PokemonResult {
  name: string;
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: string[];
  game_indices: string[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: string;
  stats: PokemonStat[];
  types: PokemonType[];
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: string;
}

interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

interface PokemonTypePast {
  generation: string;
  types: PokemonType[];
}

interface PokemonHeldItem {
  item: string;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonHeldItemVersion {
  version: string;
  rarity: number;
}

interface PokemonMove {
  move: string;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  move_learn_method: string;
  version_group: string;
  level_learned_at: number;
}

interface PokemonStat {
  stat: string;
  effort: number;
  base_stat: number;
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
  other: { dream_world: { front_default: string } };
}

interface PokemonCries {
  latest: string;
  legacy: string;
}

export type { PokemonListApiResponse, Pokemon };
