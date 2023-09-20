import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommitteMember } from 'src/app/models/committe-member.model';

@Component({
  selector: 'app-committee-member-desc',
  templateUrl: './committee-member-desc.component.html',
  styleUrls: ['./committee-member-desc.component.scss']
})
export class CommitteeMemberDescComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {member: CommitteMember, apiUrl: string}
  ) {
  }
}
