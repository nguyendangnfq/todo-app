import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import i18n from 'i18n-js';
import { changeLanguage } from '../store/langSlice';
import { useAppDispatch } from '../store/hooks';

const DropDownLang = () => {
  const dispatch = useAppDispatch();
  const handleChangeLanguages = (val: string) => {
    dispatch(changeLanguage(val));
  };
  return (
    <RNPickerSelect
      value={i18n.locale}
      placeholder={{
        label: 'Select a languages',
      }}
      onValueChange={(value: any) => handleChangeLanguages(value)}
      items={[
        { label: 'English', value: 'en' },
        { label: 'Vietnamese', value: 'vi' },
      ]}
    />
  );
};

export default DropDownLang;
