import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
/**
 * Local Storage Service
 */
export class LocalStorageService {
    localStorage = window.localStorage;

    /**
     * Set item in local storage
     * @param {string} key Key
     * @param {any} value Value
     */
    setItem(key: string, value: any) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Get item from local storage
     * @param {string} key Key
     */
    getItem(key: string) {
        if (this.localStorage.getItem(key)) {
            return JSON.parse(this.localStorage.getItem(key) || "{}");
        }

        return null;
    }
}
