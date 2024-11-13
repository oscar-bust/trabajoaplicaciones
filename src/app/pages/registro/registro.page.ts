import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    private alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      rut: new FormControl("", [Validators.required, this.rutValidator]),
      password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      confirmacionPassword: new FormControl("", Validators.required),
      tipoUsuario: new FormControl("", Validators.required)
    }, { validators: this.passwordsMatch.bind(this) });
  }

  ngOnInit() {}

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmacionPassword = group.get('confirmacionPassword')?.value;
    return password === confirmacionPassword ? null : { passwordsMismatch: true };
  }

  rutValidator(control: AbstractControl): ValidationErrors | null {
    const rutPattern = /^(\d{1,2})\.(\d{3})\.(\d{3})[-](\d|K)$/;
    const value = control.value.replace(/\D/g, ''); 
    if (value.length > 9) {
      return { invalidRut: true }; 
    }
    return rutPattern.test(control.value) ? null : { invalidRut: true };
  }

  formatRUT(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value === '') {
      this.formularioRegistro.controls['rut'].setValue(''); 
      return; 
    }

    if (value.length > 8) {
      value = value.slice(0, 9); 
    }

    if (value.length > 1) {
      value = value.slice(0, value.length - 1) + '-' + value.slice(-1);
    }
    if (value.length > 4) {
      value = value.slice(0, value.length - 5) + '.' + value.slice(-5);
    }
    if (value.length > 7) {
      value = value.slice(0, value.length - 9) + '.' + value.slice(-9);
    }

    input.value = value;
    this.formularioRegistro.controls['rut'].setValue(value);
  }

  async guardar() {
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const f = this.formularioRegistro.value;
    const nuevoUsuario = {
      nombre: f.nombre,
      apellido: f.apellido,
      email: f.email,
      rut: f.rut,
      password: f.password,
      tipoUsuario: f.tipoUsuario
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const rutExists = usuarios.some((usuario: any) => usuario.rut === nuevoUsuario.rut);
    
    if (rutExists) {
      const alert = await this.alertController.create({
        header: 'Usuario Existente',
        message: 'Este RUT ya está registrado. Serás redirigido a la página de restablecimiento de contraseña.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('/recuperar'); 
          }
        }]
      });
      await alert.present();
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Redirigir al home después del registro
    this.navCtrl.navigateRoot('/home');
  }
}
