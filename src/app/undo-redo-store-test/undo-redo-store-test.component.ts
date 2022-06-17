import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app.state';
import { Platform } from '../interfaces/platform';
import { Movie } from '../interfaces/movie';
import * as PlatformActions from '../store/actions/platform.actions';
import { selectPlatforms } from '../store/selectors/platform.selector';
import { id } from '../interfaces/platform';
import * as UndoRedoActions from '../store/actions/undo-redo.actions';

@Component({
  selector: 'app-undo-redo-store-test',
  templateUrl: './undo-redo-store-test.component.html',
  styleUrls: ['./undo-redo-store-test.component.scss'],
})
export class UndoRedoStoreTestComponent implements OnInit {
  platforms$ = this.store.select(selectPlatforms);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addMovie(platformId: number) {
    const newMovie: Movie = {
      id: id(),
      title: '',
      text: '',
    };
    this.store.dispatch(
      PlatformActions.addMovie({
        platformId: platformId,
        movie: newMovie,
      })
    );
  }

  addPlatform() {
    const newPlatform: Platform = {
      id: id(),
      movies: [],
    };
    this.store.dispatch(PlatformActions.addPlatform({ platform: newPlatform }));
  }

  editMovie(event: any, platformId: number, movie: Movie) {
    if (movie.text === event.target.value) {
      return;
    }
    const newMovie: Movie = {
      id: movie.id,
      title: movie.title,
      text: event.target.value,
    };
    this.store.dispatch(
      PlatformActions.editMovie({
        platformId: platformId,
        movie: newMovie,
      })
    );
  }

  editMovieTitle(event: any, platformId: number, movie: Movie) {
    if (movie.title === event.target.value) {
      return;
    }
    const newMovie: Movie = {
      id: movie.id,
      title: event.target.value,
      text: movie.text,
    };
    this.store.dispatch(
      PlatformActions.editMovie({
        platformId: platformId,
        movie: newMovie,
      })
    );
  }

  undo() {
    this.store.dispatch(UndoRedoActions.undoAction());
  }

  redo() {
    this.store.dispatch(UndoRedoActions.redoAction());
  }
}
