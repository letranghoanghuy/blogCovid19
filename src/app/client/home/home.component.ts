import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/Services/server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts?:Post[];
  currentPost?:Post;
  currentIndex=-1;

  totalLength:any;
  page:number=1;
  public data='';
  title='';

  constructor(private server: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.retrievePosts();
    
  }

  refreshList(): void {
    this.currentPost = undefined;
    this.currentIndex = -1;
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
      this.posts = data?.reverse();
      this.totalLength=data.length;
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
