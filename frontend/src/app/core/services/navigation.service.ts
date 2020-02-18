import { Injectable } from '@angular/core';
import { getMainSectionTabs, MenuTab } from '../models/menu-tabs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private userService: UserService) { }

    getMenuTabs(): MenuTab[] {
        return getMainSectionTabs().filter(tab => this.hasRole(...tab.canWrite, ...tab.canRead));
    }

    hasRole(...roleIds: any): boolean {
        const user = this.userService.currentUser;
        if (!user) {
            return false;
        } else if (user.role) {
            const t = roleIds.find(roleId => roleId === user.role);
            return t !== undefined;
        }
    }

    canWrite(tabType): boolean {
        const tab = this.getTab(tabType);
        return tab ? this.hasRole(...tab.canWrite) : false;
    }

    getTab(tabType: string): MenuTab {
        const subMenuTabs = [...getMainSectionTabs()];
        const tab = subMenuTabs.find(tab => tab.type === tabType)
        if (!tab) {
            // console.error(`Tab ${tabType} not found`);
            return;
        }
        return tab;
    }

    getTabRoles(tabType: string): string[] {
        const tab = this.getTab(tabType);
        return [...tab.canWrite, ...tab.canRead];
    }
}
