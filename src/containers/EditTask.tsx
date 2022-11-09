import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Dropdown, TextInputCustom } from '../components';
import { useAppDispatch } from '../store/hooks';
import { TodoState, updateTodo } from '../store/todoSlice';

type EditTaskProps = {
  route: any;
};

const EditTask: React.FC<EditTaskProps> = ({ route }) => {
  const data = route.params;
  const [title, setTitle] = useState<string>(data.title);
  const [description, setDescription] = useState<string>(data.description);
  const [priority, setPriority] = useState<string>(data.priority);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const onValueChange = (value: string) => {
    setPriority(value);
  };

  const handleEditTask = () => {
    const editedValue: TodoState = {
      ...data,
      title: title,
      description: description,
      priority: priority,
    };

    dispatch(updateTodo({ id: editedValue.id, data: editedValue }));
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
        <Dropdown onValueChange={onValueChange} value={priority} />
      </View>
      <View>
        <Button title="Modify Task" onPress={handleEditTask} />
      </View>
    </View>
  );
};

export default EditTask;

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
