/**
 * @component index
 * @description 注册页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-native';
import PropTypes from 'prop-types';
import routers from '../../../constants/routers';

// components
import CommStatusBar from '../../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../../components/Layout/LeftBackIcon';

const ContainerView = styled.View``;

const TextView = styled.Text``;

class SignUp extends React.Component {
  render() {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    return (
      <ContainerView>
        <CommStatusBar />
        <TextView>
          SignUp
        </TextView>
        <Button title="Go Home" onPress={() => navigate(routers.home)} />
      </ContainerView>
    );
  }
}

SignUp.navigationOptions = ({ navigation }) => ({
  title: 'SignUp',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

SignUp.defaultProps = {};

SignUp.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    getParam: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default SignUp;
