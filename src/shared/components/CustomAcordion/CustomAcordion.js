import { Feather } from "@expo/vector-icons";
import { useState } from "react"
import { Dimensions, LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Caption, Text14SemiBoldWhite } from "../Label";

export const CustomAccordion = ({value, expanded=false}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style)
    const [isExpanded, setIsExpanded] = useState(expanded);

    const setExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded)
    }

    return(
        <>
        <View >
            <TouchableOpacity onPress={setExpand} style={styles.container} >
                
                <Text14SemiBoldWhite text={value.q} style={{width:'80%'}}/>
                {/* <Caption text={value.a} /> */}
                <Feather 
                    name="chevron-right"
                    size={20}
                    color={styles.goToOtherPage.color}
                />
            </TouchableOpacity>

            {
                isExpanded && 
                <View>
                    <Caption text={value.a} />
                </View>
            }
        </View>
        </>
    )
}

const dimension = Dimensions.get('window').width;

const styling = (theme) => StyleSheet.create({
    goToOtherPage: {
        // minHeight: 60,
        // // backgroundColor: theme?.pallete?.lightBlue,
        // borderRadius: theme?.radius?.s,
        // justifyContent: "space-between",
        // alignContent: 'stretch',
        // padding: theme?.spacing?.xs,
        // paddingVertical: theme?.spacing?.m,
        // // marginVertical: theme?.spacing?.m,
        // flexDirection: 'row',
        // alignItems: "center",
        // borderBottomColor: theme?.pallete?.mediumBlue,
        // borderBottomWidth: 1,

        ...theme?.text?.text32,
    },
    container:{
        // backgroundColor: 'red',
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        width: dimension - theme?.spacing?.m,
        // flex:3,
        alignItems: 'stretch',
        // padding: 12,
    }
})