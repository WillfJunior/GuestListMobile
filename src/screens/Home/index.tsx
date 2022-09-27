import { useState } from 'react';
import { View , Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native'
import { Guest } from '../../components/Guest';
import { styles } from './style';



export const Home = () => {
    const [guest, setGuest] = useState('')
    const [guests, setGuests] = useState<string[]>([])

    function handleGuestChange(name:string){
        setGuest(name)
    }

    function handleGuestAdd(){
        if(guest === ''){
            Alert.alert('erro', 'Favor informar um nome para o convidado')
            return;
        }
        setGuests(prevState => [...prevState,guest ])
        setGuest('')
    }

    function handleGuestRemove(name: string){
        console.log(name)
        Alert.alert(
            "Deletar",
            `Confirma a exclusão do convidado ${name}`,
            [
              {
                text: "Não",
                style: "cancel"
              },
              { text: "Sim", 
              onPress: () => 
              setGuests(prevState => prevState.filter(guest => guest !== name)) 
              }
            ]
          );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Niver Will</Text>
            <Text style={styles.subtitle}>Sábado, 05 de Novembro de 2022</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do Convidado'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={text => handleGuestChange(text)}
                    value={guest}
                />

                <TouchableOpacity style={styles.button} onPress={handleGuestAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
            
                keyExtractor={guest => guest}
                data={guests}
                renderItem={({ item }) => (
                    <Guest
                        key={item}
                        name={item}
                        onRemove={() => handleGuestRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ainda não tem convidados na lista.
                    </Text>
                )}
            
            />
        </View>
    )
}