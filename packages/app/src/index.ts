export function Test<T extends string>(items: T[]): { [key in T]: boolean } {
  return items.reduce((acc, item) => ({ ...acc, [item]: true }), {} as any);
}

const test = Test(["jeff", "haha"]);
