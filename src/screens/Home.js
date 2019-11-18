import React, { Component } from 'react';

import { View, StyleSheet, Text, Button, FlatList, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { data, filters } from '../Data'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal'
import { contains } from '../functions/Search'
import _ from 'lodash'
// import { Container } from './styles';

const { height, width } = Dimensions.get('window')

export default class screens extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullData: [],
            data: [],
            query: '',
            filters: filters,
            isModalVisible: false,
            wordsSelecteds: [],
            changeState: true,
        }
    }

    componentDidMount() {
        const fullData = data
        this.setState({
            fullData,
            data: fullData
        })
    }

    handleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    filter = () => {
        this.handleModal()
        var words = this.state.wordsSelecteds
        //Caso sejam selecionadas varias palavras
        if (this.state.wordsSelecteds.length > 1) {
            var data = []
            for(var i in words) {
                var nameSelected = words[i]
                x = _.filter(this.state.fullData, fullData => {
                    return (contains(fullData, nameSelected))
                })
                data.push(...x)
              }
            this.setState({data})
        }
        //Caso seja selecionado apenas 1 palavra
        else {
            const formatQuery = this.state.wordsSelecteds.toString()
            const data = _.filter(this.state.fullData, fullData => {
                return contains(fullData, formatQuery)
            })
            console.log(data)
            this.setState({ query: formatQuery, data })
        }
    }

    handleSelectWord = (word) => {
        console.log('ENTROU NA FUNÇÃO')
        this.state.wordsSelecteds.includes(word)
            ?
            this.setState({
                wordsSelecteds: this.state.wordsSelecteds.filter(el => el !== word)
            })
            :
            this.state.wordsSelecteds.push(word)
        this.setState({ changeState: !this.state.changeState })
    }



    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    onBackButtonPress={this.handleModal}
                    onBackdropPress={this.handleModal}
                    isVisible={this.state.isModalVisible}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 150, width: width - 50, backgroundColor: '#40bd72', alignItems: 'center', justifyContent: 'center' }}>
                            <FontIcon
                                name='store'
                                size={50}
                                color='white'
                            />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, fontFamily: 'baloo-bhai' }}>
                                Tipos de Estabelecimentos
                            </Text>
                        </View>
                        <View style={{ backgroundColor: 'white', width: width - 50, justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{ width: width - 50 }}>
                                <FlatList
                                    numColumns={this.state.filters.length / 2}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.filters}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => this.handleSelectWord(item.value)}
                                            style={[
                                                this.state.wordsSelecteds.includes(item.value)
                                                    ?
                                                    styles.selected
                                                    :
                                                    styles.notSelected
                                            ]}>
                                            <Text style={[
                                                this.state.wordsSelecteds.includes(item.value)
                                                    ?
                                                    styles.textSelected
                                                    :
                                                    styles.textNotSelected
                                            ]}>
                                                {item.value}
                                            </Text>
                                        </TouchableOpacity>}
                                />
                            </ScrollView>
                        </View>
                        <View style={{ backgroundColor: 'white', width: width - 50, height: 50, alignItems: 'flex-end', justifyContent: 'center', padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.filter()}
                                style={{ backgroundColor: '#40bd72', padding: 5, borderRadius: 15, width: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                                    Filtrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, marginLeft: 10, marginTop: 10, }}>
                    <Icon
                        name="md-menu"
                        size={30}
                    />
                </TouchableOpacity>
                <View style={styles.header}>
                    <View style={{ flex: 5, flexDirection: 'row', alignItems: 'flex-end', marginLeft: 20, marginBottom: 10 }}>
                        <Icon
                            name='md-chatbubbles'
                            size={20}
                            color='#40bd72'
                        />
                        <Text style={{ fontFamily: 'serif', fontSize: 18, marginLeft: 10 }}>
                            Estabelecimentos
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', marginRight: 20, marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.handleModal()}
                        >
                            <Icon
                                name='md-funnel'
                                size={20}
                                color={this.state.wordsSelecteds.length < 1
                                    ?
                                    'black'
                                    :
                                    '#40bd72'
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', width: width - 30, height: 80, }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={require('../../images/user.jpg')}
                                    style={{ width: 80, height: 80, borderRadius: 40 }}
                                />
                            </View>
                            <View style={{ flex: 3, borderBottomWidth: 0.5, padding: 20 }}>
                                <Text style={{ color: '#40bd72', fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                                <Text>
                                    {item.tipo}
                                </Text>
                            </View>
                        </View>

                    }
                />
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: width,
        height: 100,
    },

    selected: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#40bd72',
        backgroundColor: '#40bd72',
        padding: 10,
        marginHorizontal: 5,
        marginTop: 10
    },
    notSelected: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#40bd72',
        padding: 10,
        marginHorizontal: 5,
        marginTop: 10
    },
    textSelected: {
        color: 'white'
    },
    textNotSelected: {
        color: '#40bd72'
    }
})