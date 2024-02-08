export const arrayRange = (from: number, to: number) => {
  return Array.from(Array(Math.max(0, to - from + 1)), (_o, idx) => idx + from);
};
