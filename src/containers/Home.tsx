import React from 'react';
import { StyleSheet, Button, ScrollView, View } from 'react-native';
import { theme } from '../theme/variables';
import { useAppSelector } from '../store/hooks';
import { TodoCard } from '../components';

const Home = (props: any) => {
  const { navigation } = props;

  const data = useAppSelector(state => state.todoList);

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
