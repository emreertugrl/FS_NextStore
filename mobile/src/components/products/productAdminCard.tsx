import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Edit, Trash} from 'iconsax-react-nativejs';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store/hooks';
import Routes from '../../utils/routes';
import {deleteRequest} from '../../service/verbs';
import {DELETE_PRODUCT_URL} from '../../service/urls';

export const ProductAdminCard = ({item}: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.category?.name}</Text>
          <Text>Fiyat: ${item.price}</Text>
          <Text>Stok: {item.countInStock}</Text>
          <Text>Marka: {item.brand}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate(Routes.CREATEPRODUCT, {product: item});
            }}>
            <Edit size="25" color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteRequest(`${DELETE_PRODUCT_URL}/${item._id}`)}>
            <Trash size="25" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 6,
    borderRadius: 6,
  },
});
