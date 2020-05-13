//Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterAdminModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Import components
import { MainAdminComponent } from './components/main/main-admin.component';
import { AddAdminComponent } from './components/add/add-admin.component';
import { EditAdminComponent } from './components/edit/edit-admin.component';
import { ListAdminComponent } from './components/list/list-admin.component';

//Services
import { UserService } from '../../services/user.service';
import { AdminGuard } from '../../services/admin.guard';

//Pipes
import { SearchPipe } from './pipes/search.pipe';

//Decorate ngModule for load components and modules settings
@NgModule({
  declarations: [
    MainAdminComponent,
    AddAdminComponent,
    EditAdminComponent,
    ListAdminComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterAdminModule,
    BrowserAnimationsModule
  ],
  exports: [
    MainAdminComponent,
    AddAdminComponent,
    EditAdminComponent,
    ListAdminComponent
  ],
  providers: [
    UserService,
    AdminGuard
  ]
})

export class PanelAdminModule{}
