/* eslint-disable @next/next/no-img-element */
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { useState } from "react";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: first });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-3xl text-center pt-8">Which Pokémon is Rounder</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center ">
        <div className="w-60 h-60 flex flex-col">
          <img
            src={firstPokemon.data?.sprites.front_default || "?"}
            className="w-full"
            alt=""
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">
          <p>VS</p>
        </div>
        <div className="w-60 h-60 flex flex-col ">
          <img
            src={secondPokemon.data?.sprites.front_default || "?"}
            alt=""
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
        </div>
      </div>
    </div>
  );
}
