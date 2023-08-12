import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId = '';
  user: any = {};
  firestore: Firestore = inject(Firestore);

  constructor( private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
      this.getUser();
    });
  }

  getUser() {
    const usersCollection = collection(this.firestore, 'users');
    const usersCollectionData = collectionData(usersCollection);
    usersCollectionData.subscribe(users => {
      this.user = users.find(user => user.id === this.userId);
    });
  

 
 
}
