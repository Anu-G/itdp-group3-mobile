import React, { useEffect, useState } from 'react'
import { Animated, Image, Linking, StyleSheet, View } from 'react-native'
import { Caption, CaptionColor, Title2 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils';
import { useSelector } from 'react-redux';
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { ButtonComponent } from '../../shared/components/Button'
import { SkeletonButton, SkeletonCaption, SkeletonCaptionShort, SkeletonCategory, SkeletonProfile, SkeletonTitle } from '../../shared/components/Skeleton/SkeletonElement'
import { LinkModal } from '../../shared/components/LinkModal'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { CategorizePageProfile } from '../CategorizePage/CategorizePageProfile'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'

export const BusinessProfile = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const route = useRoute();
    const { openId } = route?.params === undefined ? {} : route.params
    const [openStatus, setStatus] = useState(true)

    // state
    const [profile, setProfile] = useState({
        Address: '',
        ProfileImage: '',
        ProfileBio: '',
        GmapsLink: '',
        DisplayName: '',
        BusinessHours: [],
        BusinessLinks: [],
        PhoneNumber: '',
        CategoryName: ''
    })

    const [accountId, setAccountId] = useState()
    const [day, setDay] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [openHour, setOpenHour] = useState('')
    const [closeHour, setCloseHour] = useState('')
    const user = useSelector((state) => state.auth);
    const [showOurLinks, setShowOurLinks] = useState(false)

    const [isLoading, setLoading] = useState(false)
    const colorChange = new Animated.Value(1)
    const navigator = useNavigation()

    const handleClickLinks = _ => {
        setShowOurLinks(!showOurLinks);
    }

    const handleClickContact = () => {
        Linking.openURL(`https://wa.me/${profile.PhoneNumber}`)
    }

    const handleClickGmaps = () => {
        if (profile.GmapsLink.includes("http://") || profile.GmapsLink.includes("https://")) {
            Linking.openURL(`${profile.GmapsLink}`, '_blank')
        } else {
            Linking.openURL(`https://${profile.GmapsLink}`, '_blank')
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <></>
        })
    }, [navigation])

    // service
    const { profileService } = useDep()

    useEffect(() => {
        getUser()
    }, [openId])

    useEffect(() => {
        Animated.loop(
            Animated.sequence(
                [Animated.timing(
                    colorChange,
                    {
                        toValue: 0.4,
                        duration: 1000,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    colorChange,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }
                )]
            )
        ).start()
    }, [colorChange])

    const getUser = async () => {
        setLoading(true)
        let useId = 0
        if (openId) {
            useId = openId
        } else {
            useId = user.accountId
        }
        console.log(openId);
        try {
            let response = await profileService.doGetBusinessProfile({
                account_id: `${useId}`
            })

            setProfile(prevState => ({
                ...prevState,
                Address: response.data.data.business_profile.address,
                ProfileImage: response.data.data.business_profile.profile_image,
                ProfileBio: response.data.data.business_profile.profile_bio,
                GmapsLink: response.data.data.business_profile.gmaps_link,
                DisplayName: response.data.data.business_profile.display_name,
                BusinessHours: response.data.data.business_profile.business_hours,
                BusinessLinks: response.data.data.business_profile.business_links,
                PhoneNumber: response.data.data.phone_number,
                CategoryName: response.data.data.category_name
            }))
        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDate()
    }, [day])

    const getDate = () => {
        let d = new Date()
        let day = d.getDay()
        let hour = d.getHours();

        for (let i = 0; i < profile.BusinessHours.length; i++) {
            if (day == profile.BusinessHours[i].day) {
                setDay(day)
                if (hour >= profile.BusinessHours[i].open_hour && hour <= profile.BusinessHours[i].close_hour) {
                    setIsOpen(true)
                }
                setOpenHour(profile.BusinessHours[i].open_hour)
                setCloseHour(profile.BusinessHours[i].close_hour)
            }
        }

        return false
    }

    const handleEditProfile = () => {
        navigator.navigate(ROUTE.EDIT_PROFILE)
    }
    const handleAccountSetting = () => {
        navigator.navigate(ROUTE.SETTINGS_ACCOUNT)
    }

    return (
        <MainContainer>
            {showOurLinks && <LinkModal linksIn={profile.BusinessLinks} handleClickLinks={handleClickLinks} />}
            <View style={styles.profileCtn}>
                <View style={styles.topProfile}>
                    {isLoading ? <Animated.View style={{ opacity: colorChange }}>
                        <SkeletonProfile />
                    </Animated.View> : profile.ProfileImage !== '' &&
                    <Image source={{ uri: profile.ProfileImage }} style={{ width: 64, height: 64, borderRadius: 32 }} />}
                    <View style={styles.topProfileRight}>
                        {route.name === ROUTE.PROFILE_BUSINESS || route.name === ROUTE.PROFILE_NON_BUSINESS ? <>
                            {isLoading ? <Animated.View style={{ opacity: colorChange }}>
                                <SkeletonButton />
                            </Animated.View> : <>
                                <Octicons name='gear' size={24} onPress={handleAccountSetting} color={theme?.state?.style?.colors?.button} />
                                <ButtonComponent label={'Edit Profile'} style={styles.editProfileBtnCtn} onClick={handleEditProfile} />
                            </>}
                        </> : <></>}
                    </View>
                </View>
                {isLoading ? <Animated.View style={{ opacity: colorChange }}>
                    <SkeletonTitle style={{ marginVertical: 4 }} />
                </Animated.View> : <Title2 label={profile.DisplayName} />}
                {isLoading ? <Animated.View style={{ opacity: colorChange, width: "40%", height: 24 }}>
                    <SkeletonCategory style={{ marginVertical: 4 }} />
                </Animated.View> : <Caption text={profile.CategoryName} />}
                <View style={styles.openHour}>
                    {isLoading ? <Animated.View style={{ opacity: colorChange, width: "40%", height: 24 }}>
                        <SkeletonCategory style={{ marginVertical: 4 }} />
                    </Animated.View> : <>
                        {isOpen ? <CaptionColor text={'OPEN'} /> : <CaptionColor text={'CLOSED'} />}
                        <FontAwesome name='circle' size={5} color={"rgb(132,158,185)"} style={styles.circle} />
                        <Caption text={`${openHour} - ${closeHour}`} />
                    </>
                    }
                </View>
                {isLoading ? <>
                    <Animated.View style={{ opacity: colorChange }}>
                        <SkeletonCaption />
                        <SkeletonCaption />
                        <SkeletonCaptionShort />
                    </Animated.View>
                </> : <Caption text={profile.ProfileBio} />}
                <View style={styles.profileBtn}>
                    {isLoading ? <Animated.View style={{ opacity: colorChange }}>
                        <SkeletonButton />
                    </Animated.View> : <>
                        {profile.PhoneNumber !== '' && <ButtonComponent label={'Contact Us'} onClick={handleClickContact} style={styles.profileButtonCtn} />}
                    </>}
                    {isLoading ? <Animated.View style={{ opacity: colorChange }}><SkeletonButton /></Animated.View> : <>{profile.BusinessLinks !== '' && <ButtonComponent label={'Our Link(s)'} onClick={handleClickLinks} style={styles.profileButtonCtn} />}</>}
                    {isLoading ? <Animated.View style={{ opacity: colorChange }}><SkeletonButton /></Animated.View> : <>{profile.GmapsLink !== '' && <ButtonComponent label={'Our Store'} onClick={handleClickGmaps} style={styles.profileButtonCtn} />}</>}
                </View>
                <CategorizePageProfile />
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    profileCtn: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 16
    },
    topProfile: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    topProfileRight: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'flex-end'
    },
    openHour: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileBtn: {
        flexDirection: 'row'
    },
    editProfileBtnCtn: {
        marginLeft: 8,
        alignSelf: 'auto'
    },
    circle: {
        marginLeft: 5,
        marginRight: 5,
    },
    profileButtonCtn: {
        margin: theme.spacing?.s,
        marginLeft: 0
    },
})
