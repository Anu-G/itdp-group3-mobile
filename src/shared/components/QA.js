import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

export const QA = ({num, question, answer}) => {
    const theme = useTheme()
    const styles = styling(theme)
  return (
    <View style={styles.QAWrp}>
        <View>
            <Text text={`${num}. ${question}`}/>
        </View>
        <View style={styles.answerCtn}>
            <Text text={`${answer}`}/>
        </View>
    </View>
  )
}

const styling = (theme) => StyleSheet.create({
    QAWrp: {
        width: 300,
    },
    answerCtn: {
        paddingLeft: 16,
    }
})
