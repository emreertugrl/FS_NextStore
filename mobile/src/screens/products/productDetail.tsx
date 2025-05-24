import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Heart} from 'iconsax-react-nativejs';
import {favoutireProduct} from '../../store/actions/authActions';

const ProductDetail = () => {
  const {product} = useAppSelector(state => state.product);
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const favouritedProduct = user.favorites.find(item => item === product._id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => dispatch(favoutireProduct(product._id))}
        style={{
          position: 'absolute',
          right: 30,
          top: 30,
          zIndex: 100,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 100,
        }}>
        {
          <Heart
            size={30}
            color="red"
            variant={favouritedProduct ? 'Bold' : 'Outline'}
          />
        }
      </TouchableOpacity>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.brand}>Brand: {product.brand}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating} ({product.numReviews} reviews)
        </Text>
        <Text style={styles.desc}>{product.description}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Sepete Ekle" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  content: {
    marginTop: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 20,
    color: '#1e90ff',
    marginVertical: 8,
  },
  brand: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 12,
  },
});

export default memo(ProductDetail);
