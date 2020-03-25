import React, { useState } from 'react';
import {TouchableOpacity, Platform, Text, View } from 'react-native';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";

const CustomDatePicker = ({ date, exitOnClose }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [internalDate, setInternalDate] = useState(date);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setInternalDate(currentDate);
    };


    return (

        <Container>
            { Platform.OS === 'ios' && (
            <Modal isVisible={modalVisible} backdropOpacity={0.4}>
                <View style={{ borderRadius: 12, backgroundColor: "#ffffff" }}>
                        <Header style={{ }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false);
                                exitOnClose(internalDate);
                            }}>
                                <Text>Done</Text>
                            </TouchableOpacity>
                        </Header>
                        <DateTimePicker
                            value={internalDate}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            style={{ backgroundColor: "#ffffff", borderRadius: 12, }}
                        />
                </View>
            </Modal>
            )}
            { Platform.OS === 'android' && (<DateTimePicker
                    value={internalDate}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    style={{ backgroundColor: "#ffffff", borderRadius: 12}}
                />)}
        </Container>
    );
};

const Container = styled.TouchableOpacity`
  justify-content: center;
`;
const Header = styled.View`
  width: 100%;
  padding: 16px;
  
  justify-content: flex-end;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-color: #e3e3e3;
`;


export default CustomDatePicker;
