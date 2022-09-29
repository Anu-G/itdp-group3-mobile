import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { useEffect, useState } from "react"
import { Platform, StyleSheet, Switch, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { ButtonMediumComponent } from "../ButtonMedium"
import { Text32, TextProfile } from "../Label"

export const CustomSwitch = ({ isActive = true, label = '', openHour = '00:00', closeHour = '00:00', handleValueChange, id }) => {

    const theme = useTheme();
    const styles = styling(theme.state.style);
    const [enable, setEnable] = useState(isActive);
    const [styleActive, setStyleActive] = useState(!isActive ? [styles.outer, styles.inactive] : [styles.outer])

    const [time, setTime] = useState(new Date())
    const [openShow, setOpenShow] = useState(false);
    const [closeShow, setCloseShow] = useState(false);
    const [closeTime, setCloseTime] = useState(closeHour)
    const [openTime, setOpenTime] = useState(openHour)

    const handleToggle = () => {
        if (enable === true) {
            setStyleActive([styles.outer, styles.inactive])
        } else {
            setStyleActive([styles.outer])
        }

        setEnable(!enable);
        handleValueChange(id, openTime, closeTime, !enable)
    }

    const handleChange = (event, selectedTime) => {
        const currTime = selectedTime || time;

        let open = openTime
        let close = closeTime
        if (openShow == true) {
            setOpenShow(Platform.OS === 'ios');
            const hour = ('00' + currTime.getHours()).slice(-2)
            const minute = ('00' + currTime.getMinutes()).slice(-2)
            open = `${hour}.${minute}`
            setOpenTime(`${hour}.${minute}`)
        } else if (closeShow == true) {
            setCloseShow(Platform.OS === 'ios')
            const hour = ('00' + currTime.getHours()).slice(-2)
            const minute = ('00' + currTime.getMinutes()).slice(-2)
            close = `${hour}.${minute}`
            setCloseTime(`${hour}.${minute}`)
        }
        handleValueChange(id, open, close, enable)
    }

    return (
        <View style={styleActive}>
            <View style={styles.headSwitch}>
                <Text32 text={label} />
                <Switch
                    trackColor={{ false: '#3B4046', true: '#FED154' }}
                    thumbColor={enable ? '#849EB9' : '#475264'}
                    value={enable}
                    onValueChange={handleToggle} />

            </View>

            <View style={styles.openCell}>
                < Text32 text={'Open'} />
                < ButtonMediumComponent
                    label={openTime}
                    onClick={() => {
                        setOpenShow(true)
                    }}
                    disable={!enable} />
            </View>
            <View style={styles.openCell}>
                <Text32 text={'Close'} />
                < ButtonMediumComponent
                    label={closeTime}
                    onClick={() => {
                        setCloseShow(true)
                    }}
                    disable={!enable} />
            </View>


            {openShow && <RNDateTimePicker
                value={time}
                mode={'time'}
                display={'default'}
                onChange={handleChange}
                is24Hour={true}

            />}

            {closeShow && <RNDateTimePicker
                value={time}
                mode={'time'}
                display={'default'}
                onChange={handleChange}
                is24Hour={true}

            />}
        </View>


    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        // flex: 1,
        //    marginHorizontal:theme?.spacing?.m,
        width: '100%',
        //    alignSelf: "stretch",
        //    marginBottom: theme?.spacing?.m,
        backgroundColor: theme?.pallete?.lightBlue,
        borderRadius: theme?.radius?.s,
    },

    openCell: {
        flexDirection: "row",
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginVertical: theme?.spacing?.s
    },

    outer: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: theme?.pallete?.mediumBlue,
        padding: theme?.spacing?.s,
        paddingTop: -16,
        borderRadius: theme?.radius?.s,
        marginVertical: theme?.spacing?.s
    },

    headSwitch: {
        flexDirection: "row",
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginVertical: theme?.spacing?.xxs

    },

    inactive: {
        opacity: 0.7
    }

})