import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, props, Store } from '@ngrx/store';
import * as ActionActions from '../actions/action.actions';
import * as PlatformActions from '../actions/platform.actions';
import { tap, first, map, switchMap } from 'rxjs/operators';
import * as UndoRedoActions from '../actions/undo-redo.actions';

@Injectable()
export class DocumentEffects {
  addPlatformEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlatformActions.addPlatform),
        tap((payload) => {
          this.store.dispatch(
            ActionActions.addPlatformAction({ payload: payload })
          );
        })
      ),
    { dispatch: false }
  );

  addMovieEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlatformActions.addMovie),
        tap((payload) => {
          this.store.dispatch(
            ActionActions.addMovieAction({ payload: payload })
          );
        })
      ),
    { dispatch: false }
  );

  editMovieEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlatformActions.editMovie),
        tap((payload) => {
          this.store.dispatch(
            ActionActions.editMovieAction({ payload: payload })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store) {}
}
