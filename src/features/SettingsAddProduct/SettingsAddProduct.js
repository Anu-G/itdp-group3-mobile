import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Text32 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'

export const SettingsAddProduct = () => {
    const theme = useTheme()
    const styles = styling(theme)
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)

    return (
        <MainContainer>
            <View style={styles.container}>
                <Text32 text={'Product Name'}/>
                <View style={styles.input}>
                    <TextInput value={productName} onChangeText={setProductName} placeholder='ex: Grilled Mushroom with Barbeque Sauce' placeholderTextColor={"#849EB9"} keyboardType='default'/>
                </View>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'flex-start',
    },
    input: {
        borderBottomColor: 'red',
    }
})