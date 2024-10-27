import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  formularioRecuperar: FormGroup;
  mensaje: string | null = null;

  constructor(private alertController: AlertController, private navCtrl: NavController) {
    this.formularioRecuperar = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  async enviarCorreo() {
    if (this.formularioRecuperar.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que ingresar un correo electrónico válido.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const email = this.formularioRecuperar.value.email;

   
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

   
    const usuarioEncontrado = usuarios.find((usuario: { email: string }) => usuario.email === email);

    if (usuarioEncontrado) {
      this.mensaje = 'Se ha enviado un correo de recuperación de contraseña a ' + email;

     
      setTimeout(() => {
        this.navCtrl.navigateRoot('/home');
      }, 2000);
    } else {
      const alert = await this.alertController.create({
        header: 'Correo no encontrado',
        message: 'No se encontró un usuario registrado con ese correo electrónico.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
