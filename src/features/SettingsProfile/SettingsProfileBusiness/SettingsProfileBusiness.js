import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { store } from '../../../apps/Storage';
import { CustomPicker } from "../../../shared/components/CustomPicker/CustomPicker";
import { InputTextNoError } from "../../../shared/components/CustomTextInput/CustomTextInput";
import { SettingsImageProfile } from "../../../shared/components/ImageProfile";
import { Caption, Text13SemiBoldYellow, Text32, TextProfile } from "../../../shared/components/Label";
import { MainContainer } from "../../../shared/components/MainContainer";
import { ROUTE } from "../../../shared/constants/NavigationConstants";
import { KEY } from "../../../shared/constants/StoreConstants";
import { useDep } from "../../../shared/context/DependencyContext";
import { useTheme } from "../../../shared/context/ThemeContext";
import { checkErr } from '../../../utils/CommonUtils';

export const SettingsProfileBusiness = ({ navigation }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const route = useRoute()

    const [accountId, setAccountId] = useState()
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [gmaps, setGmaps] = useState('');
    const [categoryName, setCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [profileImage, setProfileImage] = useState('')
    const [businessLinks, setBusinessLinks] = useState([])

    // format untuk tampilan settingsBusinessProfile
    const [businessHoursView, setBusinessHoursView] = useState([])
    // format untuk tampilan settingsOpenHour dan yang disubmit ke backend
    const [businessHoursSubmit, setBusinessHoursSubmit] = useState([])

    const [allCategories, setAllCategories] = useState([])
    const [existing, setExisting] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ margin: 16 }} onPress={() => navigation.goBack()}>
                    <Text style={{ color: theme?.state?.style?.text?.caption?.color, fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>

            ),
            headerRight: () => (
                // <View style={{margin: 16}}>
                <TouchableOpacity style={{ padding: 16 }} onPress={saveResponse}><Text style={{ color: "#FED154", fontSize: 16, fontFamily: 'Poppins-Medium' }}>Send</Text></TouchableOpacity>
                // </View>
            )
        })
    })

    useEffect(() => {
        getProfileAndCategories()
    }, [])

    useEffect(() => {
        if (route.params?.openHour) {
            let object = []
            for (let i = 0; i < route.params?.openHour.length; i++) {
                object.push({
                    day: `${route.params?.openHour[i].id}`,
                    open_hour: route.params?.openHour[i].openTime,
                    close_hour: route.params?.openHour[i].closeTime
                })
            }

            setBusinessHoursSubmit(object)
            setBusinessHoursView(route.params.openHour)
        } else if (route.params?.newBusinessLink) {
            setBusinessLinks(route.params.newBusinessLink)
        }
    }, [route.params])

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
    const { profileService, profileImageService, categoryService } = useDep()

    const getProfileAndCategories = async () => {
        try {
            const accId = await store.getData(KEY.ACCOUNT_ID)
            setAccountId(accId)

            const responseCategories = await categoryService.doGetCategories()
            if (responseCategories.status === 200) {
                setAllCategories(responseCategories.data.data)
            }

            const response = await profileService.doGetBusinessProfile({
                account_id: `${accId}`
            })

            let data = response.data.data
            if (data.business_profile.display_name != "") {
                setExisting(true)

                setProfileImage(data.business_profile.profile_image)
                setName(data.business_profile.display_name)
                setBio(data.business_profile.profile_bio)
                setAddress(data.business_profile.address)
                setGmaps(data.business_profile.gmaps_link)
                setCategoryId(data.business_profile.category_id)
                setCategoryName(data.category_name)

                setBusinessLinks(data.business_profile.business_links.map(item => ({ label: item.label, link: item.link })))

                // diset spt ini untuk case jika business_hour tidak diedit (langsung diatur ke format submit (hanya diambil day, openhour, dan closehour saja))
                setBusinessHoursSubmit(data.business_profile.business_hours.map(item => ({
                    day: `${item.day}`,
                    open_hour: item.open_hour,
                    close_hour: item.close_hour
                })))

                let newBusinessHours = adjustTime(data.business_profile.business_hours)
                setBusinessHoursView(newBusinessHours)
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const handleToOpenHourSettingsClick = () => {
        navigation.navigate(ROUTE.SETTINGS_OPEN_HOUR, {
            data: adjustTime(businessHoursSubmit)
        })
    }

    const handleToLinkSettingsClick = () => {
        navigation.navigate(ROUTE.SETTINGS_LINKS, {
            data: businessLinks
        })
    }

    const handleChangeCategory = (value) => {
        setCategoryId(value)
        setCategoryName(allCategories[allCategories.findIndex(cat => cat.category_id === value)].category_names)
    }

    const saveResponse = async () => {
        try {
            let responseImage = ''
            if (profileImage.includes("https://") === false) {
                responseImage = await profileImageService.addBusinessProfileImage(profileImage)
            } else {
                responseImage = profileImage
            }
            if (existing) {
                const response = await profileService.updateBusinessProfile({
                    account_id: `${accountId}`,
                    category_id: `${categoryId}`,
                    address: address,
                    profile_image: responseImage,
                    profile_bio: bio,
                    gmaps_link: gmaps,
                    display_name: name,
                    business_hours: businessHoursSubmit,
                    business_links: businessLinks
                })
                if (response.status === 200) {
                    navigation.navigate(ROUTE.MAIN)
                }
            } else {
                const response = await profileService.addBusinessProfile({
                    account_id: `${accountId}`,
                    category_id: `${categoryId}`,
                    address: address,
                    profile_image: responseImage,
                    profile_bio: bio,
                    gmaps_link: gmaps,
                    display_name: name,
                    business_hours: businessHoursSubmit,
                    business_links: businessLinks
                })
                if (response.status === 200) {
                    navigation.navigate(ROUTE.MAIN)
                }
            }
        } catch (err) {
            checkErr(err)
        }
    }

    return (
        <MainContainer>
            <ScrollView style={{ width: '100%' }}>
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


                    <View style={styles.container}>
                        <CustomPicker label="Category" data={allCategories} init={categoryName} handleChange={handleChangeCategory} />
                    </View>

                    <InputTextNoError
                        text={'Address'}
                        onChange={setAddress}
                        value={address}
                    />

                    <InputTextNoError
                        text={'Google Maps Link'}
                        onChange={setGmaps}
                        value={gmaps}
                    />

                    <View style={[styles.container, styles.heightView]}>
                        <TextProfile text={'Open Hours:'} />
                        {/* Nanti tampilin macem 'conclusion' kea:
                            monday: 10.00-22.00
                            Tuesday: 14.00-22.00 */}

                        {businessHoursView.map((dummy, i) => {
                            if (dummy.active == true) {
                                return (
                                    <View key={i}>
                                        <Caption text={`${dummy.day} \t\t ${dummy.openTime} - ${dummy.closeTime}`} style={{ paddingHorizontal: 8 }} />
                                    </View>
                                )
                            }
                        })}



                        <Pressable onPress={handleToOpenHourSettingsClick}>
                            <View style={styles.goToOtherPage}>
                                <Text32 text={'Edit Open Hours'} />

                                <Feather
                                    name="chevron-right"
                                    size={20}
                                    color={styles.goToOtherPage.color}
                                />
                            </View>
                        </Pressable>

                    </View>



                    <View style={[styles.container, styles.heightView]}>
                        <TextProfile text={'Links'} />
                        {businessLinks.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Caption text={`${item.label}\t:${item.link}`} style={{ paddingHorizontal: 8 }} />
                                </View>
                            )
                        })}

                        <Pressable onPress={handleToLinkSettingsClick}>
                            <View style={styles.goToOtherPage}>
                                <Text32 text={'Edit Links'} />

                                <Feather
                                    name="chevron-right"
                                    size={20}
                                    color={styles.goToOtherPage.color}
                                />
                            </View>
                        </Pressable>

                    </View>

                </View>
            </ScrollView>
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
    },
    container: {
        width: '100%',
        marginBottom: theme?.spacing?.m
    },

    heightView: {
        minHeight: 60,
    },

    goToOtherPage: {
        height: 60,
        backgroundColor: theme?.pallete?.lightBlue,
        borderRadius: theme?.radius?.s,
        justifyContent: "space-between",
        alignContent: 'stretch',
        paddingHorizontal: 12,
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: "center",
        ...theme?.text?.text32,
    }
})


const adjustTime = (data) => {
    // digunakan untuk menyesuaikan waktu dengan isActive true dan false
    let temporary = Array.from({ length: 7 }, (v, i) => ({
        id: 0,
        day: '',
        openTime: '',
        closeTime: '',
        active: false
    }))

    for (let i = 0; i < 7; i++) {
        if (i == 0) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Monday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Monday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        } else if (i == 1) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Tuesday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Tuesday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        } else if (i == 2) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Wednesday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Wednesday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        } else if (i == 3) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Thursday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Thursday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        } else if (i == 4) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Friday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Friday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        } else if (i == 5) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Saturday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Saturday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        } else if (i == 6) {
            let index = data.findIndex((item) => item.day == i)
            if (index !== -1) {
                temporary[i].id = i
                temporary[i].day = 'Sunday'
                temporary[i].openTime = data[index].open_hour
                temporary[i].closeTime = data[index].close_hour
                temporary[i].active = true
            } else {
                temporary[i].id = i
                temporary[i].day = 'Sunday'
                temporary[i].openTime = "08.00"
                temporary[i].closeTime = "21.00"
                temporary[i].active = false
            }
        }
    }
    return temporary
}