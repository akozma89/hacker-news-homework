import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PageService } from "src/app/services/page.service";
import { HelperService } from "src/app/services/helper.service";

@Component({
    selector: "app-list-page",
    templateUrl: "./list-page.component.html",
})
export class ListPageComponent implements OnInit, OnDestroy {
    data?: any[];
    pageSize = 30;
    currentPage = 1;
    maxPage = 1;
    hasError = false;

    private subscriptions = new Subscription();

    constructor(
        private pageService: PageService,
        private activatedRoute: ActivatedRoute,
        private helperService: HelperService,
    ) {}

    get currentLink() {
        return this.activatedRoute.snapshot.data["link"];
    }

    ngOnInit(): void {
        this.fetchData();
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

    fetchData() {
        this.hasError = false;
        this.helperService.setLoading(true);

        this.subscriptions.add(
            this.pageService
                .getPageOfData(this.currentLink, this.currentPage, this.pageSize)
                .subscribe({
                    next: (pageData: any) => {
                        this.maxPage = pageData.maxPage;
                        this.data = pageData.data;
                        this.currentPage = pageData.currentPage;
                        this.pageSize = pageData.pageSize;

                        this.helperService.setLoading(false);
                        HelperService.scrollToTop();
                    },
                    error: () => {
                        this.helperService.setLoading(false);
                        this.hasError = true;
                    }
                }),
        );
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.fetchData();
    }

    setPageNumber(pageNumber: number) {
        this.currentPage = pageNumber;
        this.fetchData();
    }
}
