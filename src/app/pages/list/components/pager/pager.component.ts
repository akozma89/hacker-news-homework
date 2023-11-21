import {
    Component, EventEmitter, Input, OnChanges, Output
} from "@angular/core";

@Component({
    selector: "app-pager",
    templateUrl: "./pager.component.html",
    styleUrls: ["./pager.component.scss"]
})
export class PagerComponent implements OnChanges {
    @Input() currentPage = 1;
    @Input() maxPage = 1;

    @Output() pageChange = new EventEmitter<number>();

    visiblePages: any[] = [];

    ngOnChanges() {
        this.setVisiblePages();
    }

    setPageNumber(pageNumber: number) {
        this.pageChange.emit(pageNumber);
    }

    setVisiblePages() {
        const visiblePages: any[] = [];

        for (let i = 1; i <= this.maxPage; i++) {
            if (i === 1 || i === this.maxPage || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                visiblePages.push(i);
            }
        }

        if (visiblePages[1] !== 2) {
            visiblePages.splice(1, 0, null);
        }

        if (visiblePages[visiblePages.length - 2] !== this.maxPage - 1) {
            visiblePages.splice(visiblePages.length - 1, 0, null);
        }

        this.visiblePages = visiblePages;
    }
}
