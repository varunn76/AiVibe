import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInputs from '../../components/SearchInputs';
import EmptyState from '../../components/EmptyState';
import {  searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { useLocalSearchParams } from 'expo-router';
import VideoCard from '../../components/VideoCard';
const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(()=>searchPosts(query));

useEffect(()=>{
  refetch()
},[query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">Search Result</Text>
            <Text className="text-2xl text-white font-pmedium">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInputs initialQuery={query} />
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

export default Search;
