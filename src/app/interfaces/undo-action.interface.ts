import { Platform } from '@angular/cdk/platform';
import { Change } from './change';
import { Movie } from './movie';

export interface UndoActionInterfaceEditMovie {
  type: string;
  platformId: number;
  movie: Movie;
  original: Change;
}
export interface UndoActionInterfaceAddMovie {}
export interface UndoActionInterfaceAddPlatform {}
