import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField } from '../../components';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import * as DocumentPicker from 'expo-document-picker';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
const create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectedFile) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectedFile === 'image'
          ? ['image/jpg', 'image/png', 'image/jpeg']
          : ['video/mp4', 'video/gif'],
    });

    if (!result.canceled) {
      if (selectedFile === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectedFile === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.video || !form.thumbnail || !form.prompt || !form.title) {
      return Alert.alert('Please fill in all the fields');
    }

    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });
      Alert.alert('Success', 'Post Uploaded successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
    }

    setUploading(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder={`Give your video a catch title...`}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base font-pmedium text-gray-100">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center rounded-2xl">
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base font-pmedium text-gray-100">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 border-2 border-black-200 flex-row space-x-2 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Ai Prompt"
          value={form.prompt}
          placeholder={`The Prompt you used to create this video`}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton title={`Submit & Publish`} handlePress={submit} containerStyles={`mt-7`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
