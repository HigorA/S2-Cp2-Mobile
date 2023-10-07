import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChatListScreen from '/ChatListScreen';
import ChatScreen from '/ChatScreen';

const AppNavigator = createStackNavigator(
  {
    ChatList: { screen: ChatListScreen },
    Chat: { screen: ChatScreen },
  },
  {
    initialRouteName: 'ChatList',
  }
);

export default createAppContainer(AppNavigator);
