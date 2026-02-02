import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateUser } from './add-update-user';

describe('AddUpdateUser', () => {
  let component: AddUpdateUser;
  let fixture: ComponentFixture<AddUpdateUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
