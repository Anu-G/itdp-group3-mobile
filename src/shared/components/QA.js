import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { Caption, TextProfile } from './Label';

export const QA = ({num, question, answer}) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    
  return (
    <View style={styles.QAWrp}>
        <View>
            <TextProfile text={`${num}. ${question}`} style={{color: 'white'}}/>
        </View>
        <View style={styles.answerCtn}>
            <Caption text={`${answer}`} style={{color: 'white'}}/>
        </View>
    </View>
  )
}

const styling = (theme) => StyleSheet.create({
    QAWrp: {
        marginBottom: 16
    },
    answerCtn: {
        paddingLeft: 16,
    }
})
