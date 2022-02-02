import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {
  video:Video= new Video();
  submitted= false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
  }

  saveVideo(): void {
    this.server.createVideo(this.video).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newVideo(): void {
    this.submitted = false;
    this.video = new Video();
  }
}
