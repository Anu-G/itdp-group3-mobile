import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native"
import { ImageProfile } from "../../shared/components/ImageProfile"
import { Text32, Text32Yellow } from "../../shared/components/Label";
import { useTheme } from "../../shared/context/ThemeContext"
import { price } from "../../utils/CommonUtils";

export const ManageProductComponent = ({products}) => {
    const theme = useTheme();
    const styles = styling(theme)
    return(
        <View>
            {products.map((product, index)=>{
                const links = product.detail_media_products
                return(
                    <View>
                        <View>
                            {(links.length>1) ? <ImageProfile source={links[0]} style={styles.imageLink}/> : <ImageProfile source={links} style={styles.imageLink}/>}
                            <View style={styles.textContainer}>
                                <Text32 text={product.product_name.length < 20 ? product.product_name : product.product_name.slice(0, 15).concat('', '...')} style={styles.text}/>
                                <Text32Yellow text={price.format(product.price)} style={styles.text}/>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <MaterialCommunityIcons name="delete" size={24} color="black"/>
                            </View>
                            <View style={styles.button}>
                                <MaterialIcons name="edit" size={24} color="black"/>                                
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    imageLink:{

    },
    textContainer:{
        
    },
    text:{

    },
    buttonContainer:{

    },
    button:{

    }
})