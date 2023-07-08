import { useState, useEffect } from "react"

global.url = "http://172.20.10.11:5000"

export const data = () => {
  const [data, setData] = useState([]);

  const getPlayers = async () => {
    console.log('Main Page API called..');

    fetch(global.url + "/allplayers")
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log('Error: ', err);
        console.error(err);
      })
  }

  useEffect(() => {
    getPlayers();
  }, []);

  return (data)

}
