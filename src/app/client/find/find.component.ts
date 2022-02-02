import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/Services/server.service';
import { Video } from 'src/app/models/video.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit{

  posts?:Post[];
  currentPost?:Post;
  currentIndex=-1;
  title="";
  videos?: Video[];
  currentVideo?: Video;

  totalLength:any;
  totalLength1:any;
  page:number=1;
  public data='';
  public data1='';

  constructor(private server: ServerService,private router: Router) { }

  ngOnInit(): void {
    this.retrievePosts();
    this.retrieveVideos();
    this.data=localStorage.getItem('search')
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

  retrieveVideos(): void {
    this.server.getVideos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.videos = data;
      
      this.totalLength1=data.length;
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

  setActiveVideo(video: Video, index: number): void {
    this.currentVideo = video;
    this.currentIndex = index;
    const data ={
      views: video.views+1
    }
    this.server.updateVideo(video.key,data).then().catch(err => console.log(err));
    this.router.navigate(['/detail-video',video.key])
  }

  public find(){
    this.data=this.data1
  }

}
