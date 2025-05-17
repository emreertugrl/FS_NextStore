import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ProductCard from '../../components/products/productCart';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getProduct, getProducts} from '../../store/actions/productActions';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../utils/routes';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {products} = useAppSelector(state => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        numColumns={2}
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
});

export default Home;
