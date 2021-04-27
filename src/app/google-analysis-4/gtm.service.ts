import { Injectable } from '@angular/core';
import { GaEcommerceItem } from "./ga-ecommerce-item";
import { GaEvent } from "./ga-events.enum";
import { addGTMScripts, pushOnDataLayer } from "./gtm-funtions";
@Injectable({
  providedIn: 'root'
})
export class GtmService {

  public country = Country.Germany;

  constructor() {
    addGTMScripts("GTM-KJFQ7JJ");
  }

  public ecommerceItemsEvent(event: GaEvent, items: GaEcommerceItem[]): void {
    // pushOnDataLayer({ ecommerce: null });
    const layer = {
      eccomerce: {
        items: items
      }
    };

    pushOnDataLayer('event', event, layer);
  }

  public customEvent(action: GaEvent | string, category: GtmCustomEventCategory | string, eventName: string, eventContent?: any): void {
    try {
      // pushOnDataLayer({
      //   'event': action,
      //   'event_name': eventName,
      //   'event_category': category,
      //   'event_content': eventContent,
      // });

    } catch (error) {
      console.error(error);
    }
  }
}

export enum GtmCustomEventCategory {
  VIEW = "V",
  NAVIGATION = "N",
  HOVER = "H",
  SWIPE = "S",
  CLICK = "C",
}

export enum Country {
  Germany = "Germany",
  Austria = "Austria",
  Switzerland = "Switzerland"
}

export class GtmEcommerceLayer {
  constructor(
    public event: GaEvent,
    public ecommerce: GtmEcommerceData
  ) {
  }
}

export class GtmEcommerceListLayer {
  constructor(
    public event: GaEvent,
    public ecommerce: GtmEcommerceData
  ) {
  }
}
class GtmEcommerceData {
  constructor(
    public items: GaEcommerceItem[]
  ) {
  }
}