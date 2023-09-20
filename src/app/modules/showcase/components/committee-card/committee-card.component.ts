import { Component, Input } from '@angular/core';
import { CommitteMember } from 'src/app/models/committe-member.model';
import { MatDialog } from '@angular/material/dialog';
import {
  CommitteeMemberDescComponent
} from 'src/app/modules/showcase/components/committee-member-desc/committee-member-desc.component';

@Component({
  selector: 'app-committee-card',
  templateUrl: './committee-card.component.html',
  styleUrls: ['./committee-card.component.scss']
})
export class CommitteeCardComponent {
  /** Is light mode */
  @Input()
  isLightMode: boolean = false;

  /** Committee member */
  @Input()
  member: CommitteMember;

  @Input()
  apiUrl: string;

  constructor(
    private readonly matDialog: MatDialog
  ) {
  }

  openDesc() {
    this.matDialog.open(CommitteeMemberDescComponent, {data: {member: this.member, apiUrl: this.apiUrl}});
  }
}
