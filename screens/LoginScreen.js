import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CheckBox, Button, Input, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const LoginTab = ({navigation}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("remember: ", remember);
    if (remember) {
      SecureStore.setItemAsync(
        "userInfo",
        JSON.stringify({
          username,
          password,
        })
      ).catch((error) => console.log("Could not save user info", error))
    } else {
      SecureStore.deleteItemAsync("userInfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  };
  useEffect(() => {
    SecureStore.getItemAsync("userInfo").then((userData) => {
      const userInfo = JSON.parse(userData);
      if(userInfo){
        setUserName(userInfo.username);
        setPassword(userInfo.password);
        setRemember(true);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(text) => setUserName(text)}
        value={username}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title="Remember Me"
        center
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckBox}
      />
      <View style={styles.formButton}>
        <Button 
        onPress={() => handleLogin()} 
        title="Login" 
        color="#5637DD"
        icon={
          <Icon 
            name='sign-in'
            type='font-awesome'
            color='#fff'
            iconStyle={{marginRight: 10}}
          />
        }
        buttonStyle={{backgroundColor: '#5637DD'}}
         />
      </View>
      <View style={styles.formButton}>
        <Button 
        onPress={() => navigation.navigate('Register')} 
        title="Register" 
        type='clear'
        icon={
          <Icon 
            name='user-plus'
            type='font-awesome'
            color='blue'
            iconStyle={{marginRight: 10}}
          />
        }
        titleStyle={{color: 'blue'}}
         />
      </View>
    </View>
  );
};
const RegisterTab = ()=>{
  return <ScrollView></ScrollView>;
};

const Tab = createBottomTabNavigator();

const LoginScreen = ()=>{
  const tabBarOptions = {
    activeBackgroundColor: '#5637DD',
    inactiveBackgroundColor: '#CEC8FF',
    activeTintColor: '#fff',
    inactiveTintColor: '#808080',
    labelStyle: {fontSize: 16}
  };
  return(
    <Tab.Navigator 
    initialRouteName="Login" 
    tabBarOptions={tabBarOptions}
    screenOptions={{headerShown: false}}
    >
      <Tab.Screen 
        name='Login'
        component={LoginTab}
        options={{
          tabBarIcon: (props)=>{
            return(
              <Icon 
                name='sign-in'
                type='font-awesome'
                color={props.color}
              />
            );
          }
        }}
      />
      <Tab.Screen 
        name='Register'
        component={RegisterTab}
        options={{
          tabBarIcon: (props)=>{
            return(
              <Icon 
                name='user-plus'
                type='font-awesome'
                color={props.color}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formInput: {
    padding: 10,
  },
  formIcon: {
    marginRight: 10,
  },
  formCheckBox: {
    margin: 10,
    backgroundColor: null
  },
  formButton: {
    margin: 40,
  },
});

export default LoginScreen;
