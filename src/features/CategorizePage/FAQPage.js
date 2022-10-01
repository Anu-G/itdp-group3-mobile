import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Title2 } from '../../shared/components/Label';
import { MainContainer } from '../../shared/components/MainContainer';
import { QA } from '../../shared/components/QA';
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext';
import { checkErr } from '../../utils/CommonUtils';

export const FAQPage = ({ bisID }) => {
    const theme = useTheme()
    const styles = styling(theme)
    const { faqService } = useDep();
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        getFAQ()
    }, [])

    const getFAQ = async () => {
        try {
            const response = await faqService.doGetFAQ({
                "account_id": `${bisID}`
            })
            if (response.data.data !== null) {
                setFaq(response.data.data)
            }
        } catch (err) {
            console.log(err);
            checkErr(err)
        }
    }

    return (
        <MainContainer>
            {faq.length === 0 ?
                <View style={styles.catalogCtnEmpty}>
                    <Title2 label={'No Question(s) Yet'} />
                </View>
                :
                <View style={styles.faqCtn}>
                    {
                        faq.map((item, faqi) => {
                            return (<View key={faqi}>
                                <QA num={faqi + 1} question={item.question} answer={item.answer} />
                            </View>)
                        })
                    }
                </View>
            }
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    faqCtn: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
        alignSelf: 'stretch'
    },
    catalogCtnEmpty: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 16,
    }
})