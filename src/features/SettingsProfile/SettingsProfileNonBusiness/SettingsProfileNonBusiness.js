import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { store } from "../../../apps/Storage";
import { InputTextNoError } from "../../../shared/components/CustomTextInput/CustomTextInput";
import { SettingsImageProfile } from "../../../shared/components/ImageProfile";
import { Text13SemiBoldYellow } from "../../../shared/components/Label";
import { MainContainer } from "../../../shared/components/MainContainer";
import { ROUTE } from "../../../shared/constants/NavigationConstants";
import { KEY } from "../../../shared/constants/StoreConstants";
import { useDep } from "../../../shared/context/DependencyContext";
import { useTheme } from "../../../shared/context/ThemeContext"
import { checkErr } from "../../../utils/CommonUtils";
import * as ImagePicker from 'expo-image-picker'
import { useSelector } from "react-redux";

export const SettingsProfileNonBusiness = ({ navigation }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const navigate = useNavigation()
    const route = useRoute();
    const profile = useSelector((state) => state.profile);
    const user = useSelector((state) => state.auth);

    const [accountId, setAccountId] = useState()
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('')
    const [firstTime, setFirstTime] = useState(false);

    const [existing, setExisting] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ margin: 16 }} onPress={() => { firstTime ? navigate.replace(ROUTE.WELCOME_PAGE) : navigation.goBack() }}>
                    <Text style={{ color: '#f4f4f4', fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>

            ),
            headerRight: () => (
                <TouchableOpacity style={{ padding: 16 }} onPress={saveResponse}>
                    <Text style={{ color: "#FED154", fontSize: 16, fontFamily: 'Poppins-Medium' }}>Send</Text>
                </TouchableOpacity>
            )
        })
    })

    useEffect(() => {
        if (profile.profileId !== 0) {
            getProfile()
        }
    }, [profile])

    useEffect(() => {
        if (route.params?.prevPage === 'signUp') {
            setFirstTime(true)
        }
    }, [route.params]);

    // pilih file
    const showImagePicker = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.cancelled) {
                setProfileImage(result.uri)
            }
        } catch (err) {
            checkErr(err)
        }
    }

    // service
    const { profileService, profileImageService } = useDep()

    const getProfile = async () => {
        try {
            const accId = user.accountId
            setAccountId(accId)

            const response = await profileService.doGetNonBusinessProfile({
                account_id: `${accId}`
            })

            let data = response.data.data.non_business_profile
            if (data.display_name != "") {
                setExisting(true)

                setProfileImage(data.profile_image)
                setName(data.display_name)
                setBio(data.profile_bio)
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const saveResponse = async _ => {
        try {
            let responseImage
            if (profileImage.includes("https://") === false) {
                responseImage = await profileImageService.addNonBusinessProfileImage(profileImage)
            } else {
                responseImage = profileImage
            }
            if (existing) {
                const response = await profileService.updateNonBusinessProfile({
                    account_id: `${user.accountId}`,
                    profile_image: responseImage,
                    profile_bio: bio,
                    display_name: name
                });
                if (response.status === 200) {
                    firstTime ? navigate.navigate(ROUTE.MAIN) : navigate.goBack();
                }
            } else {
                const response = await profileService.addNonBusinessProfile({
                    account_id: `${user.accountId}`,
                    profile_image: responseImage,
                    profile_bio: bio,
                    display_name: name
                });
                if (response.status === 200) {
                    firstTime ? navigate.navigate(ROUTE.MAIN) : navigate.goBack();
                }
            }
        } catch (err) {
            checkErr(err)
        }
    }


    return (
        <MainContainer>
            <View style={styles.changeProfileCtn}>
                <SettingsImageProfile source={profileImage} />

                <Pressable onPress={showImagePicker}>
                    <Text13SemiBoldYellow text={'Change Profile Picture'} />
                </Pressable>
            </View>

            <View style={styles.form}>
                <InputTextNoError
                    text={'Display Name'}
                    onChange={setName}
                    value={name}
                />


                <InputTextNoError
                    text={'Bio'}
                    onChange={setBio}
                    value={bio}
                />

            </View>

        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    form: {
        flex: 1,
        //    width: '100%',
        alignSelf: "stretch",
        margin: theme?.spacing?.m,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    imageCtn: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: theme?.pallete.yellow,
        marginBottom: theme?.spacing?.s,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    changeProfileCtn: {
        alignItems: "center",
        margin: theme?.spacing?.m,
    }
})