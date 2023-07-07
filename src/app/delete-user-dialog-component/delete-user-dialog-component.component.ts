import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-dialog-component',
  templateUrl: './delete-user-dialog-component.component.html',
  styleUrls: ['./delete-user-dialog-component.component.css']
})
export class DeleteUserDialogComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
