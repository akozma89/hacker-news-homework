/* tslint:disable:no-unused-variable */

import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "./local-storage.service";

describe("Service: LocalStorage", () => {
    let service: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalStorageService]
        });

        service = TestBed.inject(LocalStorageService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("setItem", () => {
        beforeEach(() => {
            spyOn(window.localStorage, "setItem");
        });
        it("should set item in local storage", () => {
            // GIVEN
            const dummyKey = "dummyKey";
            const dummyValue = "dummyValue";

            // WHEN
            service.setItem(dummyKey, dummyValue);

            // THEN
            expect(window.localStorage.setItem).toHaveBeenCalledWith(dummyKey, JSON.stringify(dummyValue));
        });
    });

    describe("getItem", () => {
        it("should get item from local storage", () => {
        // GIVEN
            const dummyKey = "dummyKey";
            const dummyValue = "dummyValue";

            spyOn(window.localStorage, "getItem").and.returnValue(JSON.stringify(dummyValue));

            // WHEN
            const result = service.getItem(dummyKey);

            // THEN
            expect(window.localStorage.getItem).toHaveBeenCalledWith(dummyKey);
            expect(result).toEqual(dummyValue);
        });

        it("should return null if item is not in local storage", () => {
        // GIVEN
            const dummyKey = "dummyKey";

            spyOn(window.localStorage, "getItem").and.returnValue(null);

            // WHEN
            const result = service.getItem(dummyKey);

            // THEN
            expect(window.localStorage.getItem).toHaveBeenCalledWith(dummyKey);
            expect(result).toEqual(null);
        });
    });
});
