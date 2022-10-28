import React from 'react';
import { StyleSheet, Button, ScrollView, View } from 'react-native';
import { theme } from '../theme/variables';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { TodoCard } from '../components';
import { completedTask, removeTask, TodoState } from '../store/todoSlice';

const Home = (props: any) => {
  const { navigation } = props;

  const data = useAppSelector(state => state.todoList.originalState);
  const dispatch = useAppDispatch();

  const handleCompletedTask = (value: TodoState) => {
    const completedValue = {
      ...value,
      isCompleted: true,
    };
    dispatch(removeTask(completedValue.id));
    dispatch(completedTask(completedValue));
  };

  const handleRedirectEditPage = (value: TodoState) => {
    navigation.navigate('Edit Task', value);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {data
          .slice()
          .reverse()
          .map(item => (
            <TodoCard
              item={item}
              key={item.id}
              handleCompletedTask={handleCompletedTask}
              handleRedirectEditPage={handleRedirectEditPage}
            />
          ))}
      </ScrollView>
      <View style={styles.button}>
        <Button
          title="Create a Task"
          onPress={() => navigation.navigate('Add Task')}
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
