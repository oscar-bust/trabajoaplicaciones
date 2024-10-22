import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, 
              public alertController: AlertController,
              public navCtrl: NavController) {
    
    this.formularioLogin = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(8)])
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

    // Obtener la lista de usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar que usuarios es un array
    if (!Array.isArray(usuarios)) {
      console.error("Los usuarios no son un array.");
      return;
    }

    // Buscar un usuario válido
    const usuarioValido = usuarios.find(usuario => 
      usuario.email === f.email && usuario.password === f.password
    );

    if (usuarioValido) {
      console.log('Ingresado');
      localStorage.setItem('ingresado', 'true');
      // Almacena el usuario actual
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioValido));
      this.navCtrl.navigateRoot('profesor'); 
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

  ngOnInit() {
  }
}
