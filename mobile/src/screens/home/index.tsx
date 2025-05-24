import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ProductCard from '../../components/products/productCart';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getProduct, getProducts} from '../../store/actions/productActions';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../utils/routes';
import {getCategories} from '../../store/actions/categoryActions';
import ProductListHeaderComponent from '../../components/products/productListHeaderComponent';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {products} = useAppSelector(state => state.product);
  const {categories, category} = useAppSelector(state => state.category);
  useEffect(() => {
    dispatch(getProducts({}));

    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category.name === 'All') {
      dispatch(getProducts()); // Tüm ürünler
    } else {
      dispatch(getProducts({category: category._id})); // Filtreli ürünler
    }
  }, [category._id, dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <ProductListHeaderComponent categories={categories} />
        }
        data={products}
        keyExtractor={item => item._id}
        numColumns={2}
        initialNumToRender={6} // Başta kaç ürün render edilsin
        maxToRenderPerBatch={6} // Her seferinde kaç ürün render edilsin
        windowSize={5} // Görünüm penceresi optimizasyonu
        removeClippedSubviews={true} // Görünmeyenleri hafızadan çıkar
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper} // Aralarındaki boşluk
        contentContainerStyle={styles.listContainer}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContainer: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Home;
