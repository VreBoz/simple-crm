import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users$: Observable<any>;  // Declare the users$ observable
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  allUsers: any[] = [];
  

  constructor(public dialog: MatDialog) {
    const userCollection  = collection(this.firestore, 'users');

    // Assign the data from Firestore to the users$ observable
    this.users$ = collectionData(userCollection, { idField: 'id' });

    this.users$.subscribe((newUsers) => {
      this.allUsers = newUsers;
      console.log('neue User sind', newUsers);  
      
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}