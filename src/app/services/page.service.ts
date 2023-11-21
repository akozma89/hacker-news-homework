import { LocalStorageService } from './local-storage.service';
import { HackerNewsApiService } from 'src/app/services/hacker-news-api.service';
import { Injectable } from '@angular/core';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { NAV_ASK, NAV_BEST, NAV_JOB, NAV_NEW, NAV_SHOW, NAV_TOP } from '../constants/navigation.constant';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  data: any = {};

  constructor(private hackerNewsApiService: HackerNewsApiService, private localStorageService: LocalStorageService) {}

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

  private buildForkJoin(ids: number[]) {
    return forkJoin(ids.map(id => {
      const storedData = this.localStorageService.getItem(`item-${id}`);

      if (!this.data[id] && storedData) {
        this.data[id] = of(storedData);
      }

      if (this.data[id]) {
        return this.data[id];
      }


      if (!this.data[id]) {
        this.data[id] = this.hackerNewsApiService.getStory(id).pipe(tap(data => {
          this.data[id] = of(data);
          this.localStorageService.setItem(`item-${id}`, data);
        }));
      }

      return this.data[id];
    }));
  }

  getPageOfData(targetAPI: keyof HackerNewsApiService, page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;

    return this.fetchData(targetAPI).pipe(
      switchMap((ids: number[]) => {
        return this.buildForkJoin(ids.slice(start, end))
          .pipe(
            switchMap((data: any[]) => {
              return of({
                data,
                currentPage: page,
                pageSize,
                maxPage: Math.ceil(ids.length / pageSize),
              });
            }),
        );
      }),
    );
  }
}
