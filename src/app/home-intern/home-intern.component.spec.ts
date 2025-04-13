import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInternComponent } from './home-intern.component';

describe('HomeInternComponent', () => {
  let component: HomeInternComponent;
  let fixture: ComponentFixture<HomeInternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
