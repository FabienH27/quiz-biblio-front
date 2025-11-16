import { Component, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { themeQuartz, type ColDef, type GridOptions, type Theme } from 'ag-grid-community';
import { RoleCellRenderer } from './custom/role-cell-renderer.component';
import { ScoreRow } from '../../types/users/score-row';
import { UserScore } from '../../types/user-score';

@Component({
  selector: 'app-datagrid',
  imports: [AgGridAngular],
  standalone: true,
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css'
})
export class DatagridComponent {

  rowData = input.required<UserScore[] | null>();

  colDefs: ColDef[] = [
    { field: "userName", headerName: 'Nom du joueur'  },
    { field: "role", headerName: 'Role', cellRenderer: RoleCellRenderer },
    { field: "score", headerName: 'Score' },
  ];
  
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: false
    },
    autoSizeStrategy: {
      type: 'fitGridWidth',
      defaultMinWidth: 100
    }
  };

quizbiblioTheme: Theme = themeQuartz.withParams({
  backgroundColor: '#0f172a',
  foregroundColor: '#f1f5f9',
  headerBackgroundColor: '#334155',
  borderRadius: '0px',
  rowHoverColor: '#082f49',
  checkboxCheckedBackgroundColor: '#14b8a6',
});
}
