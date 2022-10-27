import React from 'react';
// import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type DropdownProps = {
  onValueChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ onValueChange }) => {
  return (
    <RNPickerSelect
      // style={styles.dropdown}
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

// const styles = StyleSheet.create({
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#000',
//   },
// });
