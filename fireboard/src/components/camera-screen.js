import React from 'react';
import { Constants, Camera, FileSystem, Permissions } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Vibration
} from 'react-native';
import moment from 'moment';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off'
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
};
export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    permissionsGranted: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }
  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'esr-photos'
    ).catch(e => {
      console.log(e, 'Directory exists');
    });
  }
  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery
    });
  }
  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back'
    });
  }
  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash]
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance]
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on'
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth
    });
  }
  takePicture = async function() {
    if (this.camera) {
      let newPath = `${
        FileSystem.documentDirectory
      }fireboard_${moment().format('YYMMDDHHmmss')}.jpg`;
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: newPath
        }).then(() => {
          Vibration.vibrate();
          this.props.goBack && this.props.goBack();
          this.props.onPictureTaken && this.props.onPictureTaken(newPath);
        });
      });
    }
  };
  renderNoPermissions() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          To be able to capture pictures, Ericsson Site Rollout needs access to
          camera
        </Text>
        <Text style={{ color: 'white' }}>Please try again</Text>
      </View>
    );
  }
  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        // useCamera2Api={false}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: Constants.statusBarHeight / 2
          }}
        >
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFacing.bind(this)}
          >
            <MaterialIcons color='white' name='switch-camera' size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFlash.bind(this)}
          >
            <MaterialIcons
              color='white'
              name={this.state.flash === 'off' ? 'flash-off' : 'flash-on'}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleWB.bind(this)}
          >
            <MaterialCommunityIcons
              color='white'
              name='white-balance-incandescent'
              size={20}
            />
            <Text style={styles.flipText}>{this.state.whiteBalance} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginBottom: -5
          }}
        >
          {this.state.autoFocus !== 'on' ? (
            <Slider
              style={{
                width: 150,
                marginTop: 15,
                marginRight: 15,
                alignSelf: 'flex-end'
              }}
              onValueChange={this.setFocusDepth.bind(this)}
              step={0.1}
            />
          ) : null}
        </View>
        <View
          style={{
            flex: 0.1,
            paddingBottom: 20,

            flexDirection: 'row',
            alignSelf: 'stretch'
          }}
        >
          <TouchableOpacity
            style={[
              styles.flipButton,
              { flex: 0.1, alignSelf: 'flex-start', marginHorizontal: 10 }
            ]}
            onPress={this.zoomIn.bind(this)}
          >
            <MaterialIcons color='white' name='zoom-in' size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-start' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <MaterialIcons color='white' name='zoom-out' size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton,
              styles.picButton,
              { flex: 0.55, alignSelf: 'center', marginRight: 20 }
            ]}
            onPress={this.takePicture.bind(this)}
          >
            <MaterialIcons color='white' name='photo-camera' size={60} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'center' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <MaterialIcons
              color='white'
              name={
                this.state.autoFocus === 'on'
                  ? 'center-focus-strong'
                  : 'center-focus-weak'
              }
              size={30}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }
  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  navigation: {
    flex: 1
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipText: {
    color: 'white',
    fontSize: 12
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  picButton: {},
  row: {
    flexDirection: 'row'
  }
});
