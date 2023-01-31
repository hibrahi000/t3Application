import { z } from "zod";
import { procedure, router } from "../trpc";
import { PokemonClient } from "pokenode-ts";
import { prisma } from "@/server/utils/prisma";

export const appRouter = router({
  "get-pokemon-by-id": procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { name: pokemon.name, sprites: pokemon.sprites };
    }),
  "cast-vote": procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async (req) => {
      const VoteInDb = await prisma.vote.create({
        data: {
          ...req.input,
        },
      });
      return { success: true, vote: VoteInDb };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
