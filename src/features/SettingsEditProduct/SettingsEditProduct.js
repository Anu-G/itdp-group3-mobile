import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ImageWithDeleteSign } from '../../shared/components/ImageAddCatalog';
import { InputTextActiveSmallSize } from '../../shared/components/Input';
import { TextProfile } from '../../shared/components/Label';
import { MainContainer } from '../../shared/components/MainContainer';
import { useDep } from '../../shared/context/DependencyContext';
import { useTheme } from '../../shared/context/ThemeContext';
import { checkErr } from '../../utils/CommonUtils';

export const SettingsEditProduct = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme)
    const route = useRoute()
    const { oParams } = route.params
    const { productService, productImageService } = useDep()
    const [accountId, setAccountId] = useState()
    const [productName, setProductName] = useState(oParams.product_name)
    const [description, setDescription] = useState(oParams.description)
    const [price, setPrice] = useState(oParams.price)
    const [pickedImagePath, setPickedImagePath] = useState([...oParams.detail_media_products])
    const [isCorrect, setIsCorrect] = useState(true)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <Text style={{ color: styles.iconColor.color, fontSize: 16 }}>Cancel</Text>,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} onPress={saveResponse} disabled={loading}><Text style={{ color: theme?.state?.style?.pallete?.yellow, fontSize: 16, fontWeight: "bold" }}>Send</Text></TouchableOpacity>)
        })
    }, [navigation, accountId, productName, description, price, pickedImagePath, loading])

    useEffect(() => {
        getAccountId()
    }, [])

    const getAccountId = async () => {
        try {
            let id = user.accountId
            setAccountId(id)
        } catch (err) {
            checkErr(err)
        }
    }

    const showImagePicker = async () => {
        try {
            if (pickedImagePath.length < 15) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsMultipleSelection: true,
                    selectionLimit: 4,
                    aspect: [1, 1],
                    quality: 1,
                });

                if (!result.cancelled) {
                    if (result.uri) {
                        setPickedImagePath(prevState => [...prevState, result.uri])
                        return
                    }
                    setPickedImagePath(prevState => result.selected.map(res => res.uri))
                }
            }
        } catch (err) {
            checkErr(err)
        }
    }

    const handleDeleteImage = (index) => {
        setPickedImagePath(prevState => pickedImagePath.filter((_, i) => i !== index))
    }

    const saveResponse = async () => {
        setLoading(true)
        try {
            const responseImage = await productImageService.doPostProductImage(pickedImagePath)
            const response = await productService.doUpdateProductData({
                "product_id": `${oParams.product_id}`,
                "product_name": productName,
                "price": `${price}`,
                "description": description,
                "detail_media_products": pickedImagePath
            })
            if (response.status === 200) {
                console.log("success upload product data");
            }
        } catch (err) {
            checkErr(err)
        } finally {
            setLoading(false)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.itemCellCtn}>
                    <TouchableOpacity onPress={() => handleClickDetailProduct(item.product_id)}>
                        <View style={{ backgroundColor: '#3B4046', width: Dimensions.get('window').width * 0.39, height: Dimensions.get('window').height * 0.28, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            <ImagesViewProfile link={item.detail_media_products[0]} />
                            <View style={{ paddingRight: 12, paddingLeft: 12 }}>
                                <Caption text={item.product_name.length < 15 ? item.product_name : item.product_name.slice(0, 15).concat('', '...')} style={{ color: '#F4F4F4', fontSize: 16 }} />
                            </View>
                            <View style={{ paddingRight: 12, paddingLeft: 12, paddingBottom: 4 }}>
                                <Caption text={`Rp ${item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} style={{ color: '#F4F4F4' }} />
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
                <InputTextActiveSmallSize isCorrect={isCorrect} text={'Product Name'} value={productName} onChange={setProductName} placeholder={'ex: Grilled Mushroom with Barbeque Sauce'} />
                <InputTextActiveSmallSize isCorrect={isCorrect} text={'Price'} value={price} onChange={setPrice} placeholder={'0,00'} keyboard={'number-pad'} />
                <InputTextActiveSmallSize isCorrect={isCorrect} text={'Description'} value={description} onChange={setDescription} placeholder={'Your product description'} />
                <TextProfile text={'Image'} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <ImageWithDeleteSign source={"plus-icon"} handleClick={showImagePicker} />
                    {pickedImagePath.length !== 0 && pickedImagePath.length === 1 ?
                        <ImageWithDeleteSign source={pickedImagePath[0]} handleClick={() => handleDeleteImage(0)} />
                        :
                        pickedImagePath.map((image, i) => <ImageWithDeleteSign source={image} handleClick={() => handleDeleteImage(i)} key={i} />)}
                </View>
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
    iconColor: {
        color: theme?.pallete?.lightBlue
    }
})