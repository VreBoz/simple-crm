import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  // Deklaration von Klassenvariablen.
  userId: any = ""; 
  docRef: any; 
  docSnap: any; 

  user: User = new User(); // Initialisierung einer neuen User-Instanz.

  // Konstruktor mit injizierten Abhängigkeiten.
  constructor(private route: ActivatedRoute, private firestore: Firestore) {                  
      this.userId = this.route.snapshot.paramMap.get('id');                // Holt die 'id' aus der aktuellen Route und speichert sie in 'userId'.
      this.docRef = doc(collection(this.firestore, 'users'), this.userId); // Erzeugt einen Verweis auf das gewünschte Dokument in Firestore.
      this.getUser();                                                       // Ruft die Methode auf, um die Benutzerdaten abzurufen.
  }

  // Asynchrone Methode zum Abrufen von Benutzerdaten aus Firestore.
  async getUser() {
    this.docSnap = await getDoc(this.docRef);          // Holt das Dokument von Firestore asynchron.
    this.user = new User(this.docSnap.data());        // Initialisiert die 'user'-Instanz mit den Daten aus dem Firestore-Dokument.
    console.log('das ist get user', this.user);        // Gibt die geholten Benutzerdaten in der Konsole aus.
  }

  openAddressDialog() {
    console.log('open address dialog');
  }
  

  // ngOnInit(): void{
  //   // this.route.paramMap.subscribe(paramMap => {
  //   //   this.userId = paramMap.get('id');
  //   //   this.getUser();
  //   // })
  // }

  // userId = '';
  // user: any = {};
  // users$: Observable<any[]>;

  // constructor(private firestore: Firestore, private route: ActivatedRoute) {
  //   this.route.params.subscribe(params => {
  //     this.userId = params['id'];
  //     console.log(this.userId);
  //     this.getUser();
  //   });
  // }

  // getUser() {
  //   const userCollection = collection(this.firestore, 'users').doc(this.userId);
  //   collectionData(userCollection, { idField: 'id' }).subscribe(data => {
  //     this.user = data;
  //     console.log(this.user);
  //   });
  // }
      
  

 
 
}
