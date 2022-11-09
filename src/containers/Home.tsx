import React, { useCallback, useEffect } from 'react';
import {
  Button,
  LayoutAnimation,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
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
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const data: TodoState[] = useAppSelector(
    state => state.todoList.originalState,
  );
  const dispatch = useAppDispatch();

  console.log('render');

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

  const renderTodoItem = useCallback(
    ({ item, drag }: RenderItemParams<any>) => (
      <View>
        <TouchableOpacity onLongPress={drag}>
          <TodoCard
            item={item}
            handleRedirectEditPage={handleRedirectEditPage}
            handleCompletedTask={handleCompletedTask}
          />
        </TouchableOpacity>
      </View>
    ),
    [data],
  );

  return (
    <View style={styles.container}>
      <DropDownLang />
      <DraggableFlatList
        style={[
          {
            flex: 1,
          },
        ]}
        containerStyle={{
          flex: 1,
        }}
        contentContainerStyle={{
          flex: 1,
        }}
        data={data}
        onDragEnd={({ data }) => {}}
        keyExtractor={item => item.id}
        renderItem={renderTodoItem}
      />

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
