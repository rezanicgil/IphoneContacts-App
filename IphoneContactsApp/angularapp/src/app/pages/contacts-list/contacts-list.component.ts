import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;

  contacts:any[]=[];
  currentItem:any[]=[];
  sorted:any[]=[];
  grouped:any  = new Object();
  results:any  = new Object();


  constructor(private contactService:ContactService,private route: ActivatedRoute, private router: Router) { 
   
    this.contactService.getContacts().subscribe((lists: any[])=>{
      this.contacts = lists;
      this.searchValue("");
    });
  }

  ngOnInit(): void {
    this.searchValue("");
    this.contactService.getContacts().subscribe((lists: any[])=>{
      this.searchValue("");
      this.contacts = lists;
      this.searchValue("");
    });
  }


  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {


      var fullSearchData = it.name.toLocaleLowerCase()+" "+it.surname.toLocaleLowerCase()
      +" "+it.phone + " "+it.mail.toLocaleLowerCase() + " "+ it.address.toLocaleLowerCase() + it.mail.toLocaleLowerCase();
     
      return fullSearchData.toLocaleLowerCase().includes(searchText);
    });
  }

  searchValue(searchVal:string)
  {
    this.currentItem =  this.transform(this.contacts,searchVal);
    this.sorted = this.currentItem.sort((a,b) => a.name > b.name ? 1 : -1);
      
    this.grouped = this.sorted.reduce((groups, contact) => {
        const letter = contact.name.charAt(0).toUpperCase();
        groups[letter] =  groups[letter] || [];
        groups[letter].push(contact);
        return groups;
    }, Object.create(null));  
    
    this.results = Object.keys(this.grouped).map(key => ({key, contacts: this.grouped[key]}));

  }

}
