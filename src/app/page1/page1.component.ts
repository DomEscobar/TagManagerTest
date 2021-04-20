import { AfterViewInit, Component } from '@angular/core';
import { Router } from "@angular/router";
import { GaEcommerceItem } from "../google-analysis-4/ga-ecommerce-item";
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmEventCategory, GtmService, GtmTagEcommerceData } from "../google-analysis-4/gtm.service";
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements AfterViewInit {

  constructor(
    private readonly _router: Router,
    private readonly _gtmService: GtmService) { }

  ngAfterViewInit(): void {
    this._gtmService.event(
      GaEvent.ViewItemList,
      GtmEventCategory.VIEW,
      "Fernreise",
      new GtmTagEcommerceData(
        [
          new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)
        ]
      )
    );
  }

  selectItem() {
    this._gtmService.event(
      GaEvent.selectItem,
      GtmEventCategory.CLICK,
      "Fernreise",
      new GtmTagEcommerceData(
        [
          new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)
        ]
      )
    );

    this._router.navigate(['/checkout']);
  }

}
