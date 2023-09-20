import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionCreationComponent } from './edition-creation.component';

describe('EditionCreationComponent', () => {
  let component: EditionCreationComponent;
  let fixture: ComponentFixture<EditionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
