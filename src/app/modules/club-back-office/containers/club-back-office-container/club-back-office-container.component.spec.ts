import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubBackOfficeContainerComponent } from './club-back-office-container.component';

describe('ClubBackOfficeContainerComponent', () => {
  let component: ClubBackOfficeContainerComponent;
  let fixture: ComponentFixture<ClubBackOfficeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubBackOfficeContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubBackOfficeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
