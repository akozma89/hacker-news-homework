import { Component, Input, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";

@Component({
    selector: "app-link-card",
    templateUrl: "./link-card.component.html",
    styleUrls: ["./link-card.component.scss"]
})
/**
 * Link Card Component
 */
export class LinkCardComponent implements OnInit {
    @Input() item!: any;

    timePassed!: string;

    /**
     * On init
     */
    ngOnInit(): void {
        this.timePassed = HelperService.timeSince(
            new Date((this.item?.time || 0) * 1000)
        );
    }

    /**
     * Open link
     */
    openLink() {
        HelperService.openLink(this.item?.url);
    }
}
