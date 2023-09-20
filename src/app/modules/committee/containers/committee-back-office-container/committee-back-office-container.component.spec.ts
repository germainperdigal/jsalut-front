import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeBackOfficeContainerComponent } from './committee-back-office-container.component';

describe('CommitteeBackOfficeContainerComponent', () => {
  let component: CommitteeBackOfficeContainerComponent;
  let fixture: ComponentFixture<CommitteeBackOfficeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeBackOfficeContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeBackOfficeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
