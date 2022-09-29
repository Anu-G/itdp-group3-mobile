import { StyleSheet, View } from "react-native";
import { CustomAccordion } from "../../../shared/components/CustomAcordion/CustomAcordion";
import { Text14SemiBoldWhite } from "../../../shared/components/Label";
import { useTheme } from "../../../shared/context/ThemeContext";

export const HelpCenter = () => {

    const theme = useTheme();
    const styles = styling(theme.state.style)


    const qas = [
        {
            id: 1,
            q: "question 1",
            a: "answer 1"
        },
        {
            id: 2,
            q: "question 2",
            a: "answer 2. Sometimes it's just better not to be seen. That's how Harry had always lived his life. He prided himself as being the fly on the wall and the fae that blended into the crowd. That's why he was so shocked that she noticed him."
        },
        {
            id: 3,
            q: "question 3",
            a: "answer 3"
        },
        {
            id: 4,
            q: "question 4",
            a: "answer 4"
        },
    ];
    return(
        <>
        <View style={styles.container}>
            {qas.map((item)=>{
                return(
                    <View key={item.id} style={styles.goToOtherPage}>
                        <CustomAccordion value={item} />
                    </View>
                )
            })}

            
        </View>
        </>
    )
}

const styling = (theme) => StyleSheet.create({
    goToOtherPage: {
        minHeight: 60,
        // backgroundColor: theme?.pallete?.lightBlue,
        // borderRadius: theme?.radius?.s,
        // justifyContent: "space-between",
        // alignContent: 'stretch',
        padding: theme?.spacing?.xs,
        paddingVertical: theme?.spacing?.m,
        // marginVertical: theme?.spacing?.m,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomColor: theme?.pallete?.mediumBlue,
        borderBottomWidth: 1,

        ...theme?.text?.text32,
    },
    container:{
        padding: theme?.spacing?.s,
        flex:1,
    }
})