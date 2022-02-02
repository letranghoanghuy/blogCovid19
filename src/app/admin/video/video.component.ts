import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/Services/server.service';
import { map } from 'rxjs/operators';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videos?: Video[];
  currentVideo?: Video;
  currentIndex = -1;
  title = '';

  totalLength:any;
  page:number=1;
  public data='';

  constructor(private server: ServerService) { }

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
      this.videos = data;
      
      this.totalLength=data.length;
    });
  }

  setActiveVideo(video: Video, index: number): void {
    this.currentVideo = video;
    this.currentIndex = index;
  }

}
