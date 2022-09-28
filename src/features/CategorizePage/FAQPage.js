import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Title2 } from '../../shared/components/Label';
import { MainContainer } from '../../shared/components/MainContainer';
import { QA } from '../../shared/components/QA';
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext';
import { checkErr } from '../../utils/CommonUtils';

export const FAQPage = ({bisID}) => {
    const theme = useTheme()
    const styles = styling(theme)
    const {faqService} = useDep();
    const [faq, setFaq] = useState([]);

    const getFAQ = async () => {
        try {
            const response = await faqService.doGetFaq({
                "account_id": `${bisID}`
            })
            if (response.data.data !==null){
                setFaq(response.data.data)
            }
        } catch (err) {
            checkErr(err)
        }
    }

    useEffect(() => {
        getFAQ()
    }, [])

  return (
    <MainContainer>
        {faq.length == 0 ?
        <View style={styles.catalogCtnEmpty}>
            <Title2 label={'No Question(s) Yet'}/>
        </View>
        :
        <View style={styles.faqCtn}>
            {
                faq.map((faq, faqi) => {
                    return <View>
                        <QA num={faqi +1} question={faq.question} answer={faq.answer}/>
                    </View>
                })
            }
        </View>
    }
    </MainContainer>
  )
}

const styling = (theme) => StyleSheet.create({
    faqCtn: {
        minHeight: 100,
        width: 300,
        padding: 16,
    },
})