import { HelperService } from "src/app/services/helper.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import {
    Ask, Job, Poll, PollOpt, Story
} from "../interfaces/common.interface";

@Injectable({
    providedIn: "root"
})
/**
 * Hacker News API Service
 */
export class HackerNewsApiService {
    baseUrl = "https://hacker-news.firebaseio.com/v0/";

    constructor(private http: HttpClient, private helperService: HelperService) {}

    /**
     * Get top stories
     * @returns {Observable<number[]>} Observable of top stories
     */
    getTopStories(): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}topstories.json`);
    }

    /**
     * Get new stories
     * @returns {Observable<number[]>} Observable of new stories
     */
    getNewStories(): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}newstories.json`);
    }

    /**
     * Get best stories
     * @returns {Observable<number[]>} Observable of best stories
     */
    getBestStories(): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}beststories.json`);
    }

    /**
     * Get ask stories
     * @returns {Observable<number[]>} Observable of ask stories
     */
    getAskStories(): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}askstories.json`);
    }

    /**
     * Get show stories
     * @returns {Observable<number[]>} Observable of show stories
     */
    getShowStories(): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}showstories.json`);
    }

    /**
     * Get job stories
     * @returns {Observable<number[]>} Observable of job stories
     */
    getJobStories(): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}jobstories.json`);
    }

    /**
     * Get a single story
     * @param {number} id ID of story
     * @returns {Observable<any>} Observable of story
     */
    getStory(id: number): Observable<any> {
        return this.http.get<Story | Job | Ask | Comment | Poll | PollOpt>(`${this.baseUrl}item/${id}.json`).pipe(
            catchError((error: any): Observable<any> => {
                console.error(error);
                return of({});
            }),
        );
    }
}
