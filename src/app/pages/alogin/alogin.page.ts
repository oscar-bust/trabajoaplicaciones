import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-alogin',
  templateUrl: './alogin.page.html',
  styleUrls: ['./alogin.page.scss'],
})
export class AloginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder, 
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'rut': new FormControl("", [Validators.required, Validators.pattern(/^(\d{1,2}\.\d{3}\.\d{3})-(\d|K)$/i)]), 
      'password': new FormControl("", Validators.required)
    });
  }

  async ingresar() {
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos correctamente.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const f = this.formularioLogin.value;
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario.nombre === f.nombre &&
        usuario.apellido === f.apellido &&
        usuario.password === f.password &&
        usuario.rut === f.rut) {
      console.log('Ingresado');
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('alumno');
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

  ngOnInit() {}
}
