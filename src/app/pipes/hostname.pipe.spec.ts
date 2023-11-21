/* tslint:disable:no-unused-variable */

import { HelperService } from "../services/helper.service";
import { HostnamePipe } from "./hostname.pipe";

describe("Pipe: Hostnamee", () => {
    let pipe: HostnamePipe;

    beforeEach(() => {
        pipe = new HostnamePipe();
    });

    it("create an instance", () => {
        expect(pipe).toBeTruthy();
    });

    describe("transform", () => {
        it("should return hostname", () => {
            // GIVEN
            const dummyUrl = "https://www.google.com";
            spyOn(HelperService, "getHostname").and.returnValue("www.google.com");

            // WHEN
            const result = pipe.transform(dummyUrl);

            // THEN
            expect(HelperService.getHostname).toHaveBeenCalledWith(dummyUrl);
            expect(result).toEqual("www.google.com");
        });

        it("should return empty string if url is null", () => {
            // GIVEN
            const dummyUrl = null as any;
            spyOn(HelperService, "getHostname").and.returnValue(dummyUrl);

            // WHEN
            const result = pipe.transform(dummyUrl);

            // THEN
            expect(result).toEqual("");
        });
    });
});
