import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ImagesViewSearchDetail } from '../../shared/components/ImageViewSearchDetail'
import { Caption, Title1 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { useTheme } from '../../shared/context/ThemeContext'

export const SearchDetail = ({ catalogItems }) => {
    const theme = useTheme()
    const styles = styling(theme)
    const navigate = useNavigation()

    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setProducts(catalogItems)
    }, [catalogItems])

    const handleClickDetailProduct = (i) => {
        navigate.navigate(ROUTE.DETAIL_PRODUCT, {
            data: {accountId : accountId, productId : i }
        })
    }

    const renderItem = ({item, i}) => {
        return (
            <View>
                <View style={styles.itemCellCtn}>
                    <TouchableOpacity onPress={() => handleClickDetailProduct(item.product_id)}>
                        <View style={{backgroundColor:'#3B4046', width: Dimensions.get('window').width * 0.34, height: Dimensions.get('window').height * 0.25, justifyContent: 'center', alignItems:'center', borderRadius: 4}}>
                            <ImagesViewSearchDetail link={item.detail_media_products[0]}/>
                            <View style={{paddingRight:12, paddingLeft:12}}>
                                <Caption text={item.product_name.length < 15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')} style={{color: '#F4F4F4', fontSize: 12}}/>
                            </View>
                            <View style={{paddingRight:12, paddingLeft:12, paddingBottom: 4}}>
                                    <Caption text={`Rp ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} style={{color: '#F4F4F4', fontSize: 12}}/>
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
                {products === null || products.length == 0 ?
                <View style={styles.catalogCtnEmpty}>
                    <Title1 label={'Product not found'}/>
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
    dtlSrchCtn: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
    },
    itemCell: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchDetail: {
        flex: 1,
        justifyContent: 'center',
    },
    searchDetailEmpty: {
        flex: 1,
        justifyContent: 'center',
        height: 100,
    },
    container: {
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    catalogCtnEmpty: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
    },
    itemCellCtn: {
        flex: 1,
        paddingRight: 16, 
        paddingVertical: 8,
    },
})

