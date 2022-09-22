import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { InputTextNoError, InputTextOnly } from './CustomTextInput/CustomTextInput'
import { TextComment } from './Label'

export const CommentColumn = ({ placeholder, handleChange, value, maxLength, charLength, charLimitHandle }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const [highlight, setHighlight] = useState('')

    useEffect(() => {
        setHighlight(value.slice(maxLength + 1))
    }, [value])

    const handleOnChange = (e) => {
        if (e.length <= maxLength) {
            handleChange(e)
        }
    }

    return (
            <View style={styles.commentBox}>
                <InputTextOnly placeholder={placeholder} value={value} onChange={handleOnChange} style={{fontSize: 14}}/>
                <View style={styles.charLength}>
                    <TextComment text={`${charLength}/${maxLength}`}/>
                </View>
            </View>
    )
}

const styling = (theme) => StyleSheet.create({
    commentWrp: {
        color: '#F4F4F4'
    },
    commentBox: {
        paddingBottom: 4,
        color: '#3B4046',
        flex: 1,
        textAlign: 'right',
    },
    charLength: {
        color: '#849EB9'
    },
    warning: {
        backgroundColor: '#FE5454',
    },
    commentInside: {
        textAlign: 'left',
    }
})