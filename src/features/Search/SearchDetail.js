import React from 'react'
import { StyleSheet } from 'react-native'
import { ImagesViewProfile } from '../../shared/components/ImagesViewProfile'
import { Caption, Title2 } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'

export const SearchDetail = ({ catalogItems, handleFormOpen }) => {
    const theme = useTheme()
    const styles = styling(theme)
  return (
    <MainContainer>
        <View>
            { !catalogItems ? <View style={styles.dtlSrchCtn}>
                <Title2 label={'Keyword Not Found'}/>
            </View>
            :
            <View style={styles.dtlSrchCtn}>
                {
                    catalogItems.map(item => {
                        return (
                            <View style={styles.itemCell} key={item.key}>
                                <ImagesViewProfile link={item.detail_media_products[0]} handleClick={_ => handleFormOpen(item)}/>
                                <Title2 label={item.product_name}/>
                                <Caption text={item.price}/>
                                <Caption text={item.profile_name}/>
                            </View>
                        )
                    })
                }
            </View>
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
})