import React, { useCallback, useEffect } from 'react';
import {
  Button,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TodoCard } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchToDoList, removeTodo, TodoState } from '../store/todoSlice';
import { theme } from '../theme/variables';

import { useNavigation } from '@react-navigation/native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const data: TodoState[] = useAppSelector(
    state => state.todoList.originalState,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchToDoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCompletedTask = (value: TodoState) => {
    const completedValue = {
      ...value,
      isCompleted: true,
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // dispatch(removeTask(completedValue.id));
    // dispatch(completedTask(completedValue));
    dispatch(removeTodo(completedValue.id));
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
      {/* <DropDownLang /> */}
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
        keyExtractor={item => item?.id?.toString()}
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
