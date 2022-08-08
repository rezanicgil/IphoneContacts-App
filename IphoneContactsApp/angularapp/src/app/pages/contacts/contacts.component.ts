import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  @Input() result:any[]|undefined;
  @Input() item:any[] | undefined;
  value:any;
  contacts:any[] =[];

  constructor(private contactService: ContactService){
    
    this.contactService.getContacts().subscribe((lists:any)=>{
      this.contacts = lists;
    });
  }
  

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((lists:any)=>{
      this.contacts = lists;
    });
  }

  onClick(event:any){
   
  }

}
