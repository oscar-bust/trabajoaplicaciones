import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrscanPage } from './qrscan.page';

describe('QrscanPage', () => {
  let component: QrscanPage;
  let fixture: ComponentFixture<QrscanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
