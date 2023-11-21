export interface NavItem {
  link: string;
  label: string;
  loadChildren: () => Promise<any>;
}
