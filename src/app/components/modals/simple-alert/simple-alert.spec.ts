import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleAlertComponent } from './simple-alert';


describe('ModalRegistroComponent', () => {
  let component: SimpleAlertComponent;
  let fixture: ComponentFixture<SimpleAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
