import React, { Component, memo } from 'react';
import { BackHandler } from 'react-native';
// =================================================================== 
// Components
// ===================================================================
import { ErrorBoundary } from 'components';
// =================================================================== 
// Local Components
// ===================================================================
import ScreenMainComponent from './ScreenMainComponent';
// =================================================================== 

import { moduleNames } from 'constantsConfiguration/enums/modules';

class ScreenMainContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boundaryError: false,
      errorText: ''
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  static getDerivedStateFromError(error) {
    return { boundaryError: true, };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorText: error })
  }

  handleBackButtonClick = () => {
    this.props.navigation.replace(moduleNames.HOME)

    return true;
  }

  render() {
    const { navigation, route } = this.props;
    const { boundaryError, errorText, } = this.state;

    return (
      <ErrorBoundary
        navigation={navigation}
        boundaryError={boundaryError}
        errorText={errorText}
        mainScreen={true}
      >

        <ScreenMainComponent
          navigation={navigation}
          route={route}
        />

      </ErrorBoundary>
    )
  }
};


export default memo(ScreenMainContainer);
