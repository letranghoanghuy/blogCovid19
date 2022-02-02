import { Component, OnInit, Renderer2} from '@angular/core';
import { isBuffer } from 'lodash';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Covid19Note';

  constructor(private common: CommonService, private renderer: Renderer2){}

  ngOnInit(): void {
    this.common.themeChanges().subscribe(theme =>{
      if(theme.oldValue){
        this.renderer.removeClass(document.body, theme.oldValue)
      }
      this.renderer.addClass(document.body, theme.newValue)
    })
  }
}
