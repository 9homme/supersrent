import { compose, withProps, withHandlers, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from 'react';

export default compose(
    withStateHandlers(
      (props) => {
        console.log('StateHandlers', props);
        return {
          center: props.defaultLocation,
          markerPosition: props.defaultLocation
        }
      }, {
        setCenter: () => (value) => ({
          center: value
        }),
        setMarkerPosition: () => (value) => ({
          markerPosition: value
        }),
      }
    ),
    withHandlers(() => {
      const refs = {
        map: undefined,
      }
      return {
        onMapMounted: props => ref => {
          console.log('onMapMounted', props, ref);
          refs.map = ref;
          refs.locationTracker = Tracker.autorun(() => {
            if (Geolocation.latLng()) {
              props.setCenter(Geolocation.latLng());
              props.setMarkerPosition(Geolocation.latLng());
              refs.locationTracker.stop();
            }
            console.log("Location", Geolocation.latLng());
          });
        },
        onCenterChanged: props => () => {
          let lat = refs.map.getCenter().lat();
          let lng = refs.map.getCenter().lng();
          props.setCenter({ lat, lng });
        },
        onClick: props => event => {
          console.log('onClick', props, event);
          let lat = event.latLng.lat();
          let lng = event.latLng.lng();
          props.setMarkerPosition({ lat, lng });
        }
      }
    }),
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDfbCEcrSlkv7oWhoOEgP4p3lyhRby4xVY",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={props.defaultZoom}
      center={props.center}
      ref={props.onMapMounted}
      onClick={props.onClick}
      onCenterChanged={props.onCenterChanged}>
      <Marker position={props.markerPosition} />
    </GoogleMap>
    );