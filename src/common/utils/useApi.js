// useApi.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Helper function to get a cookie by name
const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
};

const useApi = (url, method = 'GET', body = null, headers = {}, dependencies = []) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check for access_token in cookies
      const adminToken = getCookie('access_token');
      const authHeaders = adminToken
        ? { ...headers, Authorization: `Bearer ${adminToken}` }
        : headers;

      const options = {
        method,
        url,
        data: body,
        headers: authHeaders,
      };

      const response = await axios(options);
      if (response.statusText === 'OK' || response.status === 200) {
        setData(response.data);
      } else {
        throw new Error('Error fetching data');
      }
    } catch (err) {
      if(err?.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access:', err);
        // Optionally, redirect to login or show a message
      } else if (err?.response?.status === 404) {
        // Handle not found error
        console.error('Data not found:', err);
      } else if (err?.response?.status === 500) {
        // Handle server error
        console.error('Server error:', err);
      } else {
        // Handle other errors
        console.error('Error fetching data:', err);
      }
      navigate('/')
      setError(err);
    } finally {
      // console.log(('Error fetching finally'))
      setLoading(false);
    }
  }, [url, method, body, headers]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useApi;




//! Example for use

//!  import useApi from '@common/utils/useApi';

//!   const { data: getData, loading: getLoading, error: getError } = useApi(getUrl, 'GET', null, headers, [dependencies]);


// ! example 1

// let url = "";

// const [collectionGallery, setCollectionGallery] = useState([])


// const { data: response, loading: isLoading, error } = useApi(url);

// useEffect(() => {
//     if (!isLoading && response && response?.CollectionImages) {
//       setCollectionGallery(response.CollectionImages);
//     }
//   }, [isLoading, response]);



// ! example 2


// const ExampleComponent = () => {
//   const getUrl = "";
//   const postUrl = "";
//   const postBody = { materialId: 'B10009', name: 'New Material' };
//   const headers = { 'Authorization': 'Bearer your_token' };

//   const [triggerRefetch, setTriggerRefetch] = useState(false);

//   const { data: getData, loading: getLoading, error: getError } = useApi(getUrl, 'GET', null, headers, [triggerRefetch]);
//   const { data: postData, loading: postLoading, error: postError } = useApi(postUrl, 'POST', postBody, headers);

//   const handleRefetch = () => {
//     setTriggerRefetch(prev => !prev);
//   };

//   if (getLoading || postLoading) {
//     return <div>Loading...</div>;
//   }

//   if (getError || postError) {
//     return <div>Error: {getError?.message || postError?.message}</div>;
//   }

//   return (
//     <div>
//       <h1>Data from GET API</h1>
//       <pre>{JSON.stringify(getData, null, 2)}</pre>

//       <h1>Data from POST API</h1>
//       <pre>{JSON.stringify(postData, null, 2)}</pre>

//       <button onClick={handleRefetch}>Refetch Data</button>
//     </div>
//   );
// };

