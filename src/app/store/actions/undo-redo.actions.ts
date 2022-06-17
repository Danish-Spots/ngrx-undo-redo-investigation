import { createAction } from '@ngrx/store';

export const undoAction = createAction('[UndoRedo] undo');

export const redoAction = createAction('[UndoRedo] redo');
