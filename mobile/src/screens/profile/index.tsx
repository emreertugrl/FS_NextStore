import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../utils/routes';
import {AddCircle} from 'iconsax-react-nativejs';
import {putRequest} from '../../service/verbs';
import {UPDATE_ME_URL} from '../../service/urls';
import uploadToCloudinary from '../../components/uploadToImageKit';
import {getMe} from '../../store/actions/authActions';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [user]);

  const updateMe = async () => {
    const url = await uploadToCloudinary();

    if (url) {
      await putRequest(UPDATE_ME_URL, {profileImage: url});
    }
  };

  if (!user) return null;
  const admin = user.role === 'Admin';

  return (
    <View style={styles.container}>
      {/* Profil Görseli */}
      <View>
        <TouchableOpacity
          onPress={updateMe}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 20,
            zIndex: 10000,
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 100,
          }}>
          <AddCircle size={30} color="black" />
        </TouchableOpacity>

        {user.profileImage ? (
          <View style={styles.avatarContainer}>
            <Image source={{uri: user.profileImage}} style={styles.avatar} />
          </View>
        ) : (
          <View style={styles.avatarContainer}>
            <Image
              source={{uri: 'https://ui-avatars.com/api/?name=' + user.name}}
              style={styles.avatar}
            />
          </View>
        )}
      </View>

      {/* Kullanıcı Bilgileri Kartı */}
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Rol:</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Register Date:</Text>
          <Text style={styles.value}>
            {format(new Date(user.createdAt), 'dd MMMM yyyy')}
          </Text>
        </View>
        {admin && (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.PRODUCTS)}
              style={{
                backgroundColor: '#00ff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Show Products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.CREATEPRODUCT)}
              style={{
                backgroundColor: '#4CAF50',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Add Product
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.CREATECATEGORY)}
              style={{
                backgroundColor: 'orange',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Add Category
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4c9ef1',
  },
  avatar: {
    width: 120,
    height: 120,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  roleBadge: {
    backgroundColor: '#4c9ef1',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Profile;
