import * as _ from 'lodash';
import { ROLES } from './roles';

export class MenuItem {
    name: string;
    route: string;

    constructor(
        _name: string = '',
        _route: string
    ) {
        this.name = _name;
        this.route = _route;
    }
}

export interface MenuTab {
    type: string;
    canWrite: string[];
    canRead: string[];
    menuItem: MenuItem;
}

export const MENU_TABS: MenuTab[] = [
    {
        type: 'dashboard',
        canWrite: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
        canRead: [],
        menuItem: new MenuItem('Dashboard', '/app/dashboard')
    },
    {
        type: 'email',
        canWrite: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER],
        canRead: [],
        menuItem: new MenuItem('Email', '/app/email')
    },
    {
        type: 'chat',
        canWrite: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER],
        canRead: [],
        menuItem: new MenuItem('Chat', '/app/chat')
    },
    {
        type: 'tests',
        canWrite: [ROLES.SUPER_ADMIN, ROLES.USER],
        canRead: [],
        menuItem: new MenuItem('Tests', '/app/tests')
    },
    {
        type: 'user-list',
        canWrite: [ROLES.SUPER_ADMIN],
        canRead: [],
        menuItem: new MenuItem('User List', '/app/user-list')
    }
]

export const getMainSectionTabs = () => {
    return _.cloneDeep(MENU_TABS);
}