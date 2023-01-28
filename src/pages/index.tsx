/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { RouterOutput } from "./api/trpc/[trpc]";

const btn =
  " inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: first });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: second });

  const voteForRoundest = (selected: number) => {
    //todo: fire mutation to persist changes

    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-3xl text-center pt-8">Which Pokémon is Rounder</div>
      <div className="p-2" />
      <div className="border pb-20 rounded flex justify-between max-w-3xl items-center ">
        <div className="w-60 h-60 flex flex-col items-center">
          <img
            src={firstPokemon.data?.sprites.front_default || "?"}
            className="w-full"
            alt=""
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest(first)}>
            Rounder
          </button>
        </div>
        <div className="p-8">
          <p>VS</p>
        </div>
        <div className="w-60 h-60 flex flex-col items-center ">
          <img
            src={secondPokemon.data?.sprites.front_default || "?"}
            alt=""
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest(second)}>
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
}

type PokemonFromServer = RouterOutput["get-pokemon-by-id"];

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="w-64 h-64 flex flex-col items-center">
      <img src={props.pokemon.sprites.front_default} className="w-full" />
      <div>{props.pokemon.name}</div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
