import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss']
})
export class LinkCardComponent implements OnInit {
  @Input() item!: any;

  timePassed!: string;

  ngOnInit(): void {
    this.timePassed = HelperService.timeSince(
      new Date((this.item?.time || 0) * 1000)
    );
  }

  openLink() {
    HelperService.openLink(this.item?.url);
  }
}
