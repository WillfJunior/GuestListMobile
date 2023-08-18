import { useEffect, useState } from 'react';
import { View , Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native'
import { Product } from '../../components/Product';
import { styles } from './style';
import { Produto } from '../../models/Product';
import { ProdutoCreate } from '../../models/ProductCreate';
import axios from 'axios';
import { base_ulr } from '../../services/ProductService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';



export const Home = () => {
    const [product, setProduct] = useState('')
    const [products, setProducts] = useState<Produto[]>([])

    const dataAtual = format(new Date(), "d 'de' LLLL 'de' yyyy",{
        locale:ptBR
    });

    useEffect(() => {
        axios.get<Produto[]>(base_ulr)
            .then(res => {
                setProducts(res.data)
            })
    },[setProducts])

    function handleProductChange(name:string){
        setProduct(name)
    }
    
    
    async function handleProductAdd(){
        if(product === ''){
            Alert.alert('erro', 'Favor informar um nome para o produto')
            return;
        }
        
        const { data } = await axios.post<Produto>(base_ulr,{produto: product})
        let produto = new Produto(data.produto,data.id)
        setProducts(prevState => [...prevState,produto])
        setProduct('')
    }

    function handleProductRemove(id: number, produto:string){
        Alert.alert(
            "Deletar",
            `Confirma a exclusão do Produto ${produto}`,
            [
              {
                text: "Não",
                style: "cancel"
              },
              { text: "Sim",
              onPress: () => {
                axios.delete(`${base_ulr}/${id}`).then(res => setProducts(prevState => 
                    prevState.filter(produto => produto.id !== id)))
              }
              
              }
            ]
          );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Compras</Text>
            <Text style={styles.subtitle}>{dataAtual}</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do Produto'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={text => handleProductChange(text)}
                    value={product}
                />

                <TouchableOpacity style={styles.button} onPress={handleProductAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
            
                keyExtractor={guest => guest.id.toString()}
                data={products}
                renderItem={({ item }) => (
                    <Product
                        key={item.id}
                        name={item.produto}
                        onRemove={() => handleProductRemove(item.id,item.produto)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Não há itens na Lista.
                    </Text>
                )}
            
            />
        </View>
    )
}