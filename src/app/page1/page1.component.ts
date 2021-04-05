import { Component, OnInit } from '@angular/core';
import { TagMamangerService } from '../tag-mamanger.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(private tagMamangerService : TagMamangerService) { }

  ngOnInit(): void {
  }

  form1() {
    const gtmTag = {
      event: 'SUBMIT Click',
      data: 'Data like time needed?',
    };
    this.tagMamangerService.pushTag(gtmTag);
  }
}
