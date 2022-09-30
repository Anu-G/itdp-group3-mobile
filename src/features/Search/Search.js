import { FontAwesome, Foundation } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { CategoryLabelActive } from '../../shared/components/CategoryLabel'
import { InputOnly, InputTextActiveSmallSize, SearchBar } from '../../shared/components/Input'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { DetailProductCard } from '../DetailProductCard/DetailProductCard'
import { SearchDetail } from './SearchDetail'

export const Search = () => {
    const theme = useTheme()
    const styles = styling(theme)

    // state
    const [value, setValue] = useState('');
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [isActive, setIsActive] = useState(false)

    const handleFormClose = () => {
        setIsActive(prevState => false)
        setProduct(prevState => { })
    }

    const handleFormOpen = (value) => {
        setIsActive(prevState => true)
        setProduct(prevState => value)
    }

    const handleChange = (text) => {
        setValue(text)
    }

    // service
    const { productService } = useDep();

    const handleSearchClick = async (event) => {
        event.preventDefault()
        try {
            const response = await productService.doGetProductSearch({
                "keyword": value
            })
            setProducts(prevstate => response.data.data)
        } catch (err) {
            checkErr(err)
        }
    }

    return (
        <MainContainer>
            <View style={styles.categorizePageSearch}>
                {isActive && <DetailProductCard handleClick={handleFormClose} product={product} />}
                <View style={styles.categorizePageList}>
                    <View style={styles.searchHd}>
                        <TextInput style={styles.input} placeholder="Search" value={value} onChangeText={handleChange} />
                        <TouchableOpacity style={styles.btnSearch} onPress={handleSearchClick}>
                            <Foundation name='magnifying-glass' size={20} color={'#1E2329'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchCtnt}>
                        {/* <View style={styles.searchLabelCtg}>
                            <CategoryLabelActive label={'Products'} />
                        </View> */}
                        <View style={styles.searchRs}>
                            <SearchDetail catalogItems={products} handleFormOpen={handleFormOpen} />
                        </View>
                    </View>
                </View>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    categorizePageSearch: {
        padding: 16,
        flex: 1,
    },

    categorizePageList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    btnSearch: {
        height: 20,
        width: 20,
        borderRadius: 10,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    searchCtnt: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 16,
        width: 200,
        height: 80,
    },

    searchLabelCtg: {
        minWidth: 192,
        maxWidth: 200,
    },

    input: {
        fontSize: 14,
        marginLeft: 10,
        width: "90%",
    },
    searchHd: {
        padding: 10,
        height: 40,
        borderRadius: 20,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#3B4046",
        alignItems: "center",
        justifyContent: "space-evenly",
        color: "#F4F4F4",
    },

    // searchRs: {
    //     minHeight: 300,
    //     minWidth: 200,
    //     backgroundColor: '#3B4046'
    // }
})