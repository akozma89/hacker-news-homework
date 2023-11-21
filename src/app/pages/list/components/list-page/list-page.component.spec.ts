import { Subscription, of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";

import { PageService } from "src/app/services/page.service";
import { HelperService } from "src/app/services/helper.service";
import { ListPageComponent } from "./list-page.component";

describe("ListPageComponent", () => {
    let component: ListPageComponent;
    let fixture: ComponentFixture<ListPageComponent>;
    let pageServiceStub: jasmine.SpyObj<PageService>;
    let helperServiceStub: jasmine.SpyObj<HelperService>;
    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
        pageServiceStub = jasmine.createSpyObj("PageService", ["getDataOfPage"]);
        helperServiceStub = jasmine.createSpyObj("HelperService", ["setLoading"]);

        pageServiceStub.getDataOfPage.and.returnValue(of([]));

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ListPageComponent],
            providers: [
                {
                    provide: PageService,
                    useValue: pageServiceStub,
                },
                {
                    provide: HelperService,
                    useValue: helperServiceStub,
                },
            ],
        });
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(ListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(activatedRoute).toBeTruthy();
    });

    describe("ngOnInit", () => {
        it("should call fetchData", () => {
            // GIVEN
            spyOn(component, "fetchData");

            // WHEN
            component.ngOnInit();

            // THEN
            expect(component.fetchData).toHaveBeenCalled();
        });
    });

    describe("ngOnDestroy", () => {
        it("should unsubscribe", () => {
            // GIVEN
            component['subscriptions'] = jasmine.createSpyObj<Subscription>("Subscription", [
                "unsubscribe",
            ]);

            // WHEN
            component.ngOnDestroy();

            // THEN
            expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
        });
    });

    describe("fetchData", () => {
        const dummyCurrentLink = "getTopStories";
        const dummyCurrentPage = 1;
        const dummyPageSize = 10;
        const dummyData = [1, 2, 3, 4, 5];
        const dummyPageData = {
            data: dummyData,
            currentPage: dummyCurrentPage,
            pageSize: dummyPageSize,
            maxPage: 1,
        };

        beforeEach(() => {
            spyOn(component, "fetchData");
            spyOn<any>(component['subscriptions'], "add");
        });

        it("should set hasError to false", () => {
            // WHEN
            component.fetchData();

            // THEN
            expect(component.hasError).toBeFalse();
        });

        it("should call setLoading", () => {
            // WHEN
            component.fetchData();

            // THEN
            expect(helperServiceStub.setLoading).toHaveBeenCalledWith(true);
        });

        xit("should call getDataOfPage", () => {
            // GIVEN
            component.currentPage = dummyCurrentPage;
            component.pageSize = dummyPageSize;

            Object.defineProperty(component, "currentLink", {
                get: () => dummyCurrentLink,
            });
            pageServiceStub.getDataOfPage.and.returnValue(of(dummyPageData));

            // WHEN
            component.fetchData();

            // THEN
            expect(pageServiceStub.getDataOfPage).toHaveBeenCalledWith(
                dummyCurrentLink,
                dummyCurrentPage,
                dummyPageSize
            );
        });
    });

    describe("setPageSize", () => {
        it("should set pageSize", () => {
            // GIVEN
            const dummyPageSize = 10;

            spyOn(component, "fetchData");

            // WHEN
            component.setPageSize(dummyPageSize);

            // THEN
            expect(component.pageSize).toEqual(dummyPageSize);
            expect(component.fetchData).toHaveBeenCalled();
        });
    });

    describe("setPageNumber", () => {
        it("should set currentPage", () => {
            // GIVEN
            const dummyPageNumber = 1;

            spyOn(component, "fetchData");

            // WHEN
            component.setPageNumber(dummyPageNumber);

            // THEN
            expect(component.currentPage).toEqual(dummyPageNumber);
            expect(component.fetchData).toHaveBeenCalled();
        });
    });
});
