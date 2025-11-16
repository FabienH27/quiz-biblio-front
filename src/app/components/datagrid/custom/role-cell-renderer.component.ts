import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { NgClass } from "@angular/common";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";


@Component({
    selector: 'app-mission-result-renderer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    template: `
        <span class="px-4 py-1 rounded-lg border-2 bg-cyan-900 border-cyan-700" [ngClass]="{ 'bg-red-900 border-red-700': value()?.toLowerCase() == 'admin'}">{{ value() }}</span>    
    `,
    imports: [NgClass]
})
export class RoleCellRenderer implements ICellRendererAngularComp {
    
    value = signal<string | undefined>(undefined);
    
    agInit(params: ICellRendererParams<any, any, any>): void {
        this.refresh(params);
    }
    refresh(params: ICellRendererParams<any, any, any>): boolean {
        this.value.set(params.value);
        return true;
    }
    
}