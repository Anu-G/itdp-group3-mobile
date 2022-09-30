import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Title1, Title2 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { TimelineCard } from '../TimelineCard/TimelineCard'

export const FeedPage = ({ }) => {
    const theme = useTheme()
    const styles = styling(theme)

    // state
    const[feeds, setFeeds] = useState([])
    const [accountId, setAccountId] = useState()
    const navigate = useNavigation()
    const [detailPost, setDetailPost]= useState({
        isActive: false,
        id: 0,
    })

    const handleClosePicture = () =>{
        setDetailPost({
            isActive: false,
            id: 0
        })
    }

    const handleClickPicture = (value) => {
        window.history.pushState(null, null, `/p/${value}`)
        setDetailPost({
            isActive: true,
            id: value
        })
    }

    // service
    const {timelineService, postService} = useDep()
    const user = useSelector((state) => state.auth)

    useEffect(() => {
        handleLoad()
    }, [])

    const handleLoad = async () => {
        try {
            let id = user.accountId
            setAccountId(id)

            let response = await timelineService.doGetAccount({
                account_id:`${id}`
            })
            console.log(response.data.data);
            if (response.data.data !== null){
                setFeeds(response.data.data)
            }
        } catch (err){
            console.log(err);
            checkErr(err)
        }
    }

    const setRefresh = async (postId) => {
        try{
            const response = await postService.doGetDataById({
                "feed_id": postId,
                "page":1,
                "page_lim":1,
            })
            let refreshTimeline = [...feeds]
            let i = feeds.findIndex(val => val.post_id == parseInt(postId))
            refreshTimeline[i] = response.data.data
            setFeeds(refreshTimeline)
        } catch (err) {
            checkErr(err);
        }
    }

    // const handleClickName = (accountId) => {
    //     if (accountId == user.account_id){
    //         navigate(ROUTE.PROFILE)
    //     } else {
    //         navigate(`/account/${accountId}`)
    //     }
    // }

  return (
    <MainContainer>
        {feeds.length == 0 ?
            <View style={styles.CatalogCtn}>
                <Title1 label={'No Feeds Yet'}/>
            </View>
            :
            <View style={styles.CatalogCtnF}>
                {feeds.length !== 0 && feeds.map((item) =>{
                    let dt = new Date (item.created_at.replace('', 'T'))
                    let date = dt.getDate()
                    let month = dt.getMonth() + 1
                    let year = dt.getFullYear()
                    let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                    let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()

                    return (
                        <TimelineCard
                        avatar= {item.avatar}
                        caption={item.caption_post}
                        comments={item.detail_comment}
                        date={`${date}/${month}/${year}`}
                        links={item.detail_media_feed}
                        name={item.display_name}
                        place={item.place}
                        time={`${hour}:${minutes}`}
                        key={item.i}
                        postLikes={item.total_like}
                        detailPostLikes={item.detail_like}
                        accountId={item.account_id}
                        setRefresh={setRefresh}
                        feedId={item.post_id}
                        handleClickPicture={handleClickPicture}
                        profileStatus={true}
                        />
                    )

                })}
                </View>
                }
    </MainContainer>
  )
}

const styling = (theme) => StyleSheet.create({
    CatalogCtnF: {
        minHeight: 200,
    },
})