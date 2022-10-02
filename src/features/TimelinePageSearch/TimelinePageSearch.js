import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDep } from '../../shared/context/DependencyContext'
import { checkErr } from '../../utils/CommonUtils'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { Entypo } from '@expo/vector-icons';
import { SkeletonTimelineCard } from '../../shared/components/Skeleton/SkeletonTimelineCard'
import { useSelector } from 'react-redux'
import { Title1 } from '../../shared/components/Label'

export const TimelinePageSearch = ({ }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)

    const route = useRoute()
    const navigate = useNavigation()
    const [timelines, setTimelines] = useState([])
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()
    const user = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (byKeyword !== null) {
    //         getTimeline()            
    //     }
    // }, [])

    useEffect(() => {
        if (route.params.byKeyword) {
            getTimeline()
        }
    }, route.params)

    useEffect(() => {
        console.log("TIMELINE", timelines);
    }, [timelines])

    // service
    const { timelineService } = useDep()

    const getTimeline = async () => {
        setLoading(true)
        try {
            let response
            if (byKeyword !== null) {
                response = await timelineService.doGetTimelineByKeyword({
                    page: 1,
                    page_lim: 200,
                    keyword: byKeyword
                })
            }

            if (response.data.data !== null) {
                setTimelines(response.data.data)
            }

        } catch (err) {
            console.log(err);
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

    const handleClickName = (id, accType) => {
        accType === 2 ? navigation.navigate(ROUTE.BUSINESS_PROFILE, { openId: id }) : navigation.navigate(ROUTE.NON_BUSINESS_PROFILE, { openId: id })
    }

    const setRefresh = async (postId) => {
        try {
            // const response = await timelineService.doGetDetailTimeline({
            //     feed_id: `${postId}`,
            //     page: 1,
            //     page_lim: 1,
            // })
            // let refreshTimeline = [...timelines]
            // let i = timelines.findIndex(val => val.post_id == parseInt(postId))
            // refreshTimeline[i] = response.data.data
            // setTimelines(refreshTimeline)
        } catch (err) {
            checkErr(err);
        }
    }

    const [isTimeline, setIsTimeline] = useState(false)
    useEffect(_ => {
        if (route.name === ROUTE.TIMELINE) {
            setIsTimeline(true)
        }
    }, [route])

    return (
        <MainContainer>
            <View style={styles.tlBg}>
                <View style={styles.tlLst}>
                    <ScrollView>
                        {isLoading
                            ?
                            <>
                                <View style={isTimeline && { marginTop: 56 }}>
                                    <SkeletonTimelineCard />
                                </View>
                                <SkeletonTimelineCard />
                                <SkeletonTimelineCard />
                            </>
                            :
                            timelines.length === 0 ?
                            <View>
                                <Title1 label={'Post not found'}/>
                            </View>
                            :
                            <>
                                {timelines.map((post, i) => {
                                    let dt = new Date(post.created_at.replace(' ', 'T'));
                                    let date = dt.getDate()
                                    let month = dt.getMonth() + 1
                                    let year = dt.getFullYear()
                                    let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                                    let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
                                    return (
                                        <TimelineCard
                                            key={i}
                                            index={i}
                                            isHome={isTimeline}
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
                                            accId={user.accountId}
                                            postAccId={post.account_id}
                                            handleClickName={handleClickName}
                                            feedId={post.post_id}
                                            handleComment={handleComment}
                                            thisAccountLikes={post.detail_like.findIndex(like => like.account_id == user.accountId) != -1 ? true : false}
                                            accType={post.account_type}
                                        />
                                    )
                                })}
                            </>
                        }
                    </ScrollView>
                </View>
            </View>
        </MainContainer >
    )
}

const styling = (theme) => StyleSheet.create({
    tlBg: {
        // padding: 2,
        flex: 1,
        alignSelf: 'stretch',
    },
    tlLst: {
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