import { Component } from '@angular/core';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  email: string = '';  
  newPassword: string = '';  

  constructor(private router: Router) { }  

  onSubmit() {
    
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');

    
    const user = users.find((u: any) => u.email === this.email);

    if (user) {
     
      user.password = this.newPassword;
      
      
      localStorage.setItem('usuarios', JSON.stringify(users));

      
      alert('Contraseña actualizada con éxito');

      
      this.email = '';  
      this.newPassword = '';

    
      this.router.navigate(['/login']);
    } else {
     
      alert('Correo no registrado');
    }
  }
}
