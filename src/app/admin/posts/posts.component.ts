import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts?:Post[];
  currentPost?:Post;
  currentIndex=-1;
  title="";

  totalLength:any;
  page:number=1;
  public data='';

  constructor(private server: ServerService) { 
  }

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
      this.posts = data;

      this.totalLength=data.length;
    });
  }

  setActivePost(post: Post, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
  }

}
