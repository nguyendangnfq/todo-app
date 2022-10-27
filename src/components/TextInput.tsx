import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type TextInputProps = {
  title: string;
  value: string;
  onChangeText: (value: string) => void;
};

const TextInputCustom: React.FC<TextInputProps> = props => {
  const { title, value, onChangeText } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderRadius: 8,
    height: 40,
    borderWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
  },
});
