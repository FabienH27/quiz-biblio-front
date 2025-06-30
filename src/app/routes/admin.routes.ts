import { Routes } from "@angular/router";
import { adminGuard } from "../guards/admin.guard";
import { AdminComponent } from "../components/layouts/admin/admin.component";
import { AdminPanelComponent } from "../pages/admin/admin-panel/admin-panel.component";
import { UsersListComponent } from "../pages/admin/users-list/users-list.component";
import { ThemesListComponent } from "../pages/admin/themes-list/themes-list.component";

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                component: AdminPanelComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'themes',
                component: ThemesListComponent
            }
        ]
    }
]