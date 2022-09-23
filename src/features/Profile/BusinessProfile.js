import React, { useEffect, useState } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Caption, CaptionColor, Title2 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons'
import { ButtonComponent } from '../../shared/components/Button'
import { SkeletonButton, SkeletonCaption, SkeletonCaptionShort, SkeletonCategory, SkeletonProfile, SkeletonTitle } from '../../shared/components/Skeleton/SkeletonElement'

export const BusinessProfile = () => {
    const theme = useTheme()
    const styles = styling(theme)

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

    const [isLoading, setLoading] = useState(false)
    const colorChange = new Animated.Value(1)

    const handleClickLinks = _ => {
        setShowOurLinks(!showOurLinks);
    }

    const handleClickContact = () => {
        window.open(`https://wa.me/${profile.PhoneNumber}`)
    }

    const handleClickGmaps = () => {
        if (profile.GmapsLink.includes("http://") || profile.GmapsLink.includes("https://")) {
            window.open(`${profile.GmapsLink}`, '_blank')
        } else {
            window.open(`https://${profile.GmapsLink}`, '_blank')
        }
    }

    // service
    const { profileService} = useDep()

    useEffect(() => {
        getUser()
    }, [profile])

    useEffect(()=>{
        Animated.loop(
            Animated.sequence(
                [Animated.timing(
                    colorChange,
                    {
                        toValue:0.4,
                        duration:1000,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    colorChange,
                    {
                        toValue:1,
                        duration:1000,
                        useNativeDriver: true
                    }
                )]
            )
        ).start()
    },[colorChange])

    const getUser = async () => {
        setLoading(true)
        try {
            let id = user.accountId
            setAccountId(id)

            let response = await profileService.doGetBusinessProfile({
                account_id:`${id}`
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
            console.log(err)
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

  return (
   <MainContainer>
        <View style={styles.container}>
            <View style={styles.topProfile}>
                <View style={styles.headProfileLeft}>
                    <View style={styles.headProfile}>
                        {isLoading ? <Animated.View style={{opacity:colorChange}}><SkeletonProfile/></Animated.View> : <>{profile.ProfileImage !== '' && <Image source={{ uri: profile.ProfileImage }} style={{ width: 64, height: 64, borderRadius: 32 }} />}</>}
                        <View style={styles.editProfileBtn}>
                            {isLoading ? <Animated.View style={{opacity:colorChange}}><SkeletonButton/></Animated.View> : <ButtonComponent label={'Edit Profile'}/>}
                        </View>
                    </View>
                    {isLoading ? <Animated.View style={{opacity:colorChange}}><SkeletonTitle/></Animated.View> : <Title2 label={profile.DisplayName}/>}
                    {isLoading ? <Animated.View style={{opacity:colorChange,width:"40%",height:24}}><SkeletonCategory/></Animated.View> : <Caption text={profile.CategoryName}/>}
                    <View style={styles.openHours}>
                        {isLoading 
                            ?
                                <Animated.View style={{opacity:colorChange,width:"40%",height:24}}><SkeletonCategory/></Animated.View>
                            :
                            <>
                                {isOpen ? <CaptionColor text={'OPEN'} /> : <CaptionColor text={'CLOSED'} />}
                                <FontAwesome name='circle' size={5} color={"rgb(132,158,185)"} style={styles.circle}/>
                                <Caption text={`Closes ${openHour} - ${closeHour}`}/>
                            </>
                        }
                    </View>
                    {isLoading ? 
                        <>
                            <Animated.View style={{opacity:colorChange}}>
                                <SkeletonCaption/>
                                <SkeletonCaption/>
                                <SkeletonCaptionShort/>
                            </Animated.View>
                        </> : <Caption text={profile.ProfileBio}/>}
                </View>
                <View style={styles.profileButtons}>
                    {isLoading ? <Animated.View style={{opacity:colorChange}}><SkeletonButton/></Animated.View> : <>{profile.PhoneNumber !== '' && <ButtonComponent label={'Contact Us'} onClick={handleClickContact} />}</>}
                    {isLoading ? <Animated.View style={{opacity:colorChange}}><SkeletonButton/></Animated.View> : <>{profile.BusinessLinks !== '' && <ButtonComponent label={'Our Link(s)'} onClick={handleClickLinks} />}</>}
                    {isLoading ? <Animated.View style={{opacity:colorChange}}><SkeletonButton/></Animated.View> : <>{profile.GmapsLink !== '' && <ButtonComponent label={'Our Store'} onClick={handleClickGmaps} />}</>}
                </View>
            </View>

            {/* <CategorizePage/> */}
        </View>
        {/* {showOurLinks && <OurLinks handleX={handleClickLinks} links={profile.BusinessLinks} />} */}
   </MainContainer>
  )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'stretch',
    },
    topProfile: {
        flex: 1,
        flexDirection:'column',
    },
    headProfileLeft: {
        flex: 1,
        flexDirection:'column',
    },
    headProfile: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    editProfileBtn:{
        alignContent:'space-around',
        marginLeft: 140,
    },
    openHours:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
    },
    circle :{
        marginLeft: 5,
        marginRight: 5,
    },
    profileButtons:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexWrap:'wrap',
    }
})
