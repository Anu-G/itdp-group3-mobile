import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommentExtActive } from '../../shared/components/CommentExtActive'
import { AvatarSmall } from '../../shared/components/ImageProfile'
import { Caption } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { Swiper } from '../../shared/components/Swiper'
import { useSelector } from 'react-redux'

export const TimelineDetailCard = ({ avatar, name, place, caption, links, time, date, comments, feedId, handleComment, postLikes, setRefresh, accId, postAccId, handleClickName, thisAccountLikes }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)

    const maxLength = 280
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [isButtonSendActive, setIsButtonSendActive] = useState(false)
    const [readMore, setReadMore] = useState(true)
    const [images, setImages] = useState([])
    const { timelineService } = useDep()
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        setIsLiked(thisAccountLikes)
    }, [thisAccountLikes])

    useEffect(() => {
        if (comment.length == 0) {
            setIsButtonSendActive(false)
        } else {
            setIsButtonSendActive(true)
        }
    }, [comment])

    useEffect(() => {
        arrangeImagesFormat()
    }, [])

    const handleReadMore = () => {
        setReadMore(!readMore)
    }

    const handleCommentChange = (event) => {
        setComment(event)
    }

    const handleOnClickSend = () => {
        handleComment({
            feedId: feedId,
            accountId: accId,
            comment: comment
        })
        setComment('')
        // console.log('ceritanya send')
    }

    const handleLike = async () => {
        try {
            if (isLiked) {
                await timelineService.doDeleteTimelineLike({
                    "account_id": `${accId}`,
                    "feed_id": `${feedId}`
                })
                setIsLiked(prevState => false)
                setRefresh(prevState => !prevState)
            } else {
                await timelineService.doPostTimelineLike({
                    "account_id": `${accId}`,
                    "feed_id": `${feedId}`
                })
                setIsLiked(prevState => true)
                setRefresh(prevState => !prevState)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const arrangeImagesFormat = () => {
        setImages(links.map((item, i) => {
            return { url: item, name: `${i + 1}/${links.length}` }
        }))
    }

    return (
        <MainContainer>
            <View style={styles.timelineCtn}>
                <View>
                    <View style={styles.profileHd}>
                        <View style={{ flex: 1 }}>
                            <AvatarSmall source={avatar} accId={accId} handleClick={() => handleClickName(postAccId)} />
                        </View>
                        <TouchableOpacity style={{ flex: 6, alignContent: 'flex-start', justifyContent: 'center' }} onPress={() => handleClickName(postAccId)}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#F4F4F4', fontSize: 16 }}>{name}</Text>
                        </TouchableOpacity>
                        <View style={styles.optionBtn}>
                            <TouchableOpacity>
                                <Ionicons name="ios-ellipsis-horizontal" size={24} color='#F4F4F4' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.captionCtn}>
                    <Caption text={caption} />
                </View>

                <View>
                    <Swiper
                        imageWidth={380}
                        imageHeight={218}
                        images={images}
                        swipeBottom={e => { }}
                        swipeTop={e => { }}
                        textSize={16}
                    />
                </View>

                <View style={styles.bottonCtn}>
                    <View style={styles.bottomLikeCommentCtn}>
                        <View style={styles.bottomBtn}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <FontAwesome5 name="comment-dots" size={24} color='#F4F4F4' />
                                <View style={styles.commentCountCtn}>
                                    <Caption text={comments == null ? 0 : comments.length} style={{ color: '#849EB9' }} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.bottomBtn}>
                            <TouchableOpacity onPress={handleLike} style={{ flex: 1, flexDirection: 'row' }}>
                                {!isLiked ? <AntDesign name="hearto" size={22} color='#F4F4F4' /> : <AntDesign name="heart" size={22} color='#FE5454' />}
                                <View style={styles.likeCountCtn}>
                                    <Caption text={postLikes == null ? 0 : postLikes} style={{ color: '#849EB9' }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Caption text={`${date}\t${time}`} style={{ color: '#849EB9' }} />
                    </View>
                </View>

                <View style={{ alignSelf: 'stretch' }}>
                    <CommentExtActive comments={comments} handleCommentChange={handleCommentChange} value={comment} isButtonSendActive={isButtonSendActive} buttonLabel={'Send'} handleOnClickSend={handleOnClickSend} charLength={comment.length} maxLength={280} avatar={profile.profileImage} />
                </View>
            </View>
        </MainContainer>
    )
}


const styling = (theme) => StyleSheet.create({
    timelineCtn: {
        padding: 16,
        borderWidth: 1,
        borderBottomColor: '#1E2329',
        borderStyle: 'solid',
        alignSelf: 'stretch',

        flex: 1,
        flexDirection: 'column',
    },
    optionBtn: {
        marginLeft: 0,
        alignItems: 'flex-end',
        flex: 1
    },
    profileHd: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomBtn: {
        alignItems: 'center',
        marginRight: 12
    },
    bottonCtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    bottomLikeCommentCtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    captionCtn: {
        marginTop: 8,
        marginBottom: 8,
        marginRight: 0,
    },
    commentCountCtn: {
        opacity: 0.8,
        marginLeft: 4
    },
    likeCountCtn: {
        opacity: 0.8,
        marginLeft: 4
    },
    xBtn: {
        width: 28,
        height: 32,
        marginLeft: 0,
        color: '#FE5454',
    },
    rightBtnCtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'orange'
    }
})