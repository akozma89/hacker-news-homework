import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    localStorage = window.localStorage;

    setItem(key: string, value: any) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string) {
        if (this.localStorage.getItem(key)) {
            return JSON.parse(this.localStorage.getItem(key) || "{}");
        }

        return null;
    }
}
