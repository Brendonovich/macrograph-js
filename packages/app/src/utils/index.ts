export const importPackages = () => {
  return import.meta.globEager("../packages/**");
};
