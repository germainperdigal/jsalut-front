import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent {
  /** Loading */
  loading: boolean;

  /** Communications */
  communications: any;

  communicationForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    distribution: new FormControl(null, Validators.required)
  })

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
  ) {
    this.route.data.subscribe(({communications}) => this.communications = communications)
  }

  onCreate() {
    this.loading = true;

    this.apiService.createCommunication(
      this.communicationForm.value
    )
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((com) => {
        this.communications.push(com);
        this.communicationForm.reset();
        this.toastrService.success('Message diffusé !');
      })
  }

  /** Delete */
  delete(id: string) {
    this.loading = true;

    this.apiService.deleteCommunication(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => {
        this.communications = this.communications.filter((communication: any) => communication._id !== id);
        this.toastrService.success('Communication supprimée !');
      })
  }
}
