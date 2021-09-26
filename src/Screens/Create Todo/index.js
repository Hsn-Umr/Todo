import React from 'react';
import { TouchableHighlight, Text, TextInput, View, ActivityIndicator, Alert } from 'react-native';
import ApiSerivces from '../../ApiServices';
import asyStorage from '../../LocalStorage';
import AppColor from '../../Theme/colors';
import { styles } from './style';

function CreateTodo({ navigation }) {

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  //// for navigating to Todo List Page ///////
  const navToLogin = (msg) =>
    Alert.alert(
      "",
      `${msg}`,
      [
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    );
  /////////

  /// OnPress Submit ///
  const onSubmitPress = async () => {
    let id, token;

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
      asyStorage.getValueFromLocalStorage('UserId', res => {
        id = res;
      console.log(id);
      asyStorage.getValueFromLocalStorage('Token', res => {
        token = res;
        console.log(token);
      ApiSerivces.addTask(
        title,
        description,
        id,
        token,
        res => {
          console.log('add task response ', res);
          setLoading(false);
          if (res.isSuccess == false) {
            Alert.alert('', 'Please enter a title and some description');
            setTitle('');
            setDescription('');
          } else {
            setLoading(false);
            console.log('add tast response-success', res);
            if (res.response.success == false) {
              Alert.alert('', `${res.response.error}`);
            } else {
              navToLogin("New task added");
              console.log(res);
              setTitle('');
              setDescription('');
            }
          }
        },
      );
      })
    })
    }
  };
  ////////////

  return (
    <View key={value} style={styles.body}>
      <Text style={styles.heading}>Add New Task</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setTitle(text)}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        onChangeText={text => setDescription(text)}
        value={description}
        placeholder="Description"
      />
      <TouchableHighlight
        mode="contained"
        style={styles.btnStyle}
        activeOpacity={0.8}
        underlayColor={AppColor.black}
        onPress={onSubmitPress}
      >
        {loading ? (
          <ActivityIndicator size="small" color={AppColor.white} />
        ) : (
          <Text style={[styles.subHeading, styles.btnText]}> submit </Text>
        )}
      </TouchableHighlight>
    </View>
  );
}
export { CreateTodo };
