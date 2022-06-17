import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app.state';
import { PlatformState } from 'src/app/interfaces/platform.state';

export const selectState = (state: AppState) => state;

export const selectPlatformState = (state: AppState) => state.platformState;

export const selectPlatforms = createSelector(
  selectPlatformState,
  (platformState: PlatformState) => platformState.platforms
);
