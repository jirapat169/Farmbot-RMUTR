import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'farmbot-rmutr';

  constructor(private afDB: AngularFireDatabase) {
    // this.afDB.object('/tblSerialRead').remove();
    // this.afDB.object('/tblSerialWrite').remove();
  }
}
