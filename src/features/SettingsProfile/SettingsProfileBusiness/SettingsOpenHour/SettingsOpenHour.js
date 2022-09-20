import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CustomSwitch } from "../../../../shared/components/CustomSwitch/CustomSwitch";
import { useTheme } from "../../../../shared/context/ThemeContext";

export const SettingsOpenHour = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    const [openHour, setOpenHour] = useState([
        {
            id:0,
            day: 'Monday',
            openTime: '08.00',
            closeTime: '22.00',
            active: true,
        },
        {
            id:1,
            day: 'Tuesday',
            openTime: '09.00',
            closeTime: '21.00',
            active: true,
        },
        {
            id:2,
            day: 'Wednesday',
            openTime: '09.00',
            closeTime: '21.00',
            active: false,
        },
        {
            id:3,
            day: 'Thursday',
            openTime: '09.00',
            closeTime: '21.00',
            active: false,
        },
        {
            id:4,
            day: 'Friday',
            openTime: '09.00',
            closeTime: '21.00',
            active: true,
        },
        {
            id:5,
            day: 'Saturday',
            openTime: '09.00',
            closeTime: '21.00',
            active: true,
        },
        {
            id:6,
            day: 'Sunday',
            openTime: '09.00',
            closeTime: '21.00',
            active: true,
        },
    ])

    const handleChange = (i, open, close, active) => {
        const newOpenHour = [...openHour];
        newOpenHour[i].active = active;
        newOpenHour[i].openTime = open;
        newOpenHour[i].closeTime = close;

        setOpenHour(newOpenHour)
        
    }

    return(
        <>
            <ScrollView style={styles.container}>
                <View style={styles.inside}>
                    {/* <CustomSwitch label={'Monday'} 
                        openHour={openHour[0].openTime} 
                        closeHour={openHour[0].closeTime}
                        handleValueChange={handleChange
                        }
                        key={0} />
                    <CustomSwitch label={'Tuesday'}/> */}

                    {openHour.map((item)=>{
                        return(
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

                </View>
            </ScrollView>
        </>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        // margin: theme?.spacing?.m,
        width:'100%', 
    },
    inside: {
        margin: theme?.spacing?.m,
        // width:'100%', 
    }
})