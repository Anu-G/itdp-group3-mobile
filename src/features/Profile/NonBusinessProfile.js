import React, { useEffect, useState } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Caption, CaptionColor, Title2 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils';
import { useSelector } from 'react-redux';
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { ButtonComponent } from '../../shared/components/Button'
import { useRoute } from '@react-navigation/native'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { SkeletonButton, SkeletonCaption, SkeletonCaptionShort, SkeletonProfile, SkeletonTitle } from '../../shared/components/Skeleton/SkeletonElement'
import { CategorizePageProfile } from '../CategorizePage/CategorizePageProfile'

export const NonBusinessProfile = () => {
    const theme = useTheme()
    const styles = styling(theme)
    const route = useRoute();
    const { openId } = route?.params === undefined ? {} : route.params
    const [isLoading, setLoading] = useState(false)
    const colorChange = new Animated.Value(1);

    // state
    const [profile, setProfile] = useState({
        ProfileImage: '',
        ProfileBio: '',
        DisplayName: '',
    })

    const [accountId, setAccountId] = useState()
    const user = useSelector((state) => state.auth);

    // service
    const { profileService } = useDep()

    useEffect(() => {
        getUser()
    }, [openId])

    const getUser = async () => {
        setLoading(true)
        let useId = 0
        if (openId) {
            useId = openId
        } else {
            useId = user.accountId
        }
        try {
            let response = await profileService.doGetNonBusinessProfile({
                account_id: `${useId}`
            })

            setProfile(prevState => ({
                ...prevState,
                ProfileImage: response.data.data.non_business_profile.profile_image,
                ProfileBio: response.data.data.non_business_profile.profile_bio,
                DisplayName: response.data.data.non_business_profile.display_name,
            }))
        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

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

    const handleEditProfile = () => {
        navigator.navigate(ROUTE.EDIT_PROFILE)
    }

    return (
        <MainContainer>
            <View style={styles.container}>
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
                                <Octicons name='gear' size={24} onPress={handleEditProfile} color={theme?.state?.style?.colors?.button} />
                                <ButtonComponent label={'Edit Profile'} style={styles.editProfileBtnCtn} onClick={handleEditProfile} />
                            </>}
                        </> : <></>}
                    </View>
                </View>
                {isLoading ? <Animated.View style={{ opacity: colorChange }}>
                    <SkeletonTitle style={{ marginVertical: 4 }} />
                </Animated.View> : <Title2 label={profile.DisplayName} />}
                {isLoading ? <>
                    <Animated.View style={{ opacity: colorChange }}>
                        <SkeletonCaption />
                        <SkeletonCaption />
                        <SkeletonCaptionShort />
                    </Animated.View>
                </> : <Caption text={profile.ProfileBio} />}
                <CategorizePageProfile />
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
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
    editProfileBtnCtn: {
        marginLeft: 8,
        alignSelf: 'auto'
    },
})
