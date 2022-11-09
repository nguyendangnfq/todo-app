import React, { useEffect } from 'react';
import { Button, LayoutAnimation, StyleSheet, View } from 'react-native';
import { DropDownLang, TodoCard } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  completedTask,
  fetchToDoList,
  removeTask,
  TodoState,
  updateTask,
} from '../store/todoSlice';
import { theme } from '../theme/variables';

import { useNavigation } from '@react-navigation/native';
import { get, ref } from 'firebase/database';
import { db } from '../../firebase-config';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const data: TodoState[] = useAppSelector(
    state => state.todoList.originalState,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchToDoList());
    // const fetch = async () => {
    //   const res = await (await get(ref(db, '/todo'))).val();
    //   const todos = Object.keys(res).map(key => res[key]);
    //   console.log(todos);
    // };
    // fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    navigation.navigate('EditTask', value);
  };

  return (
    <View style={styles.container}>
      <NestableScrollContainer>
        <DropDownLang />
        <NestableDraggableFlatList
          data={data}
          extraData={data}
          onDragEnd={({ data }) => dispatch(updateTask(data))}
          keyExtractor={item => item?.id?.toString()}
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
            return navigation.navigate('AddTask');
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
