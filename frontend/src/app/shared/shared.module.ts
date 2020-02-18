import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { Ng2Webstorage } from 'ngx-webstorage';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ButtonComponent } from './button/button.component';
import { DropdownItemComponent } from './dropdown/dropdown-item/dropdown-item.component';
import { DropdownToggleComponent } from './dropdown/dropdown-toggle/dropdown-toggle.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        RouterModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        ToastrModule.forRoot()
    ],
    declarations: [
        ListErrorsComponent,
        SidebarComponent,
        ProgressBarComponent,
        NotFoundComponent,
        DropdownToggleComponent,
        DropdownItemComponent,
        PageTitleComponent,
        ButtonComponent,
        FooterComponent,
        HeaderComponent,
        AccessDeniedComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        NgHttpLoaderModule,
        ListErrorsComponent,
        SidebarComponent,
        ProgressBarComponent,
        DropdownToggleComponent,
        DropdownItemComponent,
        PageTitleComponent,
        ButtonComponent,
        FooterComponent,
        HeaderComponent,
        AccessDeniedComponent
    ]
})
export class SharedModule { }