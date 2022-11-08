import React from 'react';
import i18n from 'i18n-js';
import { changeLanguage } from '../store/langSlice';
import { useAppDispatch } from '../store/hooks';
import SelectDropdown from 'react-native-select-dropdown';

const DropDownLang = () => {
  const dispatch = useAppDispatch();
  const handleChangeLanguages = (val: string) => {
    dispatch(changeLanguage(val));
  };
  return (
    <SelectDropdown
      dropdownStyle={{ marginBottom: 5 }}
      data={['en', 'vi']}
      onSelect={handleChangeLanguages}
      defaultValue={i18n.locale}
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

export default DropDownLang;
