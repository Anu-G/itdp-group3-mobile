import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export const CategoryLabelActive = ({label}) => {
    const theme = useTheme()
    const styles = styling(theme)
  return (
    <View style={styles.categoryLabel}>
        <View style={styles.label}>
        <Text>{label} </Text>
        </View>
    </View>
  )
}

export const CategoryLabelInactive = ({label}) => {
    const theme = useTheme()
    const styles = styling(theme)
  return (
    <View style={styles.categoryLabelInactive}>
        <View style={styles.label}>
            <Text>{label} </Text>
        </View>
    </View>
  )
}

const styling = (theme) => StyleSheet.create({
    categoryLabel: {
        minWidth: 150,
        height: 56,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

    label: {
        fontSize: 16,
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
})