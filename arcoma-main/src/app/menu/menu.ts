import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    // translate: 'MENU.DASHBOARD',
    type: 'item',
    icon: 'home',
    url: 'dashboard',
  },
  {
    id: 'Products',
    title: 'Products',
    // translate: 'MENU.DASHBOARD',
    type: 'item',
    icon: 'shopping-cart',
    url: 'product/list',
  },
  // {
  //   id: 'Category',
  //   title: 'Category',
  //   // translate: 'MENU.DASHBOARD',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'category/list',
  // },
  {
    id: 'User',
    title: 'User',
    // translate: 'MENU.DASHBOARD',
    type: 'item',
    icon: 'user',
    url: 'user/list',
  },
  {
    id: 'Customer',
    title: 'Customer',
    // translate: 'MENU.DASHBOARD',
    type: 'item',
    icon: 'users',
    url: 'customer/list',
  },
  {
    id: 'Sales',
    title: 'Sales',
    // translate: 'MENU.DASHBOARD',
    type: 'collapsible',
    icon: 'dollar-sign',
    children: [
      {
        id: 'Orders',
        title: 'Orders',
        // translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        url: 'sales/orders'
      },
      {
        id: 'Transactions',
        title: 'Transactions',
        // translate: 'MENU.APPS.USER.VIEW',
        type: 'item',
        icon: 'circle',
        url: 'sales/transactions'
      },
    ]
  },
  // {
  //   id: 'Settings',
  //   title: 'Settings',
  //   // translate: 'MENU.DASHBOARD',
  //   type: 'item',
  //   icon: 'settings',
  //   url: 'settings/profiles',
  // }
];
