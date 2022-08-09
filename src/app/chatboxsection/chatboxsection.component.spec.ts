import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxsectionComponent } from './chatboxsection.component';

describe('ChatboxsectionComponent', () => {
  let component: ChatboxsectionComponent;
  let fixture: ComponentFixture<ChatboxsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatboxsectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboxsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
