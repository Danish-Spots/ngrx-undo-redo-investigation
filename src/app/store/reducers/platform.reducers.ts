import { createReducer, on } from '@ngrx/store';
import { Platform } from 'src/app/interfaces/platform';
import { PlatformState } from 'src/app/interfaces/platform.state';

import * as DocumentActions from '../actions/platform.actions';
import * as ActionActions from '../actions/action.actions';
import * as UndoRedoActions from '../actions/undo-redo.actions';
import { Movie } from 'src/app/interfaces/movie';
import { UndoActionInterfaceEditMovie } from 'src/app/interfaces/undo-action.interface';

export const initialState: PlatformState = {
  platforms: [],
  undoActions: [],
  redoActions: [],
};

export const documentReducer = createReducer(
  initialState,
  on(DocumentActions.addPlatform, (state, props) => {
    return {
      ...state,
      platforms: [...state.platforms, props.platform],
    };
  }),
  on(DocumentActions.addMovie, (state, props) => {
    const newState: PlatformState = JSON.parse(JSON.stringify(state));
    const dIndex: number = newState.platforms.findIndex((d) => d.id === props.platformId);
    if (dIndex > -1) {
      const document: Platform = newState.platforms[dIndex];
      document.movies.push(props.movie);
      newState.platforms.splice(dIndex, 1, document);
    }
    return newState;
  }),
  on(DocumentActions.editMovie, (state, props) => {
    const newState: PlatformState = JSON.parse(JSON.stringify(state));
    const dIndex = newState.platforms.findIndex((d) => d.id === props.platformId);
    if (dIndex > -1) {
      const document = newState.platforms[dIndex];
      const sIndex = document.movies.findIndex((s) => s.id === props.movie.id);
      if (sIndex > -1) {
        document.movies.splice(sIndex, 1, props.movie);
      }
    }
    return newState;
  }),
  on(ActionActions.addPlatformAction, (state, props) => {
    const newState: PlatformState = JSON.parse(JSON.stringify(state));
    newState.undoActions = [...newState.undoActions, props.payload];
    newState.redoActions = [];
    return newState;
  }),
  on(ActionActions.addMovieAction, (state, props) => {
    const newState: PlatformState = JSON.parse(JSON.stringify(state));
    newState.undoActions = [...newState.undoActions, props.payload];
    newState.redoActions = [];
    return newState;
  }),
  on(ActionActions.editMovieAction, (state, props) => {
    const newState: PlatformState = JSON.parse(JSON.stringify(state));
    newState.undoActions = [...newState.undoActions, props.payload];
    newState.redoActions = [];
    return newState;
  }),
  on(UndoRedoActions.undoAction, (state) => {
    const stateCopy: PlatformState = JSON.parse(JSON.stringify(state));

    stateCopy.undoActions = state.undoActions.slice(0, -1);
    stateCopy.redoActions.push(...state.undoActions.slice(-1));
    const undoAction = state.undoActions.slice(-1)[0];
    switch (undoAction.type) {
      case '[Platform] add platform':
        stateCopy.platforms.splice(stateCopy.platforms.length - 1, 1);
        break;
      case '[Platform] add movie':
        const pIndex: number = stateCopy.platforms.findIndex((p) => p.id === undoAction.platformId);
        if (pIndex > -1) {
          const platCopy: Platform = JSON.parse(JSON.stringify(stateCopy.platforms[pIndex]));
          platCopy.movies.splice(platCopy.movies.length - 1, 1);
          stateCopy.platforms.splice(pIndex, 1, platCopy);
        }
        break;
      case '[Platform] edit movie':
        const pIndexEdit: number = stateCopy.platforms.findIndex((p) => p.id === undoAction.platformId);
        if (pIndexEdit > -1) {
          const platCopy: Platform = JSON.parse(JSON.stringify(stateCopy.platforms[pIndexEdit]));
          const mIndex: number = platCopy.movies.findIndex((m) => m.id === undoAction.movie.id);
          if (mIndex > -1) {
            const movie = platCopy.movies[mIndex];
            const movieCopy = { ...movie, ...undoAction.original };
            platCopy.movies.splice(mIndex, 1, movieCopy);
            stateCopy.platforms.splice(pIndexEdit, 1, platCopy);
          }
        }
        break;
      default:
        break;
    }

    return stateCopy;
  }),
  on(UndoRedoActions.redoAction, (state) => {
    const newState: PlatformState = JSON.parse(JSON.stringify(state));
    const redoAction = newState.redoActions.splice(newState.redoActions.length - 1, 1)[0];
    if (redoAction) {
      switch (redoAction.type) {
        case '[Platform] add platform':
          const newPlatform: Platform = redoAction.platform;
          newState.platforms.push(newPlatform);
          newState.undoActions.push(redoAction);
          break;
        case '[Platform] add movie':
          const pIndex: number = newState.platforms.findIndex((p) => p.id === redoAction.platformId);
          if (pIndex > -1) {
            const platCopy: Platform = JSON.parse(JSON.stringify(newState.platforms[pIndex]));
            platCopy.movies.push(redoAction.movie);
            newState.platforms.splice(pIndex, 1, platCopy);
            newState.undoActions.push(redoAction);
          }
          break;
        case '[Platform] edit movie':
          const pIndexEdit: number = newState.platforms.findIndex((p) => p.id === redoAction.platformId);
          if (pIndexEdit > -1) {
            const platCopy: Platform = JSON.parse(JSON.stringify(newState.platforms[pIndexEdit]));
            const mIndex: number = platCopy.movies.findIndex((m) => m.id === redoAction.movie.id);
            if (mIndex > -1) {
              platCopy.movies.splice(mIndex, 1, redoAction.movie);
              newState.platforms.splice(pIndexEdit, 1, platCopy);
              newState.undoActions.push(redoAction);
            }
          }
          break;
        default:
          break;
      }
    }
    return newState;
  })
);
