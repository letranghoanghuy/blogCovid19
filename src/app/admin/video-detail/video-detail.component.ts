import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit, OnChanges{
  @Input() video?: Video;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentVideo: Video = {
    title:'',
    date: '',
    image: '',
    iframe: '',
    views:0,
  };
  message = '';
  public popoverTitle:string = 'Delete';
  public popoverMessage:string = 'Do you want to delete?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentVideo = { ...this.video };
  }

  updateVideo(): void {
    const data = {
      title: this.currentVideo.title,
      image: this.currentVideo.image,
      date: this.currentVideo.date,
      iframe: this.currentVideo.iframe,
      views: this.currentVideo.views,
    };

    if (this.currentVideo.key) {
      this.server.updateVideo(this.currentVideo.key, data)
        .then(() => this.message = 'The video was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteVideo(): void {
    if (this.currentVideo.key) {
      this.server.deleteVideo(this.currentVideo.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The video was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
