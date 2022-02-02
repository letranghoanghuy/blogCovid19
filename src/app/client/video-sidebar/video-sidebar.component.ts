import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/Services/server.service';
import { map } from 'rxjs/operators';
import { Video } from 'src/app/models/video.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-video-sidebar',
  templateUrl: './video-sidebar.component.html',
  styleUrls: ['./video-sidebar.component.scss']
})
export class VideoSidebarComponent implements OnInit {
  
  videos?: Video[];
  currentVideo?: Video;
  currentIndex = -1;
  name = 'ngx sharebuttons';
  public href: string = "";
  public key:any;
  public data: any;

  constructor(private server: ServerService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveVideos();
    this.href = this.router.url;
    this.key=this.route.snapshot.params['key'];
    this.loadData(this.key)
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
    });
  }

  private loadData(key:any) {
    this.server.getVideo(key).valueChanges().subscribe(data =>{
      this.currentVideo = data;
    })
  }

  setActiveVideo(video: Video, index: number): void {
    this.currentVideo = video;
    this.currentIndex = index;
    const data ={
      views: video.views+1
    }
    this.server.updateVideo(video.key,data).then().catch(err => console.log(err));
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    this.router.onSameUrlNavigation='reload'
    this.router.navigate(['/detail-video',video.key])

  }

  public search(){
    localStorage.setItem("search",this.data)
    this.router.navigate(['/find'])
  }
}
