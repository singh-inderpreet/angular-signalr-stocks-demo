import { Component, Input, OnInit } from '@angular/core';
import { StockModel } from '../../models/stock.mock'

@Component({
  selector: 'app-stock-price',
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.scss']
})
export class StockPriceComponent implements OnInit {

  @Input() stock!: StockModel;
  
  constructor() {

  }

  ngOnInit(): void {
    
  }

}
