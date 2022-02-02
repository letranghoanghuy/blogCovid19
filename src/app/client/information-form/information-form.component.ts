import { Component, OnInit } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.scss']
})
export class InformationFormComponent implements OnInit {

  information: Information = new Information();
  submitted=false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
  }

  saveInformation(): void {
    this.server.createInformation(this.information).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newInformation(): void {
    this.submitted = false;
    this.information = new Information();
  }
}
