import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireService } from './../services/angular-fire.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  noteList: Note[] = [];

  constructor(
    private dbService: AngularFireService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getNotes();
  }

  async getNotes() {
    const loading = await this.loadingController.create({
      message: 'Loading Notes ...'
    });
    loading.present();
    this.dbService.getNotes().subscribe(
      data => {
        this.noteList = data.map(o => {
          const note = new Note();
          Object.assign(note, o.payload.doc.data());
          note.id = o.payload.doc.id;
          return note as Note;
        });

        loading.dismiss();
      },
      error => {
        loading.dismiss();
      }
    );
  }

  updateNote(id: string) {
    this.router.navigate(['home/create-note', id]);
  }
}
