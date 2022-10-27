import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { TodoState } from '../store/todoSlice';

type TodoCardProps = {
  item: TodoState;
};

const TodoCard: React.FC<TodoCardProps> = ({ item }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const renderPriority = () => {
    let priority;

    switch (item.priority) {
      case 'high':
        priority = 'High';
        break;
      case 'medium':
        priority = 'Medium';
        break;
      case 'low':
        priority = 'Low';
        break;
      default:
    }
    return priority;
  };

  return (
    <View style={styles.wrapper}>
      <CheckBox value={isSelected} onValueChange={setIsSelected} />
      <View style={styles.leftContent}>
        <View style={styles.above}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text style={styles.priority}>{renderPriority()}</Text>
      </View>
      <Pressable style={styles.doneSection}>
        {isSelected && <Text style={styles.doneText}>Done</Text>}
      </Pressable>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    marginBottom: 10,
    flexDirection: 'row',
  },
  leftContent: {
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  above: {
    marginBottom: 15,
  },
  description: {
    fontStyle: 'italic',
  },
  priority: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 8,
    fontSize: 12,
  },
  doneSection: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  doneText: {
    color: 'green',
  },
});
