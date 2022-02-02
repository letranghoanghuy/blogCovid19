import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/Services/server.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
@Component({
  selector: 'app-post-sidebar',
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss']
})
export class PostSidebarComponent implements OnInit {

  posts?: Post[];
  currentPost?: Post;
  currentIndex = -1;
  name = 'ngx sharebuttons';
  public href: string = "";
  public key: any;
  public sidebarPost: any[] = [];
  public cate = '';

  constructor(private server: ServerService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    this.key = this.route.snapshot.params['key'];
    this.loadData(this.key)
    this.retrievePosts(this.key);
  }

  refreshList(): void {
    this.currentPost = undefined;
    this.currentIndex = -1;
    this.key = this.route.snapshot.params['key'];
    this.retrievePosts(this.key);
  }

  retrievePosts(key: any): void {
    this.server.getPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data1 => {
      this.posts = data1;
      this.server.getPost(key).valueChanges().subscribe(data => {
        this.cate = data.category
        for (let i = 0; i < data1.length; i++) {
          if (data1[i].category == this.cate) {
            this.sidebarPost.push(data1[i]);
          }
        }
      })

    });
  }

  private loadData(key: any) {
    this.server.getPost(key).valueChanges().subscribe(data => {
      this.currentPost = data;
    })
  }

  setActivePost(post: Post, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
    const data = {
      views: post.views + 1
    }
    this.server.updatePost(post.key, data).then().catch(err => console.log(err));
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    this.router.onSameUrlNavigation='reload'
    this.router.navigate(['/detail-post', post.key])
  }

}
