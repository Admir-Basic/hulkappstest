// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, Keyboard, StyleSheet } from 'react-native';
import { debounce } from 'lodash';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const Search = ({ debounceTime = 800, onSubmitSearch, resetSearch = false }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, textInputStyle, } = style
  // ===================================================================

  // ===================================================================
  // State
  // -------------------------------------------------------------------
  const [searchText, setSearchText] = useState('')
  // ===================================================================

  // ===================================================================
  // Ref
  // -------------------------------------------------------------------
  const ref = useRef(null)
  // ===================================================================

  // ===================================================================
  // useEffect
  // -------------------------------------------------------------------
  useEffect(() => {
    if (resetSearch && searchText !== '') {
      setSearchText('')
      Keyboard.dismiss()
    }
  }, [resetSearch, searchText])
  // ===================================================================

  // ===================================================================
  // Methods
  // -------------------------------------------------------------------
  const onSubmitEditing = useCallback((text) => {
    onSubmitSearch(text)

    Keyboard.dismiss()
  }, [searchText])

  const onChangeText = useCallback((text) => {
    setSearchText(text)
    debouncedTextInput(text)
  }, [searchText])

  const debouncedTextInput = debounce(text => onSubmitSearch(text), debounceTime)
  // ===================================================================

  return (

    <View style={container} >
      <TextInput
        ref={ref}
        underlineColorAndroid='transparent'
        placeholder={'Search'}
        placeholderTextColor={ColorsPalett.placeholder}
        style={textInputStyle}
        value={searchText}
        onChangeText={onChangeText}
        selectionColor={ColorsPalett.selectionColor}
        blurOnSubmit={true}
        onSubmitEditing={() => { onSubmitEditing(searchText) }}

      />

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textInputStyle: {
    fontSize: 14,
    color: ColorsPalett.textColorMain,
    backgroundColor: ColorsPalett.searchBackground,
    height: '100%',
    textAlignVertical: 'center',
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 5
  },
});

export default memo(Search);