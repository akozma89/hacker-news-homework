/* tslint:disable:no-unused-variable */

import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HelperService } from "./helper.service";

describe("Service: Helper", () => {
    let service: HelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HelperService]
        });

        service = TestBed.inject(HelperService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("loading$", () => {
        it("should return loading observable", () => {
        // GIVEN
            const expectedResult = of(true);

            spyOn(service['loading'], "asObservable").and.returnValue(expectedResult);

            // WHEN
            const result = service.loading$;

            // THEN
            expect(result).toEqual(expectedResult);
            expect(service['loading'].asObservable).toHaveBeenCalled();
        });
    });

    describe("setLoading", () => {
        it("should set loading", () => {
        // GIVEN
            spyOn(service['loading'], "next");

            // WHEN
            service.setLoading(true);

            // THEN
            expect(service['loading'].next).toHaveBeenCalledWith(true);
        });
    });

    describe("getHostname", () => {
        it("should return hostname", () => {
        // GIVEN
            const dummyUrl = "https://www.google.com";

            // WHEN
            const result = HelperService.getHostname(dummyUrl);

            // THEN
            expect(result).toEqual("www.google.com");
        });
    });

    describe("scrollIntoView", () => {
        it("should scroll into view", () => {
        // GIVEN
            const dummyElement = document.createElement("div");
            spyOn(dummyElement, "scrollIntoView");

            // WHEN
            HelperService.scrollIntoView(dummyElement);

            // THEN
            expect(dummyElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
        });
    });

    describe("scrollToTop", () => {
        it("should scroll to top", () => {
        // GIVEN
            spyOn(window, "scrollTo");

            // WHEN
            HelperService.scrollToTop();

            // THEN
            expect(window.scrollTo).toHaveBeenCalled();
        });
    });

    describe("openLink", () => {
        it("should open link in new tab", () => {
        // GIVEN
            spyOn(window, "open");

            // WHEN
            HelperService.openLink("https://www.google.com");

            // THEN
            expect(window.open).toHaveBeenCalledWith("https://www.google.com", "_blank");
        });
    });

    describe("timeSince", () => {
        it("should return time since", () => {
        // GIVEN
            const dummyDate = new Date("2020-01-01T00:00:00.000Z");
            const currentDate = new Date("2023-01-01T00:00:00.000Z");

            // WHEN
            const result = HelperService.timeSince(dummyDate, currentDate);

            // THEN
            expect(result).toEqual("almost 4 years");
        });
    });
});
