import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {postRequest} from '../../service/verbs';
import {CREATE_CATEGORY_URL} from '../../service/urls';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getCategories} from '../../store/actions/categoryActions';

export default function CreateCategoryScreen() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const {categories} = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

  const handleCreateCategory = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await postRequest(CREATE_CATEGORY_URL, {name});
      Alert.alert('Success', `Category created: ${response.data.name}`);
      setName('');
      // Yeni kategori ekledikten sonra tekrar fetch et
      dispatch(getCategories());
    } catch (error) {
      Alert.alert('Error', 'Failed to create category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}: {item: {_id: string; name: string}}) => (
    <View style={[styles.badge, {width: 150}]}>
      <Text style={styles.badgeText}>{item.name}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.label}>Add New Category</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter category name"
        editable={!loading}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Create Category" onPress={handleCreateCategory} />
      )}
      <Text style={[styles.label, {marginTop: 30}]}>Existing Categories</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  badge: {
    backgroundColor: '#4c9ef1',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
