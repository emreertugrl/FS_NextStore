import React, {memo, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useAppDispatch} from '../../store/hooks';
import {getCategory} from '../../store/actions/categoryActions';

function ProductListHeaderComponent({categories}) {
  const dispatch = useAppDispatch();
  const [activeId, setActiveId] = useState('All'); // seçili kategori

  const handlePress = item => {
    setActiveId(item._id);

    dispatch(getCategory(item._id));
  };
  return (
    <View style={styles.headerContainer}>
      <FlatList
        data={categories} // 👈 All eklendi
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={[
              styles.categoryItem,
              activeId === item._id && styles.categoryItemActive,
            ]}>
            <Text
              style={[
                styles.categoryText,
                activeId === item._id && styles.categoryTextActive,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {marginBottom: 10},
  categoryList: {paddingHorizontal: 10},
  categoryItem: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryItemActive: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  categoryText: {fontSize: 14, color: '#333'},
  categoryTextActive: {color: '#fff', fontWeight: '600'},
});

export default memo(ProductListHeaderComponent);
