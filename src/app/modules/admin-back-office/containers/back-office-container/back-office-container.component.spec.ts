import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeContainerComponent } from './back-office-container.component';

describe('BackOfficeContainerComponent', () => {
  let component: BackOfficeContainerComponent;
  let fixture: ComponentFixture<BackOfficeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
