/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { LinkCardComponent } from "./link-card.component";

describe("LinkCardComponent", () => {
    let component: LinkCardComponent;
    let fixture: ComponentFixture<LinkCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
