import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Caption, CaptionColor, Title2 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons'
import { ButtonComponent } from '../../shared/components/Button'

export const NonBusinessProfile = () => {
    const theme = useTheme()
    const styles = styling(theme)

    // state
    const [profile, setProfile] = useState({
        ProfileImage: '',
        ProfileBio: '',
        DisplayName: '',
     })

    const [accountId, setAccountId] = useState()
    const user = useSelector((state) => state.auth);

    // service
    const { profileService} = useDep()

    useEffect(() => {
        getUser()
    }, [profile])

    const getUser = async () => {
        try {
            let id = user.accountId
            setAccountId(id)

            let response = await profileService.doGetNonBusinessProfile({
                account_id:`${id}`
            })

            setProfile(prevState => ({
                ...prevState,
                ProfileImage: response.data.data.non_business_profile.profile_image,
                ProfileBio: response.data.data.non_business_profile.profile_bio,
                DisplayName: response.data.data.non_business_profile.display_name,
             }))
        } catch (err) {
            checkErr(err)
        }
    }

  return (
   <MainContainer>
        <View style={styles.container}>
            <View style={styles.topProfile}>
                <View style={styles.headProfileLeft}>
                    {profile.ProfileImage !== '' && <Image source={{ uri: profile.ProfileImage }} style={{ width: 64, height: 64, borderRadius: 32, marginBottom: 8 }} />}
                    <Title2 label={profile.DisplayName}/>
                    <Caption text={profile.ProfileBio}/>
                </View>
            </View>
        </View>
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
})
