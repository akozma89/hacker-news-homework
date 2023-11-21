import { TestBed } from "@angular/core/testing";
import { PageService } from "./page.service";
import { HackerNewsApiService } from "./hacker-news-api.service";
import { LocalStorageService } from "./local-storage.service";

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
            ["getIte", "setItem"]
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
});
