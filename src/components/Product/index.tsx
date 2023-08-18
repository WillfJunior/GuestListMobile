import { View , Text,TouchableOpacity} from "react-native"

import { styles } from './style'
import React = require("react");

type Props = {
    name:string;
    onRemove: () => void;
}

export const Product = ({ name , onRemove}: Props) => {

    
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity style={styles.button} onPress={onRemove}>
                    <Text style={styles.buttonText}>-</Text>
                    
                </TouchableOpacity>
        </View>
    )
}