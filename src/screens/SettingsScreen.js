import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {withNavigation} from 'react-navigation';
import {
  Layout,
  Text,
  Button,
  Select,
  Icon,
  Modal,
  Input,
} from 'react-native-ui-kitten';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Header from '../components/Header';
import SenseContext from '../context/SenseContext';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const SettingsScreen = ({navigation}) => {
  const {
    timerState,
    setTimerState,
    senses,
    setSenses,
    resetSenses,
  } = useContext(SenseContext);
  const [minutes, setMinutes] = useState({text: timerState.minutes.toString()});
  const [seconds, setSeconds] = useState({text: timerState.seconds.toString()});

  const [sensesData, setSensesData] = useState(
    senses.map((item, index) => ({
      key: `item-${index}`,
      label: item.name,
    })),
  );

  const [settingStatus, setSettingStatus] = useState(true);

  const [addItemVisible, setAddItemVisible] = useState(false);
  const [addItemValue, setAddItemValue] = useState('');

  const [clickedSense, setClickedSense] = useState(null);
  const [clickedSenseIndex, setClickedSenseIndex] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const timerLengthMinutes = [
    {text: '0'},
    {text: '1'},
    {text: '2'},
    {text: '3'},
    {text: '4'},
  ];

  const timerLengthSeconds = [
    {text: '0'},
    {text: '5'},
    {text: '10'},
    {text: '15'},
    {text: '20'},
    {text: '25'},
    {text: '30'},
    {text: '35'},
    {text: '40'},
    {text: '45'},
    {text: '50'},
    {text: '55'},
  ];

  const checkSensesChange = () => {
    let originalSenses = senses.map((item, index) => ({
      key: `item-${index}`,
      label: item.name,
    }));

    if (sensesData.length !== originalSenses.length) {
      return true;
    }

    if (sensesData.length != senses.map)
      for (let index = 0; index < sensesData.length; index++) {
        if (sensesData[index].label !== originalSenses[index].label) {
          return true;
        }
      }
    return false;
  };

  //Add Item Modal
  const toggleAddModal = () => {
    setAddItemVisible(!addItemVisible);
  };

  const renderAddItem = () => (
    <Layout
      level="3"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 175,
        width: 275,
        paddingHorizontal: 20,
        backgroundColor: '#151a30',
      }}>
      <Text category="h4">Add Item</Text>
      <Input
        value={addItemValue}
        onChangeText={setAddItemValue}
        placeholder="Enter Name"
        style={{marginVertical: 10}}
      />
      <Layout style={{flexDirection: 'row'}}>
        <Button
          style={styles.addButtonStyles}
          status="basic"
          size="medium"
          onPress={() => {
            toggleAddModal();
          }}>
          Cancel
        </Button>
        <Button
          style={styles.addButtonStyles}
          status="basic"
          size="medium"
          onPress={() => {
            console.log(sensesData);
            console.log(addItemValue);
            let sensesArray = [...sensesData];
            sensesArray.push({
              key: `item-${sensesData.length}`,
              label: addItemValue,
            });
            setSensesData(sensesArray);
            setAddItemValue('');
            toggleAddModal();
          }}>
          Add
        </Button>
      </Layout>
    </Layout>
  );

  const renderClickedSense = () => (
    <Layout
      level="3"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 175,
        width: 275,
        paddingHorizontal: 20,
        backgroundColor: '#151a30',
      }}>
      <Text category="h4">Edit Sense</Text>
      <Input
        value={clickedSense}
        onChangeText={setClickedSense}
        style={{marginVertical: 10}}
      />
      <Layout style={{flexDirection: 'row'}}>
        <Button
          style={styles.addButtonStyles}
          status="basic"
          size="medium"
          onPress={() => {
            setClickedSense(null);
            setClickedSenseIndex(null);
          }}>
          Cancel
        </Button>
        <Button
          style={styles.addButtonStyles}
          status="basic"
          size="medium"
          onPress={() => {
            console.log(clickedSenseIndex);
            let sensesArray = [...sensesData];
            sensesArray[clickedSenseIndex].label = clickedSense;
            setSensesData(sensesArray);
            setClickedSense(null);
            setClickedSenseIndex(null);
          }}>
          Save
        </Button>
      </Layout>
    </Layout>
  );

  useEffect(() => {
    let sensesChanged = checkSensesChange();

    let timeChanged =
      minutes.text === timerState.minutes.toString() &&
      seconds.text === timerState.seconds.toString()
        ? false
        : true;

    if (timeChanged || sensesChanged) {
      setSettingStatus(false);
    } else {
      setSettingStatus(true);
    }
  });

  return (
    <>
      <Header actionButton="close">Settings</Header>

      <Layout style={styles.container}>
        <Text style={styles.settingHeader} category="h2">
          Time per Sense
        </Text>
        <Layout style={styles.pickerContainer}>
          <Layout style={styles.picker}>
            <Select
              size="large"
              data={timerLengthMinutes}
              placeholder={minutes}
              selectedOption={minutes}
              style={{
                margin: 5,
              }}
              onSelect={selectedOption => {
                setMinutes(selectedOption);
              }}
            />
            <Text style={styles.pickerLabel}>Minutes</Text>
          </Layout>

          <Layout style={styles.picker}>
            <Select
              data={timerLengthSeconds}
              placeholder={seconds}
              selectedOption={seconds}
              size="large"
              style={{
                margin: 5,
              }}
              onSelect={selectedOption => {
                setSeconds(selectedOption);
              }}
            />
            <Text style={styles.pickerLabel}>Seconds</Text>
          </Layout>
        </Layout>

        <Layout style={{flex: 10}}>
          <Layout
            style={{
              ...styles.settingHeader,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Layout
              style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 15}} category="h2">
                Senses
              </Text>
              {editMode ? (
                <TouchableOpacity onPress={toggleAddModal}>
                  <Icon
                    name="plus"
                    style={{height: 25, width: 25, color: 'white'}}
                  />
                </TouchableOpacity>
              ) : null}
            </Layout>

            <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
              {editMode ? (
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    Alert.alert(
                      'Reset Senses',
                      'Are you sure you want to reset the senses to default?',
                      [
                        {
                          text: 'Reset',
                          onPress: () => {
                            resetSenses();
                            setSensesData(
                              senses.map((item, index) => ({
                                key: `item-${index}`,
                                label: item.name,
                              })),
                            );
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Text>Reset Senses</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <Button
                status="basic"
                size="medium"
                onPress={() => setEditMode(!editMode)}>
                {editMode ? 'Done' : 'Edit'}
              </Button>
            </Layout>
          </Layout>
          <DraggableFlatList
            data={sensesData}
            style={styles.sensesList}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            onDragBegin={() =>
              ReactNativeHapticFeedback.trigger('impactHeavy', options)
            }
            renderItem={({item, index, drag, isActive}) => {
              const editSense = () => {
                setClickedSense(item.label);
                console.log(index);
                setClickedSenseIndex(index);
              };

              return (
                <Layout>
                  <Layout
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {editMode ? (
                      <TouchableOpacity onLongPress={drag}>
                        <Icon
                          name="menu"
                          style={{
                            width: 20,
                            height: 20,
                            color: '#e5e5e5',
                            marginRight: 15,
                          }}
                        />
                      </TouchableOpacity>
                    ) : null}

                    <Layout
                      style={{
                        height: 30,
                        flex: 1,
                        marginVertical: 10,
                        backgroundColor: isActive
                          ? '#1a2138'
                          : item.backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 28,
                          paddingTop: 10,
                          marginRight: 10,
                        }}>
                        {item.label}
                      </Text>

                      <Layout
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {editMode ? (
                          <TouchableOpacity
                            onPress={() => {
                              setClickedSense(item.label);
                              setClickedSenseIndex(index);
                            }}>
                            <Icon
                              name="pencil"
                              style={{
                                width: 20,
                                height: 20,
                                color: '#e5e5e5',
                                marginRight: 15,
                              }}
                            />
                          </TouchableOpacity>
                        ) : null}

                        {editMode ? (
                          <TouchableOpacity
                            onPressOut={() => {
                              let newData = sensesData.filter(
                                obj => obj.key !== item.key,
                              );
                              setSensesData(newData);
                            }}>
                            <Icon
                              name="trash"
                              style={{width: 20, height: 20, color: '#e5e5e5'}}
                            />
                          </TouchableOpacity>
                        ) : null}
                      </Layout>
                    </Layout>
                  </Layout>
                </Layout>
              );
            }}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({data}) => {
              setSensesData(data);
            }}
          />
          <Modal
            allowBackdrop={true}
            backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            onBackdropPress={toggleAddModal}
            visible={addItemVisible}>
            {renderAddItem()}
          </Modal>

          <Modal
            allowBackdrop={true}
            backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            onBackdropPress={() => {
              setClickedSense(null);
              setClickedSenseIndex(null);
            }}
            visible={clickedSense === null ? false : true}>
            {renderClickedSense()}
          </Modal>
        </Layout>

        <Layout style={styles.saveButtonContainer}>
          <Button
            onPress={() => {
              setTimerState({
                minutes: Number(minutes.text),
                seconds: Number(seconds.text),
              });
              let updatedSensesData = sensesData.map(item => ({
                name: item.label,
              }));
              setSenses(updatedSensesData);
              navigation.goBack();
            }}
            status="basic"
            style={styles.saveButton}
            disabled={settingStatus}
            size="large">
            Save
          </Button>
        </Layout>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  pickerLabel: {
    alignSelf: 'center',
    marginTop: 10,
  },
  settingHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonContainer: {
    flex: 1,
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
  sensesList: {
    flexGrow: 0,
  },
  addButtonStyles: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default withNavigation(SettingsScreen);
