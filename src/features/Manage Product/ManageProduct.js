import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux";
import { ImageProfile } from "../../shared/components/ImageProfile"
import { Text32, Text32Yellow } from "../../shared/components/Label";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useDep } from "../../shared/context/DependencyContext";
import { useTheme } from "../../shared/context/ThemeContext"
import { toPrice } from "../../utils/CommonUtils";

export const ManageProductComponent = ({ navigation }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const [products, setProducts] = useState([])
    const { productService } = useDep();
    const user = useSelector((state) => state.auth)
    const navigate = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#F4F4F4'} />
        })
    }, [navigation])

    useEffect(() => {
        getProduct()
    }, [navigation])

    const getProduct = async () => {
        try {
            const response = await productService.doGetProductByAccount({
                account_id: `${user.accountId}`
            })
            setProducts(response.data.data)
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await productService.doDeleteProductData({
                "product_id": `${id}`
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            {products.map((product, index) => {
                const links = product.detail_media_products
                return (
                    <View style={styles.listContainer} key={index}>
                        <View style={styles.productContainer}>
                            <ImageProfile source={links[0]} style={styles.imageLink} />
                            <View style={styles.textContainer}>
                                <Text32 text={product.product_name.length < 20 ? product.product_name : product.product_name.slice(0, 15).concat('', '...')} style={styles.text} />
                                <Text32Yellow text={toPrice(product.price)} style={styles.text} />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View>
                                <MaterialCommunityIcons name="delete" style={styles.button} onPress={() => handleDelete(product.product_id)} />
                            </View>
                            <View>
                                <MaterialIcons name="edit" style={styles.button} onPress={() => navigate.navigate(ROUTE.EDIT_PRODUCT, { oParams: product })} />
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        marginHorizontal: theme.spacing.m,
        marginVertical: theme?.spacing?.m
    },
    listContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 8,
        marginBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: theme?.colors?.inputBorder
    },
    productContainer: {
        flexDirection: "row",
    },
    imageLink: {

    },
    textContainer: {
        marginLeft: 8
    },
    text: {

    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        color: theme?.colors?.inputBorder,
        fontSize: 30,
        marginHorizontal: 4
    }
})