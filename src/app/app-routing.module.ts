import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NAV_ELEMENTS, NAV_NEW } from "./constants/navigation.constant";

const routes: Routes = NAV_ELEMENTS.map((route) => ({
  path: route.link,
  loadChildren: route.loadChildren,
  data: { link: route.link },
}));

routes.push({
  path: "",
  redirectTo: NAV_NEW.link,
  pathMatch: "full",
});
routes.push({
  path: "**",
  loadChildren: () => import("./pages/not-found/not-found.module").then((m) => m.NotFoundModule),
});

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
