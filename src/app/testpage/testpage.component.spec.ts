import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpageComponent } from './testpage.component';

describe('TestpageComponent', () => {
  let component: TestpageComponent;
  let fixture: ComponentFixture<TestpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
