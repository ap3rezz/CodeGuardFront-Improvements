import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeexercisetestComponent } from './changeexercisetest.component';

describe('ChangeexercisetestComponent', () => {
  let component: ChangeexercisetestComponent;
  let fixture: ComponentFixture<ChangeexercisetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeexercisetestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeexercisetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
