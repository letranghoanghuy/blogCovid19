import { Component, OnInit,Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-information-detail',
  templateUrl: './information-detail.component.html',
  styleUrls: ['./information-detail.component.scss']
})
export class InformationDetailComponent implements OnInit, OnChanges{

  @Input() information?: Information;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentInformation: Information = {
    title: '',
    province:'',
    district:'',
    ward:'',
    content:'',
  };
  message = '';
  public popoverTitle:string = 'Delete';
  public popoverMessage:string = 'Do you want to delete?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.message="";
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentInformation = { ...this.information };
  }

  updateInformation(): void {
    const data = {
      title: this.currentInformation.title,
      province: this.currentInformation.province,
      district: this.currentInformation.district,
      ward: this.currentInformation.ward,
      content: this.currentInformation.content
    };

    if (this.currentInformation.key) {
      this.server.updateInformation(this.currentInformation.key, data)
        .then(() => this.message = 'The information was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteInformation(): void {
    if (this.currentInformation.key) {
      this.server.deleteInformation(this.currentInformation.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The information was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
