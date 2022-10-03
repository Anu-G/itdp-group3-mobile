import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { ButtonMediumComponent } from "../../../../shared/components/ButtonMedium";
import { CustomSwitch } from "../../../../shared/components/CustomSwitch/CustomSwitch";
import { ROUTE } from "../../../../shared/constants/NavigationConstants";
import { useTheme } from "../../../../shared/context/ThemeContext";

export const SettingsOpenHour = ({handleChangeOpenHour, data, open}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const navigation = useNavigation()
    const route = useRoute()

    const [openHour, setOpenHour] = useState([])

    // useEffect(() => {
    //     setOpenHour(route.params.data)
    // }, [route.params?.data])

    useEffect(() => {
        setOpenHour(data)
    }, [data])

    const handleChange = (i, open, close, active) => {
        const newOpenHour = [...openHour];
        newOpenHour[i].active = active;
        newOpenHour[i].openTime = open;
        newOpenHour[i].closeTime = close;

        setOpenHour(newOpenHour)
    }

    const saveChanges = () => {
        // navigation.replace(ROUTE.SETTINGS_BUSINESS, {
        //     openHour: openHour.filter(item => item.active === true)
        // })
        handleChangeOpenHour({openHour: openHour.filter(item => item.active === true)})
        open(false)
    }

    return (
        <Modal
            animationType="none"
            transparent={false}
        >
            <ScrollView style={styles.container}>
                <View style={styles.inside}>
                    {/* <CustomSwitch label={'Monday'} 
                        openHour={openHour[0].openTime} 
                        closeHour={openHour[0].closeTime}
                        handleValueChange={handleChange
                        }
                        key={0} />
                    <CustomSwitch label={'Tuesday'}/> */}

                    {openHour.map((item) => {
                        return (
                            <CustomSwitch
                                closeHour={item.closeTime}
                                isActive={item.active}
                                label={item.day}
                                openHour={item.openTime}
                                handleValueChange={handleChange}
                                key={item.id}
                                id={item.id}
                            />
                        )
                    })}

                    <View style={{ alignSelf: 'flex-end' }}>
                        <ButtonMediumComponent label={'Save'} onClick={saveChanges} />
                    </View>

                </View>
            </ScrollView>
        </Modal>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        // margin: theme?.spacing?.m,
        width: '100%',
        backgroundColor: theme?.pallete?.dark
    },
    inside: {
        margin: theme?.spacing?.m,
        // width:'100%', 
    }
})