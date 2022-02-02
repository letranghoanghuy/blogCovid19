import { Component, OnInit,Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { Video } from 'src/app/models/video.model';


@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.scss']
})
export class DetailVideoComponent implements OnInit, OnChanges{

  @Input() video?: Video;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentVideo: Video = {
    title:'',
    date: '',
    image: '',
    iframe: '',
    views:0,
  };
  public url:SafeResourceUrl;
  public href: string = "";
  public newimg:string = "";
  name = 'ngx sharebuttons';

  constructor(private router: Router,public afAuth: AngularFireAuth,public sanitizer:DomSanitizer,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(): void {
    this.currentVideo = { ...this.video };
    this.url=this.sanitizer.bypassSecurityTrustResourceUrl(this.currentVideo.iframe)
    this.href ='https://covid19note.tk/detail-video/'+ this.route.snapshot.params['key']+'/';
    this.newimg=this.currentVideo.image
  }
 
}
