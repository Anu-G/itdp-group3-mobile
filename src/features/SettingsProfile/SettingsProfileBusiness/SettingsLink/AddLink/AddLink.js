import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ButtonComponent } from "../../../../../shared/components/Button";
import { InputTextNoError, InputTextWithError } from "../../../../../shared/components/CustomTextInput/CustomTextInput";
import { CaptionColor } from "../../../../../shared/components/Label";
import { ROUTE } from "../../../../../shared/constants/NavigationConstants";
import { useTheme } from "../../../../../shared/context/ThemeContext"

export const AddLink = ({ handleChange , open}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style)

    const [label, setLabel] = useState('');
    const [link, setLink] = useState('');
    const [visible, setVisible] = useState(true);

    const navigate = useNavigation()

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerBackImage: () => <FontAwesome size={24} name={'chevron-left'} color={'#f4f4f4'} />,
    //         headerRight: () => <TouchableOpacity style={{ padding: 16 }} onPress={saveResponse}><Text style={{ color: "#FED154", fontSize: 16, fontFamily: 'Poppins-Medium' }}>Save</Text></TouchableOpacity>
    //     })
    // }, [navigation, link, label])

    const saveResponse = () => {
        handleChange({newLink: { label: label, link: link }})
        open(false)
        // navigate.navigate(ROUTE.SETTINGS_LINKS, {
        //     newLink: { label: label, link: link }
        // })
    }

    return (
        // <Modal
        //     animationType="slide"
        //     // visible={visible}
        //     // onRequestClose={() => setVisible(false)}
        //     transparent={true}
        //     >


        <Modal
            animationType="none"
            transparent={false}
        >
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
            <ButtonComponent label={'Save'} onClick={saveResponse}/>
        </View>
        </Modal>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        padding: theme?.spacing?.m,
        height: '100%',
        backgroundColor: theme?.pallete?.dark,
        alignSelf:'stretch'
        // marginTop: 72,
    }
})