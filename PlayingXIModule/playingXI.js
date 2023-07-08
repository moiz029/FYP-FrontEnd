import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { Session } from "../Context/SessionContext";

export default function PlayingXI({ route, navigation }) {
  const [players, setPlayers] = useState([])
  const [playingXI, setPlayingXI] = useState([])
  const [check, setCheck] = useState(false)
  const { session } = useContext(Session)

  const getPlayingXI = () => {
    if(check){
      fetch(global.url + `/verify_franchise/${session}`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json.team)
        setPlayers(json.team)
        setPlayingXI(json.playing_xi)
        setCheck(false)
      })
      .catch(err => console.log(err))
    }
  }



  var batsmen = [];
  var bowlers = [];
  var allRounders = [];

  var selectedPlayers = route.params?.selectedPlayers;
  selectedPlayers = selectedPlayers == undefined ? [] : route.params?.selectedPlayers;

  console.log("started");
  batsmen = players.filter((player) => {
    return player.Batsman == true && player.Bowler == false;
  });
  console.log(batsmen)
  bowlers = players.filter((player) => {
    return player.Bowler == true && player.Batsman == false;
  });
  //console.log(bowlers)
  allRounders = players.filter((player) => {
    return player.Batsman == true && player.Bowler == true;
  });
  console.log(allRounders)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/stadium.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.tile2}
            onPress={() => {
              navigation.navigate("Batsmen", { batsmen, selectedPlayers });
            }}
          >
            <Image
              source={require("../assets/cricket-player.png")}
              style={styles.thumbnail2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tile2}
            onPress={() => {
              navigation.navigate("AllRounder", {
                allRounders,
                selectedPlayers,
              });
            }}
          >
            <Image
              source={require("../assets/cricket.png")}
              style={styles.thumbnail2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tile2}
            onPress={() => {
              navigation.navigate("Bowler", { bowlers, selectedPlayers });
            }}
          >
            <Image
              source={require("../assets/cricket-ball.png")}
              style={styles.thumbnail2}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 6, alignItems: "center", marginTop: 50 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setCheck(true)
              getPlayingXI()
            }}
          >
            <Text style={styles.text}>Refresh</Text>
          </TouchableOpacity>
          <FlatList
            numColumns={2}
            style={{}}
            data={playingXI}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={styles.tile}>
                  <Image
                    source={{ uri: item.picture }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  tile: {
    backgroundColor: "#006050c0",
    margin: 10,
    height: 240,
    width: 168,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tile2: {
    margin: 10,
    height: 80,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 10,
  },
  thumbnail2: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 10,
  },
});
