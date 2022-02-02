import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/Services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cate',
  templateUrl: './cate.component.html',
  styleUrls: ['./cate.component.scss']
})
export class CateComponent implements OnInit {

  posts?:Post[];
  currentPost?:Post;
  currentIndex=-1;

  totalLength:any;
  page:number=1;
  public newcate='';
  title='';
  public newArr:any[]=[];
  public newArr1:any[]=[];
  constructor(private server: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.retrievePosts();
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
      this.newcate=localStorage.getItem('category')
      for (let i=0; i<data.length;i++) {
        if(data[i].category==this.newcate){
          this.newArr.push(data[i])
        }
      }
      this.totalLength=this.newArr.length;
      this.newArr1=this.newArr?.reverse()
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
