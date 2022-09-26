import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { storage } from '../../apps/Storage';
import { ImageHorizontalScroll } from '../../shared/components/ImageHorizontalScroll';
import { TextTimeline } from '../../shared/components/Label';
import { MainContainer } from '../../shared/components/MainContainer';
import { ROUTE } from '../../shared/constants/NavigationConstants';
import { KEY } from '../../shared/constants/StoreConstants';
import { useDep } from '../../shared/context/DependencyContext';
import { useTheme } from '../../shared/context/ThemeContext';
import { checkErr } from '../../utils/CommonUtils';

export const EditPost = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const route = useRoute()
    const {post, accId} = route.params
    console.log(post,"HALLOOO");
    const navigate = useNavigation()
    const { profileService, postService, postImageService } = useDep()
    const [accountId, setAccountId] = useState()
    const [profileImage, setProfileImage] = useState('')
    const [caption, setCaption] = useState(post.caption_post)
    const [pickedImagePath, setPickedImagePath] = useState(post.detail_media_feed)
    const [loading, setLoading] = useState(false)
    const [charLength, setCharLength] = useState(0)
    const feedId = post.post_id
    const maxLength = 280
    const user = useSelector((state) => state.auth);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <Text style={{ color: "#F4F4F4", fontSize: 16 }}>Cancel</Text>,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} onPress={saveResponse} disabled={loading}><Text style={{ color: "#FED154", fontSize: 16 }}>Send</Text></TouchableOpacity>)
        })
    }, [navigation, accountId, caption, pickedImagePath])

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            let response = await profileService.doGetBusinessProfile({
                account_id: `${accId}`
            })
            setProfileImage(response.data.data.business_profile.profile_image)
        } catch (err) {
            checkErr(err)
        }
    }

    const onChangeCaption = (e) => {
        setCaption(e)
        setCharLength(e.length)
    }

    const showImagePicker = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsMultipleSelection: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.cancelled) {
                if (result.uri) {
                    setPickedImagePath(prevState => [...prevState, result.uri])
                    return
                }
                setPickedImagePath(prevState => [...prevState,...result.selected.map(res => res.uri)])
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
            });

            if (!result.cancelled) {
                setPickedImagePath(prevState => [...prevState, result.uri])
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const saveResponse = async () => {
        setLoading(true)
        try {
            const responseImage = await postImageService.doEditData(pickedImagePath)
            const response = await postService.doPostData({
                "feed_ID": `${feedId}`,
                caption_post: caption,
                media_links: responseImage
            })
            if (response.status === 200) {
                console.log("success upload data");
            }

            navigate.navigate(ROUTE.MAIN, {
                refresh: true
            })
            
        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainContainer>
            <View style={styles.upContainer}>
                <View style={styles.leftContainer}>
                    {profileImage !== '' && <Image source={{ uri: profileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                </View>
                <View style={styles.rightContainer}>
                    <TextInput onChangeText={text => onChangeCaption(text)} value={caption} placeholder='Add some post...' placeholderTextColor={"#849EB9"} multiline={true} maxLength={280} textAlignVertical={'top'} style={styles.textArea} />
                    <View style={styles.charLength}>
                        <TextTimeline text={`${charLength}/${maxLength}`} style={{color: '#849EB9'}}/>
                    </View>
                    <ImageHorizontalScroll images={pickedImagePath} />
                </View>
            </View>
            <View style={styles.downContainer}>
                <FontAwesome name='image' size={32} color={"#849EB9"} onPress={showImagePicker} style={{ paddingLeft: 16 }} />
                <FontAwesome name='camera' size={32} color={"#849EB9"} onPress={openCamera} style={{ paddingLeft: 16 }} />
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
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 5,
        marginTop: 4
    },
    charLength: {
        alignSelf: 'flex-end',
        color: '#849EB9',
        cursor: 'default',
        marginBottom: 4
    },
})