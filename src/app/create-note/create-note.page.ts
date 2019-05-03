import { LoadingController } from '@ionic/angular';
import { AngularFireService } from './../services/angular-fire.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss']
})
export class CreateNotePage implements OnInit {
  id = '';
  title = '';
  content = '';

  constructor(
    private dbService: AngularFireService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!_.isNil(this.id)) {
      this.getNote();
    }
  }

  async getNote() {
    const loading = await this.loadingController.create({
      message: 'Loading Notes ...'
    });
    loading.present();
    this.dbService.getNote(this.id).subscribe(
      data => {
        const note = new Note();
        Object.assign(note, data.payload.data());

        this.content = note.content;
        this.title = note.title;

        loading.dismiss();
      },
      error => {
        loading.dismiss();
      }
    );
  }

  submitNote() {
    const note: Note = this.createNoteObject(
      this.id,
      this.title,
      this.content,
      new Date()
    );

    !_.isNil(this.id) ? this.updateNote(note) : this.addNote(note);
  }

  updateNote(note: Note) {
    this.dbService.updateNote(note.id, note).subscribe(
      ok => {
        this.router.navigate(['/home']);
      },
      error => {}
    );
  }

  addNote(note: Note) {
    this.dbService.addNote(note).subscribe(
      ok => {
        this.router.navigate(['/home']);
      },
      error => {}
    );
  }

  createNoteObject(
    id: string,
    title: string,
    content: string,
    creationDate: Date
  ): Note {
    return {
      id,
      title,
      content,
      creationDate
    };
  }
}
