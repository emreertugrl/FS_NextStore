import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {ProductAdminCard} from '../../components/products/productAdminCard';
import {getProducts} from '../../store/actions/productActions';

const Products: React.FC = () => {
  const {products} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item._id}
      renderItem={({item}) => <ProductAdminCard item={item} />}
      contentContainerStyle={{padding: 16}}
    />
  );
};

export default Products;
