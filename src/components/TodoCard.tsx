import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Reanimated from 'react-native-reanimated';
import { TodoState } from '../store/todoSlice';
import { ScaleDecorator } from 'react-native-draggable-flatlist';

type TodoCardProps = {
  item: TodoState;
  handleCompletedTask: (value: TodoState) => void;
  handleRedirectEditPage: (item: TodoState) => void;
  drag: any;
  isActive: any;
};

const TodoCard: React.FC<TodoCardProps> = props => {
  const { handleCompletedTask, item, handleRedirectEditPage, drag, isActive } =
    props;
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
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
      >
        <Reanimated.View style={styles.wrapper}>
          <CheckBox value={isSelected} onValueChange={setIsSelected} />
          <View style={styles.leftContent}>
            <View style={styles.above}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Text
              style={[
                styles.priority,
                item.priority === 'high'
                  ? styles.priorityHigh
                  : item.priority === 'medium'
                  ? styles.priorityMedium
                  : styles.priorityLow,
              ]}
            >
              {renderPriority()}
            </Text>
          </View>
          <Pressable style={styles.editSection}>
            {isSelected && (
              <Text
                style={styles.editText}
                onPress={() => handleRedirectEditPage(item)}
              >
                Edit
              </Text>
            )}
          </Pressable>
          <Pressable style={styles.doneSection}>
            {isSelected && (
              <Text
                style={styles.doneText}
                onPress={() => handleCompletedTask(item)}
              >
                Done
              </Text>
            )}
          </Pressable>
        </Reanimated.View>
      </TouchableOpacity>
    </ScaleDecorator>
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
  priorityHigh: {
    backgroundColor: 'red',
  },
  priorityMedium: {
    backgroundColor: 'yellow',
  },
  priorityLow: {
    backgroundColor: 'green',
  },
  editSection: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  doneSection: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  editText: {
    color: '#1D84B5',
  },

  doneText: {
    color: 'green',
  },
});
