import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

type DropdownProps = {
  onValueChange: (value: string) => void;
  value?: string;
};

const priorityData = ['High', 'Medium', 'Low'];

const Dropdown: React.FC<DropdownProps> = ({ onValueChange, value }) => {
  return (
    <SelectDropdown
      data={priorityData}
      onSelect={onValueChange}
      defaultValue={value}
      buttonTextAfterSelection={selectedItem => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={item => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};

export default Dropdown;
