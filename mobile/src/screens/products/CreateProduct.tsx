import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import uploadToCloudinary from '../../components/uploadToImageKit';
import {CREATE_PRODUCT_URL, UPDATE_PRODUCT_URL} from '../../service/urls';
import {postRequest, putRequest} from '../../service/verbs';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getProducts, updateProduct} from '../../store/actions/productActions';
import Routes from '../../utils/routes';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Ürün adı gerekli'),
  description: Yup.string().required('Açıklama gerekli'),
  price: Yup.number().required('Fiyat gerekli').positive('Pozitif sayı olmalı'),
  image: Yup.string()
    .url('Geçerli bir URL girin')
    .required('Görsel URL gerekli'),
  brand: Yup.string().required('Marka gerekli'),
  category: Yup.string().required('Kategori gerekli'),
  countInStock: Yup.number()
    .required('Stok gerekli')
    .min(0, '0 veya daha fazla olmalı'),
  isFeatured: Yup.boolean(),
});

const CreateProductScreen: React.FC = () => {
  const route = useRoute();
  const {product} = route.params || {};
  const navigation = useNavigation();

  const {categories} = useAppSelector(state => state.category);
  const handleSubmit = async (values: any) => {
    try {
      if (product) {
        const response = await putRequest(
          `${UPDATE_PRODUCT_URL}/${product._id}`,
          values,
        );
        console.log(response);
        navigation.goBack();
      } else {
        const response = await postRequest(CREATE_PRODUCT_URL, values);
        navigation.navigate(Routes.PRODUCTS);
      }
    } catch (error: any) {
      console.error(
        'API hatası:',
        error.response?.data || error.message || error,
      );
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: product ? 'Product Update' : 'Add New Product',
    });
  }, [navigation, product]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {product ? 'Ürünü Güncelle' : 'Ürün Ekle'}
      </Text>

      <Formik
        initialValues={{
          name: product?.name || '',
          description: product?.description || '',
          price: product?.price?.toString() || '',
          image: product?.image || '',
          brand: product?.brand || '',
          category: product?.category?._id || '',
          countInStock: product?.countInStock?.toString() || '',
          isFeatured: product?.isFeatured || false,
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Ürün Adı"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Açıklama"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Fiyat"
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={String(values.price)}
              keyboardType="decimal-pad"
            />
            {touched.price && errors.price && (
              <Text style={styles.error}>{errors.price}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.input,
                {justifyContent: 'center', alignItems: 'center'},
              ]}
              onPress={async () => {
                const url = await uploadToCloudinary();
                if (url) {
                  setFieldValue('image', url);
                }
              }}>
              <Text style={{color: '#007bff'}}>
                {values.image ? '📸 Görseli Değiştir' : '📷 Görsel Seç'}
              </Text>
            </TouchableOpacity>

            {values.image ? (
              <Image
                source={{uri: values.image}}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  marginVertical: 8,
                }}
              />
            ) : null}

            {touched.image && errors.image && (
              <Text style={styles.error}>{errors.image}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Marka"
              onChangeText={handleChange('brand')}
              onBlur={handleBlur('brand')}
              value={values.brand}
            />
            {touched.brand && errors.brand && (
              <Text style={styles.error}>{errors.brand}</Text>
            )}

            <Picker
              selectedValue={values.category}
              onValueChange={value => setFieldValue('category', value)}>
              <Picker.Item label="Kategori Seçiniz" value="" />
              {categories.map(cat => (
                <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
              ))}
            </Picker>
            {touched.category && errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Stok Miktarı"
              onChangeText={handleChange('countInStock')}
              onBlur={handleBlur('countInStock')}
              value={String(values.countInStock)}
              keyboardType="number-pad"
            />
            {touched.countInStock && errors.countInStock && (
              <Text style={styles.error}>{errors.countInStock}</Text>
            )}

            <View style={styles.switchRow}>
              <Text>Öne Çıkan Ürün mü?</Text>
              <Switch
                value={values.isFeatured}
                onValueChange={value => setFieldValue('isFeatured', value)}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {product ? 'Güncelle' : 'Kaydet'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
