import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { GaEcommerceItem } from "./ga-ecommerce-item";
import { GaEvent } from "./ga-events.enum";

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
          console.log(arguments);
          dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${environment.gaTrackingId}');

      `;
      document.head.appendChild(gaScript);
    }
  }

  public pushDatalayer(event: GaEvent, data: any): void {
    this.getDataLayer.push('event', event, data);
  }

  private get getDataLayer(): any[] {
    const window = this.browserGlobals.windowRef();
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  };

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    },
  };
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

export enum GtmEvent {
  NAVIGATION = "N",
  HOVER = "H",
  SWIPE = "S",
  CLICK = "C",
}