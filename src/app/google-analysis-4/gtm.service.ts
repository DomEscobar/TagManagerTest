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
  }

  public ecommerceItemsEvent(event: GaEvent, items: GaEcommerceItem[]): void {
    dataLayer.push({ ecommerce: null });
    const obj = {
      "event": event,
      "ecommerce": {
        "items": items
      }
    };
    dataLayer.push(obj);
  }

  public customEvent(action: GaEvent | string, category: GtmCustomEventCategory | string, eventName: string, data?: Map<string, any>): void {
    try {

      const opt = new Map<string, any>();
      opt.set('event_category', category);
      opt.set('event_name', eventName);

      if (data) {
        (data as Map<string, any>).forEach((value, key) => {
          opt.set(key, value);
        });
      }

      const params = this.toKeyValue(opt);
      if (params) {
        this.gtag('event', action as string, params);
      } else {
        this.gtag('event', action as string);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private toKeyValue(map: Map<string, any>): { [param: string]: any } | void {
    return (map.size > 0)
      ? Array.from(map).reduce(
        (obj, [key, value]) => Object.defineProperty(obj, key, { value, enumerable: true }),
        {}
      )
      : undefined;
  }

  public gtag(...args: any[]): void {
    try {
      dataLayer.push(...args.filter(x => x !== undefined));
    } catch (err) {
      console.error(err);
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