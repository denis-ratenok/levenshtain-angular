import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedItemComponent } from './proposed-item.component';

describe('ProposedItemComponent', () => {
  let component: ProposedItemComponent;
  let fixture: ComponentFixture<ProposedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
