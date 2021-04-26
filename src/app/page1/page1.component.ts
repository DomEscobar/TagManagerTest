import { AfterViewInit, Component } from '@angular/core';
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
    private readonly _router: Router,
    private readonly _gtmService: GtmService) { }

  ngAfterViewInit(): void {

    this._gtmService.ecommerceItemsEvent(
      GaEvent.ViewItemList,
      [new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)]
    );

    gtag('event', 'view_item', {
      currency: 'USD',
      items: [{
        item_id: 'SKU_12345',
        item_name: 'jeggings',
        coupon: 'SUMMER_FUN',
        discount: 2.22,
        affiliation: 'Google Store',
        item_brand: 'Gucci',
        item_category: 'pants',
        item_variant: 'black',
        price: 9.99,
        currency: 'USD',
        quantity: 1
      }],
      value: 9.99
    });

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
