import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';
import { Note } from '../models/note';
import { config } from '../app.config';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Observable } from 'rxjs';
@Injectable()
export class AngularFireService {
  notes: AngularFirestoreCollection<Note>;
  private notesDoc: AngularFirestoreDocument<Note>;

  constructor(private firebase: AngularFirestore) {}

  addNote(note: Note): Observable<DocumentReference> {
    return fromPromise(
      this.firebase.collection(config.collection_endpoint).add(note)
    );
  }

  updateNote(id: string, note: Note): Observable<void> {
    delete note.id;
    this.notesDoc = this.firebase.doc(`${config.collection_endpoint}/${id}`);
    return fromPromise(this.notesDoc.update(note));
  }

  deleteNote(id: string): Observable<void> {
    this.notesDoc = this.firebase.doc(`${config.collection_endpoint}/${id}`);
    return fromPromise(this.notesDoc.delete());
  }

  getNote(id: string) {
    return this.firebase
      .collection(config.collection_endpoint)
      .doc(id)
      .snapshotChanges();
  }

  getNotes() {
    return this.firebase
      .collection(config.collection_endpoint, ref =>
        ref.orderBy('creationDate', 'desc')
      )
      .snapshotChanges();
  }
}
