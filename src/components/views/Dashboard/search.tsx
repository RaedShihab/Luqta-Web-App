import React from 'react';
import { withTranslation, WithTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { category } from '../Category/Categoty';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Dashboard.css';
import {Axios} from '../../apiServecis/axiosConfig'
const styles = (theme:any) => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    width: "98%",
    flexGrow: 1,
    position: 'relative',
    borderRadius: "4px",
    paddingLeft: "0px",
    paddingRight: "10px"
  },
  inputCSS: {
    flex: 1,
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(2),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
});

interface Props extends WithTranslation{ 
  setSearchKeyWords?: any
  searchKeyWords?: any;
  }

const IntegrationAutosuggest: React.FC<Props> = ({setSearchKeyWords,searchKeyWords})=> {

  const [suggestions,  setSugg] = React.useState([])

  React.useEffect(()=> {
    let suggestions
    Axios.get('/categories')
    .then(res => {
          // console.log(res.data.data)
          suggestions = res.data.data.map((sugg:any) => {
            return {title: sugg.name}
          })
          setSugg(suggestions)
        })
        .catch(err => console.log(err.response))
  }, [])

  return (
    <>
      <Autocomplete
      options={suggestions}
      getOptionLabel={(option: any) => option.title}
      style={{ width: '100%' }}
      renderInput={(params) => 
      <TextField
      // value={searchKeyWords}
      onChange={(e:any)=>{
         setSearchKeyWords(e.target.value)}}
      {...params} label="Search" variant="outlined" />}
        // theme={{
        //   container: classes.container,
        //   suggestionsContainerOpen: classes.suggestionsContainerOpen,
        //   suggestionsList: classes.suggestionsList,
        //   suggestion: classes.suggestion,
        // }}
      />
    </>
  );
}


  // componentDidMount() {
  //   let suggestions
  //   Axios.get('/categories')
  //   .then(res => {
  //     console.log(res.data.data)
  //     suggestions = res.data.data.map(sugg => {
  //       return {title: sugg.name}
  //     })
  //     this.setState({suggestions: suggestions})
  //   })
  //   .catch(err => console.log(err.response))
  // }

// IntegrationAutosuggest.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withTranslation("/dashboard/dashboard")(IntegrationAutosuggest);
