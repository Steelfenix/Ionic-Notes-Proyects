import { AngularFireService } from './../services/angular-fire.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, LoadingController } from '@ionic/angular';

import { CreateNotePage } from './create-note.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNotePage
  },
  {
    path: ':id',
    component: CreateNotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateNotePage],
  providers: [AngularFireService, LoadingController]
})
export class CreateNotePageModule {}
