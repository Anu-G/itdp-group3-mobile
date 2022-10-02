import { FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { store } from '../../apps/Storage'
import { MainContainer } from '../../shared/components/MainContainer'
import { PostModal } from '../../shared/components/PostModal'
import { SkeletonDetailTimelineCard } from '../../shared/components/Skeleton/SkeletonDetailTimelineCard'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { KEY } from '../../shared/constants/StoreConstants'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { TimelineDetailCard } from '../TimelineDetailCard/TimelineDetailCard'

export const TimelineDetailPage = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const route = useRoute()

    const navigate = useNavigation();
    const [timelines, setTimelines] = useState([])
    const [optionShow, setOptionShow] = useState(false)
    const [postData, setPostData] = useState({ post: {} })
    const [accountId, setAccountId] = useState()
    const [isLoading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth);

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#F4F4F4'} />
    //     })
    // }, [navigation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
        })
    }, [navigation])

    useEffect(() => {
        getTimeline()
    }, [route.params?.feed_id])

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
        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    const setRefresh = async (postId) => {
        try {
            const response = await timelineService.doGetDetailTimeline({
                feed_id: `${postId}`,
                page: 1,
                page_lim: 1,
            })
            setTimelines(prevState => [response.data.data])
        } catch (err) {
            checkErr(err);
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
                setRefresh(detailComment.feedId)
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const handleOptionShow = () => {
        setOptionShow(prevState => !prevState)
    }

    const handleClickName = (id, accType) => {
        accType === 2 ? navigate.navigate(ROUTE.BUSINESS_PROFILE, { openId: id }) : navigate.navigate(ROUTE.NON_BUSINESS_PROFILE, { openId: id })
    }

    return (
        <MainContainer>
            <View style={styles.tlBg}>
                <View style={styles.tlLst}>
                    {optionShow && <PostModal post={postData.post} handleClose={handleOptionShow} />}
                    <ScrollView>
                        {isLoading ? <SkeletonDetailTimelineCard /> :
                            timelines.map((post, i) => {
                                let dt = new Date(post.created_at.replace(' ', 'T'));
                                let date = dt.getDate()
                                let month = dt.getMonth() + 1
                                let year = dt.getFullYear()
                                let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                                let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
                                return (
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
                                        accId={user.accountId}
                                        postAccId={post.account_id}
                                        handleClickName={handleClickName}
                                        feedId={post.post_id}
                                        handleComment={handleComment}
                                        thisAccountLikes={post.detail_like.findIndex(like => like.account_id == user.accountId) != -1 ? true : false}
                                        accType={post.account_type}
                                        handleOptionShow={handleOptionShow}
                                        setPostData={setPostData}
                                        postIn={post}
                                    />
                                )
                            })
                        }
                    </ScrollView>
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