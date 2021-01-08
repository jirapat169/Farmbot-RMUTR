import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

const _window: any = window;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private rpiOnlineTime: number = 0;
  public rpiIsOnline: boolean = false;
  public arduinoIsStatus: boolean = false;
  public arduinoPort: string = '';
  public listSerialPort: any = null;
  public listMessage: Array<{
    msg: string;
    update_time: number;
    status: string;
  }> = [];

  public manualTest = {
    moveAmount: 10,
    x: 0,
    y: 0,
    z: 10,
  };

  constructor(private afDB: AngularFireDatabase, public service: AppService) {}

  ngOnInit(): void {
    this.afDB
      .object('/tblListSerialPort')
      .snapshotChanges()
      .subscribe((val) => {
        this.listSerialPort = val.payload.val();
      });

    this.afDB
      .object('/tblRPiOnline')
      .snapshotChanges()
      .subscribe((val) => {
        this.rpiOnlineTime = parseInt(`${val.payload.val()['onlineTime']}`);
      });

    this.afDB
      .object('/tblSerialPortStatus')
      .snapshotChanges()
      .subscribe((val) => {
        this.arduinoIsStatus = val.payload.val()['status'];
        this.arduinoPort = val.payload.val()['port'];
      });

    this.afDB.list('/tblSerialRead').query.on('child_added', (val) => {
      this.listMessage.unshift({ ...val.val(), status: 'read' });
    });

    setInterval(() => {
      this.rpiIsOnline = new Date().getTime() - this.rpiOnlineTime < 15000;
    }, 1000);
  }

  public clearSerial = () => {
    this.afDB.object('/tblSerialRead').remove();
    this.afDB.object('/tblSerialWrite').remove();
    this.listMessage = [];
  };

  public portChange = (port: string) => {
    console.log(port);
    this.afDB.object('/tblSerialPortSelected').set({
      baudRate: 115200,
      port: port,
      update_time: new Date().getTime(),
    });
  };

  public serialWrite = (ev: any) => {
    ev.preventDefault();
    this.afDB.list('/tblSerialWrite').push({
      msg: ev.target.value,
      update_time: new Date().getTime(),
    });
    this.listMessage.unshift({
      msg: `${ev.target.value}`,
      update_time: new Date().getTime(),
      status: 'write',
    });
    ev.target.value = '';
  };

  public setManual = (data: {
    axis: '+x' | '-x' | '+y' | '-y' | '+z' | '-z' | 'home';
  }) => {
    if (data.axis == 'home') {
      this.manualTest = {
        moveAmount: this.manualTest.moveAmount,
        x: 0,
        y: 0,
        z: 0,
      };
    }

    this.manualTest.x =
      data.axis == '+x'
        ? (this.manualTest.x += this.manualTest.moveAmount)
        : this.manualTest.x;

    this.manualTest.x =
      data.axis == '-x'
        ? (this.manualTest.x -= this.manualTest.moveAmount)
        : this.manualTest.x;

    this.manualTest.y =
      data.axis == '+y'
        ? (this.manualTest.y += this.manualTest.moveAmount)
        : this.manualTest.y;

    this.manualTest.y =
      data.axis == '-y'
        ? (this.manualTest.y -= this.manualTest.moveAmount)
        : this.manualTest.y;

    this.manualTest.z =
      data.axis == '+z'
        ? (this.manualTest.z += this.manualTest.moveAmount)
        : this.manualTest.z;

    this.manualTest.z =
      data.axis == '-z'
        ? (this.manualTest.z -= this.manualTest.moveAmount)
        : this.manualTest.z;

    this.afDB.list('/tblSerialWrite').push({
      msg: `G91 G0 ${
        data.axis != 'home'
          ? data.axis.split('')[1].toUpperCase() +
            this.manualTest[data.axis.split('')[1]]
          : 'G10 X0 Y0 Z0'
      }`,
      update_time: new Date().getTime(),
    });
    this.listMessage.unshift({
      msg: `G91 G0 ${
        data.axis != 'home'
          ? data.axis.split('')[1].toUpperCase() +
            this.manualTest[data.axis.split('')[1]]
          : 'X0 Y0 Z0'
      }`,
      update_time: new Date().getTime(),
      status: 'write',
    });
  };
}
