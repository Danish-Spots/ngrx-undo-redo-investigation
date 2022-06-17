import { Movie } from './movie';

export const id = (): number => +Math.random().toString().split('.')[1];

export interface Platform {
  id: number;
  movies: Movie[];
}
