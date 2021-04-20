import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { GaEcommerceItem } from "./ga-ecommerce-item";
import { GaEvent } from "./ga-events.enum";
declare const gtag: any;

@Injectable({
  providedIn: 'root'
})
export class GtmService {

  constructor(private router: Router) {
    this.addScripts();
  }

  private addScripts(): void {
    if (environment.gaTrackingId) {
      // register google tag manager
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
      document.head.appendChild(gTagManagerScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { 
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

  public event(action: GaEvent | string, category: GtmEventCategory | string, eventName: string, data?: any): void {
    try {
      const opt = new Map<string, any>();
      opt.set('event_category', category);
      opt.set('event_name', eventName);

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
}


export interface GtmTagData {
  // public event_content?: string,
  // public event_action?: string,
  // public event_term?: string
  // event_name: string;
  // event_category: GtmEvent;
  event: GaEvent;
}


export class GtmTagEcommerceData {
  constructor(
    public items: GaEcommerceItem[]
  ) {
  }
}

export enum GtmEventCategory {
  VIEW = "V",
  NAVIGATION = "N",
  HOVER = "H",
  SWIPE = "S",
  CLICK = "C",
}