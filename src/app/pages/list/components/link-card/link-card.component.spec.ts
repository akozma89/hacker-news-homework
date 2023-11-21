/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HelperService } from "src/app/services/helper.service";
import { LinkCardComponent } from "./link-card.component";

describe("LinkCardComponent", () => {
    let component: LinkCardComponent;
    let fixture: ComponentFixture<LinkCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LinkCardComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LinkCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("ngOnInit", () => {
        it("should set timePassed", () => {
            // GIVEN
            component.item = {
                time: 1609459200
            };

            spyOn(HelperService, "timeSince").and.returnValue("1 day ago");

            // WHEN
            component.ngOnInit();

            // THEN
            expect(component.timePassed).toEqual("1 day ago");
        });
    });

    describe("openLink", () => {
        beforeEach(() => {
            spyOn(HelperService, "openLink");
        });

        it("should open link", () => {
            // GIVEN
            component.item = {
                url: "https://www.google.com"
            };

            // WHEN
            component.openLink();

            // THEN
            expect(HelperService.openLink).toHaveBeenCalledWith(component.item.url);
        });
    });
});
