import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { InputTextNoError, InputTextWithError } from "../../../../../shared/components/CustomTextInput/CustomTextInput";
import { CaptionColor } from "../../../../../shared/components/Label";
import { ROUTE } from "../../../../../shared/constants/NavigationConstants";
import { useTheme } from "../../../../../shared/context/ThemeContext"

export const AddLink = ({navigation}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style)

    const [label, setLabel] = useState('');
    const [link, setLink] = useState('');
    const [visible, setVisible] = useState(true);

    const navigate = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name={'chevron-left'} color={'#f4f4f4'} />,
            headerRight: () => <TouchableOpacity onPress={saveResponse}><CaptionColor text={'Save'} style={theme?.pallete?.lightBlue}/></TouchableOpacity>
        })
    }, [navigation, link, label])

    const saveResponse = () => {
        navigate.navigate(ROUTE.SETTINGS_LINKS, {
            newLink: {label: label, link: link}
        })
    }

    return(
        // <Modal
        //     animationType="slide"
        //     // visible={visible}
        //     // onRequestClose={() => setVisible(false)}
        //     transparent={true}
        //     >



        <View style={styles.container}>
            {/* <TouchableOpacity onPress={()=> {
                setVisible(false)
                navigation.goBack()
            }}>
                <FontAwesome size={24} name={"chevron-left"} />
            </TouchableOpacity> */}
            <InputTextNoError
                onChange={setLabel}
                text='Label'
                value={label}
                 />

            <InputTextWithError 
                onChange={setLink}
                value={link}
                text='Link'
                />
        </View>
        // </Modal>
    )
}

const styling = (theme) => StyleSheet.create({
    container:{
        padding: theme?.spacing?.m,
        height: '50%',
        // marginTop: 72,
    }
})