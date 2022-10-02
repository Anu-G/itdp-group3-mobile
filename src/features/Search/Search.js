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
    const styles = styling(theme)

    // state
    const [value, setValue] = useState('');
    const [products, setProducts] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [catSelected, setCatSelected] = useState('1')
    const [keyword, setKeyword] = useState('')

    const data = [
        {key: '1', value:'Food & Beverage'},
        {key: '2', value:'Place'},
        {key: '3', value:'Wholesale'},
    ]

    const handleChange = (text) => {
        setValue(text)
    }

    // service
    const { productService, timelineService } = useDep();

    const handleSearchClick = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await productService.doGetProductSearch({
                "keyword": value
            })
            setProducts(response.data.data)
            console.log(response.data.data[0].category_id);

            console.log(value);

            setKeyword(value)
        } catch (err) {
            console.log(err);
            checkErr(err)
        } finally {
            setIsLoading(false)
        }
    }

    // TAB VIEW
    const initialLayout = {width: Dimensions.get('window').width}

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        {key: 'first', title: 'Post'},
        {key: 'second', title: 'Product'},
    ])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <TimelinePageSearch byKeyword={keyword}/>
            case 'second':
                return (
                    <>
                        <View style={{paddingTop: 16, paddingRight: 16, paddingLeft: 16, width: 200}}>
                            <SelectList 
                                placeholder='Category'
                                setSelected={setCatSelected} 
                                data={data} 
                                search={false} 
                                arrowicon={<FontAwesome name='chevron-down' size={12} color='white' style={{paddingTop: 4}}/>}
                                dropdownTextStyles={{color: 'white'}}
                                inputStyles={{color:'white'}}
                                defaultOption={{key: '1', value:'Food & Beverage'}}
                                onSelect={() => console.log(products.filter(product => product.category_id === catSelected))}
                            />
                        </View>
                        <SearchDetail catalogItems={products.filter(product => product.category_id === catSelected)}/>
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
          style={{ backgroundColor: '#1E2329', color: '#FED154', borderBottomWidth: 1, borderBottomColor: '#475264'}}
        />
    );

    return (
        <MainContainer>
            <View style={styles.categorizePageSearch}>
                <View style={styles.categorizePageList}>
                    <View style={styles.searchHd}>
                        <TextInput style={styles.input} placeholder="Search" value={value} onChangeText={handleChange}/>
                        <TouchableOpacity style={styles.btnSearch} onPress={handleSearchClick}>
                            <Foundation name='magnifying-glass' size={20} color={'#1E2329'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchCtnt}>
                        {/* <View style={styles.searchLabelCtg}>
                            <CategoryLabelActive label={'Products'} />
                        </View> */}
                        {/* <View style={styles.searchRs}>
                            <SearchDetail catalogItems={products} handleFormOpen={handleFormOpen} />
                        </View> */}
                        <TabView 
                            navigationState={{index, routes}}
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
        alignSelf:'stretch',
        margin: 16,
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


    // searchRs: {
    //     minHeight: 300,
    //     minWidth: 200,
    //     backgroundColor: '#3B4046'
    // }
})