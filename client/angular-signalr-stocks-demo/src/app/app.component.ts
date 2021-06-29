import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-signalr-stocks-demo';
  constructor(
    public signalRService: SignalRService,
    private http: HttpClient,
    private titleService: Title
  ) {}
  ngOnInit() {
    this.init();
  }
  init() {
    this.signalRService.startConnection();
    this.signalRService.addTransferStocksListener();
    this.startHttpRequest();
    this.setTitle('Stock Price Demo')
  }
  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/stock').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  ngOnDestroy() {
    this.signalRService.stopConnection();
  }
}
