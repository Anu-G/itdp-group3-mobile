import { Picker } from "@react-native-picker/picker"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { TextProfile } from "../Label"

export const CustomPicker = ({label='Options', data, init, handleChange}) => {

    const theme = useTheme();
    const styles = styling(theme.state.style);

    const [selected, setSelected] = useState();

    const itemTest = [
        {
            item: 'A',
            value: 'A'
        },
        {
            item: 'B',
            value: 'B'
        },
        {
            item: 'C',
            value: 'C'
        },
    ]

    useEffect(() => {
        setSelected(init)
    }, [init])

    return(
        <View style={styles.outer}>
            <TextProfile text={label}/>
            <View  style={styles.container}>
                <Picker 
                    selectedValue={selected}
                    onValueChange={(value, index) => {
                        handleChange(value)
                    }}
                    style={styles.picker}
                    dropdownIconColor={'#F4F4F4'}>
                    {data.map((item, i)=>{
                        return(
                            <Picker.Item label={item.category_names} value={item.category_id} key={i}/>
                        )
                    })}
                </Picker>
            </View>
                

            
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
    color: 'red',
    },
    picker: {
        color: theme?.pallete?.white,
    },

    outer: {
        width: '100%',
        marginVertical:theme?.spacing?.s,
    }


})