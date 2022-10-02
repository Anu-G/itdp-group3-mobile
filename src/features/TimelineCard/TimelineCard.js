import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommentExtActive } from '../../shared/components/CommentExtActive'
import { AvatarSmall } from '../../shared/components/ImageProfile'
import { Caption } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { Swiper } from '../../shared/components/Swiper'
import { checkErr } from '../../utils/CommonUtils'
import { PostModal } from '../../shared/components/PostModal'

export const TimelineCard = ({ avatar, name, place, caption, links, time, date, comments, feedId, handleComment, handleOptionShow, setPostData, postLikes, setRefresh, accId, postAccId, postIn, handleClickName, thisAccountLikes, accType, index, isHome }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)

    const maxLength = 280
    const navigation = useNavigation()
    const [isActive, setIsActive] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [isButtonSendActive, setIsButtonSendActive] = useState(false)
    const [images, setImages] = useState([])
    const [readMore, setReadMore] = useState(true)
    const { timelineService } = useDep()
    const post = {
        caption_post: caption,
        detail_media_feed: links
    }

    useEffect(() => {
        setIsLiked(thisAccountLikes)
    }, [thisAccountLikes])

    useEffect(() => {
        arrangeImagesFormat()
    }, [])

    useEffect(() => {
        if (comment.length == 0) {
            setIsButtonSendActive(false)
        } else {
            setIsButtonSendActive(true)
        }
    }, [comment])

    const handleReadMore = () => {
        setReadMore(!readMore)
    }

    const handleCommentOnClick = () => {
        navigation.navigate(ROUTE.DETAIL_TIMELINE, {
            feed_id: feedId
        })
        // setIsActive(!isActive)
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
                setRefresh(feedId)
            } else {
                await timelineService.doPostTimelineLike({
                    "account_id": `${accId}`,
                    "feed_id": `${feedId}`
                })
                setIsLiked(prevState => true)
                setRefresh(feedId)
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

    const onOptionClick = () => {
        setPostData({post:postIn})
        handleOptionShow()
    }

    return (
        <MainContainer>
            <View style={[styles.timelineCtn, isHome && index === 0 && { marginTop: 56 }]}>
                <View>
                    <View style={styles.profileHd}>
                        <View style={{ flex: 1 }}>
                            <AvatarSmall source={avatar} accId={accId} handleClick={() => handleClickName(postAccId, accType)} />
                        </View>
                        <TouchableOpacity style={{ flex: 6, alignContent: 'flex-start', justifyContent: 'center' }} onPress={() => handleClickName(postAccId, accType)}>
                            <Text style={styles.displayName}>{name}</Text>
                        </TouchableOpacity>
                        <View style={styles.optionBtn}>
                            <TouchableOpacity onPress={()=>onOptionClick()}>
                                <Ionicons name="ios-ellipsis-horizontal" size={24} color={styles.iconCOlot.color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.captionCtn}>
                    <TouchableOpacity onPress={handleCommentOnClick}>
                        <Caption text={caption} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Swiper
                        images={images}
                        swipeBottom={e => { }}
                        swipeTop={e => { }}
                        textSize={16}
                        styleImage={{ borderRadius: 8 }}
                    />
                </View>

                <View style={styles.bottonCtn}>
                    <View style={styles.bottomLikeCommentCtn}>
                        <View style={styles.bottomBtn}>
                            <TouchableOpacity onPress={handleCommentOnClick} style={{ flex: 1, flexDirection: 'row' }}>
                                <FontAwesome5 name="comment-dots" size={24} color={styles.iconCOlot.color} />
                                <View style={styles.commentCountCtn}>
                                    <Caption text={comments == null ? 0 : comments.length} style={styles.dateColor} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomBtn}>
                            <TouchableOpacity onPress={handleLike} style={{ flex: 1, flexDirection: 'row' }}>
                                {!isLiked ? <AntDesign name="hearto" size={22} color={styles.iconCOlot.color} /> : <AntDesign name="heart" size={22} color='#FE5454' />}
                                <View style={styles.likeCountCtn}>
                                    <Caption text={postLikes == null ? 0 : postLikes} style={styles.dateColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Caption text={`${date}\t\t${time}`} style={styles.dateColor} />
                    </View>
                </View>
            </View>
        </MainContainer>
    )
}


const styling = (theme) => StyleSheet.create({
    timelineCtn: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: theme?.colors?.timelineBorder,
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
    },
    iconCOlot: {
        color: theme?.pallete?.white
    },
    dateColor: {
        color: theme?.pallete.lightBlue
    },
    displayName: {
        fontFamily: 'Poppins-SemiBold',
        color: theme?.pallete?.white,
        fontSize: 16
    },
})