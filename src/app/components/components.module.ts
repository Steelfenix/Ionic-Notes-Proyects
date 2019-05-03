import { NoteCardComponent } from './note-card/note-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NoteCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [NoteCardComponent]
})
export class ComponentsModule {}
