import React, { Component } from 'react';
import './LeafletMap.scss'

let Map, TileLayer, Marker, Popup;


export default class LeafletMap extends Component {
    
    state = {
        minZoom: 1,
        maxZoom: 20,
        zoom: 1,
    }
    componentDidMount () {
        require('leaflet/dist/leaflet.css');
        const rl = require('react-leaflet');
        Map = rl.Map;
        TileLayer = rl.TileLayer;
        Marker = rl.Marker;
        Popup = rl.Popup;

        // Reset default icon
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        this.forceUpdate()
    }
    render () {
        if (!Map) return null;

        let position = []
        let zoom = 1;
        const {poi} = this.props;
        if (poi && poi.lat && poi.lng) {
            position = [poi.lat, poi.lng];
        } else {
            const DefaultLocation = [32, 35]
            position = DefaultLocation;
            zoom = 1
        }

        return (
            <Map
                zoom={zoom}
                maxZoom={this.state.maxZoom}
                minZoom={this.state.minZoom}
                center={position}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {
                    poi.lat && poi.lng? (
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    ) : ''

                }
            </Map>
        )
    }
}