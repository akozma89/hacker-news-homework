import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";

import { PageService } from "src/app/services/page.service";
import { HelperService } from "src/app/services/helper.service";
import { ListPageComponent } from "./list-page.component";

describe("ListPageComponent", () => {
    let component: ListPageComponent;
    let fixture: ComponentFixture<ListPageComponent>;
    let pageServiceStub: jasmine.SpyObj<PageService>;
    let helperServiceStub: jasmine.SpyObj<HelperService>;
    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
        pageServiceStub = jasmine.createSpyObj("PageService", ["getPageOfData"]);
        helperServiceStub = jasmine.createSpyObj("HelperService", ["setLoading"]);

        pageServiceStub.getPageOfData.and.returnValue(of([]));

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ListPageComponent],
            providers: [
                {
                    provide: PageService,
                    useValue: pageServiceStub,
                },
                {
                    provide: HelperService,
                    useValue: helperServiceStub,
                },
            ],
        });
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(ListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(activatedRoute).toBeTruthy();
    });
});
