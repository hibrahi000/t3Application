/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { RouterOutput } from "./api/trpc/[trpc]";
import type React from "react";

const btn =
  " inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: first });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: second });

  const voteMutation = trpc["cast-vote"].useMutation();

  const voteForRoundest = (selected: number) => {
    //todo: fire mutation to persist changes
    selected === first
      ? voteMutation.mutate({ votedFor: first, votedAgainst: second })
      : voteMutation.mutate({ votedFor: second, votedAgainst: first });

    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-3xl text-center pt-8">Which Pokémon is Rounder</div>
      <div className="p-2" />
      <div className="border pb-20  rounded flex justify-between max-w-3xl items-center ">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data!}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8 h-10">VS</div>
              <PokemonListing
                pokemon={secondPokemon.data!}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
        <div className="p-2"></div>
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
    <div className="flex flex-col items-center">
      <img src={props.pokemon.sprites.front_default!} className=" w-64 h-64" />
      <div>{props.pokemon.name}</div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
