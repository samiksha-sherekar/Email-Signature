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
    console.log(data)
    // // const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password)
    // if(!userCred.user){
    //   throw new Error("User can't be found")
    // }
    return this.signCollection.doc(this.user?.uid as string,).set(data)
  }

  setData(updatedData:any) {
    console.log(updatedData)
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
  features:any[]=[]
  usersCollection:any
  getSignatureData() { 
    // return this.db.doc('signature/this.user?.uid').snapshotChanges()
    return this.db.collection('signature').snapshotChanges()
    // .pipe(
    //   map(changes => changes.map(({ payload: { doc } }) => {
    //     const data = doc.data();
    //     const id = doc.id
    //     return { id, ...data as Record<string, unknown> };
    //   })),)
    // this.usersCollection = this.db.collection('signature', ref => ref.where('uid', '==', this.user?.uid))
    // console.log(this.usersCollection)
    //  this.db.collection('signature')
    // .doc('this.user?.uid')
    // .snapshotChanges()
    // .subscribe((res: any) => {
    //   this.features = []
    //   var a:any[]=[]
    //   a.push(res)
    //   res.forEach((element:any, x:any) => {
    //     console.log(element.payload.doc.data().uid,element.payload.doc.uid,this.user?.uid,x,element.payload.doc.uid==this.user?.uid)
    //     if(element.payload.doc.data().uid==this.user?.uid)
    //     this.features.push({
    //       uid: element.payload.doc.uid,
    //       ...(element.payload.doc.data() as Record<string, unknown>)
    //     })
    //   })
    //   return this.features
      // console.log(this.features)
    // })
  }
}