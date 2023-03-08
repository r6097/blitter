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
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { SimpleLineIcons } from '@expo/vector-icons';
import TransactionGroup from '../components/TransactionGroup';
import StyledButton from '../components/StyledButton';

navHomeImage = require('../assets/home.png');
navProfileImage = require('../assets/user.png');
navGroupImage = require('../assets/plus.png');

import transactionData from '../transactionData.json'
import quickBalanceData from '../quickBalanceData.json'

export default function DashboardScreen({ route, navigation }) {
  const { userName } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = React.useState("");
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
      <ScrollView style={{flex: "0 0 60%"}}>
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
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity 
            style={styles.modalCenteredView}
            onPressOut={() => {setModalVisible(false)}}
          >
            <TouchableWithoutFeedback style={styles.modalView}>
              <View style={styles.modalButtonGroup}>
                <StyledButton
                  label="Create"
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('CreateGroup', { userName: userName });
                  }}
                />
                <StyledButton
                  label="Join"
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MembersJoin', { userName: userName, groupName: defaultGroup });
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </ScrollView>

      <BottomNav style={{flex: "0 0 40%"}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32, 
    fontWeight: 500 
  },
  subheader: { 
    fontSize: 24, 
    fontWeight: 500 
  },
  
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  dashHeader: {
    alignSelf: "flex-start",
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20
  },

  modalCenteredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
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
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  navBar: {
    width: '100%',
    backgroundColor: 'white',
    height: 60,
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
});
