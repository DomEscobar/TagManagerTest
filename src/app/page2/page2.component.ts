import { Component, OnInit } from '@angular/core';
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmEventCategory, GtmService } from "../google-analysis-4/gtm.service";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  constructor(private readonly _gtmService: GtmService) { }

  ngOnInit(): void {
  }

  public book(): void {
    this._gtmService.event(GaEvent.BeginCheckout, GtmEventCategory.CLICK, "Fernreise")
  }
}
