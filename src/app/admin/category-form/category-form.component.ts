import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/category.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  category: Category= new Category();
  submitted: boolean = false;
  constructor(private server: ServerService) { }

  ngOnInit(): void {
  }

  public saveCategory(): void {
    this.server.createCategory(this.category).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  public newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }
}
