import React, { Component } from 'react';
import './LeafletMap.scss'

let Map, TileLayer, Marker, Popup;


export default class LeafletMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minZoom: 1,
            maxZoom: 20,
            zoom: 1,
            bounds: [[-90, -180], [90, 180]],
            center: [32, 35]
        }

        this.setMapRef = element => {
            this.mapRef = element;
        };
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
    static getDerivedStateFromProps(nextProps) {
        if (nextProps && nextProps.selectedCountry) {
            const { south, west, north, east } = nextProps.selectedCountry;
            const southWest = L.latLng(south, west);
            const northEast = L.latLng(north, east);
            return { bounds: L.latLngBounds(southWest, northEast) }
        }
        return null;
    }

    render () {
        if (!Map) return null;

        return (
            <Map
                ref={this.setMapRef}
                zoom={this.state.zoom}
                bounds={this.state.bounds}
                maxZoom={this.state.maxZoom}
                minZoom={this.state.minZoom}
                center={this.state.center}
                useFlyTo={true}
                // animate={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            </Map>
        )
    }
}