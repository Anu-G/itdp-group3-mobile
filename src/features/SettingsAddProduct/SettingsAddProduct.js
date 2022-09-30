import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { storage } from '../../apps/Storage';
import { ImageWithDeleteSign } from '../../shared/components/ImageAddCatalog';
import { InputTextActiveSmallSize } from '../../shared/components/Input';
import { TextProfile } from '../../shared/components/Label';
import { MainContainer } from '../../shared/components/MainContainer';
import { Swiper } from '../../shared/components/Swiper';
import { KEY } from '../../shared/constants/StoreConstants';
import { useDep } from '../../shared/context/DependencyContext';
import { useTheme } from '../../shared/context/ThemeContext';
import { checkErr } from '../../utils/CommonUtils';

export const SettingsAddProduct = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme)
    const { productService, productImageService } = useDep()
    const [accountId, setAccountId] = useState()
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [pickedImagePath, setPickedImagePath] = useState([])
    const [previewImagePath, setPreviewImagePath] = useState([])
    const [isCorrect, setIsCorrect] = useState(true)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <Text style={{ color: "#F4F4F4", fontSize: 16 }}>Cancel</Text>,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} onPress={saveResponse} disabled={loading}><Text style={{ color: "#FED154", fontSize: 16 }}>Send</Text></TouchableOpacity>)
        })
    }, [navigation, accountId, productName, description, price, pickedImagePath, loading])

    useEffect(() => {
        getAccountId()
    }, [])

    useEffect(()=>{
        setPreviewImagePath([])
        pickedImagePath.map((image,i) => {
            setPreviewImagePath(prevState=>[...prevState,{url:image, name: `${i + 1}/${pickedImagePath.length}`}])
        });
    }, [pickedImagePath])

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
                setPickedImagePath(prevState => [...prevState, ...result.selected.map(res => res.uri)])
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
            const response = await productService.doPostProductData({
                account_id: `${accountId}`,
                product_name: productName,
                price: price,
                description: description,
                detail_media_products: responseImage
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


    return (
        <MainContainer>
            <View style={styles.container}>
                <InputTextActiveSmallSize isCorrect={isCorrect} text={'Product Name'} value={productName} onChange={setProductName} placeholder={'ex: Grilled Mushroom with Barbeque Sauce'} />
                <InputTextActiveSmallSize isCorrect={isCorrect} text={'Price'} value={price} onChange={setPrice} placeholder={'0,00'} keyboard={'number-pad'} />
                <InputTextActiveSmallSize isCorrect={isCorrect} text={'Description'} value={description} onChange={setDescription} placeholder={'Your product description'} />
                <TextProfile text={'Image'} />
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{flex:1}}
                    style={{flex:1}} 
                    >
                    <ImageWithDeleteSign source={"plus-icon"} handleClick={showImagePicker} />
                    {pickedImagePath.length !== 0 && pickedImagePath.length === 1 ?
                        <ImageWithDeleteSign source={pickedImagePath[0]} handleClick={() => handleDeleteImage(0)} />
                        :
                        pickedImagePath.map((image, i) => <ImageWithDeleteSign source={image} handleClick={() => handleDeleteImage(i)} key={i} />)}
                </ScrollView>
                <Swiper
                    images={previewImagePath}
                    swipeBottom={e => console.log('swipe bottom: ', e)}
                    swipeTop={e => console.log('swipe top: ', e)}
                    textSize={16}
                    styleImage={{ borderRadius: 8}}
                />
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
})