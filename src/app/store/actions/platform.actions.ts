import { createAction, props, union } from '@ngrx/store';
import { Platform } from 'src/app/interfaces/platform';
import { Movie } from 'src/app/interfaces/movie';
import { Change } from 'src/app/interfaces/change';

export const addPlatform = createAction(
  '[Platform] add platform',
  props<{ platform: Platform }>()
);
export const addMovie = createAction(
  '[Platform] add movie',
  props<{ platformId: number; movie: Movie }>()
);
export const editMovie = createAction(
  '[Platform] edit movie',
  props<{ platformId: number; movie: Movie; original: Change }>()
);
