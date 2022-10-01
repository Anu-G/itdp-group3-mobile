import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { useSelector } from 'react-redux'
import { CategoryLabelActive, CategoryLabelInactive } from '../../shared/components/CategoryLabel'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'
import { TimelinePage } from '../TimelinePage/TimelinePage'
import { CatalogPage } from './CatalogPage'
import { CatalogPageAccount } from './CatalogPageAccount'
import { FAQPage } from './FAQPage'
import { FeedPage } from './FeedPage'

export const CategorizePageProfile = ({ bisID }) => {
    const theme = useTheme()
    const styles = styling(theme)
    // state
    const [isActive, setIsActive] = useState([false, false, false])
    const [accountId, setAccountId] = useState()

    const handleClick = (page) => {
        switch (page) {
            case 1:
                setIsActive([false, true, false])
                break;
            case 2:
                setIsActive([false, false, true])
                break;
            default:
                setIsActive([true, false, false])
                break;
        }
    }

    useEffect(() => {
        handleClick()
    }, [])

    // service
    const user = useSelector((state) => state.auth)

    const FAQs = [
        {
            key: 1,
            question: 'What is something that you learned from simply watching a stranger?',
            answer: `I haven't bailed on writing. Look, I'm generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again!`
        },
        {
            key: 2,
            question: `What is something that has had a big impact on your that you ;observed from afar?`,
            answer: `It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.`
        },
        {
            key: 3,
            question: `What's your good luck charm?`,
            answer: `Yes in but got you more nothing less good bubble word knock out balloon.`
        }
    ]

    // const PostPage = () => (
    //     <FeedPage/>
    // )

    // const CatalogPage = () => (
    //     <CatalogPage bisID={`${user.accountId}`}/>
    // )

    // const FAQPage = () => (
    //     <FAQPage/>
    // )

    // TABVIEW
    const initialLayout = { width: Dimensions.get('window').width }

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Post' },
        { key: 'second', title: 'Catalog' },
        { key: 'third', title: 'FAQ' },
    ])

    // const renderScene = SceneMap({
    //     first: PostPage,
    //     second: CatalogPage,
    //     third: FAQPage
    // })

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <TimelinePage byAccount={`${user.accountId}`} />;
            case 'second':
                return <CatalogPageAccount />
            case 'third':
                return <FAQPage bisID={`${user.accountId}`} />;
            default:
                return <Text>Cannot load any scene</Text>;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FED154' }}
            style={[{ backgroundColor: '#1E2329', color: '#FED154' }, styles.backgroundColor]}
            activeColor={styles.textColor}
            inactiveColor={styles.textColorInactive}
            />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
        />
    )
}

const styling = (theme) => StyleSheet.create({
    categorizePageProfile: {
        padding: 16,
    },

    categoryLabelBtn: {
        width: 100,
    },

    categoryLabelBtnWrp: {
        width: 400,
        flex: 1,
        flexDirection: 'row'
    },

    scene: {
        flex: 1,
    },
    backgroundColor:{
        backgroundColor: theme?.colors?.backgroundColor,
        fontWeight: 'bold',
        // borderBottomColor: theme?.pallete?.lightBlue,
        // borderBottomWidth: 1
    },
    textColor:{
        color: theme?.pallete?.white
    },
    textColorInactive:{
        color: theme?.pallete?.mediumBlue
    }
})
