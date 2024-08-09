import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { TabComponentProps } from "./Tabs.type";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabComponents: React.FC<TabComponentProps> = ({
  setOpenModal,
  chatRooms,
  activeKey,
  setActiveKey,
}) => {
  const [items, setItems] = useState(chatRooms);
  useEffect(() => {
    setItems(chatRooms);
  }, [chatRooms]);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.label === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      setOpenModal(true);
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};

export default TabComponents;
