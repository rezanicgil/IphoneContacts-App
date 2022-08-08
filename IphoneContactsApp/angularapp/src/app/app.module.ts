import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';

import { MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopUpComponent } from './pages/pop-up/pop-up.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactDetailsComponent,
    AddContactComponent,
    EditContactComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    RouterModule.forRoot([
      { path: '', redirectTo:'contacts-list',pathMatch:'full' },
      { path: 'add-contact', component: AddContactComponent },
      { path: 'contacts-list', component: ContactsListComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'contact-details/:_id', component: ContactDetailsComponent },
       { path: 'edit-contact/:_id', component: EditContactComponent },
      
    ])
    
  ],


  providers: [
    
      {
        provide: MatDialogRef,
        useValue: {}
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
