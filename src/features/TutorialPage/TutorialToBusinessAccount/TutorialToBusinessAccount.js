import { AntDesign, Entypo } from "@expo/vector-icons"
import { useState } from "react"
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from "react-native"
import { Caption } from "../../../shared/components/Label"
import { useTheme } from "../../../shared/context/ThemeContext"
import { TutorialSlider } from "../Component/Slider"

export const TutorialToBusinessAccount = () => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const [index, setIndex] = useState(0)

    const tutorial = [
        {
            id: 1,
            image: require('../../../../assets/images/Tutorial/AddToBusinessTutorial/AddToBusiness-1.gif'),
            caption: '1. Go to your profile.'
        },
        {
            id: 2,
            image: require('../../../../assets/images/Tutorial/AddToBusinessTutorial/AddToBusiness-2.gif'),
            caption: '1. Go to Edit Profile.'
        },
        {
            id: 3,
            image: require('../../../../assets/images/Tutorial/AddToBusinessTutorial/AddToBusiness-3.gif'),
            caption: '1. Go to your profile.'
        },
        {
            id: 4,
            image: require('../../../../assets/images/Tutorial/AddToBusinessTutorial/AddToBusiness-4.gif'),
            caption: '1. Go to your profile.'
        },
        {
            id: 5,
            image: require('../../../../assets/images/Tutorial/AddToBusinessTutorial/AddToBusiness-5.gif'),
            caption: '1. Go to your profile.'
        },
        {
            id: 6,
            image: require('../../../../assets/images/Tutorial/AddToBusinessTutorial/AddToBusiness-6.gif'),
            caption: '1. Go to your profile.'
        },
    ]


    const right = () =>{
        if(index == tutorial.length -1) {
            setIndex(0)
        } else {
            setIndex(index+1)
        }
    }

    const left = () => {
        if (index == 0){
            setIndex(tutorial.length -1)
        } else {
            setIndex(index-1)
        }
    }

    return(
        <>
            <View style={styles.container}>
                <View style={styles.imageCtn}>
                    <Image style={styles.image} source={tutorial[index].image} />
                    <View style={styles.textCtn}>
                        <Caption text={tutorial[index].caption}  />

                    </View>
                    <View style={{flex: 0.3, flexDirection: "row", }}>
                        <TouchableOpacity style={styles.button} onPress={left} >
                            <Entypo name="chevron-left" style={{color: styles.button.color}} size={24}/>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.button} onPress={right} >
                            <Entypo name="chevron-right" style={{color: styles.button.color}} size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* {console.log('test' + tutorial[0].image)} */}
            {/* <TutorialSlider data={tutorial} /> */}
        </>
    )
}

const width = Dimensions.get('window').width;

const styling = (theme) => StyleSheet.create({
    imageCtn: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'flex-end',
        alignSelf: 'stretch',
    },
    image: {
        width: width * 10,
        height: undefined,
        // aspectRatio: 1,
        flex: 0.8,
        resizeMode: "contain",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 24,
        paddingTop: 128,
        // paddingVertical: 64,
        // paddingRight: 24,
        alignItems: 'center',
        backgroundColor: theme?.colors?.background,
        justifyContent: "center",
        alignItems: "center",
    },
    textCtn: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        backgroundColor: theme?.pallete?.yellow,
        color: theme?.pallete?.dark,
        height: 48,
        width: 48,
        borderRadius: 30,
        marginTop: 12,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 8
    }
})