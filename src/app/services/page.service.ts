import { HackerNewsApiService } from "src/app/services/hacker-news-api.service";
import { Injectable } from "@angular/core";
import {
    forkJoin, of, switchMap, tap
} from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import {
    NAV_ASK, NAV_BEST, NAV_JOB, NAV_NEW, NAV_SHOW, NAV_TOP
} from "../constants/navigation.constant";

@Injectable({
    providedIn: "root"
})
/**
 * Page Service
 */
export class PageService {
    private data: any = {};

    constructor(private hackerNewsApiService: HackerNewsApiService, private localStorageService: LocalStorageService) {}

    /**
     * Get data of page
     * @param {keyof HackerNewsApiService} targetAPI Target API
     * @param {number} page Page number
     * @param {number} pageSize Page size
     * @returns {Observable<any>} Observable of data
     */
    getDataOfPage(targetAPI: keyof HackerNewsApiService, page: number, pageSize: number) {
        const start = (page - 1) * pageSize;
        const end = page * pageSize;

        return this.fetchData(targetAPI).pipe(
            switchMap((ids: number[]) => this.buildForkJoin(ids.slice(start, end))
                .pipe(
                    switchMap((data: any[]) => of({
                        data,
                        currentPage: page,
                        pageSize,
                        maxPage: Math.ceil(ids.length / pageSize),
                    })),
                )),
        );
    }

    /**
     * Fetch data
     * @param {keyof HackerNewsApiService} targetAPI Target API
     * @returns {Observable<any>} Observable of data
     */
    private fetchData(targetAPI: keyof HackerNewsApiService) {
        if (!this.data[targetAPI]) {
            switch (targetAPI) {
                case NAV_ASK.link:
                    this.data[targetAPI] = this.hackerNewsApiService.getAskStories();
                    break;
                case NAV_BEST.link:
                    this.data[targetAPI] = this.hackerNewsApiService.getBestStories();
                    break;
                case NAV_JOB.link:
                    this.data[targetAPI] = this.hackerNewsApiService.getJobStories();
                    break;
                case NAV_NEW.link:
                    this.data[targetAPI] = this.hackerNewsApiService.getNewStories();
                    break;
                case NAV_SHOW.link:
                    this.data[targetAPI] = this.hackerNewsApiService.getShowStories();
                    break;
                case NAV_TOP.link:
                    this.data[targetAPI] = this.hackerNewsApiService.getTopStories();
                    break;
                default:
                    break;
            }
        }

        return this.data[targetAPI];
    }

    /**
     * Build fork join for getting individual items
     * @param {number[]} ids IDs of items
     * @returns {Observable<any>} Observable of data
     */
    private buildForkJoin(ids: number[]) {
        return forkJoin(ids.map((id) => {
            const storedData = this.localStorageService.getItem(`item-${id}`);

            if (!this.data[id] && storedData) {
                this.data[id] = of(storedData);
            }

            if (this.data[id]) {
                return this.data[id];
            }

            if (!this.data[id]) {
                this.data[id] = this.hackerNewsApiService.getStory(id).pipe(tap((data) => {
                    this.data[id] = of(data);
                    this.localStorageService.setItem(`item-${id}`, data);
                }));
            }

            return this.data[id];
        }));
    }
}
