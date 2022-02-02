import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  post: Post = new Post();
  submitted=false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
  }

  savePost(): void {
    this.server.createPost(this.post).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newPost(): void {
    this.submitted = false;
    this.post = new Post();
  }

}
