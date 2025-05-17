import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ProductCard from '../../components/products/productCart';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getProducts} from '../../store/actions/productActions';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
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
        renderItem={({item}) => <ProductCard item={item} />}
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
