import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number | null;
  userDetails: User = new User();
  isChanged: boolean = false;

  initialUserDetails: User = new User(); // Initial user details
  editedUsername: string = '';
  editedEmail: string = '';
  editedUserId: string = '';
  changes: string = ''; // Changes
  saveStatus: string = ''; // Save status

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.userId = null;
  }

  ngOnInit() {
    this.fetchUserDetails();
    this.subscribeToNewUser(); // To listen to new users
  }

  fetchUserDetails() {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    if (userIdParam !== null) {
      this.userId = +userIdParam;
      this.userService.getUsers().subscribe(
        (data: User | User[]) => {
          if (Array.isArray(data)) {
            this.userDetails = data.find((user) => user.userId === this.userId) || new User();
          } else {
            this.userDetails = data || new User();
          }

          if (this.userDetails.userId !== undefined) {
            this.editedUserId = this.userDetails.userId.toString();
            this.editedUsername = this.userDetails.username;
            this.editedEmail = this.userDetails.email;
            this.initialUserDetails = { ...this.userDetails };
          } else {
            console.error('User not found');
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      this.userId = null;
    }
  }

  subscribeToNewUser() {
    this.userService.getNewUser().subscribe((user: User) => {
      if (user.userId === this.userId) {
        this.userDetails = { ...user };
        this.editedUserId = this.userDetails.userId.toString();
        this.editedUsername = this.userDetails.username;
        this.editedEmail = this.userDetails.email;
        this.initialUserDetails = { ...this.userDetails };
      }
    });
  }

  saveChanges() {
    this.userDetails.username = this.editedUsername;
    this.userDetails.email = this.editedEmail;
    this.isChanged = false;

    this.changes = `User ID: ${this.editedUserId}, Username: ${this.editedUsername}, Email: ${this.editedEmail}`;

    this.userService.updateUser(this.userDetails).subscribe(
      (response) => {
        this.saveStatus = 'Changes saved successfully!';
      },
      (error) => {
        console.error('Error saving changes:', error);
        this.saveStatus = 'Error saving changes.';
      }
    );
    
  }

onChange() {
  const isUsernameChanged = this.initialUserDetails.username !== this.editedUsername;
  const isEmailChanged = this.initialUserDetails.email !== this.editedEmail;
  const isUserIdChanged = this.initialUserDetails.userId.toString() !== this.editedUserId;
  this.isChanged = isUsernameChanged || isEmailChanged || isUserIdChanged;
}

}
