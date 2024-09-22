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

  constructor(public fb: FormBuilder,
              private alertController: AlertController,
              public navCtrl: NavController) {
    
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      rut: new FormControl("", [Validators.required, this.rutValidator]),
      password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      confirmacionPassword: new FormControl("", Validators.required)
    }, { validators: this.passwordsMatch.bind(this) });
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmacionPassword = group.get('confirmacionPassword')?.value;
    return password === confirmacionPassword ? null : { passwordsMismatch: true };
  }

  rutValidator(control: AbstractControl): ValidationErrors | null {
    const rutPattern = /^(\d{1,2})\.(\d{3})\.(\d{3})[-](\d|K)$/;
    return rutPattern.test(control.value) ? null : { invalidRut: true };
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

    const usuario = {
      nombre: f.nombre,
      apellido: f.apellido,
      email: f.email,
      rut: f.rut,
      password: f.password
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  ngOnInit() {
  }
}





 

 


