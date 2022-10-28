import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Dropdown, TextInputCustom } from '../components';
import { useAppDispatch } from '../store/hooks';
import { editedTask, TodoState } from '../store/todoSlice';

type EditTaskProps = {
  route: any;
  navigation: any;
};

const EditTask: React.FC<EditTaskProps> = ({ route, navigation }) => {
  const data = route.params;
  const [title, setTitle] = useState<string>(data.title);
  const [description, setDescription] = useState<string>(data.description);
  const [priority, setPriority] = useState<string>(data.priority);

  const dispatch = useAppDispatch();

  const onValueChange = (value: string) => {
    setPriority(value);
  };

  console.log(data);

  const handleEditTask = () => {
    const editedValue: TodoState = {
      ...data,
      title: title,
      description: description,
      priority: priority,
    };

    dispatch(editedTask(editedValue));
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
