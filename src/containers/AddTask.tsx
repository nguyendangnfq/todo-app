import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Dropdown, TextInputCustom } from '../components';
import { useAppDispatch } from '../store/hooks';
import { createTask, TodoState } from '../store/todoSlice';

const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const dispatch = useAppDispatch();

  const onValueChange = (value: string) => {
    setPriority(value);
  };

  const handleAddTask = () => {
    const newValue: TodoState = {
      title: title,
      description: description,
      priority: priority,
    };
    dispatch(createTask(newValue));
    navigation.goBack();
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.input}>
        <TextInputCustom
          title={'Title'}
          value={title}
          onChangeText={setTitle}
        />
        <TextInputCustom
          title={'Description'}
          value={description}
          onChangeText={setDescription}
        />
        <Dropdown onValueChange={onValueChange} />
      </View>
      <View>
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 50,
  },
});
