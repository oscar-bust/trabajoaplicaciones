import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  recuperarUsuario: FormGroup;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.recuperarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    console.log('Componente de recuperación de contraseña inicializado');
  }

  async recuperar() {
    const email = this.recuperarUsuario.value.email;
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      const toast = await this.toastController.create({
        message: 'Email enviado!',
        duration: 1500,
        position: 'top'
      });
      await toast.present();
      this.router.navigate(['/login']);
    } catch (error) {
      // Manejo de errores robusto
      const errorMessage = (error as any).message || 'Error desconocido';
      const alerta = await this.alertController.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK']
      });
      await alerta.present();
    }
  }
}

