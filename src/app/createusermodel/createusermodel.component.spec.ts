import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateusermodelComponent } from './createusermodel.component';

describe('CreateusermodelComponent', () => {
  let component: CreateusermodelComponent;
  let fixture: ComponentFixture<CreateusermodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateusermodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateusermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
