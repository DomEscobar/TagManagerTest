import { Injectable } from '@angular/core';
import { GaEcommerceItem } from "./ga-ecommerce-item";
import { GaEvent } from "./ga-events.enum";
declare const dataLayer: any;
@Injectable({
  providedIn: 'root'
})
export class GtmService {

  public country = Country.Germany;

  constructor() {

    if (localStorage.getItem('dec')) {
      return;
    }

    dataLayer.push({
      "country": this.country
    });
  }

  public ecommerceItemsEvent(event: GaEvent, items: GaEcommerceItem[]): void {
    dataLayer.push({ ecommerce: null });
    const obj = {
      event: event,
      ecommerce: {
        items: items
      }
    };
    dataLayer.push(obj);
  }

  public customEvent(action: GaEvent | string, category: GtmCustomEventCategory | string, eventName: string, eventContent?: any): void {
    try {
      dataLayer.push({
        'event': action,
        'event_name': eventName,
        'event_category': category,
        'event_content': eventContent,
      });

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