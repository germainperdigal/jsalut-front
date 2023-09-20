import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionEditionComponent } from './edition-edition.component';

describe('EditionEditionComponent', () => {
  let component: EditionEditionComponent;
  let fixture: ComponentFixture<EditionEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
