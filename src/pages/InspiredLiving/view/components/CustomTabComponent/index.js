import React, { useEffect, useState } from 'react'
import TabContentFilter from '../TabContentFilter';
import FilmTabContent from '../FilmTabContent';
import PrintTabComponent from '../PrintTabComponent';
import PressReleaseTabComponent from '../PressReleaseTabComponent';
import EarticalesTabComponent from '../EarticalesTabComponent';
import InstagramSpotlightTabComponent from '../InstagramSpotlightTabComponent';
import apiUrl from '@common/utils/apiURL';
import axios from 'axios';
import BlogsTabComponent from '../BlogsTabComponent';

function CustomTabComponent({tabtitle, data, fetchArticles, parentTabValue, sortByYearData}) {
  const [tabState, setTabState] = useState('film');
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = React.useState('nto');
  const [sortByYear, setSortByYear] = React.useState('2024');

  useEffect(() => {
    // console.log('data', data)
    // setFilteredData(data)

    setDefaultFilterState(data);
  }, [data])

  const setDefaultFilterState = (data) => {
    // filter as per year 2024
    const year = parseInt(sortByYear); // Convert the input value to an integer for year filtering
    const filteredByYear = data.filter((item) => {
      const publishYear = new Date(item.publishDate).getFullYear();
      return publishYear === year; // Filter items that match the specified year
    });

    // sort new to old
    let sortedData;
    sortedData = [...filteredByYear].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    // console.log('Sorted Data:', sortedData);
    setFilteredData(sortedData);
  }

  const tabHandleChange = (param) => {
    // console.log('tabHandleChange', param);
    setTabState(param)
    fetchArticles(param)
  }

  const handleSelectTabChange = (event) => {
    // console.log('handleSelectTabChange', event.target.value)
    setTabState(event.target.value);
    fetchArticles(event.target.value)
  };

  const handleFilterData = async (type, val, val1) => {
    // console.log('handleFilterData', type, val);
    
    if (type === 'search') {
      if(val === '') {
        setDefaultFilterState(data)
      } else if(val.length >= 3) {
        try {
          const getArticlesSearchURL = apiUrl.inspiredLivingSearch(parentTabValue, val);
          const response = await axios.get(getArticlesSearchURL);
          
          if (response.status === 200) {
            setDefaultFilterState(response?.data?.articles);
            return true;
          }
        } catch (error) {
          console.log('Search request failed', error);
        }
      }
      return true;
    } else if (type === 'filterYear') {
      const year = parseInt(val); // Convert the input value to an integer for year filtering
      const filteredByYear = filteredData.filter((item) => {
        const publishYear = new Date(item.publishDate).getFullYear();
        return publishYear === year; // Filter items that match the specified year
      });

      // console.log('Filtered Data by Year:', filteredByYear);
      setFilteredData(filteredByYear); // Set the filtered data based on year
      return true;
    } else if (type === 'sort') {
      let sortedData;
      if (val === 'nto') {
        // Sort from new to old (descending)
        sortedData = [...filteredData].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      } else if (val === 'otn') {
        // Sort from old to new (ascending)
        sortedData = [...filteredData].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
      }

      // console.log('Sorted Data:', sortedData);
      setFilteredData(sortedData); // Set the sorted data
      return true;
    } else if (type === 'both') {
      console.log('filter function', type, val, val1)
      let sortedData;
      if (val === 'nto') {
        // Sort from new to old (descending)
        sortedData = [...filteredData].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      } else if (val === 'otn') {
        // Sort from old to new (ascending)
        sortedData = [...filteredData].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
      }

      // console.log('Sorted Data:', sortedData);
      setFilteredData(sortedData); // Set the sorted data
      return true;
    }
    
    setFilteredData(filteredData); // If not searching, return original data
  };

  // console.log('filteredData', filteredData, data)
  return (
    <div className='bs-custom-tab-content'>
        <div className='bs-custom-tab-content__tab-nav'>
          <h3 className='bs-custom-tab-content__title'>{tabtitle}</h3>
          <TabContentFilter 
            variant={tabtitle === 'advertising' ? "tab" : ""} 
            tabActiveState={tabState} 
            onTabClickEvent={tabHandleChange}
            setTabActiveState={setTabState}
            handleSelectTabChange={handleSelectTabChange}
            handleFilterData={handleFilterData}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortByYear={sortByYear}
            setSortByYear={setSortByYear}
            sortByYearData={sortByYearData}
          />
        </div>
        <div className='bs-custom-tab-content__tab-cont'>
          {tabtitle === 'advertising' ? (
            tabState === 'film' ? (
              <FilmTabContent data={filteredData} />
            ) : tabState === 'print' ? (
              <PrintTabComponent data={filteredData} />
            ) : ''
          ) : tabtitle === 'press release' ? (
            <PressReleaseTabComponent data={filteredData} />
          ) : tabtitle === 'e-articles' ? (
            <EarticalesTabComponent data={filteredData} />
          ): tabtitle === 'instagram spotlight' ? (
            <InstagramSpotlightTabComponent data={filteredData} />
          ): tabtitle === 'blogs' ? (
            <BlogsTabComponent />
          ): null}
        </div>
    </div>
  )
}

export default CustomTabComponent