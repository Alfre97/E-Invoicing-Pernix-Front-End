import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitterListComponent } from './emitter-list.component';

describe('EmitterListComponent', () => {
  let component: EmitterListComponent;
  let fixture: ComponentFixture<EmitterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmitterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmitterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
