import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcardDialogComponent } from './addcard-dialog.component';

describe('AddcardDialogComponent', () => {
  let component: AddcardDialogComponent;
  let fixture: ComponentFixture<AddcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
