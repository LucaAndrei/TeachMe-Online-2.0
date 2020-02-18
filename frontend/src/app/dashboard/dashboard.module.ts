import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../shared/shared.module';
import { ChatBoxComponent } from './components/chat/chat-box/chat-box.component';
import { ChatMessageComponent } from './components/chat/chat-box/chat-message/chat-message.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContactListComponent } from './components/chat/contact-list/contact-list.component';
import { ContactComponent } from './components/chat/contact-list/contact/contact.component';
import { EmailComposeComponent } from './components/email/email-compose/email-compose.component';
import { EmailDetailsComponent } from './components/email/email-details/email-details.component';
import { EmailComponent } from './components/email/email.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { QuestionComponent } from './components/tests/question/question.component';
import { RadioTestComponent } from './components/tests/radio-test/radio-test.component';
import { TestsComponent } from './components/tests/tests.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { TestCardComponent } from './components/tests/test-card/test-card.component';

@NgModule({
    declarations: [
        DashboardComponent,
        EmailComponent,
        ChatComponent,
        TestsComponent,
        StatisticsComponent,
        ProfileComponent,
        EmailComposeComponent,
        EmailDetailsComponent,
        ChatBoxComponent,
        ContactListComponent,
        ChatMessageComponent,
        ContactComponent,
        RadioTestComponent,
        QuestionComponent,
        UserListComponent,
        TopbarComponent,
        TestCardComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        NgxEditorModule,
        BsDropdownModule.forRoot()
    ]
})
export class DashboardModule { }
