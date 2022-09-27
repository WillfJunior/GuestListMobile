import { View , Text,TouchableOpacity} from "react-native"

import { styles } from './style'

type Props = {
    name:string;
    onRemove: () => void;
}

export const Guest = ({ name , onRemove}: Props) => {

    
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity style={styles.button} onPress={onRemove}>
                    <Text style={styles.buttonText}>-</Text>
                    
                </TouchableOpacity>
        </View>
    )
}