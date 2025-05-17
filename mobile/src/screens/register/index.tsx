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
import Routes from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adı zorunlu'),
  name: Yup.string().required('İsim zorunlu'),
  email: Yup.string().email('Geçersiz e-posta').required('E-posta zorunlu'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .required('Şifre zorunlu'),
});

const Register: React.FC = () => {
  const navigation = useNavigation();
  const handleRegister = async (values: {
    username: string;
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${process.env.BASEURL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Kayıt Başarılı', 'Şimdi giriş yapabilirsiniz.');
        navigation.navigate(Routes.LOGIN);
        values.email = '';
        values.name = '';
        values.password = '';
        values.username = '';
      } else {
        Alert.alert('Hata', result.message || 'Kayıt başarısız');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Hata', 'Bir hata oluştu');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <Formik
        initialValues={{username: '', name: '', email: '', password: ''}}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}>
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
              placeholder="İsim"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="E-posta"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
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
              <Text style={styles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.LOGIN)}>
        <Text style={styles.linkText}>
          Zaten hesabın var mı? <Text style={styles.linkBold}>Giriş Yap</Text>
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

export default Register;
