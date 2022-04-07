import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

/*
[16:31] Strunevskiy, Alexander
Authorization: Basic QWwuU3RydW5ldnNraXk6 X-Gravitee-Api-Key: 77aedc3d-5a15-4965-98c1-27cc4682b96b

[16:31] Strunevskiy, Alexander
https://mfsmlbca01.x5.ru/MFSM-TEST/SM/9/rest/x5uccxaudiotemplates
https://reactnative.dev/movies.json
, headers:['X-Gravitee-Api-Key']['77aedc3d-5a15-4965-98c1-27cc4682b96b'],headers:['Access-Control-Allow-Origin']['*']
,'Access-Control-Allow-Origin':'*'
*/
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://mfsmlbca01.x5.ru/MFSM-TEST/SM/9/rest/HPCAPIIncidents?count=5&query=current.phase%3D%22%D0%92+%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B5%22', {method: 'GET', headers:{'Authorization':'Basic QWwuU3RydW5ldnNraXk6','X-Gravitee-Api-Key':'77aedc3d-5a15-4965-98c1-27cc4682b96b'}});
      const json = await response.json();
      setData(json.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    //<View></View>

    <View style={{ flex: 1, padding: 24 }}>
    {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={({ RecordID }, index) => RecordID}
        renderItem={({ item }) => (
          <Text>{item.Record.RecordID}, {item.Record.Title}</Text>
        )}
      />
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
http://msk-dpro-app615.x5.ru:13081/SM/9/rest/HPCAPIIncidents?query=hpc.record.id%3D%22IM000010325%22
{
  "@count": 1,
  "@start": 1,
  "@totalcount": 1,
  "Messages": [],
  "ResourceName": "Record",
  "ReturnCode": 0,
  "content": [{"Record": {
    "AssigneeName": "5c7ba27f0038486380b7d400",
    "Assignment": "5c7bbc680021307480e50c70",
    "ContactName": "INTEGRATION MONITORING",
    "ContactService": "INTEGRATION MONITORING",
    "CreatedTime": "2018-10-10T05:24:01+00:00",
    "Description": [
      "Spotlight has raised an alarm:",
      null,
      "Connection: msk-dpro-tst087",
      "Time: 10 October 2018 г. 14:22:51",
      "Severity: High",
      null,
      "Monitored Server - SQL Server Connection Failure: Cannot connect to SQL Server instance 'msk-dpro-tst087' : A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - The specified network name is no longer available.) : The specified network name is no longer available [64]"
    ],
    "ITService": "CI00015869",
    "InitialImpact": "4",
    "IsFailure": false,
    "IsMass": false,
    "OLABreached": false,
    "OLANextBreach": "2018-10-10T17:24:00+00:00",
    "PriorityCode": "4",
    "RecordID": "IM000010325",
    "SLABreached": false,
    "Severity": "4",
    "Status": "Закрыт",
    "Title": "Spotlight notification for msk-dpro-tst087",
    "UpdatedBy": "HP Service Manager(hpclinker1)",
    "UpdatedTime": "2018-10-11T05:31:57+00:00"
  }}]
}
*/