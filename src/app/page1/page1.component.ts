import { AfterViewInit, Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { GaEcommerceItem } from "../google-analysis-4/ga-ecommerce-item";
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmService } from "../google-analysis-4/gtm.service";
declare const gtag: any;
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements AfterViewInit {

  constructor(
    private readonly _title: Title,
    private readonly _router: Router,
    private readonly _gtmService: GtmService) { 
      this._title.setTitle("Seite eins");
    }

  ngAfterViewInit(): void {

    this._gtmService.ecommerceItemsEvent(
      GaEvent.ViewItemList,
      [new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)]
    );
  }

  selectItem() {
    this._gtmService.ecommerceItemsEvent(
      GaEvent.selectItem,
      [new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)]
    );

    this._router.navigate(['/checkout']);
  }

  selectGTM() {
    this._gtmService.ecommerceItemsEvent(
      GaEvent.selectItem,
      [new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)]
    );

    this._router.navigate(['/checkout']);
  }

}
