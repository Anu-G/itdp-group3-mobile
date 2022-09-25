import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useDep } from '../../shared/context/DependencyContext'
import { checkErr } from '../../utils/CommonUtils'
import { store } from '../../apps/Storage'
import { KEY } from '../../shared/constants/StoreConstants'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { Entypo } from '@expo/vector-icons';
import { SkeletonTimelineCard } from '../../shared/components/Skeleton/SkeletonTimelineCard'

export const TimelinePage = () => {
    const theme = useTheme()
    const styles = styling(theme.state.style)

    const route = useRoute()
    const navigate = useNavigation()
    const [timelines, setTimelines] = useState([])
    const [accountId, setAccountId] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getTimeline()
    }, [refresh, route.params?.refresh])

    // service
    const { timelineService } = useDep()

    const getTimeline = async () => {
        setLoading(true)
        try {            
            const response = await timelineService.doGetTimeline({
                page: 1,
                page_lim: 200
            })
            if (response.data.data !== null) {
                setTimelines(response.data.data)
            }
            const accId = await store.getData(KEY.ACCOUNT_ID)
            setAccountId(accId)

        } catch (err) {
            checkErr(err)
        } finally {
            console.log(timelines);
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
        if (id === accountId) {
            console.log(`PAGE PROFILE ID ${id}`);
            // navigate.navigate(ROUTE.PROFILE)
        } else {
            console.log(`PAGE PROFILE ID ${id}`);
            // navigate.navigate()
        }
    }

    return (
        <MainContainer>
            <View style={styles.tlBg}>
                <View style={styles.tlLst}>
                    <ScrollView>
                    { isLoading 
                        ? 
                            <>
                                <SkeletonTimelineCard/>
                                <SkeletonTimelineCard/>
                                <SkeletonTimelineCard/>
                            </>
                        :
                            <>
                                {timelines.map((post, i) => {
                                    let dt = new Date(post.created_at.replace(' ', 'T'));
                                    let date = dt.getDate()
                                    let month = dt.getMonth() + 1
                                    let year = dt.getFullYear()
                                    let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                                    let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
                                    return(
                                        <TimelineCard
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
                                        />
                                    )                        
                                })}
                            </>
                    }
                    </ScrollView>
                    <TouchableOpacity onPress={() => navigate.navigate(ROUTE.ADD_POST)} style={{zIndex: 101, position: 'absolute', justifyContent: 'flex-end', right: 20, bottom: 16}}>
                        <View style={{width: 56, height: 56, borderRadius: 28, backgroundColor: '#FED154', justifyContent: 'center', alignItems: 'center'}}>
                            <Entypo name="plus" size={40} color="#849EB9" />                    
                        </View>                            
                    </TouchableOpacity>                        
                </View>
            </View>
        </MainContainer>
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