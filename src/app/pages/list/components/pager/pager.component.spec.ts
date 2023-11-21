/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PagerComponent } from "./pager.component";

describe("PagerComponent", () => {
    let component: PagerComponent;
    let fixture: ComponentFixture<PagerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PagerComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("ngOnChanges", () => {
        beforeEach(() => {
            spyOn(component, "setVisiblePages");
        });

        it("should set visible pages", () => {
            // WHEN
            component.ngOnChanges();

            // THEN
            expect(component.setVisiblePages).toHaveBeenCalled();
        });
    });

    describe("setPageNumber", () => {
        beforeEach(() => {
            spyOn(component.pageChange, "emit");
        });

        it("should emit page change", () => {
            // GIVEN
            const dummyPageNumber = 1;

            // WHEN
            component.setPageNumber(dummyPageNumber);

            // THEN
            expect(component.pageChange.emit).toHaveBeenCalledWith(dummyPageNumber);
        });
    });

    describe("setVisiblePages", () => {
        it("should set visible pages 1", () => {
            // GIVEN
            const dummyMaxPage = 10;
            const dummyCurrentPage = 1;
            component.maxPage = dummyMaxPage;
            component.currentPage = dummyCurrentPage;

            // WHEN
            component.setVisiblePages();

            // THEN
            expect(component.visiblePages).toEqual([1, 2, null, dummyMaxPage]);
        });

        it("should set visible pages 2", () => {
            // GIVEN
            const dummyMaxPage = 10;
            const dummyCurrentPage = 5;
            component.maxPage = dummyMaxPage;
            component.currentPage = dummyCurrentPage;

            // WHEN
            component.setVisiblePages();

            // THEN
            expect(component.visiblePages).toEqual([1, null, 4, 5, 6, null, 10]);
        });

        it("should set visible pages 3", () => {
            // GIVEN
            const dummyMaxPage = 10;
            const dummyCurrentPage = 10;
            component.maxPage = dummyMaxPage;
            component.currentPage = dummyCurrentPage;

            // WHEN
            component.setVisiblePages();

            // THEN
            expect(component.visiblePages).toEqual([1, null, 9, 10]);
        });
    });
});
