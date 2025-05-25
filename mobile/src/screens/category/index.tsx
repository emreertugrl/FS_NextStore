import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {postRequest, putRequest} from '../../service/verbs';
import {CREATE_CATEGORY_URL, UPDATE_CATEGORY_URL} from '../../service/urls';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getCategories} from '../../store/actions/categoryActions';

export default function CreateCategoryScreen() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<null | {
    _id: string;
    name: string;
  }>(null);

  const {categories} = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      if (editingCategory) {
        // Düzenleme işlemi
        await putRequest(`${UPDATE_CATEGORY_URL}/${editingCategory._id}`, {
          name,
        });
        Alert.alert('Success', 'Category updated');
      } else {
        // Yeni ekleme işlemi
        const response = await postRequest(CREATE_CATEGORY_URL, {name});
        Alert.alert('Success', `Category created: ${response.data.name}`);
      }

      setName('');
      setEditingCategory(null);
      dispatch(getCategories());
    } catch (error) {
      Alert.alert('Error', 'Operation failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category: {_id: string; name: string}) => {
    setEditingCategory(category);
    setName(category.name);
  };

  const renderItem = ({item}: {item: {_id: string; name: string}}) => (
    <TouchableOpacity
      onPress={() => handleSelectCategory(item)}
      style={[styles.badge, {width: 150}]}>
      <Text style={styles.badgeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.label}>
        {editingCategory ? 'Update Category' : 'Add New Category'}
      </Text>
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
        <Button
          title={editingCategory ? 'Update Category' : 'Create Category'}
          onPress={handleSubmit}
        />
      )}
      {editingCategory && (
        <Button
          title="Cancel Editing"
          color="red"
          onPress={() => {
            setEditingCategory(null);
            setName('');
          }}
        />
      )}
      <Text style={[styles.label, {marginTop: 30}]}>Existing Categories</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={categories.filter(cat => cat.name.toLowerCase() !== 'all')}
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
    </KeyboardAvoidingView>
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
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
