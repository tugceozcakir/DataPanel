import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDialogComponentComponent } from './delete-user-dialog-component.component';

describe('DeleteUserDialogComponentComponent', () => {
  let component: DeleteUserDialogComponentComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserDialogComponentComponent]
    });
    fixture = TestBed.createComponent(DeleteUserDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
