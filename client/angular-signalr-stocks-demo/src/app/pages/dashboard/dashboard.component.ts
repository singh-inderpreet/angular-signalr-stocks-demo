import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockModel } from 'src/app/models/stock.mock';
import { SignalRService } from 'src/app/services/signalr.service';

interface DashboardStock {
  stock: StockModel;
  disabled: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public stocks: Array<DashboardStock>;
  private subscriptions: Subscription;
  constructor(private signalRService: SignalRService) {
    this.stocks = new Array<DashboardStock>();
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.signalRService.stocksOf.subscribe((data: Array<StockModel>) => {
        if (data?.length) {
          this.updateStocks(data);
        }
      })
    );
  }
  updateStocks(data: Array<StockModel>) {
    if (!this.stocks.length) { // Add new stocks with disabled flag as false by default
      const _stocks: Array<DashboardStock> = new Array<DashboardStock>();
      data.forEach((element) => {
        const dashboardStock: DashboardStock = {
          stock: element,
          disabled: false,
        };
        _stocks.push(dashboardStock);
      });
      this.stocks = [..._stocks];
    } else { // Update existing stocks without impacting disabled status
      const _stocks: Array<DashboardStock> = new Array<DashboardStock>();
      this.stocks.forEach((element: DashboardStock) => {
        const filteredData = data.filter(currentData => currentData.name === element.stock.name);
        if (filteredData.length && !element.disabled) { // In case matching set is found, update the dataset with the new data
          const dashboardStock: DashboardStock = {
            stock: filteredData[0],
            disabled: element.disabled,
          };
          _stocks.push(dashboardStock);
        } else { // // In case matching set is found 'ERROR' OR 'DISABLED STATE'NO-UPDATE reuse the old dataset
          _stocks.push(element); 
        }
      });
      this.stocks = [..._stocks];
    }
  }
  updateDisabledStockState(event: any, dashboardStock: DashboardStock) {
    dashboardStock.disabled = !event.target.checked
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
