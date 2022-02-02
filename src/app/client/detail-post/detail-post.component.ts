import { Component, OnInit,Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit, OnChanges{

  @Input() post?: Post;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPost: Post = {
    title: '',
    date: '',
    category: '',
    categoryTag: '',
    content: '',
    views: 0,
    image: '',
  };

  public href: string = "";
  public newimg: string="";
  name = 'ngx sharebuttons';
  message = '';

  constructor(private router: Router,public afAuth: AngularFireAuth,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentPost = { ...this.post };
    this.href ='https://covid19note.tk/detail-post/'+ this.route.snapshot.params['key']+'/';
    this.newimg=this.currentPost.image
  }

}
