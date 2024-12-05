import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreuserComponent } from './restoreuser.component';

describe('RestoreuserComponent', () => {
  let component: RestoreuserComponent;
  let fixture: ComponentFixture<RestoreuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
