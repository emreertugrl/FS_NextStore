import {launchImageLibrary} from 'react-native-image-picker';

const uploadToCloudinary = async () => {
  const result = await launchImageLibrary({mediaType: 'photo'});

  if (result.didCancel || !result.assets || !result.assets[0]) {
    console.log('Kullanıcı işlem yapmadı');
    return;
  }

  const {uri, fileName, type} = result.assets[0];

  const formData = new FormData();
  formData.append('file', {
    uri,
    name: fileName || 'upload.jpg',
    type: type || 'image/jpeg',
  });
  formData.append('upload_preset', 'nextStore'); // unsigned preset adın
  formData.append('cloud_name', 'dle9ht1yy'); // BURAYI DEĞİŞTİR

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dle9ht1yy/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error('Yükleme hatası:', err);
  }
};
export default uploadToCloudinary;
