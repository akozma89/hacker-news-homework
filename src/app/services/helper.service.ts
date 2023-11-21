import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { formatDistanceToNow, intervalToDuration, isBefore } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private loading = new Subject<boolean>();

  get loading$() {
    return this.loading.asObservable();
  }

  setLoading(value: boolean): void {
    this.loading.next(value);
  }

  static getHostname(url: string): string {
    return new URL(url).hostname;
  }

  static scrollIntoView(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  static scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  static openLink(url: string): void {
    window.open(url, '_blank');
  }

  static timeSince(date: Date): string {
    const currentDate = new Date();

    if (!isBefore(date, currentDate)) {
      return '0 seconds';
    }

    intervalToDuration({ start: date, end: currentDate });

    const formattedDuration = formatDistanceToNow(date, { includeSeconds: true });

    return formattedDuration;
  }
}
