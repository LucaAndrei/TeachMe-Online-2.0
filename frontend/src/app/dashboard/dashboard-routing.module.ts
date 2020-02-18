import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../core/guards/role.guard';
import { ChatComponent } from './components/chat/chat.component';
import { EmailComposeComponent } from './components/email/email-compose/email-compose.component';
import { EmailDetailsComponent } from './components/email/email-details/email-details.component';
import { EmailComponent } from './components/email/email.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RadioTestComponent } from './components/tests/radio-test/radio-test.component';
import { TestsComponent } from './components/tests/tests.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: StatisticsComponent, canActivate: [RoleGuard] },
            { path: 'email', component: EmailComponent },
            { path: 'email/new', component: EmailComposeComponent },
            { path: 'email/:id', component: EmailDetailsComponent },
            { path: 'chat', component: ChatComponent },
            { path: 'tests', component: TestsComponent, canActivate: [RoleGuard] },
            { path: 'tests/radio', component: RadioTestComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'user-list', component: UserListComponent, canActivate: [RoleGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }