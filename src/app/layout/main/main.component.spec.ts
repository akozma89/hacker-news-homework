/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MainComponent } from "./main.component";

describe("MainComponent", () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent],
            imports: [RouterTestingModule],
        })
            .compileComponents();
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
