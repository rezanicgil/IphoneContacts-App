import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { List } from 'src/app/models/list.model';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  status:boolean = true; //for activating the 'Done' button.
  selectedFile:any;
  
  contact_id: string = "";
  contact: List[] | undefined;
  results: any;
  requiredForm:any;

  name: string = "";
  surname?: string = "";
  address: string = "";
  mail?: string = "";
  phone: string = "";
  company?: string = "";
  imageSrc?:string = "";
  imageUrl?:string = "";


  
  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService,private fb:FormBuilder) {

   }


  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {

        if (params['_id']) {
          this.contact_id = params['_id'];

          this.contactService.getContactById(this.contact_id).subscribe((contact: List[]) => {
            this.contact = contact;

            let entries = Object.entries(this.contact);
            let obj = Object.fromEntries(entries);

            console.log(obj);
            
            this.name = obj['name'].toString();
            this.phone = obj['phone'].toString();
            this.address = obj['address'].toString();
            this.mail = obj['mail']?.toString();
            this.company = obj['company']?.toString();
            this.surname = obj['surname']?.toString();
            this.imageSrc = obj['imageSrc']?.toString();

          })
        } else {
          this.contact = undefined;
        }

      }
    )

  }

  onChange(event:any){

  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files.item(0);
    console.log(this.selectedFile);
    
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.imageSrc = this.imageUrl;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(event:any){

  this.contactService.editContactById(this.contact_id, this.name,this.phone,this.address,this.company,this.surname,this.mail,this.imageSrc).subscribe((res)=>{
    this.router.navigate(['/contact-details', this.contact_id]);
    });

  }

}
