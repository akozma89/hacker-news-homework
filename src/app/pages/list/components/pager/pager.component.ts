import {
    Component, EventEmitter, Input, OnChanges, Output
} from "@angular/core";

@Component({
    selector: "app-pager",
    templateUrl: "./pager.component.html",
    styleUrls: ["./pager.component.scss"]
})
/**
 * Pager Component
 */
export class PagerComponent implements OnChanges {
    @Input() currentPage = 1;
    @Input() maxPage = 1;

    @Output() pageChange = new EventEmitter<number>();

    visiblePages: any[] = [];

    /**
     * On changes
     */
    ngOnChanges() {
        this.setVisiblePages();
    }

    /**
     * Set page number
     * @param {number} pageNumber Page number
     */
    setPageNumber(pageNumber: number) {
        this.pageChange.emit(pageNumber);
    }

    /**
     * Set visible pages
     */
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
