import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaprestComponent } from './maprest.component';

describe('MaprestComponent', () => {
  let component: MaprestComponent;
  let fixture: ComponentFixture<MaprestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaprestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaprestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
