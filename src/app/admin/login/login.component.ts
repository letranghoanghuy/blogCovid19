import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/Services/server.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  admin?:any;
  code='';
  public error="";
  constructor(private router: Router, private firebaseAuth: AngularFireAuth, private server: ServerService) { 
  }

  ngOnInit(): void {
    
  }

  public login(username: string, password: string){
    this.firebaseAuth.signInWithEmailAndPassword(username,password).then((credential) =>{
      console.log(credential);
      this.server.getCode().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        // this.admin=data
        // console.log(this.admin)
        for(let i=0; i<data.length; i++) {
          if(data[i].code==this.code) {
            this.router.navigate(['adminCategory']);
          }
          else{
            this.error='wrong code'
          }
        }
      })
      // this.router.navigate(['adminCategory']);
    }).catch((err) =>{
      this.error=err.message || 'Unknown error'
    })
  }
}
