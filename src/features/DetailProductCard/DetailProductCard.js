import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AvatarSmall } from '../../shared/components/ImageProfile'
import { Caption } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { Swiper } from '../../shared/components/Swiper'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import "intl";
import "intl/locale-data/jsonp/en";

export const DetailProductCard = ({ handleClick }) => {
    const theme = useTheme()
    const styles = styling(theme?.state?.style)
    // state
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [caption, setCaption] = useState('');
    const [links, setLinks] = useState([]);

    const [readMore, setReadMore] = useState(true)

    const navigate = useNavigation();
    const route = useRoute();
    const { productService, profileService } = useDep();
    useEffect(_ => {
        (async _ => {
            try {
                let responseProd = await productService.doGetProductByProduct({
                    account_id: route.params?.data.accountId,
                    product_id: `${route.params?.data.productId}`
                })
                let responseProfile = await profileService.doGetBusinessProfile({
                    account_id: route.params?.data.accountId
                })

                if (responseProd.data.data !== null && responseProfile.data.data !== null) {
                    setAvatar(responseProfile.data.data.business_profile.profile_image);
                    setName(responseProfile.data.data.business_profile.display_name);
                    setProductName(responseProd.data.data.product_name);
                    setProductPrice(responseProd.data.data.price);
                    setCaption(responseProd.data.data.description);
                    setLinks(responseProd.data.data.detail_media_products.map((item, i) => {
                        return { url: item, name: '' }
                    }));
                }

            } catch (err) {
                console.log(err.response.data);
            }
        })();
    }, [route.params])

    const handleClickName = (id) => {
        navigate.navigate(ROUTE.BUSINESS_PROFILE, { openId: id })
    }

    return (
        <MainContainer>
            <View style={styles.tlBg}>
                <View style={styles.tlLst}>
                    <ScrollView>
                        <View style={styles.timelineCtn}>
                            <View>
                                <View style={styles.profileHd}>
                                    <View style={{ flex: 1 }}>
                                        <AvatarSmall source={avatar}
                                            handleClick={() => handleClickName(route.params?.data.accountId)}
                                        />
                                    </View>
                                    <TouchableOpacity style={{ flex: 6, alignContent: 'flex-start', justifyContent: 'center' }}
                                        onPress={() => handleClickName(route.params?.data.accountId)}
                                    >
                                        <Text style={styles.displayName}>{name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.captionCtn}>
                                <Text style={styles.productName}>{productName}</Text>
                                <Caption text={price.format(productPrice)} />
                            </View>
                            <Swiper
                                images={links}
                                swipeBottom={e => { }}
                                swipeTop={e => { }}
                                textSize={16}
                                styleImage={{ borderRadius: 8 }}
                            />
                            <View style={styles.captionCtn}>
                                <Caption text={caption} />
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    tlBg: {
        flex: 1,
        alignSelf: 'stretch',
    },
    tlLst: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 20,
    },
    timelineCtn: {
        padding: 16,
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'column',
    },
    profileHd: {
        flex: 1,
        flexDirection: 'row',
    },
    captionCtn: {
        marginTop: 8,
        marginBottom: 8,
        marginRight: 0,
    },
    displayName: {
        fontFamily: 'Poppins-SemiBold',
        color: theme?.pallete?.white,
        fontSize: 16
    },
    productName: {
        fontFamily: 'Poppins-SemiBold',
        color: theme?.pallete?.white,
        fontSize: 14
    },
})

export const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});