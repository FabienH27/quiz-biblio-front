import { Component } from "@angular/core";
import { IsGrantedDirective } from "../is-granted.directive";

@Component({
    template: `<a *isGranted="'ADMIN'">Admin panel</a>`,
    imports: [IsGrantedDirective],
})
export class TestDirectiveComponent {}