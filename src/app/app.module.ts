import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ThirdPartyModule } from './3rd.module';
import { AppService } from './app.service';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
} from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ThirdPartyModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDeBIOJ13C_AyavuZ11vG_PS7UcVlarE4A',
      authDomain: 'farmbot-rmutr.firebaseapp.com',
      databaseURL: 'https://farmbot-rmutr-default-rtdb.firebaseio.com',
      projectId: 'farmbot-rmutr',
      storageBucket: 'farmbot-rmutr.appspot.com',
      messagingSenderId: '481220830819',
      appId: '1:481220830819:web:5b1b702d6c591ccaaafa56',
      measurementId: 'G-9PPMBL9ZG8',
    }),
    AngularFireDatabaseModule,
  ],
  providers: [AppService, AngularFireDatabase],
  bootstrap: [AppComponent],
})
export class AppModule {}
