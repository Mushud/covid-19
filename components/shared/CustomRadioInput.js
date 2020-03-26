import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import styled from "styled-components";

const CustomRadioInput = ({ options, label}) => {
    const [attribute, setAttribute] = useState(false);
    return(
        <FormContainer>
            <InputHeader
                style={{
                    fontFamily: "bold"
                }}
            >
                { label }
            </InputHeader>
            <View style={{ flexDirection: 'row', paddingVertical: 10, flexWrap: 'wrap' }}>
                {options.map((value) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setAttribute(value.title)}
                        style={{
                            paddingRight: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Ionicons
                            style={{ marginRight: 5 }}
                            name='ios-checkmark-circle'
                            size={25}
                            color={
                                attribute === value.title
                                    ? Colors.tintColor
                                    : 'grey'
                            }
                        />
                        <Text style={{ fontFamily: "regular", fontSize: 14}}>{value.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </FormContainer>
    );
};
const FormContainer = styled.View`
   padding-horizontal: 10px;
   margin-top: 10px;
`;

const InputHeader = styled.Text`
   font-family: "bold";
`;

export default CustomRadioInput;