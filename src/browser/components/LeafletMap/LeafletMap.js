import React, { Component } from 'react';
import './LeafletMap.scss'

let Map, TileLayer, Marker, Popup;


export default class LeafletMap extends Component {
    
    state = {
        lat: this.props.poi.lat,
        lng: this.props.poi.lng,
        zoom: 13
    }
    componentDidMount () {
        console.log(this.props.poi.lat, this.props.poi.lng)
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

        const position = [this.props.poi.lat, this.props.poi.lng];
        console.log(this.props.cc)

        return (
                <Map
                    zoom={10}
                    maxZoom={18}
                    minZoom={9}
                    center={position}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
        )
    }
}