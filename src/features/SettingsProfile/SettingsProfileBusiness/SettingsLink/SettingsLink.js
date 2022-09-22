import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextProfile } from "../../../../shared/components/Label";
import { useTheme } from "../../../../shared/context/ThemeContext"

export const SettingsLink = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style)

    const dummyLink = [
        {
            id: 0,
            email: 'a'
        },
        {
            id: 2,
            email: 'b'
        },
    ]
    const [link, setLinks] = useState([])

    return(
        <>
        {link.length===0 && 
            <View style={styles.emptyContainer}>
                <TextProfile text={'No Links'}/>
            </View>
        }
        </>
    )

}

const styling = (theme) => StyleSheet.create({
    emptyContainer:{
        flex: 1,
        width: '100%',
        alignContent: "stretch",
        justifyContent: 'center',
        alignItems: 'center',
    }
})