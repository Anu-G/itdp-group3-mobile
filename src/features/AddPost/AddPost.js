import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { store } from '../../apps/Storage';
import { ImageHorizontalScroll } from '../../shared/components/ImageHorizontalScroll';
import { MainContainer } from '../../shared/components/MainContainer';
import { KEY } from '../../shared/constants/StoreConstants';
import { useDep } from '../../shared/context/DependencyContext';
import { useTheme } from '../../shared/context/ThemeContext';
import { checkErr } from '../../utils/CommonUtils';

export const AddPost = ({navigation}) => {
    const theme = useTheme()
    const styles = styling(theme)
    const {profileService, postService, postImageService} = useDep()
    const [accountId, setAccountId] = useState()
    const [profileImage, setProfileImage] = useState('')
    const [caption, setCaption] = useState('')
    const [pickedImagePath, setPickedImagePath] = useState([])
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <Text style={{color: "#F4F4F4", fontSize: 16}}>Cancel</Text>,
            headerRight: () => (<TouchableOpacity style={{margin: 16}} onPress={saveResponse} disabled={loading}><Text style={{color: "#FED154", fontSize: 16}}>Send</Text></TouchableOpacity>)
        })
    }, [navigation, accountId, caption, pickedImagePath])

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            let id = await store.getData(KEY.ACCOUNT_ID)
            setAccountId(id)

            let response = await profileService.doGetBusinessProfile({
                account_id: `${id}`
            })
            setProfileImage(response.data.data.business_profile.profile_image)                    
        } catch (err) {
            checkErr(err)
        }
    }

    const showImagePicker = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsMultipleSelection: true,
                selectionLimit: 4,
                aspect: [1, 1],
                quality: 1,
            });
                
            if (!result.cancelled) {
                if (result.uri) {
                    setPickedImagePath([])
                    setPickedImagePath(prevState => [...prevState, result.uri])
                    return                    
                }
                setPickedImagePath([])
                setPickedImagePath(prevState => result.selected.map(res => res.uri))
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const openCamera = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [1, 1],
                quality: 1
            })

            if (!result.cancelled) {
                setPickedImagePath([])
                setPickedImagePath(prevState => [...prevState, result.uri])
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const saveResponse = async () => {
        setLoading(true)
        try {
            const responseImage = await postImageService.doPostImage(pickedImagePath)
            const response = await postService.doPostData({
                account_ID: accountId,
                caption_post: caption,
                media_links: responseImage
            })
            if (response.status === 200) {
                console.log("success upload data");
            }
        } catch (err) {
            console.log(err);
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainContainer>
            <View style={styles.upContainer}>
                <View style={styles.leftContainer}>
                    {profileImage !== '' && <Image source={{uri: profileImage}} style={{ width: 50, height: 50, borderRadius:25}}/>}
                </View>
                <View style={styles.rightContainer}>
                    <TextInput onChangeText={setCaption} placeholder='Add some post...' placeholderTextColor={"#849EB9"} multiline={true} textAlignVertical={'top'} style={styles.textArea}/>
                    <ImageHorizontalScroll images={pickedImagePath}/>
                </View>
            </View>
            <View style={styles.downContainer}>
                <FontAwesome name='image' size={32} color={"#849EB9"} onPress={showImagePicker} style={{paddingLeft:16}}/>
                <FontAwesome name='camera' size={32} color={"#849EB9"} onPress={openCamera} style={{paddingLeft:16}}/>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    upContainer: {
        flex: 16,
        flexDirection: 'row',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    downContainer: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgb(71,82,100)",
    },
    textArea: {
        color: "#849EB9",
        maxHeight: '80%',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginBottom: 4
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 5,
        marginTop: 4
    }
})