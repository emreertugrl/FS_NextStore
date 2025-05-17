import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../utils/routes';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {loginThunk} from '../../store/actions/authActions';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adı zorunlu'),
  password: Yup.string().required('Şifre zorunlu'),
});

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogin = async (values: {username: string; password: string}) => {
    try {
      const result = await dispatch(loginThunk(values)).unwrap(); // ✅ unwrap ile doğrudan veriye eriş

      Alert.alert('Başarılı', `Hoş geldin, ${result.user.name}`);
      navigation.navigate(Routes.TAB); // veya Routes.HOME, yapına göre
    } catch (error: any) {
      console.log('Login error:', error);
      Alert.alert('Hata', error || 'Giriş başarısız');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Adı"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Şifre"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.REGISTER)}>
        <Text style={styles.linkText}>
          Hesabın yok mu? <Text style={styles.linkBold}>Kayıt Ol</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {color: 'red', marginBottom: 8, fontSize: 13},
  linkText: {
    marginTop: 16,
    color: '#444',
    textAlign: 'center',
  },
  linkBold: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
