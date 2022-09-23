import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { ButtonComponent } from "../../../../shared/components/Button";
import { Caption, CaptionColor, TextProfile } from "../../../../shared/components/Label";
import { ROUTE } from "../../../../shared/constants/NavigationConstants";
import { useTheme } from "../../../../shared/context/ThemeContext";

export const SettingsLink = ({navigation}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style)
    const route = useRoute()

    const [link, setLinks] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name={'chevron-left'} color={'#f4f4f4'} />,
            headerRight: () => <TouchableOpacity onPress={saveResponse}><CaptionColor text={'Submit'} style={theme?.pallete?.lightBlue}/></TouchableOpacity>
        })
    }, [navigation, link])

    useEffect(() => {
        if (route.params?.data) {
            setLinks(route.params.data)                        
        } else if (route.params?.newLink) {
            setLinks(prevState => [...prevState, route.params.newLink])            
        }
    }, [route.params])

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
                        <MaterialIcons name="delete-forever" size={32} color='red' onPress={onDelete}/>
                    </View>
                    </View>
                    
                </Animated.View>
                </View>
            // </TouchableOpacity>
        )
    }

    //
    const navigate = useNavigation();

    const goToAddLink = () => {
        navigate.navigate(ROUTE.ADD_LINK)
    }

    const saveResponse = () => {
        navigate.navigate(ROUTE.SETTINGS_BUSINESS, {
            newBusinessLink : link
        })
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
            {link.map((item, i)=>{
                return(
                    <View key={i}>
                        <Swipeable 
                            renderRightActions={leftSwipe}
                            ref={ref => row[i] = ref}
                            onSwipeableWillOpen={closeRow(i)}
                        >
                            <View style={styles.cellContainer}>
                                <TextProfile text={item.label}/>
                                <Caption text={item.link}/>
                             </View>
                        </Swipeable>
                    </View>
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