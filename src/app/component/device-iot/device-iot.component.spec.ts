import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceIotComponent } from './device-iot.component';

describe('DeviceIotComponent', () => {
  let component: DeviceIotComponent;
  let fixture: ComponentFixture<DeviceIotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceIotComponent]
    });
    fixture = TestBed.createComponent(DeviceIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
