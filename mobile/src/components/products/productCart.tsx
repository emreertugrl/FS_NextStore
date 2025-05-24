import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {width} from '../../utils/function';
import {useAppSelector} from '../../store/hooks';
import {Heart} from 'iconsax-react-nativejs';

const ProductCard: React.FC = ({item, navigation}) => {
  const {user} = useAppSelector(state => state.auth);
  const favouritedProduct = user.favorites.find(fav => fav === item._id);

  return (
    <TouchableOpacity onPress={navigation} style={styles.card}>
      {favouritedProduct && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            zIndex: 100,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 100,
          }}>
          {<Heart size={25} color="red" variant="Bold" />}
        </View>
      )}
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.rating}>
          ⭐ {item.rating} ({item.numReviews})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
    width: (width - 40) / 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: '#1e90ff',
    marginVertical: 4,
  },
  rating: {
    fontSize: 12,
    color: '#777',
  },
});
export default memo(ProductCard);
