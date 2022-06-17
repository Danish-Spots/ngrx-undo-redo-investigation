import { Platform } from './platform';

export interface PlatformState {
  platforms: Platform[];
  undoActions: any[];
  redoActions: any[];
}
