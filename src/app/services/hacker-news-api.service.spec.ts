import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HackerNewsApiService } from "./hacker-news-api.service";

describe("Service: HackerNewsApi", () => {
    let service: HackerNewsApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HackerNewsApiService]
        });
        service = TestBed.inject(HackerNewsApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure all mocked HTTP requests have been handled
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
