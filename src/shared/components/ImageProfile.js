import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ImageProfile = ({style={}, source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <Image source={{uri: source}} style={styles.imageProfile}/>
    )
}

export const ImageProfileOTHER = ({style={}, source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <Image source={{uri: source}} style={styles.imageProfileOTHER}/>
    )
}

export const ImageWithDeleteSign = ({style={}, handleClick, source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <View style={styles.containerSquare}>
            {
                source !== "plus-icon" ?
                <View>
                    <View style={[styles.squareUp, styles.trash]}>
                        <TouchableOpacity onPress={handleClick}>
                            <Entypo name="circle-with-minus" size={24} color="#FE5454" />                    
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.squareDown, styles.plus]}>
                        <Image source={{uri: source}} style={{width: 70, height: 70,resizeMode: "contain"}}/>
                    </View>
                </View>
                :
                <View>
                    <TouchableOpacity onPress={handleClick}>
                        <View style={[styles.squareDown, styles.plus]}>
                            <Entypo name="plus" size={24} color="#FED154" />                    
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export const AvatarSmall = ({style={}, accId, handleClick, source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <View style={[styles.avatarCtn, styles.small]}>
            <TouchableOpacity onPress={() => handleClick(accId)}>
                <Image source={{uri: source}} style={styles.avatarProfile}/>
            </TouchableOpacity>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    imageProfile:{
        width:100,
        height:80,
        borderRadius:theme?.radius?.m,
    },
    imageProfileOTHER:{
        width:120,
        height:120,
    },
    avatarCtn: {
        backgroundColor: '#FE5454',
        height: 10,
        width: 10,
        borderRadius: 30,
        marginTop: 0,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 0,
    },
    avatarProfile: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    small : {
        height: 40,
        width: 40,
    },
    containerSquare: {
        width:90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    squareUp: {
        width: 85,
        height: 95,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    squareDown: {
        width: 72,
        height: 72,
        borderWidth: 1.5,
        borderColor: '#FED154',
        backgroundColor: '#3B4046',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trash: {
        zIndex: 101,
        elevation: 101,
        position: 'absolute',
    },
    plus: {
        zIndex: 100,
        elevation: 100
    }
})