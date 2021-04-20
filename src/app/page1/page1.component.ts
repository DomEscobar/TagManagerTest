import { Component, OnInit } from '@angular/core';
import { GaEcommerceItem } from "../google-analysis-4/ga-ecommerce-item";
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmService, GtmTagData, GtmEvent, GtmTagEcommerceData } from "../google-analysis-4/gtm.service";
declare const gtag: any;
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(private readonly _gtmService: GtmService) { }

  ngOnInit(): void {

  }

  form1() {
    this._gtmService.pushDatalayer(
      new GtmTagEcommerceData(
        GaEvent.ViewItemList,
        [
          new GaEcommerceItem("test", "test", "test", "test", "test", "1")
        ]
      )
    );


    gtag({
      'event': 'view_item_list',
      'ecommerce': {
        'items': [
          {
            'item_name': 'Triblend Android T-Shirt',       // Name or ID is required.
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
