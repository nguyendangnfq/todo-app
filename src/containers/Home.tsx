import React from 'react';
import { StyleSheet, Button, View, LayoutAnimation } from 'react-native';
import { theme } from '../theme/variables';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DropDownLang, TodoCard } from '../components';
import {
  completedTask,
  removeTask,
  TodoState,
  updateTask,
} from '../store/todoSlice';

import { useNavigation } from '@react-navigation/native';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const data: TodoState[] = useAppSelector(
    state => state.todoList.originalState,
  );
  const dispatch = useAppDispatch();

  const handleCompletedTask = (value: TodoState) => {
    const completedValue = {
      ...value,
      isCompleted: true,
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(removeTask(completedValue.id));
    dispatch(completedTask(completedValue));
  };

  const handleRedirectEditPage = (value: TodoState) => {
    // navigation.navigate('EditTask', value);
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <DropDownLang />
      <NestableScrollContainer>
        <NestableDraggableFlatList
          data={data}
          extraData={data}
          onDragEnd={({ data }) => dispatch(updateTask(data))}
          keyExtractor={item => item.id.toString()}
          renderItem={props => (
            <TodoCard
              {...props}
              handleRedirectEditPage={handleRedirectEditPage}
              handleCompletedTask={handleCompletedTask}
            />
          )}
        />
      </NestableScrollContainer>
      <View style={styles.button}>
        <Button
          title="Create a Task"
          onPress={() => {
            // navigation.navigate('AddTask');
            console.log(navigation.navigate);
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
  },
});
