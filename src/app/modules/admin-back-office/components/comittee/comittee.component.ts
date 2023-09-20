import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comittee',
  templateUrl: './comittee.component.html',
  styleUrls: ['./comittee.component.scss']
})
export class ComitteeComponent {
  /** Committee list */
  committeeList: Array<any>;

  /** Profile pic */
  profilePic: File;

  /** Committee members list */
  committeeMembersList: Array<any>;

  /** Committee creation */
  committeeCreation: boolean;

  /** Committee member creation */
  committeeMemberCreation: boolean;

  p: number = 1;

  /** Committee form */
  committeeForm = new FormGroup({
    _id: new FormControl(null, Validators.required),
    label: new FormControl(null, Validators.required),
    members: new FormControl(null),
    order: new FormControl(null, Validators.required),
  });

  /** Committee member form */
  committeeMemberForm = new FormGroup({
    _id: new FormControl(null, Validators.required),
    label: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    subtitle: new FormControl(null, Validators.required),
    committee: new FormControl(null, Validators.required)
  });

  get isCommitteeEdition(): boolean {
    return !!this.committeeForm.get('_id')?.value;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService
  ) {
    this.route.data.subscribe(({committeeList, committeeMembersList}) => {
      this.committeeList = committeeList;
      this.committeeMembersList = committeeMembersList;
      this.committeeForm.get('order')?.setValue(committeeList?.length+1);
    })
  }

  editCommitteeMember(member: any) {
    this.committeeMemberCreation = true;
    this.committeeMemberForm.get('label')?.setValue(member.label);
    this.committeeMemberForm.get('committee')?.setValue(member.committee?._id);
    this.committeeMemberForm.get('description')?.setValue(member.description);
    this.committeeMemberForm.get('subtitle')?.setValue(member.subtitle);
    this.committeeMemberForm.get('_id')?.setValue(member._id);
  }

  /** Edit committee */
  editCommittee(committee: any) {
    this.committeeCreation = true;
    this.committeeForm.get('label')?.setValue(committee.label);
    this.committeeForm.get('order')?.setValue(committee.order);
    this.committeeForm.get('members')?.setValue(committee.members);
    this.committeeForm.get('_id')?.setValue(committee._id);
  }

  handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // @ts-ignore
    this.profilePic = files[0];
  }

  onCreateUpdateCommitteeMember() {
    if (this.committeeMemberForm.value._id) {
      this.apiService.updateCommitteeMember(this.committeeMemberForm.value)
        .pipe(
          finalize(() => {
            this.committeeCreation = false;
          })
        )
        .subscribe((committeeMember) => {
          this.toastrService.success('Juré mis à jour !');
          this.committeeForm.reset();
        })

      return;
    }

    this.apiService.createCommitteeMember(this.committeeMemberForm.value, this.profilePic)
      .pipe(
        finalize(() => {
          this.committeeCreation = false;
        })
      )
      .subscribe((committeeMembersList) => {
        this.committeeMembersList.push(committeeMembersList);
        this.toastrService.success('Juré créé !');
        this.committeeForm.reset();
      })
  }

  onCreateUpdateCommittee() {
    if (this.committeeForm.value._id) {
      const comIndex = this.committeeList.findIndex((com) => com._id === this.committeeForm.value._id);

      this.apiService.updateCommittee(this.committeeForm.value)
        .pipe(
          finalize(() => {
            this.committeeCreation = false;
          })
        )
        .subscribe((committee) => {
          this.committeeList[comIndex] = this.committeeForm.value;
          this.toastrService.success('Poste mis à jour !');
        })

      return;
    }

    this.apiService.createCommittee(this.committeeForm.value)
      .pipe(
        finalize(() => {
          this.committeeCreation = false;
        })
      )
      .subscribe((committee) => {
        this.committeeList.push(committee);
        this.toastrService.success(`Poste ${committee.label} créé!`);
      })
  }
}
