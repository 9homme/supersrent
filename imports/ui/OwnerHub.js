import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import MapLocationSelector from './MapLocationSelector';
import { distance } from 'spherical';


export default class OwnerHub extends React.Component {
  onGetMarker() {
    console.log('Get marker', this.refs.mymap.state.markerPosition);
    console.log('distance', distance([this.refs.mymap.state.markerPosition.lng,this.refs.mymap.state.markerPosition.lat],[100.523186, 13.736717]));
  }
  render() {
    return (
      <div>
        <div>
          <h1>Owner Hub</h1>
          <MapLocationSelector ref="mymap" defaultZoom={16}
            defaultLocation={{ lat: 13.736717, lng: 100.523186 }} />
          <button onClick={this.onGetMarker.bind(this)}>Get Marker location</button>
        </div>
      </div>
    )
  }
}