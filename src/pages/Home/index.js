import { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import Product from '../../components/Product';
import { useNavigation } from '@react-navigation/native';

import { CartContext } from '../../contexts/CartContext';

export default function Home() {
    const { cart, addItemCart } = useContext(CartContext);
    const navigation = useNavigation()
    const [products, setProducts] = useState([
        {
            id: '1',
            name: 'Coca-Cola',
            price: 19.90
        },
        {
            id: '2',
            name: 'Chocolate',
            price: 6.50
        },
        {
            id: '3',
            name: 'Queijo 500g',
            price: 15
        },
        {
            id: '4',
            name: 'Batata Frita',
            price: 23.90
        },
        {
            id: '5',
            name: 'Guarana lata',
            price: 6.00
        },
        {
            id: '6',
            name: 'Cerveja',
            price: 8.00
        },
    ])

    function handleAddCart(item) {
        addItemCart(item)
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.cartContent} >
                <Text style={styles.title} >Lista de produtos</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")} >
                    {cart.length >= 1 && (
                        <View style={styles.dot} >
                            <Text style={styles.dotText} >{cart?.length}</Text>
                        </View>
                    )}

                    <Feather name='shopping-cart' size={30} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.list}
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Product data={item} addToCart={() => handleAddCart(item)} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingEnd: 14,
        paddingStart: 14,
    },
    cartContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    dot: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
        width: 20,
        height: 20,
        borderRadius: 12,
        position: 'absolute',
        zIndex: 99,
        right: -1,
        top: -8
    },
    dotText: {
        fontSize: 12,
        color: "#FFF"
    }
});