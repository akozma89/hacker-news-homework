import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { AppComponent } from "./app.component";

@Component({
    selector: "app-header",
    template: ""
})
class MockHeaderComponent {}

@Component({
    selector: "app-main",
    template: ""
})
class MockMainComponent {}

@Component({
    selector: "app-footer",
    template: ""
})
class MockFooterComponent {}

@Component({
    selector: "app-loader",
    template: ""
})
class MockLoaderComponent {}

describe("AppComponent", () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            MockHeaderComponent,
            MockMainComponent,
            MockFooterComponent,
            MockLoaderComponent
        ],
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
