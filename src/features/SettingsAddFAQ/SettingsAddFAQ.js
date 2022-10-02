import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MainContainer } from "../../shared/components/MainContainer"
import { useTheme } from "../../shared/context/ThemeContext"
import { useEffect, useLayoutEffect, useState } from "react"
import { InputTextActive, InputTextActiveNoError, InputTextActiveSmallSize } from "../../shared/components/Input"
import { useDep } from "../../shared/context/DependencyContext"
import { useSelector } from "react-redux"
import { checkErr } from "../../utils/CommonUtils"

export const SettingsAddFAQ = ({ navigation }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const [refresh, setRefresh] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(true);
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth);

    const {faqService} = useDep();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackImage: () => <Text style={{ color: styles.iconColor.color, fontSize: 16 }}>Cancel</Text>,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} onPress={saveResponse} disabled={loading}><Text style={{ color: theme?.state?.style?.pallete?.yellow, fontSize: 16, fontWeight: "bold" }}>Add</Text></TouchableOpacity>),
        })
    },[loading])

    const saveResponse = async () => {
        setLoading(true)
        try {
            const response = await faqService.doCreateFAQ({
                "account_id":`${user.accountId}`,
                "question":question,
                "answer":answer
            })
        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainContainer>
            <View style={styles.container}>
                <InputTextActiveNoError text={'Question'} value={question} onChange={setQuestion} placeholder={'ex: How fast is the delivery time ?'} style={styles.content}/>
                <InputTextActiveNoError text={'Answer'} value={answer} onChange={setAnswer} placeholder={'ex: Around 30 minutes max'} style={styles.content} />
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        flexDirection:'column',
        width: '100%'
    },
    content:{
        marginTop:theme.spacing.m,
        marginHorizontal:theme.spacing.m,
    },
    iconColor: {
        color: theme?.pallete?.lightBlue
    }
})