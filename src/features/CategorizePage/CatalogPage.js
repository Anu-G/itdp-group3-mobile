import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile'
import { Caption, Title1 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { DetailProductCard } from '../DetailProductCard/DetailProductCard'
import { price } from '../../utils/CommonUtils'

export const CatalogPage = ({ }) => {
    const theme = useTheme()
    const styles = styling(theme)

    // state
    const [isActive, setIsActive] = useState(false)
    const [products, setProduct] = useState([])
    const [productOpen, setProductOpen] = useState({})
    const [accountId, setAccountId] = useState()
    const [refresh, setRefresh] = useState(false)

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setProductOpen(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setProductOpen(prevState => value)
    }

    // service
    const { settingAccountService} = useDep()
    const user = useSelector((state) => state.auth)

    const getProducts = async () =>{
        try {
            let id = user.accountId
            setAccountId(id)

            let response = await settingAccountService.doGetProductByProduct({
                account_id:`${id}`
            })

            if (response.data.data !== null) {
                setProduct(response.data.data)
            }

        } catch (err) {
            checkErr(err)
        }
    }

    useEffect(() => {
        getProducts()
    }, [refresh])

    useEffect(() => {
        getProducts()
    }, [])

    const restring = (str) => {
        const newStr = str.slice(0, 15)
        newStr = newStr.concat('', '...')
        return newStr
    }

  return (
    <MainContainer>
        <View style={styles.container}>
            {products.length == 0 ?
            <View style={styles.catalogCtnEmpty}>
                <Title1 label={'No Product Yet'}/>
            </View> 
            :
            <View style={styles.catalogCtn}>
                {products.length !== 0 && products.map(item => {
                    return(
                        <View style={styles.itemCellCtn}>
                            <FlatList numColumns={2} keyExtractor={item.product_id} style={styles.itemCellX}>
                                {item.detail_media_products
                                ? <ImagesViewProfile link={item.detail_media_products[0]} handleClick={_ => handleFormOpen(item)}/>
                                : <ImagesViewProfile link="" handleClick={_ => handleFormOpen(item)}/>
                            }
                            <View style={{paddingRight: 2, paddingLeft: 2}}>
                                <Caption text={item.product_name.length < 15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')}/>
                            </View>
                            <View style={{paddingRight:10, paddingLeft:10}}>
                                {/* <Caption text={price.format(item.price)}/> */}
                                 <Caption text={item.price}/>
                            </View>
                            </FlatList>
                        </View>
                     ) 
                 })}
            </View>
             }
        </View>
        {isActive && <DetailProductCard handleClick={handleFormClose} product={productOpen}/>}
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
        flexWrap: 'wrap',
        flexDirection:'row',
        justifyContent:'center',
    },
    catalogCtn: {
        width: 328,
        minHeight: 202,
        gap: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#ffffff',
    },
    itemCellCtn: {
        width: 156,
        height: 202,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    itemCellX:{
        flex:1,
        flexWrap: 'wrap',
        alignItems: 'center',
        // backgroundColor: 'grey',
    }
})
