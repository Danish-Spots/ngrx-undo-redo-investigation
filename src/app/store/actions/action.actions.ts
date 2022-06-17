import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Platform } from 'src/app/interfaces/platform';
import { Movie } from 'src/app/interfaces/movie';

export const addPlatformAction = createAction(
  '[Actions] add platform',
  props<{
    payload: {
      platform: Platform;
    } & TypedAction<'[Platform] add platform'>;
  }>()
);
export const addMovieAction = createAction(
  '[Actions] add movie',
  props<{
    payload: {
      platformId: number;
      movie: Movie;
    } & TypedAction<'[Platform] add movie'>;
  }>()
);
export const editMovieAction = createAction(
  '[Actions] edit movie',
  props<{
    payload: {
      platformId: number;
      movie: Movie;
    } & TypedAction<'[Platform] edit movie'>;
  }>()
);
