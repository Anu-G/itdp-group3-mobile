import { FontAwesome, Foundation } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import SelectList from 'react-native-dropdown-select-list'
import { TextInput } from 'react-native-gesture-handler'
import { TabBar, TabView } from 'react-native-tab-view'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { TimelinePageSearch } from '../TimelinePageSearch/TimelinePageSearch'
import { SearchDetail } from './SearchDetail'

export const Search = () => {
    const theme = useTheme()
    const styles = styling(theme?.state?.style)

    // state
    const [value, setValue] = useState('');
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [catSelected, setCatSelected] = useState('1')
    const [timelines, setTimelines] = useState(null)

    const data = [
        { key: '1', value: 'Food & Beverage' },
        { key: '2', value: 'Place' },
        { key: '3', value: 'Wholesale' },
    ]

    const handleChange = (text) => {
        setValue(text)
    }

    // service
    const { productService, timelineService } = useDep();

    const handleSearchClickProduct = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await productService.doGetProductSearch({
                "keyword": value
            })
            if (response.data.data !== null) {
                setProducts(response.data.data)
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.log(err);
            checkErr(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearchClickPost = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await timelineService.doGetTimelineByKeyword({
                page: 1,
                page_lim: 200,
                keyword: value
            })
            if (response.data.data !== null) {
                setTimelines(response.data.data)
            } else {
                setTimelines([]);
            }
        } catch (err) {
            checkErr(err)
        } finally {
            setIsLoading(false)
        }
    }

    // TAB VIEW
    const initialLayout = { width: Dimensions.get('window').width }

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Post' },
        { key: 'second', title: 'Product' },
    ])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <>
                        {timelines !== null && <TimelinePageSearch searchTimelines={timelines} />}
                    </>
                )
            case 'second':
                return (
                    <>
                        <View style={{ alignSelf: 'stretch', position: 'absolute', zIndex: 10, width: "100%", paddingTop: 8 }}>
                            <SelectList
                                placeholder='Category'
                                setSelected={setCatSelected}
                                data={data}
                                search={false}
                                arrowicon={<FontAwesome name='chevron-down' size={12} color={styles.textColor} style={{ paddingTop: 4 }} />}
                                dropdownTextStyles={{ color: styles.textColor }}
                                inputStyles={{ color: styles.textColor }}
                                defaultOption={{ key: '1', value: 'Food & Beverage' }}
                                boxStyles={{ backgroundColor: styles.dropDownFilter, borderWidth: 0, borderBottomWidth: 1, borderTopWidth: 1, borderRadius: 0 }}
                                dropdownStyles={{ backgroundColor: styles.dropDownFilter }}
                            />
                        </View>
                        {products !== null && <SearchDetail catalogItems={products.filter(product => product.category_id === catSelected)} />}
                    </>
                );
            default:
                return <Text>Cannot load any scene</Text>;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FED154' }}
            style={styles.backgroundColor}
            activeColor={styles.textColor}
            inactiveColor={styles.textColorInactive}
            labelStyle={{ fontWeight: 'bold' }}
        />
    );

    return (
        <MainContainer>
            <View style={styles.categorizePageSearch}>
                <View style={styles.categorizePageList}>
                    <View style={styles.searchHd}>
                        <TextInput style={styles.input} placeholder="Search" value={value} onChangeText={handleChange} />
                        <TouchableOpacity style={styles.btnSearch} onPress={index === 1 ? handleSearchClickProduct : handleSearchClickPost}>
                            <Foundation name='magnifying-glass' size={20} color={'#1E2329'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchCtnt}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={renderTabBar}
                        />
                    </View>
                </View>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    categorizePageSearch: {
        paddingTop: 16,
        flex: 1,
        alignSelf: 'stretch',
        // borderRa
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
        alignSelf: 'stretch',
        marginTop: 16,
    },

    searchLabelCtg: {
        minWidth: 192,
        maxWidth: 200,
    },

    input: {
        fontSize: 14,
        marginLeft: 10,
        width: "90%",
        color: 'white',
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
    scene: {
        flex: 1,
    },
    backgroundColor: {
        backgroundColor: theme?.colors?.backgroundColor,
        elevation: 0,
    },
    textColor: theme?.pallete?.white,
    textColorInactive: theme?.pallete?.mediumBlue,
    dropDownFilter: theme?.pallete?.dark
})