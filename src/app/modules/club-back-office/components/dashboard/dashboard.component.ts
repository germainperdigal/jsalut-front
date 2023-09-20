import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, zip } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  /** Current edition */
  currentEdition?: any;

  /** API Url */
  apiUrl = this.apiService.apiUrl;

  /** Current application */
  currentApplication?: any;

  @ViewChild('stepper')
  stepper: MatStepper;

  /** User */
  user: User;

  /** Loading */
  loading: boolean;

  /** Pics amount */
  picsAmount = [1, 2, 3, 4, 5];

  /** Details form */
  detailsForm: FormGroup;

  /** Application attachments */
  applicationAttachments : {sportCv: File|null, pics: Array<File>|null, video: File|null} = {
    sportCv: null,
    pics: null,
    video: null
  };

  get hasPlayerInfos(): boolean {
    return this.currentApplication?.firstNamePlayer && this.currentApplication?.lastNamePlayer
      && this.currentApplication?.emailAddressPlayer && this.currentApplication?.phoneNumberPlayer;
  }

  get isEditionOpened(): boolean {
    return this.currentEdition ? !dayjs().isAfter(this.currentEdition.applicationEndsAt) : false;
  }

  get hasAllFiles(): boolean {
    return this.currentApplication && this.currentApplication?.isResumeUploaded && this.currentApplication?.arePicsUploaded && this.currentApplication?.isVideoUploaded;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly apiService: ApiService,
  ) {
    // @ts-ignore
    zip(
      this.route.data,
      this.route.parent?.data
    ).pipe(
      // @ts-ignore
      map((data) => ({ currentEdition: data[0]['currentEdition'], user: data[1]['user'] }))
    )
    .subscribe(({currentEdition, user}) => {
      this.currentEdition = currentEdition;
      this.currentApplication = user.applications.find((application: any) => application.edition === currentEdition?._id);

      this.buildDetailsForm();
      this.user = user;
    })
  }

  ngAfterViewInit() {
    if (this.currentApplication && (!this.currentApplication?.isResumeUploaded || !this.currentApplication?.arePicsUploaded || !this.currentApplication?.isVideoUploaded)) {
      this.stepper.selectedIndex = 1;
    } else if (this.hasAllFiles) {
      this.stepper.selectedIndex = 2;
    }
  }

  /** Build details form */
  buildDetailsForm() {
    this.detailsForm = new FormGroup({
      firstNamePlayer: new FormControl(this.currentApplication?.firstNamePlayer, Validators.required),
      lastNamePlayer: new FormControl(this.currentApplication?.lastNamePlayer, Validators.required),
      emailAddressPlayer: new FormControl(this.currentApplication?.emailAddressPlayer, Validators.required),
      phoneNumberPlayer: new FormControl(this.currentApplication?.phoneNumberPlayer, Validators.required),
    });
  }

  /** Send details */
  sendDetails(stepper: MatStepper) {
    if (this.currentApplication) {
      this.apiService.updateApplication(this.detailsForm.value, this.currentApplication._id)
        .pipe(
          finalize(() => {
            this.loading = false;
            stepper.next();
          })
        )
        .subscribe((application: any) => {
          this.loading = true;
          this.currentApplication = application;
          this.toastrService.success('Les informations du joueur ont bien été sauvegardées', 'Candidature mis à jour !')
        })
    } else {
      this.apiService.apply(this.detailsForm.value)
        .pipe(
          finalize(() => {
            this.loading = false;
            stepper.next();
          })
        )
        .subscribe((application: any) => {
          this.loading = true;
          this.currentApplication = application;
          this.toastrService.success('Les informations du joueur ont bien été sauvegardées', 'Candidature initiée !')
        })
    }
  }

  sendFiles() {
    this.loading = true;

    this.apiService.addFilesToApplication({pics: this.applicationAttachments.pics, sportCv: this.applicationAttachments.sportCv, video: this.applicationAttachments.video}, this.currentApplication, this.currentEdition.year)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((application: any) => {
        this.currentApplication = application;
        this.toastrService.success('Fichier(s) associé(s) au dossier !');

        if (application.isResumeUploaded && application.arePicsUploaded && application.isVideoUploaded) {
          this.stepper.next();
        }
      });
  }

  previousFileSelected(index: number) {
    if (this.applicationAttachments.pics) {
      return !!this.applicationAttachments?.pics[index-1];
    }

    return false;
  }

  handleFile(event: Event, fileType: string, index?: number) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (fileType === 'video' && files[0].size > 2147483648) {
      this.toastrService.error('La vidéo ne peut pas faire plus de 1 Go.');
      return;
    }

    if (fileType === 'pics' && files.length > 5) {
      this.toastrService.error('Trop de photos sélectionnées.');
      target.value = target.defaultValue;

      return;
    } else if (fileType === 'pics') {
      // @ts-ignore
      if (index === 0) {
        this.applicationAttachments[fileType] = [files[0]];
        return;
      }
      // @ts-ignore
      this.applicationAttachments[fileType].push(files[0]);

      return;
    }

    // @ts-ignore
    this.applicationAttachments[fileType] = files[0];
  }

  deleteFile(file: string) {
    this.apiService.deleteFile(this.currentEdition.year, this.currentApplication._id, file)
      .subscribe((application) => {
        this.currentApplication = application;
        this.toastrService.success('Fichier supprimé !');
      })
  }
}
