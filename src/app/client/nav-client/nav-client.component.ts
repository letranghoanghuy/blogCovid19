import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-nav-client',
  templateUrl: './nav-client.component.html',
  styleUrls: ['./nav-client.component.scss']
})
export class NavClientComponent implements OnInit {

  user: Observable<any>;
  theme: string='bootstrap';
  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore,private common: CommonService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {

      if (user) {
        let emailLower = user.email.toLowerCase();
        this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
      }
    });
  }

  logout(): void {
    this.afAuth.signOut();
  }

  toggleTheme(){
    if(this.theme === 'bootstrap'){
      this.theme = 'bootstrap-dark';
    }else{
      this.theme = 'bootstrap'
    }
    this.common.setTheme(this.theme);
  }
  

}
