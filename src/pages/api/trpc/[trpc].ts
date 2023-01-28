import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter, AppRouter } from "@/server/routers/_app";
import {
  inferProcedureOutput,
  inferRouterInputs,
  inferRouterOutputs,
} from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
