import { Note } from './../../models/note';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input()
  public note: Note;

  @Output()
  public getId = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  clicked() {
    this.getId.emit(this.note.id);
  }
}
