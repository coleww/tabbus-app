import { Riff } from './types';

export const defaultGuitarTuning = ['e', 'b', 'g', 'd', 'a', 'e'];
export const defaultBassTuning = ['g', 'd', 'a', 'e'];

// https://stackoverflow.com/a/54318054
export function isDefined<T>(argument: T | void): argument is T {
  return argument !== undefined && argument !== null;
}

// https://stackoverflow.com/a/2117523
export function uid(): string {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

export function makeRiff(tuning: string[], songId: string): Riff {
  return {
    data: tuning.map(() => {
      return Array(24).fill('');
    }),
    tuning: tuning,
    id: uid(),
    songId: songId,
  };
}
