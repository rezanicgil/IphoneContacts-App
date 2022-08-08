import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { List } from 'src/app/models/list.model';
import { faAngleLeft, faVideo} from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {


  constructor(private router:Router, private route: ActivatedRoute, private contactService:ContactService, public dialogRef: MatDialogRef<PopUpComponent>,public dialog: MatDialog) {
   
   }

  contact_id:string = "";
  faAngleLeft = faAngleLeft;
  faComment = faComment;
  faEnvelope=faEnvelope;
  faPhone = faPhone;
  faVideo= faVideo;

  
  contact:List[] | undefined;
  results:any;
  name:string ="";
  surname?:string ="";
  address:string ="";
  mail?:string="";
  phone:string="";
  company?:string="";
  imageUrl:string="";
  imageSrc?:string = "";


  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        if (params['_id']) {
          
          this.contact_id = params['_id'];
          this.contactService.getContactById(this.contact_id).subscribe((contact: List[]) => {
            this.contact = contact;

            if(this.contact){
              let entries = Object.entries(this.contact);
              let obj =  Object.fromEntries(entries);
     
              this.name = obj['name'].toString();
              this.phone = obj['phone'].toString();
              this.address = obj['address'].toString();
              this.mail = obj['mail']?.toString();
              this.company = obj['company']?.toString();
              this.surname = obj['surname']?.toString();
              this.imageSrc = obj['imageSrc']?.toString();

             
            }
           
          })
        } else {
          this.contact = undefined;
        }

      }
    )

  }

  openDialog(){
    this.dialogRef = this.dialog.open(PopUpComponent,{
      data : {
        popUpType : "remove",
      }
    });

   this.dialogRef.afterClosed().subscribe(res=>{

    if(res){
      this.contactService.deleteContact(this.contact_id).subscribe((deletedItem)=>{

        console.log("contact has been deleted successfully.");

        this.router.navigate(['/contacts-list']);
      });
   
      
     

    }else{
        console.log("page closed");
    }
    
   })
  }




}


