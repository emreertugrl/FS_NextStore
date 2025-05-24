import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getUserFavorites} from '../../store/actions/authActions';
import ProductCard from '../../components/products/productCart';
import {getProduct} from '../../store/actions/productActions';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../utils/routes';

const Favorites = () => {
  const {user, favorites} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getUserFavorites(user._id));
  }, [user.favorites]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item._id}
        numColumns={2}
        initialNumToRender={6} // Başta kaç ürün render edilsin
        maxToRenderPerBatch={6} // Her seferinde kaç ürün render edilsin
        windowSize={5} // Görünüm penceresi optimizasyonu
        removeClippedSubviews={true} // Görünmeyenleri hafızadan çıkar
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ProductCard
            navigation={() => {
              dispatch(getProduct(item._id));
              navigation.navigate(Routes.PRODUCTDETAIL);
            }}
            item={item}
          />
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Favorites;
