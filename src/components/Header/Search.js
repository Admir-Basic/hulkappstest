// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Keyboard } from 'react-native';
import { } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';
import { debounce } from 'lodash';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const Search = ({ debounceTime = 400, onSubmitSearch, resetSearch = false }) => {

  const [searchText, setSearchText] = useState('')

  const ref = useRef(null)

  useEffect(() => {
    if (resetSearch && searchText !== '') {
      setSearchText('')
      Keyboard.dismiss()
    }
  }, [resetSearch, searchText])

  const onSubmitEditing = useCallback((text) => {
    onSubmitSearch(text)

    Keyboard.dismiss()
  }, [searchText])

  const onChangeText = useCallback((text) => {
    setSearchText(text)
    debouncedTextInput(text)
  }, [searchText])

  const debouncedTextInput = debounce(text => onSubmitSearch(text), debounceTime)

  return (

    <View style={{ flex: 1, height: '100%', marginRight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
      <TextInput
        ref={ref}
        underlineColorAndroid='transparent'
        placeholder={'Search'}
        placeholderTextColor={ColorsPalett.placeholder}
        style={{ fontSize: 14, color: ColorsPalett.textColorMain, backgroundColor: ColorsPalett.searchBackground, height: '100%', textAlignVertical: 'center', width: '100%', paddingHorizontal: 10 }}
        value={searchText}
        onChangeText={onChangeText}
        selectionColor={ColorsPalett.selectionColor}
        blurOnSubmit={true}
        onSubmitEditing={() => { onSubmitEditing(searchText) }}

      />

    </View>
  );
}

export default memo(Search);