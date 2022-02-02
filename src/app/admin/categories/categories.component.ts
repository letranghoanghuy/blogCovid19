import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/category.model';
import { ServerService } from 'src/app/Services/server.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories?: Category[];
  currentCategory?: Category;
  currentIndex = -1;
  
  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  refreshList(): void {
    this.currentCategory = undefined;
    this.currentIndex = -1;
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.server.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
    });
  }

  setActiveCategory(category: Category, index: number): void {
    this.currentCategory = category;
    this.currentIndex = index;
  }

}
