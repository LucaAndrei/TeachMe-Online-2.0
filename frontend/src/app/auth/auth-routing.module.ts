import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from '../shared/access-denied/access-denied.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout.component';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'register',
        component: AuthComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'access-denied',
        component: AccessDeniedComponent
    },
    {
        path: 'activate/:registrationToken',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }