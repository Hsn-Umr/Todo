import React from 'react';
import {
  View,
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  FlatList,
  Text,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AppColor from '../../Theme/colors';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { styles } from './style ';
//Reusable Componet Imports

import asyStorage from '../../LocalStorage';
import ApiSerivces from '../../ApiServices';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from '../../Redux/TodoReducer';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from './card';

let data = [],
  page = 1,
  token,
  key = 1;
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };  
  function TodoList({ navigation }) {

  //remount screen on focus
  React.useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      
          onRefresh();
         
      });
    return subscribe;
  }, [navigation, onRefresh]);
  // handling back event
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('', 'Are you sure you want to close the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              BackHandler.exitApp(), (val = 0), setVisible(true);
            },
          },
        ]);
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  ////////  State Variable ///////
  const [visible, setVisible] = React.useState(false); // Showing Text "No Tasks Available"
  const [visible2, setVisible2] = React.useState(false); // Showing Text When no Tasks Available && Hiding Loader On Load More
  const [visible3, setVisible3] = React.useState(false); // Showing Loader on "Check New Tasks" When No Tasks Available
  const [onLoad, setonLoad] = React.useState(true); // Handling Load More
  const todos = useSelector(state => state.todoReducer.todos); // Updating Orders Reducer Value
  const [refreshing, setRefreshing] = React.useState(false); // Showing Loader On Refresh
  const [lazyLoading, setlazyLoading] = React.useState(false); // Showing Loader On Load More
  const dispatch = useDispatch();
  //refresh function
  const onRefresh = React.useCallback(() => {
    page = 1;
    setonLoad(true);
    setRefreshing(true);
    setVisible3(true);
    fetchData();
    wait(2000).then(() => {
      setVisible3(false), setRefreshing(false);
    });
  }, [fetchData]);
  //load more function
  const loadMore = () => {
    page = page + 1;
    console.log(page);
    setlazyLoading(true);
    setonLoad(false);
    asyStorage.getValueFromLocalStorage('Token', res => {
      token = res;
      ApiSerivces.getTasks(token, res => {
        console.log('get tasks response ', res);
        if (res.isSuccess === false) {
          alert('Check your internet connection.');
        } else if (res.response.items.data.length === 0) {
          setonLoad(false);
          setlazyLoading(false);
          let arr = [...todos, ...res.response.items.data];
          finalArray(arr);
        } else {
          ////// Storing orders to array ////////
          setVisible(false);
          setlazyLoading(false);
          data = res.response.items.data;
          console.log('get tasks response ', data);
          let arr = [...todos, ...data];
          finalArray(arr);
          setonLoad(false);
        }
      });
    });
    setonLoad(false);
  };
  //fetching data from API
  const fetchData = React.useCallback(() => {
    setonLoad(false);
    /////// Getting Tasks //////////
    asyStorage.getValueFromLocalStorage('Token', res => {
      token = res;
      ApiSerivces.getTasks(token, res => {
        console.log("get tasks response ", res);
        if (res.isSuccess === false) {
          alert('Check your internet connection.');
        } else if (res.response.items.data.length === 0) {
          setlazyLoading(false);
          setVisible(true);
          setVisible2(true);
          setVisible3(false);
          let arr = [...todos, ...res.response.items.data];
          finalArray(arr);
        } else {
          ////// Storing tasks to array ////////
          setVisible(false);
          setlazyLoading(false);
          data = res.response.items.data;
          console.log('get tasks response ', data);
          let arr = [...todos, ...data];
          console.log('get tasks arr ', arr);
          finalArray(arr);
          setonLoad(true);
        }

        key = key + 1; // remounting body
      });
    });
  }, [finalArray, todos]);
  ////// Filtering the tasks ///////////////
  const finalArray = React.useCallback(
    arr => {
      const filteredArr = arr.reduce((acc, current) => {
        const x = acc.find(
          item => item.id === current.id,
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          console.log('else');
          return (acc = [current]);
        }
      }, []);
      console.log('filtered array', filteredArr);
      dispatch(setTodos(filteredArr));
    },
    [dispatch],
  );

  // Return of Top-Level function
  return (
    <View style={styles.container}>

      {/* Body Start */}
      <SafeAreaView key={key} style={{ flex: 1 }}>

        <View>
          {/* When No Orders Available */}
          {visible ? (
            <>
              <Text style={styles.textStyle}>No Tasks Available</Text>
              {/* Checking For New Orders */}
              {visible3 ? (
                <ActivityIndicator
                  style={{ marginTop: hp('5%') }}
                  size="large"
                  color={AppColor.green}
                />
              ) : (
                <TouchableOpacity onPress={onRefresh}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        marginTop: hp('3%'),
                        fontSize: hp('2.5%'),
                        color: AppColor.green,
                      },
                    ]}>
                    Check For New tasks
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            // When tasks Available
            <FlatList
              style={{ bottom: hp('0.1%') }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              data={todos}
              onEndReached={onLoad ? loadMore : null}
              onEndReachedThreshold={0.1}
              keyExtractor={(item, index) => index}
              ListFooterComponent={() => {
                // Showing Loadder On Load More
                return (
                  <View>
                    {lazyLoading ? (
                      <View
                        style={{
                          height: hp(10),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {visible2 ? null : (
                          <ActivityIndicator color={AppColor.green} />
                        )}
                      </View>
                    ) : null}
                  </View>
                );
              }}
              renderItem={({ item }) => {
                return (
                 <Card
                  title = {item.title}
                  description = {item.description}
                />
                );
              }}
            />
          )}
        </View>

      </SafeAreaView>
      {/* Body End */}
    </View>
  );
}
export { TodoList };


