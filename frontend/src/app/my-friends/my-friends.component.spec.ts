import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendsComponent } from './my-friends.component';

describe('MyFriendsComponent', () => {
  let component: MyFriendsComponent;
  let fixture: ComponentFixture<MyFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFriendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
