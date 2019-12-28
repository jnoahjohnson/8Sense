import React, { useState, useContext, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import SenseContext from '../context/SenseContext';
import { Icon, Text } from 'react-native-ui-kitten';

const SensesList = ({ senses, setSenses }) => {
    const [sensesData, setSensesData] = useState(
        senses.map((item, index) => ({
            key: `item-${index}`,
            label: item.name
        }))
    );

    const updateSenses = () => {
        setSenses(sensesData.map((item, index) => ({
            name: item.label
        })));
    }

    return (
        <View style={{ flex: 100 }}>
            <DraggableFlatList
                data={sensesData}
                renderItem={({ item, index, drag, isActive }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                height: 30,
                                marginVertical: 5,
                                backgroundColor: isActive ? '#1a2138' : item.backgroundColor,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}
                            onLongPress={drag}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 28,
                                paddingVertical: 10,
                                backgroundColor: 'red'
                            }}>{item.label}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    let newData = sensesData.filter(obj => obj.key !== item.key);
                                    setSensesData(newData);
                                    updateSenses();
                                }}
                            >
                                <Icon name="trash" style={{ width: 20, height: 20, color: '#e5e5e5' }} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({ data }) => {
                    setSensesData(data);
                    updateSenses();
                }}
                scrollEnabled={false}
            />
        </View>
    )
}

export default SensesList;