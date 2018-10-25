/**
 * @component index
 * @description mobx demo页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Text, Button } from 'native-base';

// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';

import { routers } from '../../../../constants';
// import DemoStore from '../../../../models/demo';

const ContainerView = styled.View`
`;

const TextView = styled.Text``;

@inject(({ rootStore }) => ({
  demoStore: rootStore.demoStore,
}))
@observer
class Demo extends React.Component {
  render() {
    const {
      props: {
        demoStore,
        navigation: {
          navigate,
        },
      },
    } = this;
    return (
      <ContainerView>
        <CommStatusBar />
        <TextView>
          demo
        </TextView>
        <Text>Counter: {demoStore.counter}</Text>
        <Text>Total clicks: {demoStore.total}</Text>
        <Button onPress={demoStore.increase}>
          <Text>+</Text>
        </Button>
        <Button onPress={demoStore.decrease}>
          <Text>-</Text>
        </Button>
        <Button onPress={() => navigate(routers.download)}>
          <Text>Go download</Text>
        </Button>
      </ContainerView>
    );
  }
}

// { navigation }
Demo.navigationOptions = () => ({
  title: 'Demo',
});

Demo.defaultProps = {
  demoStore: {},
};

Demo.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
  demoStore: PropTypes.objectOf(PropTypes.any),
};

export default Demo;
