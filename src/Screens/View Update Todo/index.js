import React from 'react';
import { View, Text, Button, Alert, ActivityIndicator, TextInput } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ApiSerivces from '../../ApiServices';
import asyStorage from '../../LocalStorage';
import AppColor from '../../Theme/colors';
import { styles } from './style';

function ViewUpdateTodo({ navigation, route }) {

  React.useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {

      setViewChange(false)
      console.log(viewChange)
    });
    return subscribe;
  }, []);

  let title = route.params.title;
  let description = route.params.description;
  let id = route.params.id;
  let token;
  console.log('here ', title, ' ', description, ' ', id)
  const [loading, setLoading] = React.useState(false);
  const [viewChange, setViewChange] = React.useState(false);
  const [titleSearch, setTitleSearch] = React.useState(title);
  const [descriptionSearch, setDescriptionSearch] = React.useState(description);
  //// for navigating to Todo List Page ///////
  const navToLogin = (msg) =>
    Alert.alert(
      "",
      `${msg}`,
      [
        { text: "OK", onPress: () => {navigation.goBack(), setLoading(false), setViewChange(false)} }
      ]
    );
  /////////
  const onDeletePress = () => {
    let token;
    setLoading(true);
    asyStorage.getValueFromLocalStorage('Token', res => {
      token = res;
      console.log(token);
      ApiSerivces.deleteTask(
        token,
        id,
        res => {
          console.log('add task response ', res);
          if (res.isSuccess == false) {
            Alert.alert('', 'Please ceheck your internet connection');

          } else {
            console.log('add tast response-success', res);
            if (res.response.success == false) {
              Alert.alert('', `${res.response.message}`);
            } else {
              navToLogin(res.response.message);

            }
          }
        },
      );
    })
  }
  ////////////
  const onUpdatePress = () => {

    if (viewChange === true) {
      setLoading(true);
      if (title == '' && description == '') {
        Alert.alert('', 'Please enter a title and some description');
        setLoading(false);
      } else if (title == '') {
        Alert.alert('', 'Please enter a title');
        setLoading(false);
      } else if (description == '') {
        Alert.alert('', 'Please enter some description');
        setLoading(false);
      } else {
        asyStorage.getValueFromLocalStorage('Token', res => {
          token = res;
          console.log(token);
          ApiSerivces.updateTask(
            titleSearch,
            descriptionSearch,
            id,
            token,
            res => {
              console.log('add task response ', res);
              if (res.isSuccess == false) {
                Alert.alert('', 'Please ceheck your internet connection');
                setLoading(false);
              } else {
                console.log('add task response-success', res);
                if (res.response.success == false) {
                  Alert.alert('', `${res.response.message}`);
                } else {
                  navToLogin("task updated succesfully");
                }
              }
            },
          );
        })
      }
    } else {
      setViewChange(true);
    }


  }
  ////////////

  return (<>
    <Text style={styles.header}>
      View/Update/Delete
    </Text>
    {loading ? (
      <ActivityIndicator style={{ marginTop: heightPercentageToDP('5%') }} size="large" color={AppColor.green} />
    ) : (<View style={styles.cardStyle}>
      {
        viewChange ? (<>
          <TextInput
            style={styles.input}
            onChangeText={text => setTitleSearch(text)}
            value={titleSearch}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setDescriptionSearch(text)}
            value={descriptionSearch}
            placeholder="Description"
          />
        </>) : (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.headingStyle}>
                Title:
              </Text>
              <Text style={styles.titleStyle}>
                {title}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.headingStyle}>
                Details:
              </Text>
              <Text style={styles.descriptionStyle}>
                {description}
              </Text>
            </View>
          </View>
        )}

    </View>)}
    <View style={{ flex: 1, backgroundColor: AppColor.white, justifyContent: 'space-evenly' }}>
      <Button
        title="Update"
        color={AppColor.green}
        onPress={onUpdatePress}
      />
      {viewChange ? null : (
        <Button
          title="Delete"
          color={AppColor.redDark}
          onPress={onDeletePress}
        />
      )}

    </View>


  </>);
}
export { ViewUpdateTodo };
