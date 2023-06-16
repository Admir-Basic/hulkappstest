// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect, useCallback } from 'react'
import NetInfo from "@react-native-community/netinfo";
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector, } from 'react-redux';
import { selectNetInfo, setNetInfo } from 'reduxConfiguration/slices/netInfoSlice';
// ===================================================================
// Components
// ===================================================================
// ===================================================================

const MyNetInfo = ({ }) => {

    const dispatchRedux = useDispatch()
    const netInfo = useSelector(selectNetInfo)

    useEffect(() => {
        const connection = NetInfo.addEventListener(state => {
            _handleConnectionChange(state.isConnected);
        });
        return () => {
            connection()
        };
    }, []);

    const _handleConnectionChange = useCallback((isConnected) => {
        dispatchRedux(setNetInfo(isConnected))
    }, [])

    return null
}

export default memo(MyNetInfo)
