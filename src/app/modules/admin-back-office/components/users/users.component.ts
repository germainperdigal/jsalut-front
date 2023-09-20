import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import {
  UserCreationFormComponent
} from 'src/app/modules/admin-back-office/components/user-creation-form/user-creation-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  /** Users */
  users: Array<User>;

  p: number = 1;

  badgeRole = {
    'ADMIN': 'bg-red-100 text-red-800',
    'CLUB': 'bg-blue-100 text-blue-800',
    'JUROR': 'bg-yellow-100 text-yellow-800'
  }

  badgeClass = 'text-xs font-medium mr-2 px-2.5 py-0.5 rounded font-bold ';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) {
    this.route.data.subscribe(({users}) => this.users = users);
  }

  getBadgeClass(user: User) {
    // @ts-ignore
    return this.badgeClass+this.badgeRole[user.role];
  }

  openUserCreation() {
    const dialogRef = this.matDialog.open(UserCreationFormComponent);

    dialogRef.afterClosed()
      .subscribe(({newUser}) => {
        this.users.push(newUser);
      });
  }
}
