import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de Firebase desde @angular/fire/compat
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importa la configuración de Firebase desde environment.ts
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    // Inicializa Firebase usando AngularFireModule con compat
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule  // Módulo para autenticación con Firebase
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    // Otros proveedores si es necesario
  ],
  bootstrap: [AppComponent] // Asegúrate de tener esto también
})
export class AppModule {}
