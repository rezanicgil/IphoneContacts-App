import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  addContactForm:any;

  sameName:boolean = false;
  name:string = "";
  surname:string = "";
  mail:string = "";
  phone:string = "";
  address:string = "";
  imageUrl:string = "";
  company:string = "";
  emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  lists: any = [];
  image!:any;
  imageSrc!:any;
  imageObj!:File;


  constructor( private cdRef: ChangeDetectorRef, private router:Router,private contactService: ContactService,private $http: HttpClient ) { }

  ngOnInit(): void {
    this.addContactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl(''),
      mail: new FormControl('',Validators.pattern(this.emailPattern)),
      company: new FormControl(''),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      imageSrc: new FormControl('')
    });

    
 

  }

  onSubmit(event:any){

   
    this.contactService.addContact(this.name,this.phone,this.address,this.company,this.surname,this.mail,this.imageSrc).subscribe((res)=>{
      this.router.navigate(['/','contacts-list']);
    })


  }

  onChange(event:any){

    
    this.contactService.getContacts().subscribe((lists: any[])=>{
      let list = lists;
      let names = list.map((res:any)=>{
        return res.name.toLocaleLowerCase()
      });
      
      let nameExist:boolean = names.includes(this.name.toLocaleLowerCase());
      this.sameName = nameExist;
     
    });


  }

  onFileChanged(event:any){

    let selectedFile = event.target.files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.imageSrc = this.imageUrl;  
    }
   
    
    this.imageObj = selectedFile;


  }

  
  ngAfterViewInit(): void {

    this.cdRef.detectChanges(); 
  }


}
