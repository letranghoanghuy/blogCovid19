import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Information } from 'src/app/models/information.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  informations?: Information[];
  currentInformation?: Information;
  currentIndex = -1;
  public data="";
  totalLength:any;
  page:number=1;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.retrieveInformation();
  }

  refreshList(): void {
    this.currentInformation = undefined;
    this.currentIndex = -1;
    this.retrieveInformation();
  }

  retrieveInformation(): void {
    this.server.getInformations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.informations = data;
      this.totalLength=data.length;
    });
  }

  setActiveInformation(information: Information, index: number): void {
    this.currentInformation = information;
    this.currentIndex = index;
  }

}
