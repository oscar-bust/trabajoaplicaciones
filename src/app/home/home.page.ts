import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private toastController: ToastController) {
    this.presentWelcomeToast();
  }

  async presentWelcomeToast() {
    const toast = await this.toastController.create({
      message: '¡Bienvenido a la aplicación!',
      duration: 1000,  
      position: 'top',
    });
    toast.present();
  }
}
