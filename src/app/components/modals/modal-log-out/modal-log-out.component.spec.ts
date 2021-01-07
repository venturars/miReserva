import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLogOutComponent } from './modal-log-out.component';

describe('ModalLogOutComponent', () => {
  let component: ModalLogOutComponent;
  let fixture: ComponentFixture<ModalLogOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLogOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLogOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
