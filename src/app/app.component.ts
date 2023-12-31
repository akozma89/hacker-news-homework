import { HelperService } from "src/app/services/helper.service";
import { Component } from "@angular/core";
import { debounceTime } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    readonly loading = this.helperService.loading$.pipe(debounceTime(250));

    constructor(private helperService: HelperService) {}
}
