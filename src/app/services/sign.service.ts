import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import ISignature from '../models/signature.model';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import BasicForm from '../models/bacisForm.model';
import { ImageDetails } from '../models/imageForm.model';
import firebase from 'firebase/compat/app'
import { SocialMedia } from '../models/socialForm.model';
import DesignForm from '../models/designForm.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignService {
  user: firebase.User | null = null
  public signCollection: AngularFirestoreCollection<ISignature>
  // Basic Form
  private basicData: BehaviorSubject<BasicForm[]> = new BehaviorSubject<BasicForm[]>(null!);
  basicData$: Observable<BasicForm[]> = this.basicData.asObservable();
// Image Form
private imageData: BehaviorSubject<ImageDetails[]> = new BehaviorSubject<ImageDetails[]>(null!);
  imageData$: Observable<ImageDetails[]> = this.imageData.asObservable();
  // Social Media Form
  private socialMediaData: BehaviorSubject<SocialMedia[]> = new BehaviorSubject<SocialMedia[]>(null!);
  socialMediaData$: Observable<SocialMedia[]> = this.socialMediaData.asObservable();
   // Design Form
   private designData: BehaviorSubject<DesignForm[]> = new BehaviorSubject<DesignForm[]>(null!);
   designData$: Observable<DesignForm[]> = this.designData.asObservable();

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) { 
    this.signCollection = db.collection('signature'),
    auth.user.subscribe(user => this.user = user)
  }

  async createSign(data: ISignature)  {
    return this.signCollection.doc(this.user?.uid as string,).set(data)
  }

  setData(updatedData:any) {
    this.basicData.next(updatedData);
  }
  setImageData(updatedData:any) {
    this.imageData.next(updatedData);
  }
  setSocialMediaData(updatedData:any) {
    this.socialMediaData.next(updatedData);
  }
  setDesignData(updatedData:any) {
    this.designData.next(updatedData);
  }

  getSignatureData() { 
    return this.db.collection('signature').snapshotChanges()
  }
}