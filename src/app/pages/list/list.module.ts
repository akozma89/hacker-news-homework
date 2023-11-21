import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HostnamePipe } from "src/app/pipes/hostname.pipe";
import { ListPageComponent } from "./components/list-page/list-page.component";
import { ListRoutingModule } from "./list-routing.module";
import { PagerComponent } from "./components/pager/pager.component";
import { LinkCardComponent } from "./components/link-card/link-card.component";

@NgModule({
    declarations: [
        LinkCardComponent,
        ListPageComponent,
        PagerComponent,
        HostnamePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ListRoutingModule,
    ],
})
export class ListModule { }
