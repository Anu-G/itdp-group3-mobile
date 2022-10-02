import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDep } from '../../shared/context/DependencyContext'
import { checkErr } from '../../utils/CommonUtils'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'
import { TimelineCard } from '../TimelineCard/TimelineCard'
import { Entypo } from '@expo/vector-icons';
import { SkeletonTimelineCard } from '../../shared/components/Skeleton/SkeletonTimelineCard'
import { useSelector } from 'react-redux'
import { PostModal } from '../../shared/components/PostModal'
import { Title1 } from '../../shared/components/Label'

export const TimelinePageSearch = ({ searchTimelines }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)

    const route = useRoute()
    const navigate = useNavigation()
    const [timelines, setTimelines] = useState(searchTimelines)
    const [optionShow, setOptionShow] = useState(false)
    const [postData, setPostData] = useState({ post: {} })
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()
    const user = useSelector((state) => state.auth);

    useEffect(_ => {
        setTimelines(searchTimelines);
    }, [searchTimelines])

    // service
    const { timelineService } = useDep()

    const handleClickName = (id, accType) => {
        accType === 2 ? navigation.navigate(ROUTE.BUSINESS_PROFILE, { openId: id }) : navigation.navigate(ROUTE.NON_BUSINESS_PROFILE, { openId: id })
    }

    const setRefresh = async (postId) => {
        try {
            const response = await timelineService.doGetDetailTimeline({
                feed_id: `${postId}`,
                page: 1,
                page_lim: 1,
            })
            let refreshTimeline = [...timelines]
            let i = timelines.findIndex(val => val.post_id == parseInt(postId))
            refreshTimeline[i] = response.data.data
            setTimelines(refreshTimeline)
        } catch (err) {
            checkErr(err);
        }
    }

    const handleOptionShow = () => {
        setOptionShow(prevState => !prevState)
    }

    return (
        <MainContainer>
            <View style={styles.tlBg}>
                <View style={styles.tlLst}>
                    {optionShow && <PostModal post={postData.post} handleClose={handleOptionShow} />}
                    <ScrollView>
                        {isLoading
                            ?
                            <>
                                <SkeletonTimelineCard />
                                <SkeletonTimelineCard />
                                <SkeletonTimelineCard />
                            </>
                            :
                            <>
                                {timelines.length == 0 ?
                                    <View style={styles.catalogCtnEmpty}>
                                        <View style={styles.imageCtn}>
                                            <Image style={styles.image} source={require('../../../assets/images/not-found.png')} />
                                        </View>
                                        <View style={styles.textCtn}>
                                            <Title1 label={'Post not found'} />
                                        </View>
                                    </View> :
                                    timelines.map((post, i) => {
                                        let dt = new Date(post.created_at.replace(' ', 'T'));
                                        let date = dt.getDate()
                                        let month = dt.getMonth() + 1
                                        let year = dt.getFullYear()
                                        let hour = (dt.getHours() < 10 ? '0' : '') + dt.getHours()
                                        let minutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
                                        return (
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
                                                accId={user.accountId}
                                                postAccId={post.account_id}
                                                handleClickName={handleClickName}
                                                feedId={post.post_id}
                                                handleOptionShow={handleOptionShow}
                                                setPostData={setPostData}
                                                postIn={post}
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
        // paddingTop: 48,
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
    catalogCtnEmpty: {
        flex: 1,
        paddingTop: 48,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    image: {
        width: 311,
        height: 282,
    },
    imageCtn: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    textCtn: {
        flex: 2,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})