import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';  

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage {


  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];  

  isScannerActive: boolean = false;
  scannedResult: string | null = null;

  constructor(private router: Router) {}

  toggleScanner() {
    this.isScannerActive = !this.isScannerActive;
  }

  handleQrCodeResult(result: string) {
    this.scannedResult = result;
    this.isScannerActive = false;
  }

  goToProfesorPage() {
    this.router.navigate(['/profesor']);
  }
}
