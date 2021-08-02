import { AfterViewInit, Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NgbDatepickerI18n } from "../datepicker/datepicker-i18n";
import { NgbCalendar } from "../datepicker/ngb-calendar";
import { NgbDate } from "../datepicker/ngb-date";
import { GaEcommerceItem } from "../google-analysis-4/ga-ecommerce-item";
import { GaEvent } from "../google-analysis-4/ga-events.enum";
import { GtmService } from "../google-analysis-4/gtm.service";
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements AfterViewInit {

  model: any;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  constructor(
    public i18n: NgbDatepickerI18n,
    calendar: NgbCalendar,
    private readonly _title: Title,
    private readonly _router: Router,
    private readonly _gtmService: GtmService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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
