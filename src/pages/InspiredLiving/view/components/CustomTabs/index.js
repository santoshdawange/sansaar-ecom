import * as React from 'react';
import PropTypes from 'prop-types';
import CustomTabComponent from '../CustomTabComponent';
import { Box, Tabs, Tab, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import useApi from '@common/utils/useApi';
import apiUrl from '@common/utils/apiURL';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabValus = ['film', 'press', 'electronic', 'insta'];

export default function CustomTabs({showBlogs}) {
  const [value, setValue] = React.useState(null);
  const [articleValues, setArticlesValues] = React.useState([]);
  const [sortByYearData, setSortByYearData] = React.useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isElectronicDataFetch, setIsElectronicDataFetch] = React.useState(false);

  const handleChange = (event, newValue) => {
    // console.log('handleChange', tabValus[newValue]);
    setIsLoading(true);
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    // console.log('handleSelectChange', event.target.value);
    setValue(event.target.value);
  };

  React.useEffect(() => {
    // console.log('type value', value)
    if(value !== null)
      fetchArticles(tabValus[value]);
  }, [value])

  React.useEffect(() => {
    // console.log('type', type);
    if(type === null)
      setValue(0);
    else
      setValue(tabValus.indexOf(type));
  }, [type])

  const fetchArticles = async (type) => {
    try {
      const getArticlesURL = apiUrl.inspiredLiving(type);
      const response = await axios.get(getArticlesURL);
      
      if (response.status === 200) {
        let tempArr = [];
        response.data.forEach(element => {
          if(!tempArr.some(item => item.value === new Date(element?.publishDate).getFullYear())) {
            let tempObj =  { label: new Date(element?.publishDate).getFullYear(), value: new Date(element?.publishDate).getFullYear() };
            tempArr.push(tempObj);
          }
        });
        // need to remove this if block after data correction
        if(tempArr.length === 0)
          tempArr.push({ label: "2024", value: "2024" });

        // console.log('fetchArticles tempArr', response.data)
        setSortByYearData(tempArr);
        setArticlesValues(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Search request failed', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
    className='bs-tabs bs-tabs--typ-white'
    >
      <div className='bs-tabs__nav-wrap'>

        {/* <FormControl variant="outlined" className='bs-tabs__select'>
          <Select
            labelId="tab-select-label"
            value={value}
            onChange={handleSelectChange}
          >
            <MenuItem value={0}>Advertising</MenuItem>
            <MenuItem value={1}>Press Release</MenuItem>
            <MenuItem value={2}>E-Articles</MenuItem>
            <MenuItem value={3}>Instagram Spotlight</MenuItem>
          </Select>
        </FormControl> */}
        
        {showBlogs ? 
        null :
          <Tabs
            value={value}
            onChange={handleChange}
            // variant="scrollable"
            // scrollButtons
            // allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            className='bs-tabs__nav'
          >
              <Tab label="advertising" {...a11yProps(0)} className='bs-tabs__nav-item' />
              <Tab label="press release" {...a11yProps(1)} className='bs-tabs__nav-item' />
              <Tab label="e-articles" {...a11yProps(2)} className='bs-tabs__nav-item' />
              <Tab label="instagram spotlight" {...a11yProps(3)} className='bs-tabs__nav-item' />
          </Tabs>
        }
      </div>
      <div className='bs-tabs__cont'>
        {showBlogs ? 
        <div className='bs-tabs__tab-panel'>
          <CustomTabComponent tabtitle="blogs" data={articleValues} parentTabValue={tabValus[value]} sortByYearData={sortByYearData} />
        </div>
        : 
        <>
        <CustomTabPanel value={value} index={0} className='bs-tabs__tab-panel'>
          <CustomTabComponent tabtitle="advertising" data={articleValues} fetchArticles={fetchArticles} parentTabValue={tabValus[value]} sortByYearData={sortByYearData} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} className='bs-tabs__tab-panel'>
          <CustomTabComponent tabtitle="press release" data={articleValues} parentTabValue={tabValus[value]} sortByYearData={sortByYearData} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} className='bs-tabs__tab-panel'>
          <CustomTabComponent tabtitle="e-articles" data={articleValues} parentTabValue={tabValus[value]} sortByYearData={sortByYearData} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3} className='bs-tabs__tab-panel'>
          <CustomTabComponent tabtitle="instagram spotlight" data={articleValues} parentTabValue={tabValus[value]} sortByYearData={sortByYearData} />
        </CustomTabPanel>
        </> }
      </div>
    </div>
  );
}