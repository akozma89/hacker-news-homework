/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HackerNewsApiService } from './hacker-news-api.service';

describe('Service: HackerNewsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HackerNewsApiService]
    });
  });

  it('should ...', inject([HackerNewsApiService], (service: HackerNewsApiService) => {
    expect(service).toBeTruthy();
  }));
});
