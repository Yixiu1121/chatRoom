export interface TabProps {
  label: string;
  roomId: string;
  key: string;
}
export interface TabComponentProps {
  setOpenModal: any;
  chatRooms: TabProps[];
  activeKey: string;
  setActiveKey: (key: string) => void;
}
