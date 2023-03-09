import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { SimpleLineIcons } from '@expo/vector-icons';
import TransactionGroup from '../components/TransactionGroup';
import PlainButton from '../components/PlainButton';
import { useHeaderHeight } from '@react-navigation/elements';

navHomeImage = require('../assets/home.png');
navProfileImage = require('../assets/user.png');
navGroupImage = require('../assets/plus.png');

import transactionData from '../transactionData.json'
import quickBalanceData from '../quickBalanceData.json'
var headerHeight;

export default function DashboardScreen({ route, navigation }) {
  headerHeight = useHeaderHeight();
  console.log(headerHeight);
  const { userName } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [searchText, setSearchText] = useState("");
  const transactionHistory = fetchTransactionData(transactionData);
  const quickBalanceHistory = fetchQuckBalanceData(quickBalanceData);
  const defaultGroup = "Test"; // for when the user clicks 'join group'

  // API Mockup to mock database
  function fetchTransactionData(transactionData){
    return transactionData['data']
  }
  function fetchQuckBalanceData(quickBalanceData){
    return quickBalanceData
  }

  function navHome() {
    console.log('Home');
  }
  function navProfile() {
    console.log('Profile');
  }

  const QuickBalance = ({ balancedata }) => {
    return(
      <View>
        <Text>
          Weimen
        </Text>
      </View>
    );
  }

  const RecentSplits = ({ xactiondata }) => {
    dom = xactiondata.map((x) => {
      return(
        <TransactionGroup
          balance={x.balance}
          members={x.members}
          date={x.date}
          location={x.location}
          host={x.host}
        />
      )
    });

    return(
      <View>
        {dom}
      </View>
    );
  }

  const BottomNav = () => {
    return (
      <View style={styles.navBar}>
        <Pressable onPress={navHome}>
          <Image style={styles.navButton} source={navHomeImage} />
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image style={styles.navAddGroup} source={navGroupImage} />
        </Pressable>
        <Pressable onPress={navProfile}>
          <Image style={styles.navButton} source={navProfileImage} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.dashHeader}>
          <SimpleLineIcons
            name="user"
            size={32}
            style={{ marginTop: 5, marginRight: 10 }}
            color="black"
          />
          <Text style={styles.title}>Hi {userName},</Text>
        </View>
        <View>
        {
        /*
        <SearchBar
          platform="default"
          containerStyle={{
            backgroundColor: "white",
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 10
          }}
          inputContainerStyle={{ backgroundColor: "white" }}
          inputStyle={{ backgroundColor: "white" }}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          lightTheme
          loadingProps={{}}
          onChangeText={newVal => setSearchText(newVal)}
          onClearText={() => console.log(onClearText())}
          placeholder="Friends & Groups"
          placeholderTextColor="#888"
          round
          showCancel
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(onCancel())}
          value={searchText}
        />
        */
        }
        </View>
        <View>
          <Text style={styles.subheader}>In the past 30 days,</Text>
          <QuickBalance quickBalanceData={quickBalanceHistory}/>
        </View>
        <View>
          <Text style={styles.subheader}>Recent Splits</Text>
          <RecentSplits xactiondata={transactionHistory}/>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          {/* Covers entire screen*/}
          <TouchableOpacity 
            style={styles.modalContainer}
            onPressOut={() => {
              setModalVisible(false)
              setPopupVisible(false)
            }}
          >
            {/* The modal window */}
            <TouchableWithoutFeedback style={styles.modalView}>
              <View style={styles.modalContent}>
                <PlainButton
                  label="Create"
                  onPress={() => {
                    setModalVisible(false);
                    setPopupVisible(false);
                    navigation.navigate('CreateGroup', { userName: userName });
                  }}
                />
                <PlainButton
                  label="Join"
                  onPress={() => {
                    setPopupVisible(true);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible && popupVisible}
        >
          {/* Covers entire screen*/}
          <TouchableOpacity 
            style={styles.popupContainer}
            onPressOut={() => {setPopupVisible(false)}}
          >
            {/* The modal window */}
            <TouchableWithoutFeedback style={styles.modalView}>
              <View style={styles.popupContent}>
                <Text>Enter Group Code</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setGroupCode}
                  value={groupCode}
                  placeholder=""
                />
                <PlainButton
                  label="Enter"
                  onPress={() => {
                    setModalVisible(false);
                    setPopupVisible(false);
                    navigation.navigate('MembersJoin', { userName: userName, groupName: defaultGroup });
                  }}
                />
                <PlainButton
                  label="Cancel"
                  onPress={() => {
                    setPopupVisible(false);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>


      </ScrollView>

      <BottomNav />
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const navBarHeight = 60;
console.log(windowHeight)
const styles = StyleSheet.create({
  title: {
    fontSize: 32, 
    fontWeight: 500 
  },
  subheader: { 
    fontSize: 24, 
    fontWeight: 500 
  },
  // is the whole app screen, except for the navigation header
  container: {
    height: windowHeight - headerHeight,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  // is the scrollable part of the screen, sans bottom navbar
  scrollview: {
    height: windowHeight - headerHeight - navBarHeight
  },
  // should stay at the bottom
  navBar: {
    width: '100%',
    height: navBarHeight,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    borderTop: '1px solid #CCCCCC'
  },
  navButton: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  navAddGroup: {
    width: 90,
    height: 90,
  },

  // in the scrollview, where recent transactions are
  dashHeader: {
    alignSelf: "flex-start",
    flexDirection: 'row',
  },
  // modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
  },
  popupContent: {
    flexDirection: 'column',
    backgroundColor: 'blue',
    margin: 20,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  
});
