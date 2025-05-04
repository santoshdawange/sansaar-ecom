import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

function SearchFilter({ onDetectLocation, onPlaceSelect, mapInstance }) {
  const [inputValue, setInputValue] = useState('');
  const [places, setPlaces] = useState([]);
  const inputRef = useRef(null);
  const [blurTrigger, setBlurTrigger] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');

  const fetchPlaces = (input) => {
    const service = new window.google.maps.places.AutocompleteService();
    const request = {
      input,
      types: ['geocode']
    };
    service.getPlacePredictions(request, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(predictions);
      } else {
        console.error('Error fetching place predictions:', status);
      }
    });
  };

  const resetFilter = () => {
    setInputValue('');
    setPlaces([]);
    onPlaceSelect('');
  };

  const [openAutocomplete, setOpenAutocomplete] = useState(true);

  const handleInputChange = (event, value) => {
    setInputValue(value);
    if (value) {
      fetchPlaces(value);
    } else {
      setPlaces([]);
    }
  };

  const handleOptionChange = (event, value) => {
    if (value) {
      setInputValue(value);
      const selectedPlace = places.find(place => place.description === value);
      if (selectedPlace) {
        const service = new window.google.maps.places.PlacesService(mapInstance);
        const request = {
          placeId: selectedPlace.place_id,
          fields: ['geometry']
        };
        service.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
            const { lat, lng } = place.geometry.location;
            setSelectedPlace({ lat: lat(), lng: lng() });
            setPlaces([]);
            // setBlurTrigger(true); // Trigger blur event
              setOpenAutocomplete(openAutocomplete)
          } else {
            console.error('Error fetching place details:', status);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (blurTrigger && inputRef.current) {
      inputRef.current.blur();
      setBlurTrigger(false); // Reset trigger state
    }
  }, [blurTrigger]);

  return (
    <>
      <div className='lyt-locator__search-field-wrap'>
        <label className='lyt-locator__search-label'>Find the nearest store</label>
        <div className='lyt-locator__search-field'>

          <Autocomplete
            freeSolo
            blurOnSelect
            disablePortal
            onInputChange={handleInputChange}
            onChange={handleOptionChange}
            options={places.map(place => place.description)}
            renderInput={(params) => <TextField {...params} placeholder='Area / Locality / Pincode' className='lyt-locator__search-input' />}
          />
        
          {/* <Autocomplete
            // freeSolo
            blurOnSelect
            open={openAutocomplete}
            id="combo-box-demo"
            options={places.map(place => place.description)}
            value={inputValue}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleOptionChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Area / Locality / Pincode'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      {inputValue && (
                        <IconButton
                          onClick={resetFilter}
                          aria-label="clear input"
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
                inputRef={inputRef} // Attach ref to TextField
                className='lyt-locator__search-input'
              />
            )}
          /> */}
        </div>
      </div>
      <div className='lyt-locator__action-wrap'>
        <button className='bs-btn bs-btn__btn-solid lyt-locator__btn' onClick={() => onPlaceSelect(selectedPlace)}>Search</button>
        <span className='lyt-locator__separator'>or</span>
        <button className='bs-btn bs-btn__btn-solid lyt-locator__btn lyt-locator__btn--lg' onClick={onDetectLocation}>Detect my location</button>
      </div>
    </>
  );
}

export default SearchFilter;
