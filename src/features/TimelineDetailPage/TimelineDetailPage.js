import { FontAwesome } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { store } from '../../apps/Storage'
import { MainContainer } from '../../shared/components/MainContainer'
import { SkeletonDetailTimelineCard } from '../../shared/components/Skeleton/SkeletonDetailTimelineCard'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { KEY } from '../../shared/constants/StoreConstants'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { TimelineDetailCard } from '../TimelineDetailCard/TimelineDetailCard'

export const TimelineDetailPage = ({navigation}) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const route = useRoute()

    const [timelines, setTimelines] = useState([])
    const [accountId, setAccountId] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#F4F4F4'}/>
        })
    }, [navigation])

    useEffect(() => {
        getTimeline()
    }, [refresh, route.params?.feed_id])

    // service
    const { timelineService } = useDep()

    const getTimeline = async () => {
        setLoading(true)
        try {            
            const response = await timelineService.doGetDetailTimeline({
                feed_id: `${route.params.feed_id}`,
                page: 1,
                page_lim: 200,
            })
            if (response.data.data !== null) {
                setTimelines(prevState => [response.data.data])
            }

            const accId = await store.getData(KEY.ACCOUNT_ID)
            setAccountId(accId)

        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    const handleComment = async (detailComment) => {
        try {
            const response = await timelineService.doPostComment({
                feed_id: `${detailComment.feedId}`,
                account_id: `${detailComment.accountId}`,
                comment_fill: detailComment.comment        
            })
            if (response.data.data !== null) {
                getTimeline()
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const handleClickName = (id) => {
        navigation.navigate(ROUTE.BUSINESS_PROFILE,{openId:id})
    }

    return (
        <KeyboardAwareScrollView
            style = {{flex:1}}
            contentContainerStyle = {{}}
            extraHeight={50}
            enableOnAndroid={true}
        >
        <MainContainer>
            <View style={styles.tlBg}>
                <View style={styles.tlLst}>
                    {timelines.map((post, i) => {
                        let dt = new Date(post.created_at.replace(' ', 'T'));
                        let date = dt.getDate()
                        let month = dt.getMonth() + 1
                        let year = dt.getFullYear()
                        let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                        let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
                        return(
                            <>
                            {isLoading ? <SkeletonDetailTimelineCard/> 
                                : 
                                <TimelineDetailCard
                                    key={i}
                                    avatar={post.avatar}
                                    caption={post.caption_post}
                                    comments={post.detail_comment}
                                    date={`${date}/${month}/${year}`}
                                    links={post.detail_media_feed}
                                    name={post.display_name}
                                    place={post.place}
                                    time={`${hour}:${minutes}`}
                                    postLikes={post.total_like}
                                    setRefresh={setRefresh}
                                    accId={accountId}
                                    postAccId={post.account_id}
                                    handleClickName={handleClickName}
                                    feedId={post.post_id}
                                    handleComment={handleComment}
                                    thisAccountLikes={post.detail_like.findIndex(like => like.account_id == accountId) != -1 ? true : false}                                            
                                />}
                            </>
                        )                        
                    })}
                </View>
            </View>
        </MainContainer>
        </KeyboardAwareScrollView>
    )
}

const styling = (theme) => StyleSheet.create({
    tlBg: {
        // padding: 2,
        flex: 1,
        alignSelf: 'stretch',
    },
    tlLst: {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 2,
        paddingLeft: 0,
        flex: 1,
        flexDirection: 'column',
        borderRadius: 20, 
    },
    ctg: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
})