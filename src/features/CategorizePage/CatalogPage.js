import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile'
import { Caption, Title1 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'

export const CatalogPage = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme)
    const navigate = useNavigation()

    // state
    const [products, setProducts] = useState([])
    const [accountId, setAccountId] = useState()
    const [refresh, setRefresh] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#849EB9'} style={{ marginLeft: 4 }}/>,
            headerRight: () => (<TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigate.navigate(ROUTE.ADD_PRODUCT)}><Entypo name="plus" size={32} color="#FED154" /></TouchableOpacity>)
        })
    })

    useEffect(() => {
        getProducts()
    }, [refresh])

    useEffect(() => {
        getProducts()
    }, [])

    // service
    const { settingAccountService} = useDep()
    const user = useSelector((state) => state.auth)

    const getProducts = async () =>{
        try {
            let id = user.accountId
            setAccountId(id)

            let response = await settingAccountService.doGetAccountProduct({
                account_id:`${id}`
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
            data: {accountId : accountId, productId : i }
        })
    }

    const restring = (str) => {
        const newStr = str.slice(0, 15)
        newStr = newStr.concat('', '...')
        return newStr
    }

    const renderItem = ({item, i}) => {
        return (
            <View>
                <View style={styles.itemCellCtn}>
                    <TouchableOpacity onPress={() => handleClickDetailProduct(item.product_id)}>
                        <View style={{backgroundColor:'#3B4046', flex: 1, justifyContent: 'center', alignItems:'center', borderRadius: 4}}>
                            <ImagesViewProfile link={item.detail_media_products[0]}/>
                            <View style={{paddingRight:12, paddingLeft:12}}>
                                <Caption text={item.product_name.length < 15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')} style={{color: '#F4F4F4', fontSize: 16}}/>
                            </View>
                            <View style={{paddingRight:12, paddingLeft:12, paddingBottom: 4}}>
                                    <Caption text={`Rp ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} style={{color: '#F4F4F4'}}/>
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
                <Title1 label={'No Product Yet'}/>
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
        alignSelf: 'stretch',
    },
    catalogCtnEmpty: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
    },
    itemCellCtn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingRight: 16, 
        paddingVertical: 8,
    },
})
