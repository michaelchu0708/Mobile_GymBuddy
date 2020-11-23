import React from "react";
import { Alert, View, Text, SafeAreaView } from "react-native";
import { useRef, useState, useEffect } from "react";

//react native
import {
  Dimensions,
  PanResponder,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

//picker
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

//Expo
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as Font from "expo-font";

//Tensorflow
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";

import Svg, { Polyline } from "react-native-svg";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import Dialog from "react-native-dialog";

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;
const examplePath = [
  { x: 10, y: 10 },
  { x: 17, y: 45 },
];

const options = {
  container: {
    backgroundColor: "#111111",
    padding: 5,
    borderRadius: 5,
    width: 220,
    borderColor: "#111111",
    borderWidth: 3,
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    marginLeft: 7,
  },
};

let test_score_1 = 0;
let test_score = 0;

const WorkoutScreen = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [timerStart, settimerStart] = useState(false);
  const [stopwatchStart, setstopwatchStart] = useState(false);
  const [totalDuration, settotalDuration] = useState(90000);
  const [timerReset, settimerReset] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(false);
  const [predictionFound, setPredictionFound] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [pressed, setpressed] = useState(false);
  //Tensorflow and Permissions
  const [MLModel, setMLModel] = useState(null);
  const [frameworkReady, setFrameworkReady] = useState(false);
  const [time_, settime_] = useState("");
  const [start_record, setstart_record] = useState(false);

  const [ended, setEnded] = useState(false);
  const [final_score, setfinal_score] = useState(0);
  const [visible, setVisible] = useState(false);

  /*
  //if adding more languages, map codes from this list:
  // https://cloud.google.com/translate/docs/languages
  const availableLanguages = [
    { label: 'Hebrew', value: 'he' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Mandarin Chinese', value: 'zh' }
  ];
  const GoogleTranslateAPI = "https://translation.googleapis.com/language/translate/v2";
  const GoogleAPIKey = "AIzaSyDP63u3ionKo4rjXUODHEpZAT8Rjwat1xx";
  */

  //TF Camera Decorator
  const TensorCamera = cameraWithTensors(Camera);

  //RAF ID
  let requestAnimationFrameId = 0;

  //performance hacks (Platform dependent)
  const textureDims =
    Platform.OS === "ios"
      ? { width: 1080, height: 1920 }
      : { width: 1080, height: 1200 };
  const tensorDims = { width: 152, height: 200 };

  const [path, setPath] = useState(examplePath);

  useEffect(() => {
    if (!frameworkReady) {
      (async () => {
        await Font.loadAsync({
          "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
        });
        //check permissions
        const { status } = await Camera.requestPermissionsAsync();
        console.log(`permissions status: ${status}`);
        setHasPermission(status === "granted");

        //we must always wait for the Tensorflow API to be ready before any TF operation...
        await tf.ready();

        //load the mobilenet model and save it in state
        //setMLModel(await loadMLModel());
        setMLModel(await posenet.load());
        console.log(setMLModel);
        console.log(`Ready Ready Ready`);
        setFrameworkReady(true);
      })();
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  const loadMLModel = async () => {
    const model = await mobilenet.load();
    return model;
  };

  const GesturePath = ({ path, color }) => {
    const { width, height } = Dimensions.get("window");
    //console.log(`Path.map before:\n${path.x}`);
    const points = path.map((p) => `${p.x},${p.y}`).join(" ");
    return (
      <Svg
        style={{ zIndex: 2000 }}
        height="100%"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Polyline points={points} fill="white" stroke="white" strokeWidth="3" />
      </Svg>
    );
  };
  const GestureRecorder = ({ onPathChanged }) => {
    const pathRef = useRef([]);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pathRef.current = [];
        },
        onPanResponderMove: (event) => {
          pathRef.current.push({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
          // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
          onPathChanged([...pathRef.current]);
        },
        onPanResponderRelease: () => {
          onPathChanged([...pathRef.current]);
        },
      })
    ).current;

    return <View {...panResponder.panHandlers} />;
  };

  const onScreenChange = async () => {
    return (
      <View style={{ flex: 0 }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 10.0,
            top: 10.0,
            width: 100,
            height: 100,
            borderWidth: 10,
            borderColor: "#FFFFFF",
            zIndex: 2000,
          }}
        />
      </View>
    );
  };

  const getPrediction = async (tensor) => {
    if (!tensor) {
      return;
    }

    //topk set to 1
    const prediction = await MLModel.estimateMultiplePoses(tensor);
    //onScreenChange();
    console.log(`prediction: ${JSON.stringify(prediction)}`);
    //setResult(prediction);
    //console.log(`prediction:\n${prediction}\n`);
    //

    if (!prediction || prediction.length === 0) {
      return;
    }
    return prediction;
    //only attempt translation when confidence is higher than 20%
    /*
      if(prediction[0].probability > 0.3) {

        //stop looping!
        cancelAnimationFrame(requestAnimationFrameId);
        setPredictionFound(true);

        //get translation!
        await getTranslation(prediction[0].className);
      }
    */
  };
  const handleCameraStream = (imageAsTensors) => {
    let test_score = 0;
    let loop_count = 0;
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;
      const test = await getPrediction(nextImageTensor);
      if (test != undefined && test[0]["score"] >= 0.3) {
        test_score =
          (test[0]["score"] + test_score * loop_count) / (loop_count + 1);
        test_score_1 = test_score;
        loop_count++;
        console.log(`!!!!!\nScore: ${test_score}!!!!\n!!!!!!`);
      }

      //printing nose position
      /*
      if(test != undefined && test[0]['score'] >= 0.6) console.log(`haha\n ${test[0]['keypoints'][0].position.x}`);
      */
      //5 7 = leftshoulder + leftelbow
      requestAnimationFrameId = requestAnimationFrame(loop);
      /*
      if (test != undefined && test[0]['score'] >= 0.6) {setPath(  [{ x: test[0]['keypoints'][5].position.x+180, y: test[0]['keypoints'][5].position.y+175 },
                      { x: test[0]['keypoints'][7].position.x+180, y: test[0]['keypoints'][7].position.y+175 }]);}
                      */
    };
    const setup = async () => {
      await setPath([
        { x: 15, y: 15 },
        { x: 20, y: 25 },
      ]);
    };
    if (!predictionFound) {
      //setup();
      loop();
    } else {
      console.log(`!!!!!\nScoresdfzcxcxxcvx: ${test_score_1}!!!!\n!!!!!!`);
      setfinal_score(Number(test_score_1).toFixed(2));
      console.log(`logged: ${test_score_1 * 100}`);
    }
  };

  const toggleStopwatch = () => {
    if (stopwatchStart) {
      cancelAnimationFrame(requestAnimationFrameId);
      resetStopwatch();

      setPredictionFound(true);
      showDialog();
    }

    setstopwatchStart(!stopwatchStart);
    setstopwatchReset(false);
  };

  const resetStopwatch = () => {
    setstopwatchStart(false);
    setPredictionFound(false);
    setstopwatchReset(true);
  };

  const getFormattedTime = (time) => {
    //currentTime = time;
    if (!stopwatchStart) settime_(time);
    //settime_(time);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    resetStopwatch();
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    resetStopwatch();
    setVisible(false);
  };

  const renderCameraView = () => {
    return (
      <View style={styles.cameraView}>
        <TensorCamera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          zoom={0}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={tensorDims.height}
          resizeWidth={tensorDims.width}
          resizeDepth={3}
          onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
          autorender={true}
        />

        <Text style={styles.legendTextField}>
          Point to yourself to have a better analysis.{"\n\n"}Lets start your
          workout!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Finished!</Dialog.Title>
        <Dialog.Description>
          Wooo! You finished your workout with {final_score * 100}/100, in{" "}
          {time_ === "" ? "" : time_.slice(6)}!
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={handleCancel}
          color="#276496"
          bold={true}
        />
        <Dialog.Button
          label="Save"
          onPress={handleDelete}
          color="#276496"
          bold={true}
        />
      </Dialog.Container>

      <View style={styles.body}>
        {renderCameraView()}

        {
          //its used for plotting the image but vector shifting + lag so in vain
        }
        {
          //<GesturePath path={path} color="#FFF" />
        }
      </View>
      <View
        style={[
          {
            position: "absolute",
            margin: 5,
            top: 600,
            right: 95,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5000,
          },
        ]}
      >
        <Stopwatch
          laps
          msecs
          start={stopwatchStart}
          reset={stopwatchReset}
          options={options}
          getTime={getFormattedTime}
        />
        <TouchableHighlight
          onPress={toggleStopwatch}
          style={pressed ? styles.buttonpressed : styles.buttonnormal}
          onHideUnderlay={() => {
            setpressed(false);
          }}
          onShowUnderlay={() => {
            setpressed(true);
          }}
          underlayColor={"gray"}
        >
          <Text
            style={{
              fontSize: 30,
              color: "red",
              backgroundColor: "#111111",
              fontWeight: "700",
              borderColor: "#111111",
            }}
          >
            {!stopwatchStart ? "START!" : "STOP"}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#111111",
  },
  header: {
    flex: 1,
    padding: 20,
    width: 500,
    height: 90,
    backgroundColor: "#053271",
    borderWidth: 5,
    borderColor: "#053271",
    alignItems: "flex-start",
  },
  title: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  body: {
    padding: 5,
    paddingTop: 5,
    marginTop: 5,
  },
  test: {
    padding: 5,
    paddingTop: 5,
  },
  buttonpressed: {
    backgroundColor: "red",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonnormal: {
    backgroundColor: "transparent",
    marginBottom: 10,
    marginTop: 10,
  },
  cameraView: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: 10,
  },
  camera: {
    width: 700 / 2,
    height: 800 / 2,
    zIndex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  translationView: {
    marginTop: 30,
    padding: 20,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    height: 500,
  },
  translationTextField: {
    fontSize: 60,
  },
  wordTextField: {
    textAlign: "right",
    fontSize: 20,
    marginBottom: 50,
  },
  legendTextField: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#C9C9C9",
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "purple",
    borderStyle: "solid",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#ffffff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 3,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#cccccc",
  },
});

export default WorkoutScreen;
