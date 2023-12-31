import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { Session } from '../Context/SessionContext';
import { useContext } from 'react';

export default function Batsmen({ route, navigation }) {
    var players = route.params.batsmen
    var squad = route.params.selectedPlayers
    const { session } = useContext(Session)

    const addPlayer = (item) => {

        // console.log(obj)
        fetch(global.url + "/select_playing_xi_player", {
            method: "POST",
            body: JSON.stringify({ selected_player: item }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "session_id": session
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    };

    const dropPlayer = (item) => {

        // console.log(obj)
        fetch(global.url + "/drop_playing_xi_player", {
            method: "POST",
            body: JSON.stringify({ selected_player: item }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "session_id": session
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    };


    const countBatsmen = () => {
        var count = 0
        squad.forEach(player => {
            if (player.type == 'Batsman')
                count += 1
        })
        return (count)
    }





    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        navigation.navigate({ name: 'playingIX', params: { selectedPlayers: squad } })
                    }}
                >
                    <Text style={styles.text}>View Playing XI</Text>
                </TouchableOpacity>

                <View style={{ flex: 10 }}>

                    <FlatList
                        style={{}}
                        data={players}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity style={styles.tile} disabled>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={{ uri: item.picture }} style={styles.thumbnail} />
                                            <Text style={styles.text}>{item.name}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={styles.btn}
                                                onPress={() => { addPlayer(item) }}
                                            >
                                                <Text style={styles.text}>ADD</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.btn}

                                                onPress={() => { dropPlayer(item) }}
                                            >
                                                <Text style={styles.text}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 16,
        lineHeight: 42,
        fontWeight: "bold",
        textAlign: "center"
    },
    tile: {
        backgroundColor: "#006050c0",

        margin: 10,
        height: 250,
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,
        borderRadius: 10
    },
    btn: {

        backgroundColor: "#000",
        padding: 4,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 25,

        alignSelf: "center",
    },
});