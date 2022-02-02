import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnChanges {

  @Input() post?: Post;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPost: Post = {
    title: '',
    date: '',
    category: '',
    categoryTag: '',
    content: '',
    views: 0,
    image: '',
  };
  message = '';
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to delete?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentPost = { ...this.post };
  }

  updatePost(): void {
    const data = {
      title: this.currentPost.title,
      data: this.currentPost.date,
      category: this.currentPost.category,
      categoryTag: this.currentPost.categoryTag,
      content: this.currentPost.content,
      views: this.currentPost.views,
      image: this.currentPost.image,
    };

    if (this.currentPost.key) {
      this.server.updatePost(this.currentPost.key, data)
        .then(() => this.message = 'The Post was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deletePost(): void {
    if (this.currentPost.key) {
      this.server.deletePost(this.currentPost.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The post was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
