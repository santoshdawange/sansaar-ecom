import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import SearchResult from './components/SearchResult';
import SearchFilter from './components/SearchFilter';
import useApi from '@common/utils/useApi';
// import { APIProvider, Map, ControlPosition } from '@vis.gl/react-google-maps';
// import { CustomMapControl } from './components/CustomMapControl';
// import MapHandler from './components/MapHandler';
// import { MarkerWithInfowindow } from './components/MarkerWithInfowindow';
// import PlaceAutocomplete from './components/PlaceAutocomplete';
import { haversine } from 'utils/haversine';
import apiUrl from '@common/utils/apiURL';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 20.5937, // Latitude for the center of India
    lng: 78.9629  // Longitude for the center of India
};

const libraries = ['places'];
const googleMapsApiKey = 'AIzaSyBKLFaOo3qUrrLmnWyjgbgnfcZTTfVNu20';

// const INITIAL_CAMERA_STATE = {
//     center: {lat: 20.5937, lng: 78.9629},
//     zoom: 5,
//     heading: 0,
//     tilt: 0
// }

// const autocompleteModes = [
//     {id: 'classic', label: 'Google Autocomplete Widget'},
//     {id: 'custom', label: 'Custom Build'},
//     {id: 'custom-hybrid', label: 'Custom w/ Select Widget'}
// ];

function WhereToBuy() {
    const { isLoaded } = useJsApiLoader({
        id: 'map',
        googleMapsApiKey,
        libraries
    });

    const [map, setMapInstance] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [centerChangedFlag, setCenterChangedFlag] = useState(false);
    const [mapError, setMapError] = useState(null);
    const [zoom, setZoom] = useState(4.8);
    // const [stores, setStores] = useState([]);
    const [clusterer, setClusterer] = useState(null);
    
    const [infoWindow, setInfoWindow] = useState(null);

    const [storeListData, setStoreListData] = useState([]);
    const [filteredStoreListData, setFilteredStoreListData] = useState([]);
    const [eboTab, setEboTab] = useState(true);
    const [mboTab, setMboTab] = useState(true);
    const infoWindowRef = useRef(null);

    // const [selectedAutocompleteMode, setSelectedAutocompleteMode] = useState(autocompleteModes[2]);
    // const [selectedPlace, setSelectedPlace] = useState(null);
    // const [userLocation, setUserLocation] = useState(indiaCenter);
    // const [mapZoom, setMapZoom] = useState(5);
    // const [activeMarker, setActiveMarker] = useState(null);
    // const [cameraState, setCameraState] = useState(INITIAL_CAMERA_STATE);

    // const url = `https://sansaar.co.in/api/v1/util/store`;
    const url = apiUrl.store;
    const { data: response, loading: isLoading, error } = useApi(url);

    useEffect(() => {
        if (!isLoading && response) {
            setStoreListData(response);
            setFilteredStoreListData(response);
        }
    }, [isLoading, response]);

    const onLoad = useCallback((map) => {
        setMapInstance(map);
    }, [storeListData, clusterer, infoWindow]);
    
    const onUnmount = useCallback(() => {
        setMapInstance(null);
    }, []);

    useEffect(() => {
        if (map && storeListData.length > 0) {
            let filteredStores = [];
            if(!centerChangedFlag) {
                filteredStores = storeListData.filter(store => {
                    if (eboTab && store.storeType === "EBO") return true;
                    if (mboTab && store.storeType === "MBO") return true;
                    return false;
                });
                setFilteredStoreListData(filteredStores);
            } else {
                let tempStoreList = storeListData.map((item) => {
                    const distance = haversine(center.lat, center.lng, item.latitude, item.longitude);
                    return { ...item, distance };
                });
                let tempList = tempStoreList.filter((item) => {
                    return item.distance <= 50;
                });
                filteredStores = tempList.filter(store => {
                    if (eboTab && store.storeType === "EBO") return true;
                    if (mboTab && store.storeType === "MBO") return true;
                    return false;
                });
            }
            setFilteredStoreListData(filteredStores);

            const markers = filteredStores
            .map(store => {
                const svgMBOMarker = {
                    path: "M13.2099 0.919922C17.4299 1.00992 20.8499 2.71994 23.4299 6.05994C25.1599 8.29994 26.0099 10.87 25.9599 13.7C25.9199 15.92 25.2699 17.97 24.1599 19.9C21.5999 24.36 18.8899 28.75 16.1999 33.14C15.2699 34.66 14.3299 36.1699 13.3999 37.6799C13.1699 38.0499 13.0899 38.0499 12.8699 37.6799C11.2499 34.9699 9.6099 32.2599 7.9999 29.5399C5.8799 25.9599 3.6999 22.4099 1.7199 18.7499C1.0399 17.4999 0.739904 16.1099 0.599904 14.6899C0.239904 11.0399 1.3199 7.83995 3.7499 5.13995C5.8699 2.77995 8.53989 1.37994 11.7099 0.999939C11.9099 0.979939 12.1199 0.939932 12.3199 0.929932C12.6099 0.919932 12.9099 0.929932 13.1999 0.929932L13.2099 0.919922ZM13.2399 7.10992C9.94989 7.10992 7.33989 9.73997 7.33989 13.03C7.33989 16.3 9.9899 18.9199 13.2799 18.9199C16.5199 18.9199 19.1299 16.2499 19.1599 12.9999C19.1899 9.79994 16.4299 7.00991 13.2299 7.09991L13.2399 7.10992Z",
                    fillColor: "#c3a289",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 0.75,
                    anchor: new window.google.maps.Point(13, 40),
                };

                const svgEBOMarker = {
                    path: "M13.2099 0.919922C17.4299 1.00992 20.8499 2.71994 23.4299 6.05994C25.1599 8.29994 26.0099 10.87 25.9599 13.7C25.9199 15.92 25.2699 17.97 24.1599 19.9C21.5999 24.36 18.8899 28.75 16.1999 33.14C15.2699 34.66 14.3299 36.1699 13.3999 37.6799C13.1699 38.0499 13.0899 38.0499 12.8699 37.6799C11.2499 34.9699 9.6099 32.2599 7.9999 29.5399C5.8799 25.9599 3.6999 22.4099 1.7199 18.7499C1.0399 17.4999 0.739904 16.1099 0.599904 14.6899C0.239904 11.0399 1.3199 7.83995 3.7499 5.13995C5.8699 2.77995 8.53989 1.37994 11.7099 0.999939C11.9099 0.979939 12.1199 0.939932 12.3199 0.929932C12.6099 0.919932 12.9099 0.929932 13.1999 0.929932L13.2099 0.919922ZM13.2399 7.10992C9.94989 7.10992 7.33989 9.73997 7.33989 13.03C7.33989 16.3 9.9899 18.9199 13.2799 18.9199C16.5199 18.9199 19.1299 16.2499 19.1599 12.9999C19.1899 9.79994 16.4299 7.00991 13.2299 7.09991L13.2399 7.10992Z",
                    fillColor: "#0D5640",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 0.75,
                    anchor: new window.google.maps.Point(13, 40),
                };

                const marker = new window.google.maps.Marker({
                    position: { lat: Number(store.latitude), lng: Number(store.longitude) },
                    title: store.storeName,
                    icon: store.storeType === "EBO" ? svgEBOMarker : svgMBOMarker
                });

                marker.addListener('click', () => {
                    // Close any existing InfoWindow
                    if (infoWindowRef.current) {
                        infoWindowRef.current.close();
                    }

                    const newInfoWindow = new window.google.maps.InfoWindow({
                        content: `
                            <div class='lyt-locator__info-window'>
                                <div class='bs-info-window'>
                                    <p class='bs-info-window__item-name'>${store.storeName}</p>
                                    <address class='bs-info-window__item-address'>
                                        ${`${store.fullAddress} ${store.city} ${store.state} ${store.pinCode}`}
                                    </address>
                                    <p class='bs-info-window__item-time'>Contact - ${store.contactNumber}</p>
                                    <a href=${store.googleMapLink} target="_blank" class='bs-info-window__item-direction'>
                                        <span class="icon icon-direction bs-info-window__icon"></span>
                                        <span class="bs-info-window__text">Directions</span>
                                    </a>
                                </div>
                            </div>
                        `
                    });

                    newInfoWindow.open(map, marker);
                    infoWindowRef.current = newInfoWindow;
                });

                marker.setMap(map);

                return marker;
            });

            // Clear any existing clusterer
            // if (clusterer) {
            //     clusterer.clearMarkers();
            // }

            // Create a new MarkerClusterer instance
            // const newClusterer = new MarkerClusterer({
            //     map,
            //     markers
            // });

            // setClusterer(newClusterer);
            // map.markers = markers;
            return () => {
                markers.forEach(marker => marker.setMap(null));
            };
        }
    }, [storeListData, map, eboTab, mboTab, center])

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setCenter({ lat: latitude, lng: longitude })
                setZoom(10);
                setCenterChangedFlag(true);

                let tempStoreList = storeListData.map((item) => {
                    const distance = haversine(latitude, longitude, item.latitude, item.longitude);
                    return { ...item, distance };
                });
                // let tempList = tempStoreList.filter((item) => {
                //     return item.distance <= 50;
                // });
                // setFilteredStoreListData(tempList);
                tempStoreList = tempStoreList.filter((item) => {
                    const withinDistance = item.distance <= 50;
                    const matchEbo = eboTab && item.storeType === "EBO";
                    const matchMbo = mboTab && item.storeType === "MBO";
    
                    // If both tabs are not selected, exclude all stores
                    if (!eboTab && !mboTab) {
                        return false;
                    }
    
                    // If both tabs are selected, include stores that match either type
                    if (eboTab && mboTab) {
                        return withinDistance && (matchEbo || matchMbo);
                    }
    
                    // If only eboTab is selected
                    if (eboTab) {
                        return withinDistance && matchEbo;
                    }
    
                    // If only mboTab is selected
                    if (mboTab) {
                        return withinDistance && matchMbo;
                    }
    
                    return false;
                });
                setFilteredStoreListData(tempStoreList);
                

                // if (map) {
                //     // Clear any existing marker for the selected place
                //     if (map.selectedMarker) {
                //         map.selectedMarker.setMap(null);
                //     }
        
                //     // Create a new marker for the selected place
                //     const newMarker = new window.google.maps.Marker({
                //         position: { lat: latitude, lng: longitude },
                //         map: map,
                //         title: 'Selected Location',
                //         icon: {
                //             url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                //             scaledSize: new window.google.maps.Size(30, 30),
                //         },
                //     });
        
                //     // Save the new marker in the map instance
                //     map.selectedMarker = newMarker;
                // }
            }, error => {
                console.error("Error getting location", error);
                setMapError('Error getting location');
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handlePlaceSelect = (place) => {
        if (place) {
            setCenter(place)
            setZoom(10);
            setCenterChangedFlag(true);
            // let tempDistList = storeListData.map((item) => {
            //     const distance = haversine(place.lat, place.lng, item.latitude, item.longitude);
            //     return distance <= 50;
            // });

            let tempStoreList = storeListData.map((item) => {
                const distance = haversine(place.lat, place.lng, item.latitude, item.longitude);
                return { ...item, distance };
            });
            // let tempList = tempStoreList.filter((item) => {
            //     return item.distance <= 50;
            // });
            // setFilteredStoreListData(tempList);
            tempStoreList = tempStoreList.filter((item) => {
                const withinDistance = item.distance <= 50;
                const matchEbo = eboTab && item.storeType === "EBO";
                const matchMbo = mboTab && item.storeType === "MBO";

                // If both tabs are not selected, exclude all stores
                if (!eboTab && !mboTab) {
                    return false;
                }

                // If both tabs are selected, include stores that match either type
                if (eboTab && mboTab) {
                    return withinDistance && (matchEbo || matchMbo);
                }

                // If only eboTab is selected
                if (eboTab) {
                    return withinDistance && matchEbo;
                }

                // If only mboTab is selected
                if (mboTab) {
                    return withinDistance && matchMbo;
                }

                return false;
            });
            setFilteredStoreListData(tempStoreList);
            
            // if (map) {
            //     // Clear any existing marker for the selected place
            //     if (map.selectedMarker) {
            //         map.selectedMarker.setMap(null);
            //     }
    
            //     // Create a new marker for the selected place
            //     const newMarker = new window.google.maps.Marker({
            //         position: { lat: place.lat, lng: place.lng },
            //         map: map,
            //         title: 'Selected Location',
            //         icon: {
            //             url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            //             scaledSize: new window.google.maps.Size(30, 30),
            //         },
            //     });
    
            //     // Save the new marker in the map instance
            //     map.selectedMarker = newMarker;
            // }
        } else {
            const filteredStores = storeListData.filter(store => {
                if (eboTab && store.storeType === "EBO") return true;
                if (mboTab && store.storeType === "MBO") return true;
                return false;
            });
            setFilteredStoreListData(filteredStores);
        }
    };

    
    const eboHandleChange = () => {
        if(eboTab){
            setEboTab(false);
        }else{
            setEboTab(true);
        }
    }
    
    const mboHandleChange = () => {
        if(mboTab){
            setMboTab(false);
        }else{
            setMboTab(true);
        }
    }

    return (
        <>
            <div className='bs-section bs-section--typ-grey bs-section--typ-title'>
                <div className='bs-section__section-head'>
                    <h3 className='bs-section__title'>
                        over <span className='cm-font-number'>350</span> stores, across <span className='cm-font-number'>100</span> cities
                    </h3>
                    <p className='bs-section__desc'>
                        Embracing the urgency of a sustainable future, we're committed to making our eco-conscious fabrics accessible across the nation. Visit your nearest store to explore our collections.
                    </p>
                </div>
            </div>
            <div className='bs-section'>
                <div className='lyt-locator'>
                    <div className='lyt-locator__head-wrap'>
                        <SearchFilter
                            onDetectLocation={handleDetectLocation}
                            onPlaceSelect={handlePlaceSelect}
                            mapInstance={map}
                        />
                    </div>
                    <div className='lyt-locator__cont-wrap'>
                        <div className='lyt-locator__map-wrap'>
                            {isLoaded ? (
                                <>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={zoom}
                                        onLoad={onLoad}
                                        onUnmount={onUnmount}
                                        mapId="570347ebde0a874f"
                                    />
                                </>
                            ) : <></>}


                            <div className='lyt-locator__legend-wrap'>
                                <p className={`lyt-locator__legend lyt-locator__legend--first ${eboTab ? 'lyt-locator__legend--first--active' : ''}`} onClick={() => eboHandleChange()}>
                                    <span className='icon icon-pin lyt-locator__legend-icon lyt-locator__legend-icon--clr-orange'></span>
                                    <span className='lyt-locator__legend-text'>Exclusive Store</span>
                                    <span className='icon icon-circle-empty lyt-locator__legend-check-icon'></span>
                                </p>
                                <p className={`lyt-locator__legend lyt-locator__legend--second ${mboTab ? 'lyt-locator__legend--second--active' : ''}`} onClick={() => mboHandleChange()}>
                                    <span className='icon icon-pin lyt-locator__legend-icon'></span>
                                    <span className='lyt-locator__legend-text'>Multibrand Stores</span>
                                    <span className='icon icon-circle-empty lyt-locator__legend-check-icon'></span>
                                </p>
                            </div>
                        </div>

                        <div className='lyt-locator__result-wrap'>
                            <SearchResult data={filteredStoreListData} allData={storeListData} onPlaceSelect={handlePlaceSelect} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WhereToBuy;
