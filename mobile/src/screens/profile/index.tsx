import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {format} from 'date-fns';
import {getMe} from '../../store/actions/authActions';

const Profile = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  if (!user) return null;

  return (
    <View style={styles.container}>
      {/* Profil Görseli */}
      <View style={styles.avatarContainer}>
        <Image
          source={{uri: 'https://ui-avatars.com/api/?name=' + user.name}}
          style={styles.avatar}
        />
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
          <Text style={styles.label}>Kayıt Tarihi:</Text>
          <Text style={styles.value}>
            {format(new Date(user.createdAt), 'dd MMMM yyyy')}
          </Text>
        </View>
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
