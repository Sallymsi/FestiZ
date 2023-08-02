import * as React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import style from '../../Style';

export default function CustomPicker({ label, data, currentIndex, onSelected }) {
    return (
        <View style={style.blockPicker}>
            <Text>{label}</Text>
            <View style={style.wrapperHorizontal}>
                <FlatList
                    bounces
                    horizontal
                    data={data}
                    keyExtractor={item => String(item)}
                    renderItem={({ item, index }) => {
                        const selected = index === currentIndex;
                        return (
                            <TouchableWithoutFeedback onPress={() => onSelected(index, item)}>
                                <View
                                    style={[
                                        style.itemStyleHorizontal,
                                        selected && style.itemSelectedStyleHorizontal,
                                    ]}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: selected ? 'black' : 'grey',
                                            fontWeight: selected ? 'bold' : 'normal',
                                        }}>
                                        {item + ''}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                />
            </View>
        </View >
    );
};