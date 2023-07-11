import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Sermons from "../screens/Sermons";
import Events from "../screens/Events";
import Books from "../screens/Books";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../theme";

const Tab = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TabStackNavigation() {
  return (
    <Tab.Navigator initialRouteName="Home"
      // screenOptions={{
      //   tabBarStyle: { position: 'absolute', bottom: 10 },
      // }}
      // tabBar={props => <MyTabBar {...props} />}
      >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Sermons" options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <Icon name="bell" color={colors.orange} size={18} />
        ),
        tabBarBadge: 3,
      }} component={Sermons} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Books" component={Books} />
    </Tab.Navigator>
  );
}

export default TabStackNavigation;