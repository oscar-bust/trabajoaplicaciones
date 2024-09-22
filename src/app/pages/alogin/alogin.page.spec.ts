import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AloginPage } from './alogin.page';

describe('AloginPage', () => {
  let component: AloginPage;
  let fixture: ComponentFixture<AloginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
