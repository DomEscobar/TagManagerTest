import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { GaEcommerceItem } from "./ga-ecommerce-item";
import { GaEvent } from "./ga-events.enum";
declare const gtag: any;
@Injectable({
  providedIn: 'root'
})
export class GtmService {

  public country = Country.Germany;

  constructor() {
    this.addScripts();
  }

  private addScripts(): void {
    if (environment.gaTrackingId) {
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
      document.head.appendChild(gTagManagerScript);
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { 
          console.log(arguments);
          dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${environment.gaTrackingId}');

      `;
      document.head.appendChild(gaScript);
    }
  }


  public gtag(...args: any[]): void {
    try {
      gtag(...args.filter(x => x !== undefined));
    } catch (err) {
      console.error(err);
    }
  }

  public ecommerceItemsEvent(event: GaEvent, category: GtmEventCategory | string, eventName: string, items: GaEcommerceItem[]): void {

    const itemsObj = {
      items: items
    };

    const mapEcom = new Map<string, any>();
    mapEcom.set("ecommerce", itemsObj);

    this.event(event, category, eventName, mapEcom);
  }

  public event(action: GaEvent | string, category: GtmEventCategory | string, eventName: string, data?: Map<string, any>): void {
    try {
      const opt = new Map<string, any>();
      opt.set('event_category', category);
      opt.set('event_name', eventName);
      opt.set('country', this.country);
      opt.set('event', action);

      if (data) {
        data.forEach((value, key) => {
          opt.set(key, value);
        });
      }

      const params = this.toKeyValue(opt);
      this.gtag(params);

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
}

export enum GtmEventCategory {
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