import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { ButtonComponent } from "../../../../shared/components/Button";
import { Caption, TextProfile } from "../../../../shared/components/Label";
import { ROUTE } from "../../../../shared/constants/NavigationConstants";
import { useTheme } from "../../../../shared/context/ThemeContext"
import { AddLink } from "./AddLink/AddLink";

export const SettingsLink = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style)

    const dummyLink = [
        {
            id: 0,
            email: 'a',
            label: 'aa',
        },
        {
            id: 2,
            email: 'b',
            label: 'bb',
        },
    ]
    const [link, setLinks] = useState(dummyLink)

    const row = []
    let prevOpenedRow;

    const closeRow = index => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close()
        }
        prevOpenedRow = row[index]
    }

    const onDelete = () => {
        console.log('Delete Item');
    }

    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 128],
            outputRange: [0,1],
            // extrapolateRight: 'clamp'
            // extrapolate: 'clamp'
        })

        return(
            // <TouchableOpacity onPress={onDelete}>
                <View style={styles.swipeCtn}>
                <Animated.View style={[  ]} >
                    <View style={{flexDirection:'row', height: '100%'}}>
                    <View style={[styles.swipButtonSize, styles.edit]}>
                        <MaterialIcons name="edit" size={32} color='red' />
                    </View>
                    <View style={[styles.swipButtonSize, styles.delete]}>
                        <MaterialIcons name="delete-forever" size={32} color='red' />
                    </View>
                    </View>
                    
                </Animated.View>
                </View>
            // </TouchableOpacity>
        )
    }

    //
    const navigation = useNavigation();

    const goToAddLink = () => {
        navigation.navigate(ROUTE.ADD_LINK)
    }


    return(
        <>

        {/* dummy button */}
        <ButtonComponent label={'Add Link'}  onClick={goToAddLink}/>
        {link.length===0 && 
            <View style={styles.emptyContainer}>
                <TextProfile text={'No Links'}/>
            </View>
        }

        {link.length > 0 && 
            <View style={styles.container}>
            {link.map((item)=>{
                return(
                    <>
                        <Swipeable 
                            renderRightActions={leftSwipe}
                            ref={ref => row[item.id] = ref}
                            onSwipeableWillOpen={closeRow(item.id)}
                            key={item.id}
                        >
                            <View style={styles.cellContainer}>
                                <TextProfile text={dummyLink[0].label}/>
                                <Caption text={dummyLink[0].email}/>
                             </View>
                        </Swipeable>
                    </>
                )
            })}
            </View>
        }
        
        
        <Swipeable 
            renderLeftActions={leftSwipe} 
        />
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
    },
    container:{
        flex:1,
        width: '100%',
        alignContent: "stretch",
        padding: theme?.spacing?.m,
        backgroundColor: theme?.pallete?.dark
    },
    cellContainer:{
        height: 64,
        width: '100%',
        alignContent: 'stretch',
        borderBottomColor: theme?.pallete?.lightBlue,
        borderBottomWidth: 1,
        padding: theme?.spacing?.m,
        justifyContent: 'center',
    },
    swipButtonSize:{
        height: '100%',
        width: 64,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'flex-start'
    },
    delete: {
        backgroundColor: theme?.pallete?.red,
    },
    edit: {
        backgroundColor: theme?.pallete?.lightBlue
    },
    swipeCtn: {
        width: 128,
        height: '100%',
        // flexDirection: 'row'
    }
})