import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Dropdown, TextInputCustom } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTask, TodoState } from '../store/todoSlice';
import { useNavigation } from '@react-navigation/native';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const navigation = useNavigation();

  const data = useAppSelector(state => state.todoList.originalState);
  const dispatch = useAppDispatch();

  const onValueChange = (value: string) => {
    setPriority(value);
  };

  const handleAddTask = () => {
    const newValue: TodoState = {
      id: data.length + 1,
      title: title,
      description: description,
      priority: priority,
      isCompleted: false,
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
