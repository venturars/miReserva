import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedAlertComponent } from './verified-alert';
describe('ModalLogOutComponent', () => {
  let component: VerifiedAlertComponent;
  let fixture: ComponentFixture<VerifiedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
