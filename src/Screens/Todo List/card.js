import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style ';

function Card({ title, description }) {
    return (
        <View style={styles.cardStyle}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headingStyle}>
                    Title:
                </Text>
                <Text style={styles.titleStyle}>
                    {title}
                </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headingStyle}>
                    Details:
                </Text>
                <Text style={styles.descriptionStyle}>
                    {description}
                </Text>
            </View>

        </View>
    );
}
export { Card };
