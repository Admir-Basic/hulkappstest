// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useCallback, useEffect, useRef, useReducer, memo } from 'react';
import { SafeAreaView, FlatList, View, Text, RefreshControl, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import { FlashList } from "@shopify/flash-list";
// ===================================================================
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectNetInfo, } from 'reduxConfiguration/slices/netInfoSlice';
// ===================================================================
// Components
// ===================================================================
import { ListSingleVideo, Header } from 'components';
// ===================================================================
// Constants
// ===================================================================
import VideoSettings from 'constantsConfiguration/videoSettings';
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
import ApiApp from 'services/AppAPI'

const initialState = {
  isLoading: true,
  list: null,
  refresh: false,
  searchText: '',
  focusedIndex: null,
  endReached: false,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'reset': return { ...initialState };
    case 'updateLocalList': return { ...state, list: payload.list, refresh: false, endReached: payload.endReached };
    case 'toggleRefresh': return { ...state, refresh: !state.refresh };
    case 'setFocusedIndex': return { ...state, focusedIndex: payload };
    case 'setEndReached': return { ...state, endReached: payload };
    case 'updateSearchText': return { ...state, searchText: payload };
    case 'updateLocalListWithSearch': return { ...state, list: payload.list, searchText: payload.text, refresh: false, endReached: payload.endReached };
    case 'updateLocalListWithIndex': return { ...state, list: payload.list, searchText: payload.text, refresh: false, isLoading: false, endReached: payload.endReached, focusedIndex: payload.focusedIndex };
    default: throw new Error();
  }
}

const defaultData = [1, 2, 3]

const Home = ({ navigation }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const netInfo = useSelector(selectNetInfo)
  // ===================================================================

  console.log('videosProgress ')

  const [state, dispatch] = useReducer(reducer, initialState)
  const { isLoading, list, refresh, searchText, focusedIndex, endReached } = state;

  const allList = useRef(null);
  const originalList = useRef(null);
  const listHeight = useRef(0);
  const callOnScrollEnd = useRef(false)

  useEffect(() => {
    getData()
  }, [])

  /* useEffect(() => {
    if (list) {
      let index = calculateOffset(0, listHeight.current, list)
      dispatch({ type: 'setFocusedIndex', payload: index })
    }
    // setFocusedIndex(calculateOffset(0, listHeight.current, list))
  }, [list, listHeight]) */

  const getData = useCallback((fromRefresh = false) => {

    if (netInfo /* && 1 > 2 */) {
      ApiApp.getVideos()
        .then((res) => {
          if (res?.status == 200 && res?.data.videos) {
            let videos = res.data.videos.slice(0, 13);
            // let videos = res.data.videos;
            allList.current = videos;
            originalList.current = videos;
            setTimeout(() => {
              updateList(true, videos, null, 0)
            }, fromRefresh ? 0 : 1000)
          }
        })
        .catch((err) => {
        })
    } else {

    }
  }, [])

  const onEndReachedFatch = useCallback((allListA, listA, nextIndex) => {
    updateList(false, allListA, listA, nextIndex)
  }, [])

  const updateList = useCallback((first = false, list, displayedList, nextIndex, searchText = null) => {
    // console.log('listHeight.current ', listHeight.current)
    if (nextIndex >= list.length) {
      dispatch({ type: 'setEndReached', payload: true })
      callOnScrollEnd.current = false
    }
    else {
      let endReached = list.length < nextIndex + 5 ? true : false
      let lastIndex = endReached ? list.length : nextIndex + 5

      let dataNew = displayedList || []
      let newList = list && list.length > 0 ? [...dataNew, ...list.slice(nextIndex, lastIndex)] : []

      if (first) {
        let index = calculateOffset(0, listHeight.current, list)

        console.log('index ', index)

        dispatch({ type: 'updateLocalListWithIndex', payload: { list: newList, endReached: endReached, focusedIndex: index } })
      }
      else if (searchText)
        dispatch({ type: 'updateLocalListWithSearch', payload: { text: searchText, list: newList, endReached: endReached } })
      else {

        dispatch({ type: 'updateLocalList', payload: { list: newList, endReached: endReached } })
      }

      callOnScrollEnd.current = true
    }
  }, [state])

  const onSubmitSearch = useCallback((text) => {
    let newList = [];

    let itemsLocal = originalList.current

    itemsLocal.forEach(element => {
      if (element.title.toLowerCase().includes(text.toLowerCase())) {
        newList.push(element)
      }
    });

    allList.current = newList;

    updateList(false, newList, null, 0, text)
  }, [originalList])

  const onRefresh = useCallback(() => {

    dispatch({ type: 'toggleRefresh', payload: {} })
    setTimeout(() => { getData(true) }, 50)

  }, [])

  const handleScroll = useCallback((e) => {

    let index = calculateOffset(e.nativeEvent.contentOffset.y, e.nativeEvent.layoutMeasurement.height, list);
    if (focusedIndex != index)
      changeFocusedIndex(index)
    // setFocusedIndex(index)

  }, [list, focusedIndex]);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    listHeight.current = height;
  }

  const calculateOffset = useCallback((position, height, listA) => {
    // let offset = position < VideoSettings.VIDEO_HEIGHT * 1.4 ? 0.66 : 1
    let offset = 0.6

    let middle = (height / 2) - (VideoSettings.VIDEO_HEIGHT * offset);
    let middleIndex = Math.round((height / VideoSettings.VIDEO_HEIGHT / 2));

    return listA ? listA.length > middleIndex ? Math.round((position + middle) / VideoSettings.VIDEO_HEIGHT) : listA.length - 1 : null;

  }, []);

  const changeFocusedIndex = useCallback((index) => {
    dispatch({ type: 'setFocusedIndex', payload: index })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalett.mainBackground }}>
      <Header
        displaySearch
        displayMode
        onSubmitSearch={onSubmitSearch}
        resetSearch={refresh}
      />

      <View onLayout={onLayout} style={{ width: '100%', flex: 1 }} >

        <FlashList
          // style={{ flex: 1 }}
          scrollEnabled={!isLoading}
          estimatedItemSize={VideoSettings.VIDEO_HEIGHT}
          // onScroll={handleScroll}
          onScrollEndDrag={handleScroll}
          data={list || defaultData}
          initialNumToRender={5}
          contentContainerStyle={{ paddingBottom: 20, }}
          keyExtractor={(item, index) => {
            return item?.thumb || `${index}item`;
          }}

          onEndReached={() => { if (list !== null) callOnScrollEnd.current = true }}
          onMomentumScrollEnd={() => {
            if (callOnScrollEnd.current && list && list.length > 0 && !endReached && list.length < allList.current.length && !isLoading) onEndReachedFatch(allList.current, list, list.length)
            callOnScrollEnd.current = false
          }}
          onEndReachedThreshold={0.5}

          renderItem={({ item, index }) => (
            <ListSingleVideo
              item={item}
              index={index}
              focused={focusedIndex === index ? true : false}
              navigation={navigation}
              isLoading={isLoading}
              changeFocusedIndex={changeFocusedIndex}

            />
          )
          }

          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={[ColorsPalett.refreshColor]}
              tintColor={ColorsPalett.refreshColor}
              progressViewOffset={0}
            />
          }

          ListFooterComponent={() => {
            if (endReached) return (
              <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontSize: 12, color: '#FFFFFF' }} >End reached</Text>
              </View>
            )
            return null
          }}

          ListEmptyComponent={() =>
            list !== null ? (
              <View style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#FFFFFF' }} >Empty list</Text>
              </View>
            ) : null}
        />
      </View>
    </View >
  );
}

export default memo(Home);