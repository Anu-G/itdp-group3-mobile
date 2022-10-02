import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile'
import { Caption, Title1 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'

export const CatalogPageAccount = ({ byAccount = null }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const navigate = useNavigation()

    // state
    const [products, setProducts] = useState([])
    const [accountId, setAccountId] = useState()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getProducts()
    }, [refresh])

    useEffect(() => {
        getProducts()
    }, [])

    // service
    const { settingAccountService } = useDep()
    const user = useSelector((state) => state.auth)

    const getProducts = async () => {
        try {
            let id = byAccount !== null ? byAccount : user.accountId

            let response = await settingAccountService.doGetAccountProduct({
                account_id: `${id}`
            })

            if (response.data.data !== null) {
                setProducts(response.data.data)
            }

        } catch (err) {
            console.log(err);
            checkErr(err)
        } finally {
            setRefresh(false)
        }
    }

    const handleClickDetailProduct = (i) => {
        navigate.navigate(ROUTE.DETAIL_PRODUCT, {
            data: { accountId: byAccount !== null ? byAccount : user.accountId, productId: i }
        })
    }

    const restring = (str) => {
        const newStr = str.slice(0, 15)
        newStr = newStr.concat('', '...')
        return newStr
    }

    const renderItem = ({ item, i }) => {
        return (
            <View>
                <View style={styles.itemCellCtn}>
                    <TouchableOpacity onPress={() => handleClickDetailProduct(item.product_id)}>
                        <View style={[{ 
                            // backgroundColor: theme?.state?.style?.colors?.searchBackground,
                             width: Dimensions.get('window').width * 0.39, minHeight: Dimensions.get('window').height * 0.28, 
                             justifyContent: 'center', 
                            //  alignItems: 'center', 
                             borderRadius: 4 },
                    styles.border]}>
                            <ImagesViewProfile link={item.detail_media_products[0]} />
                            <View
                             style={
                                { paddingRight: 12, paddingLeft: 12 }}
                                >
                                <Caption text={item.product_name.length < 15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')} style={{ color: theme?.state?.style?.pallete?.white, fontSize: 16, fontWeight: 'bold'}} />
                            </View>
                            <View style={{ 
                                paddingRight: 12, paddingLeft: 12,
                                 paddingBottom: 4 }}>
                                <Caption text={`Rp ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} style={{ color: theme?.state?.style?.pallete?.lightBlue }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <MainContainer>
            <View style={styles.container}>
                {products.length == 0 ?
                    <View style={styles.catalogCtnEmpty}>
                        <Title1 label={'No Product Yet'} />
                    </View>
                    :
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        numColumns={2}
                        keyExtractor={item => item.product_id}
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => setRefresh(!refresh)}
                        refreshing={refresh}
                    />
                }
            </View>
        </MainContainer>

    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    catalogCtnEmpty: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    itemCellCtn: {
        flex: 1,
        paddingRight: 16,
        paddingVertical: 8,
    },
    border:{
        borderWidth: 1,
        borderColor: theme?.pallete?.mediumBlue
    }
})