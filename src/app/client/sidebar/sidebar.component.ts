import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: Observable<any>;
  public icon:boolean=true;
  public icon1:boolean=true;

  public data:any;
  public newArr:any[]=[];

  posts?:Post[];
  currentPost?:Post;
  currentIndex=-1;


  constructor(private db: AngularFireDatabase, private router: Router,private server: ServerService) { 
    this.categories=this.db.list('categories').valueChanges();
  }

  ngOnInit(): void {
    this.retrievePosts();
  }

  public changes(){
    this.icon=!this.icon;
  }
  public changes1(){
    this.icon1=!this.icon1;
  }

  public search(){
    localStorage.setItem("search",this.data)
    this.router.navigate(['/find'])
  }

  public myselect(item: string){
    console.log(item)
    localStorage.setItem("category",item)
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    this.router.onSameUrlNavigation='reload'
    this.router.navigate(['/cate'])
  }

  retrievePosts(): void {
    this.server.getPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
      this.newArr=data.sort((a,b)=> b.views-a.views)
    });
    
  }

  setActivePost(post: Post, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
    const data ={
      views: post.views+1
    }
    this.server.updatePost(post.key,data).then().catch(err => console.log(err));
    this.router.navigate(['/detail-post',post.key])
  }
}
