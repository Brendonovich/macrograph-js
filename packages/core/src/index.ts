import { getPackages } from "./packages";
export * from "./graph";
export * from "./nodes";
export * from "./pins";
export * from "./utils";
export * from "./packages";
export * from "./engine";
export * from "./types"

export const initialize = async () => {
  await Promise.all(
    Object.values(getPackages()).map((p) => p.engine?.initialize())
  );
};
