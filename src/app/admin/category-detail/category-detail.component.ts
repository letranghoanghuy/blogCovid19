import { Component, OnInit, OnChanges,Input,Output,EventEmitter } from '@angular/core';
import Category from 'src/app/models/category.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnChanges {
  @Input() category?: Category;
  @Output() refreshList:EventEmitter<any> = new EventEmitter();
  currentCategory:Category={
    name:'',
    tag:'',

  }

  message='';
  public popoverTitle:string = 'Delete';
  public popoverMessage:string = 'Do you want to delete?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.message='';
  }

  ngOnChanges(): void {
    this.message='';
    this.currentCategory={ ...this.category}
  }

  public updateCategory(): void {
    const data = {
      name: this.currentCategory.name,
      tag: this.currentCategory.tag
    };

    if (this.currentCategory.key) {
      this.server.updateCategory(this.currentCategory.key, data)
        .then(() => this.message = 'The category was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  public deleteCategory(): void {
    if (this.currentCategory.key) {
      this.server.deleteCategory(this.currentCategory.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The category was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
