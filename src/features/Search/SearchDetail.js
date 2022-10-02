import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile'
import { ImagesViewSearchDetail } from '../../shared/components/ImagesViewSearchDetail'
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

    const handleClickDetailProduct = (accountId, i) => {
        navigate.navigate(ROUTE.DETAIL_PRODUCT, {
            data: { accountId: `${accountId}`, productId: i }
        })
    }

    const renderItem = ({ item, i }) => {
        return (
            <View>
                <View style={styles.itemCellCtn}>
                    <TouchableOpacity onPress={() => handleClickDetailProduct(item.account_id, item.product_id)}>
                        <View style={{ width: (Dimensions.get('window').width - 48) / 2, height: (Dimensions.get('window').width - 32) / 2, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <ImagesViewProfile link={item.detail_media_products[0]} />
                            <Caption text={item.product_name.length < 15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')} />
                            <Caption text={`Rp ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} />
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
                        <View style={styles.imageCtn}>
                            <Image style={styles.image} source={require('../../../assets/images/not-found.png')} />
                        </View>
                        <View style={styles.textCtn}>
                            <Title1 label={'Product not found'} />
                        </View>
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
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
                    />
                }
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 48,
        paddingHorizontal: 16
    },
    catalogCtnEmpty: {
        flex: 1,
        paddingTop: 48,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    itemCellCtn: {
        flex: 1,
    },
    image: {
        width: 311,
        height: 282,
    },
    imageCtn: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    textCtn: {
        flex: 2,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})