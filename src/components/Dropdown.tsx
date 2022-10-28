import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

type DropdownProps = {
  onValueChange: (value: string) => void;
  value?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ onValueChange, value }) => {
  return (
    <RNPickerSelect
      value={value}
      onValueChange={onValueChange}
      items={[
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ]}
    />
  );
};

export default Dropdown;
