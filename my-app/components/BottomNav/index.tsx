import { Text, View } from "react-native";
import HitchHike from "../../screens/HItchHike/index.";
import OfferRide from "../../screens/OfferRide";
import Profile from "../../screens/Profile";
import RidesList from "../../screens/RidesList";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const screenOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#8EB0DC",
  },
};
const BottomNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HitchHike"
        component={HitchHike}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="man-outline"
                  size={24}
                  color={focused ? "#16247d" : "#2D3F56"}
                />
                <Text style={{ fontSize: 12, color: "#2D3F56", fontWeight: focused ? "800" : "400" }}>
                  PEDIR CARONA
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="OfferRide"
        component={OfferRide}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="car-outline"
                  size={24}
                  color={focused ? "#16247d" : "#2D3F56"}
                />
                <Text style={{ fontSize: 12, color: "#2D3F56", fontWeight: focused ? "800" : "400"  }}>
                  DAR CARONA
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="RidesList"
        component={RidesList}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="list-outline"
                  size={24}
                  color={focused ? "#16247d" : "#2D3F56"}
                />
                <Text style={{ fontSize: 12, color: "#2D3F56", fontWeight: focused ? "800" : "400"  }}>CARONAS</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={focused ? "#16247d" : "#2D3F56"}
                />
                <Text style={{ fontSize: 12, color: "#2D3F56", fontWeight: focused ? "800" : "400"  }}>PERFIL</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
