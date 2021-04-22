import { AfterViewInit, Component } from '@angular/core';
import { Router } from "@angular/router";
import { GaEcommerceItem } from "../google-analysis-4/ga-ecommerce-item";
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmEventCategory, GtmService } from "../google-analysis-4/gtm.service";
declare const dataLayer: any;
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
      GtmEventCategory.VIEW,
      "Fernreise",
      [new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)]
    );
  }

  selectItem() {
    this._gtmService.ecommerceItemsEvent(
      GaEvent.selectItem,
      GtmEventCategory.CLICK,
      "Fernreise",
      [new GaEcommerceItem("Rundreise Istanbul", "B2BA01", "Round Trip", "Product List", "MVP2", 1)]
    );

    this._router.navigate(['/checkout']);
  }

  selectGTM() {
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      'event': 'view_item_list',
      'ecommerce': {
        'items': [
          {
            'item_name': 'Triblend Android T-Shirt',
            'item_id': '12345',
            'price': '15.25',
            'item_brand': 'Google',
            'item_category': 'Apparel',
            'item_category2': 'Mens',
            'item_category3': 'Shirts',
            'item_category4': 'Tshirts',
            'item_variant': 'Gray',
            'item_list_name': 'Search Results',
            'item_list_id': 'SR123',
            'index': 1,
            'quantity': '1'
          },
          {
            'item_name': 'Donut Friday Scented T-Shirt',
            'item_id': '67890',
            'price': '33.75',
            'item_brand': 'Google',
            'item_category': 'Apparel',
            'item_category2': 'Mens',
            'item_category3': 'Shirts',
            'item_category4': 'Tshirts',
            'item_variant': 'Black',
            'item_list_name': 'Search Results',
            'item_list_id': 'SR123',
            'index': 2,
            'quantity': '1'
          }]
      }
    });
  }

}
