import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import { fetchApiQueryResults } from '../reducers/apiQuerySlice.js';
import { buildQueryFromValidParams } from '../actions/index.js';

const SearchBar = () => {

  const store = useStore();
  const navigate = useNavigate();

  const [ searchInput, setSearch ] = useState();
  const searchInputValid = Boolean(searchInput);

  useEffect(() => {
    store.dispatch(fetchApiQueryResults(buildQueryFromValidParams(searchInput)));
  }, [ store, searchInput ])

  const handleOnSearchInputChange = (searchText) => {
    const pageToNavTo = buildQueryFromValidParams(searchText)
    store.dispatch(fetchApiQueryResults(buildQueryFromValidParams(searchText)))
    
    navigate(pageToNavTo);

  }

  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <div className='container'>
        <header className='search-bar'>
          <form>
            <div>
              <input
                type="text"
                id="search-query"
                className="form-control "
                placeholder="Search"
                onChange={(event) => handleOnSearchInputChange(event.target.value)}
                />
            </div>
          </form>
        </header>
      </div>
    </div>
  )
 
}

export default SearchBar;
