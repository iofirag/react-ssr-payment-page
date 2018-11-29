import React, { Component } from 'react';
import './LeafletMap.scss'

let Map, TileLayer, Marker, Popup;


export default class LeafletMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13
    }
    componentDidMount () {
        require('leaflet/dist/leaflet.css');

        const rl = require('react-leaflet');
        Map = rl.Map;
        TileLayer = rl.TileLayer;
        Marker = rl.Marker;
        Popup = rl.Popup;

        // Reset default icon
        // const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png');
        // const iconUrl = require('leaflet/dist/images/marker-icon.png')
        // const iconShadow = require('leaflet/dist/images/marker-shadow.png');
        let DefaultIcon = L.icon({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
        // L.Marker.prototype.options.icon = DefaultIcon;
        // debugger;
        // Object.assign(L.Marker.prototype.options.icon.__proto__.options, {
        //     iconRetinaUrl,
        //     iconUrl,
        //     iconShadow
        // })
        L.Marker.prototype.options.icon = DefaultIcon;
        // L.Marker.prototype.options.icon.__proto__.options.iconRetinaUrl = iconRetinaUrl;
        // L.Marker.prototype.options.icon.__proto__.options.iconUrl = iconUrl;
        // L.Marker.prototype.options.icon.__proto__.options.shadowUrl = iconShadow;


        this.forceUpdate()
    }
    render () {
        if (!Map) return null;

        const position = [this.state.lat, this.state.lng];
        // __isBrowser__ ? console.log(2): ''

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