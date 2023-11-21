import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { formatDistanceToNow, intervalToDuration, isBefore } from "date-fns";

@Injectable({
    providedIn: "root"
})
/**
 * Helper Service
 */
export class HelperService {
    private loading = new Subject<boolean>();

    /**
     * Getter for loading observable
     */
    get loading$() {
        return this.loading.asObservable();
    }

    /**
     * Set loading
     * @param {boolean} value Value
     */
    setLoading(value: boolean): void {
        this.loading.next(value);
    }

    /**
     * Get hostname
     * @param {string} url URL
     * @returns {string} Hostname
     */
    static getHostname(url: string): string {
        return new URL(url).hostname;
    }

    /**
     * Scroll into view
     * @param {HTMLElement} element Element
     */
    static scrollIntoView(element: HTMLElement): void {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /**
     * Scroll to top
     */
    static scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * Open link in new tab
     * @param {string} url URL
     */
    static openLink(url: string): void {
        window.open(url, "_blank");
    }

    /**
     * Get time since
     * @param {Date} date Date
     * @returns {string} Time since
     */
    static timeSince(date: Date): string {
        const currentDate = new Date();

        if (!isBefore(date, currentDate)) {
            return "0 seconds";
        }

        intervalToDuration({ start: date, end: currentDate });

        const formattedDuration = formatDistanceToNow(date, { includeSeconds: true });

        return formattedDuration;
    }
}
