import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UndoRedoStoreTestComponent } from './undo-redo-store-test/undo-redo-store-test.component';

const routes: Routes = [
  { path: 'storeundoredo', component: UndoRedoStoreTestComponent },
  { path: '', redirectTo: 'storeundoredo', pathMatch: 'full' },
  { path: '**', redirectTo: 'storeundoredo', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
