import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { List } from 'src/app/models/list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private webReqService: WebRequestService) { 
  }

  addContact(name:string, phone:string, address:string ,company?:string,surname?:string, mail?:string, imageSrc?:string){
    //We want to sed web request to create a list
    return this.webReqService.post('contacts-list',{name,phone,address,company,surname,mail,imageSrc});

  }
  getContacts(){
   return this.webReqService.get('contacts-list');
  }

  getContactById(contact_id:string){
    return this.webReqService.get(`contact-details/${contact_id}`);
   }
 
   editContactById(contact_id:string, name:string, phone:string, address:string ,company?:string,surname?:string, mail?:string,imageSrc?:string){
    return this.webReqService.patch(`edit-contact/${contact_id}`,{name,phone,address,company,surname,mail,imageSrc});
   }

   getEditedContactById(contact_id:string){
    return this.webReqService.get(`edit-contact/${contact_id}`);
   }
 
   deleteContact(contact_id:string){
    
    return this.webReqService.delete(`edit-contact/${contact_id}`);
   }

}
