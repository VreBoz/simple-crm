import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import {  MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  // user$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    
    
    const userCollection  = collection(this.firestore, 'users');
    // this.user$ = collectionData(itemCollection);
  }
  closeDialog() {
    this.dialogRef.close();
  }




  user: User = new User();
  birthDate!: Date;
  loading = false;

 
  


// describe this function: save the user to firestore
  
  saveUser() { 
    this.user.birthDate = this.birthDate.getTime(); // describe this line : convert date to timestamp
    console.log('current user is ', this.user); // describe this line : log the user
    this.loading = true;                        // describe this line : set loading to true

    // add to firestore
    const userCollection  = collection(this.firestore, 'users');  // describe this line: create a collection
    addDoc(userCollection, this.user.toJSON())                    // describe this line addDoc: add a document to a collection 
    .then(() => {   
      this.loading = false;                                      // describe this line: set loading to false                                            // describe this line: addDoc returns a promise
      console.log('user added')});                                // describe this line: log the result of the promise
    
     this.dialogRef.close();                                  // describe this line: close the dialog
  };                                          // describe this line: close the dialog                                                        
  
  
  
}
