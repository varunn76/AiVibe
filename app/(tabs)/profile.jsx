import { View, Text, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { router } from 'expo-router';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
const profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logOut = async() => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace('/sign-in');
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logOut}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-16 h-16 justify-center items-center border border-secondary rounded-lg">
              <Image className="w-[90%] h-[90%] rounded-lg" source={{ uri: user?.avatar }} resizeMode='cover' />
            </View>
            <InfoBox title={user?.username} containerStyles={`mt-5`} textStyles={`text-lg`}/>
            <View className="mt-5 flex-row">
            <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles={`mr-10`} textStyles={`text-xl`}/>
            <InfoBox title="1.2k" subtitle="followers"  textStyles={`text-xl`}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Video Found" subtitle="No videos found for this search query" />
        )}
      />
    </SafeAreaView>
  );
};

export default profile;
