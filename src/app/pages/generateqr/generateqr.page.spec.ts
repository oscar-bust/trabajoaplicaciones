import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateqrPage } from './generateqr.page';

describe('GenerateqrPage', () => {
  let component: GenerateqrPage;
  let fixture: ComponentFixture<GenerateqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
