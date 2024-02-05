import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyFriendsRoutingModule } from './my-friends-routing.module';
import { MyFriendsComponent } from './my-friends.component';
import { MyFriendsService } from './my-friends.service';

@NgModule({
  declarations: [MyFriendsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MyFriendsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [MyFriendsService, HttpClient],
})
export class MyFriendsModule {}
