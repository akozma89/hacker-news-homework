import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { PageService } from "./page.service";
import { HackerNewsApiService } from "./hacker-news-api.service";
import { LocalStorageService } from "./local-storage.service";
import {
    NAV_ASK, NAV_BEST, NAV_JOB, NAV_NEW, NAV_SHOW, NAV_TOP
} from "../constants/navigation.constant";

describe("Service: Page", () => {
    let service: PageService;
    let hackerNewsApiServiceStub: jasmine.SpyObj<HackerNewsApiService>;
    let localStorageServiceStub: jasmine.SpyObj<LocalStorageService>;

    beforeEach(() => {
        hackerNewsApiServiceStub = jasmine.createSpyObj(
            "HackerNewsApiService",
            [
                "getAskStories",
                "getBestStories",
                "getJobStories",
                "getNewStories",
                "getShowStories",
                "getTopStories",
                "getStory"
            ]
        );
        localStorageServiceStub = jasmine.createSpyObj(
            "LocalStorageService",
            ["getItem", "setItem"]
        );

        TestBed.configureTestingModule({
            imports: [],
            providers: [
                PageService,
                {
                    provide: HackerNewsApiService,
                    useValue: hackerNewsApiServiceStub
                },
                {
                    provide: LocalStorageService,
                    useValue: localStorageServiceStub
                }
            ]
        });
        service = TestBed.inject(PageService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("getDataOfPage", () => {
        const dummyData = [1, 2, 3, 4, 5];
        const dummyPage = 1;
        const dummyPageSize = 10;

        beforeEach(() => {
            spyOn<any>(service, "fetchData").and.returnValue(of(dummyData));
            spyOn<any>(service, "buildForkJoin").and.returnValue(of(dummyData));
        });

        it("should return an Observable", () => {
            // WHEN
            service.getDataOfPage("getAskStories", dummyPage, dummyPageSize)
                .subscribe((data: any) => {
                    // THEN
                    expect(service['fetchData']).toHaveBeenCalledWith("getAskStories");
                    expect(service['buildForkJoin']).toHaveBeenCalled();
                    expect(data).toEqual({
                        data: dummyData,
                        currentPage: dummyPage,
                        pageSize: dummyPageSize,
                        maxPage: 1
                    });
                });
        });
    });

    describe("fetchData", () => {
        const testServiceMethod = (link: string, targetAPI: keyof HackerNewsApiService) => () => {
        // GIVEN
            const methodToTest = hackerNewsApiServiceStub[targetAPI];
            const expectedResult = of([1, 2, 3, 4, 5]);

            methodToTest.and.returnValue(expectedResult);

            // WHEN
            const result = service['fetchData'](link as keyof HackerNewsApiService);

            // THEN
            expect(result).toEqual(expectedResult);
            expect(service['data'][link]).toEqual(expectedResult);
            expect(methodToTest).toHaveBeenCalled();
        };

        it("should call hackerNewsApiService.getAskStories", testServiceMethod(NAV_ASK.link, "getAskStories"));

        it("should call hackerNewsApiService.getBestStories", testServiceMethod(NAV_BEST.link, "getBestStories"));

        it("should call hackerNewsApiService.getJobStories", testServiceMethod(NAV_JOB.link, "getJobStories"));

        it("should call hackerNewsApiService.getNewStories", testServiceMethod(NAV_NEW.link, "getNewStories"));

        it("should call hackerNewsApiService.getShowStories", testServiceMethod(NAV_SHOW.link, "getShowStories"));

        it("should call hackerNewsApiService.getTopStories", testServiceMethod(NAV_TOP.link, "getTopStories"));

        it("should not call any method", () => {
        // WHEN
            const result = service['fetchData']("unknown" as keyof HackerNewsApiService);

            // THEN
            expect(result).toBeUndefined();
        });
    });

    describe("buildForkJoin", () => {
        const dummyIds = [1];
        const dummyData = {};

        beforeEach(() => {
            hackerNewsApiServiceStub.getStory.and.returnValue(of(dummyData));
        });

        it("should return an Observable", () => {
        // WHEN
            service['buildForkJoin'](dummyIds)
                .subscribe((data: any) => {
                    // THEN
                    expect(hackerNewsApiServiceStub.getStory).toHaveBeenCalledTimes(dummyIds.length);
                    expect(data).toEqual([dummyData]);
                });
        });

        it("should return stored data", () => {
            // GIVEN
            localStorageServiceStub.getItem.and.returnValue(dummyData);

            // WHEN
            service['buildForkJoin'](dummyIds)
                .subscribe((data: any) => {
                    // THEN
                    expect(hackerNewsApiServiceStub.getStory).not.toHaveBeenCalled();
                    expect(data).toEqual([dummyData]);
                });
        });

        it("should return stored data", () => {
            // GIVEN
            localStorageServiceStub.getItem.and.returnValue(false);
            service['data'][dummyIds[0]] = of(dummyData);

            // WHEN
            service['buildForkJoin'](dummyIds)
                .subscribe((data: any) => {
                    // THEN
                    expect(hackerNewsApiServiceStub.getStory).not.toHaveBeenCalled();
                    expect(data).toEqual([dummyData]);
                });
        });
    });
});
