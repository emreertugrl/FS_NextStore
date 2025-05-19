import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getProducts} from '../../store/actions/productActions';
import {Picker} from '@react-native-picker/picker';

const FilterScreen: React.FC = () => {
  const {products} = useAppSelector(state => state.product);
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    isFeatured: false,
    minPrice: '',
    maxPrice: '',
  });

  const handleApply = () => {
    const cleanedFilters = {
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    };
    dispatch(getProducts(cleanedFilters));
    navigation.goBack();
  };

  const handleReset = () => {
    setFilters({
      search: '',
      brand: '',
      isFeatured: false,
      minPrice: '',
      maxPrice: '',
    });
    dispatch(getProducts({}));
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Arama</Text>
      <TextInput
        placeholder="Ürün adı, açıklama..."
        style={styles.input}
        value={filters.search}
        onChangeText={text => setFilters(prev => ({...prev, search: text}))}
      />

      <Text style={styles.label}>Marka</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={filters.brand}
          onValueChange={value =>
            setFilters(prev => ({...prev, brand: value}))
          }>
          <Picker.Item label="Tümü" value="" />
          {uniqueBrands.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Öne Çıkanlar</Text>
      <Switch
        value={filters.isFeatured}
        onValueChange={value =>
          setFilters(prev => ({...prev, isFeatured: value}))
        }
      />

      <Text style={styles.label}>Min Fiyat</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={filters.minPrice}
        onChangeText={text => setFilters(prev => ({...prev, minPrice: text}))}
      />

      <Text style={styles.label}>Max Fiyat</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={filters.maxPrice}
        onChangeText={text => setFilters(prev => ({...prev, maxPrice: text}))}
      />

      <View style={styles.buttonGroup}>
        <Button title="Uygula" onPress={handleApply} />
        <View style={styles.spacer} />
        <Button title="Sıfırla" color="gray" onPress={handleReset} />
      </View>
    </ScrollView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonGroup: {
    marginTop: 20,
  },
  spacer: {
    height: 10,
  },
});
