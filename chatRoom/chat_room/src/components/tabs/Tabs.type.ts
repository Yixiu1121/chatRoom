export interface TabProps {
  label: string;
  children: [];
  key: string;
}
export interface TabComponentProps {
  setOpenModal: any;
  initialItems: TabProps[];
  addItems: TabProps;
}
