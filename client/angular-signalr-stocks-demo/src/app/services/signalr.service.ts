import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';

import { StockModel } from '../models/stock.mock';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public stocks!: Array<StockModel>;
  public stocksSubject = new BehaviorSubject<any>(this.stocks);
  public stocksOf = this.stocksSubject.asObservable();
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/stocks')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  public stopConnection = () => {
    this.hubConnection.stop()
    .then(() => console.log('Cpnnection stopped'))
    .catch((err) => console.log('Error while stopping connection: ' + err));
  };

  public addTransferStocksListener = () => {
    this.hubConnection.on('transferstocks', (data) => {
      this.stocks = data;
      this.stocksSubject.next(this.stocks);
    });
  };
}
