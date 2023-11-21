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
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("getTopStories", () => {
        it("should return an Observable<number[]>", () => {
            // GIVEN
            const dummyData = [1, 2, 3, 4, 5];

            // WHEN
            service.getTopStories().subscribe((data) => {
                // THEN
                expect(data.length).toBe(5);
                expect(data).toEqual(dummyData);
            });

            const req = httpMock.expectOne(`${service['baseUrl']}topstories.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });

    describe("getNewStories", () => {
        it("should return an Observable<number[]>", () => {
            // GIVEN
            const dummyData = [1, 2, 3, 4, 5];

            // WHEN
            service.getNewStories().subscribe((data) => {
                // THEN
                expect(data.length).toBe(5);
                expect(data).toEqual(dummyData);
            });

            const req = httpMock.expectOne(`${service['baseUrl']}newstories.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });

    describe("getBestStories", () => {
        it("should return an Observable<number[]>", () => {
            // GIVEN
            const dummyData = [1, 2, 3, 4, 5];

            // WHEN
            service.getBestStories().subscribe((data) => {
                expect(data.length).toBe(5);
                expect(data).toEqual(dummyData);
            });

            // THEN
            const req = httpMock.expectOne(`${service['baseUrl']}beststories.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });

    describe("getAskStories", () => {
        it("should return an Observable<number[]>", () => {
            // GIVEN
            const dummyData = [1, 2, 3, 4, 5];

            // WHEN
            service.getAskStories().subscribe((data) => {
                expect(data.length).toBe(5);
                expect(data).toEqual(dummyData);
            });

            // THEN
            const req = httpMock.expectOne(`${service['baseUrl']}askstories.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });

    describe("getShowStories", () => {
        it("should return an Observable<number[]>", () => {
            // GIVEN
            const dummyData = [1, 2, 3, 4, 5];

            // WHEN
            service.getShowStories().subscribe((data) => {
                expect(data.length).toBe(5);
                expect(data).toEqual(dummyData);
            });

            // THEN
            const req = httpMock.expectOne(`${service['baseUrl']}showstories.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });

    describe("getJobStories", () => {
        it("should return an Observable<number[]>", () => {
            // GIVEN
            const dummyData = [1, 2, 3, 4, 5];

            // WHEN
            service.getJobStories().subscribe((data) => {
                expect(data.length).toBe(5);
                expect(data).toEqual(dummyData);
            });

            // THEN
            const req = httpMock.expectOne(`${service['baseUrl']}jobstories.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });

    describe("getStory", () => {
        it("should return an Observable<Story | Job | Ask | Comment | Poll | PollOpt>", () => {
            // GIVEN
            const dummyData = {
                id: 1,
                by: "dummyBy",
                descendants: 1,
                kids: [1, 2, 3],
                score: 1,
                time: 1,
                title: "dummyTitle",
                type: "dummyType",
                url: "dummyUrl",
                text: "dummyText",
                parts: [1, 2, 3],
                poll: 1,
                parent: 1,
            };

            // WHEN
            service.getStory(1).subscribe((data) => {
                expect(data).toEqual(dummyData);
            });

            // THEN
            const req = httpMock.expectOne(`${service['baseUrl']}item/1.json`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyData);
        });
    });
});
