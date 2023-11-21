import { NavItem } from "../interfaces/navigation.interface";

export const NAV_HOME: NavItem = {
  link: '',
  label: 'Home',
  loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
};

export const NAV_NEW: NavItem = {
  link: 'new',
  label: 'New Stories',
  loadChildren: () => import('../pages/list/list.module').then(m => m.ListModule)
};

export const NAV_TOP: NavItem = {
  link: 'top',
  label: 'Top Stories',
  loadChildren: () => import('../pages/list/list.module').then(m => m.ListModule)
};

export const NAV_BEST: NavItem = {
  link: 'best',
  label: 'Best Stories',
  loadChildren: () => import('../pages/list/list.module').then(m => m.ListModule)
};

export const NAV_ASK: NavItem = {
  link: 'ask',
  label: 'Ask HN',
  loadChildren: () => import('../pages/list/list.module').then(m => m.ListModule)
};

export const NAV_SHOW: NavItem = {
  link: 'show',
  label: 'Show HN',
  loadChildren: () => import('../pages/list/list.module').then(m => m.ListModule)
};

export const NAV_JOB: NavItem = {
  link: 'job',
  label: 'Jobs',
  loadChildren: () => import('../pages/list/list.module').then(m => m.ListModule)
};

export const NAV_ELEMENTS: NavItem[] = [
  NAV_NEW,
  NAV_TOP,
  NAV_BEST,
  NAV_ASK,
  NAV_SHOW,
  NAV_JOB,
];
