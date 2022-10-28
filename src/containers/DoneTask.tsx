import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TodoCard } from '../components';
import { useAppSelector } from '../store/hooks';
import { theme } from '../theme/variables';

type DoneTaskProps = {};

const DoneTask: React.FC<DoneTaskProps> = () => {
  const data = useAppSelector(state => state.todoList.completedTaskState);

  return (
    <View style={styles.container}>
      <ScrollView>
        {data
          .slice()
          .reverse()
          .map((item, index) => (
            <TodoCard item={item} key={index} />
          ))}
      </ScrollView>
    </View>
  );
};

export default DoneTask;

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
