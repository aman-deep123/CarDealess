import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealerComponent } from './edit-dealer.component';

describe('EditDealerComponent', () => {
  let component: EditDealerComponent;
  let fixture: ComponentFixture<EditDealerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDealerComponent]
    });
    fixture = TestBed.createComponent(EditDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
