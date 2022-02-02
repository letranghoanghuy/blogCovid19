import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Video } from 'src/app/models/video.model';
import { ServerService } from 'src/app/Services/server.service';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  videos?: Video[];
  currentVideo?: Video;
  currentIndex = -1;
  title = '';

  totalLength:any;
  page:number=1;
  public data='';

  constructor(private server: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveVideos();
  }

  refreshList(): void {
    this.currentVideo = undefined;
    this.currentIndex = -1;
    this.retrieveVideos();
  }

  retrieveVideos(): void {
    this.server.getVideos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.videos = data?.reverse();
      this.totalLength=data.length;
    });
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

  public search(){
    localStorage.setItem("search",this.data)
    this.router.navigate(['/find'])
  }

}
