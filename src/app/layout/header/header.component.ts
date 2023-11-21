import { Component } from "@angular/core";
import { NAV_ELEMENTS } from "src/app/constants/navigation.constant";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    readonly navList = [...NAV_ELEMENTS];
}
