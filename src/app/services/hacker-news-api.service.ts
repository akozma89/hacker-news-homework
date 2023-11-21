import { HelperService } from 'src/app/services/helper.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Ask, Job, Poll, PollOpt, Story } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  baseUrl = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient, private helperService: HelperService) {}

  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'topstories.json');
  }

  getNewStories(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'newstories.json');
  }

  getBestStories(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'beststories.json');
  }

  getAskStories(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'askstories.json');
  }

  getShowStories(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'showstories.json');
  }

  getJobStories(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'jobstories.json');
  }

  getStory(id: number): Observable<any> {
    return this.http.get<Story | Job | Ask | Comment | Poll | PollOpt>(`${this.baseUrl}item/${id}.json`).pipe(
      catchError((error: any): Observable<any> => {
        console.error(error);
        return of({});
      }),
    );
  }
}
