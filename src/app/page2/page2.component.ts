import { Component, OnInit } from '@angular/core';
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmService } from "../google-analysis-4/gtm.service";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  public checkoutDone: boolean;

  constructor(private readonly _gtmService: GtmService) { }

  ngOnInit(): void {
  }

  public book(): void {

    this._gtmService.customEvent(GaEvent.CustomEvent, "Error", "Error Checkout");

    this._gtmService.ecommerceItemsEvent(GaEvent.BeginCheckout, []);
    this.checkoutDone = true;
  }
}
