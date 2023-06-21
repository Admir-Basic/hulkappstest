import React, { Component } from 'react';
import { BackHandler } from 'react-native';
// =================================================================== 
// Components
// ===================================================================
import { ErrorBoundary } from 'components';
// =================================================================== 
// Local Components
// ===================================================================
import ScreenMainComponent from './ScreenMainComponent';

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
    return { boundaryError: true, errorText: error };
  }

  componentDidCatch(error, errorInfo) {
  }

  handleBackButtonClick = () => {
    const { goBack } = this.props.navigation;
    goBack()

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
        mainScreen={false}
      >

        <ScreenMainComponent
          navigation={navigation}
          route={route}
        />

      </ErrorBoundary>
    )
  }
};


export default ScreenMainContainer;
