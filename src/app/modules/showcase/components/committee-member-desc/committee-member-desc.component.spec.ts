import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeMemberDescComponent } from './committee-member-desc.component';

describe('CommitteeMemberDescComponent', () => {
  let component: CommitteeMemberDescComponent;
  let fixture: ComponentFixture<CommitteeMemberDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeMemberDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeMemberDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
