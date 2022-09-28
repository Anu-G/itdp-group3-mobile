import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { CategoryLabelActive, CategoryLabelInactive } from '../../shared/components/CategoryLabel'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'
import { CatalogPage } from './CatalogPage'
import { FAQPage } from './FAQPage'
import { FeedPage } from './FeedPage'

export const CategorizePageProfile = ({bisID}) => {
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
    
  return (
   <MainContainer>
    <View style={styles.categorizePageProfile}>
        <View style={styles.categoryLabelBtnWrp}>
            <View style={styles.categoryLabelBtn} onCLick={()=> handleClick(0)}>
                {isActive[0] ? <CategoryLabelActive label={'Post'}/> : <CategoryLabelInactive label={'Post'}/>}
            </View>

            <View style={styles.categoryLabelBtn} onCLick={()=> handleClick(1)}>
                {isActive[1] ? <CategoryLabelActive label={'Catalog'}/> : <CategoryLabelInactive label={'Catalog'}/>}
            </View>

            {FAQs ?
            <View style={styles.categoryLabelBtn} onCLick={()=> handleClick(2)}>
                {isActive[2] ? <CategoryLabelActive label={'FAQ'} /> : <CategoryLabelInactive label={'FAQ'} />}
            </View> :
            ''
        }
        </View>
        {isActive[0] ? <FeedPage /> : ''}
        {isActive[1] ? <CatalogPage /> : ''}
        {isActive[2] ? <FAQPage bisID={bisID}/> : ''}
          
    </View>
   </MainContainer>
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
})
