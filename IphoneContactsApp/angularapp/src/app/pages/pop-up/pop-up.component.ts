import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  popUpType: string;
  contact_id: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private contactService: ContactService, private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<PopUpComponent>) {
    this.popUpType = data.popUpType

  }

  ngOnInit(): void {
  }

  deleteContact() {
    this.dialogRef.close(true);
  }

  
  closeDialog() {
    this.dialogRef.close(false);
  }





}
