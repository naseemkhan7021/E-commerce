import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {

     const [keyWord, setKeyWord] = useState('');
     const navigate = useNavigate()

     function handlSubmit(e) {
          e.preventDefault()
          if (keyWord.trim()) {
               navigate(`/search/${keyWord}`)
          }else{
               navigate('/');
          }
     }

     return (
          <form onSubmit={handlSubmit}>
               <div className="input-group">
                    <input
                         name="keyWord"
                         type="text"
                         id="search_field"
                         className="form-control"
                         placeholder="Enter Product Name ..."
                         onChange={(e) => setKeyWord(e.target.value)}
                    />

                    <div className="input-group-append">
                         <button id="search_btn" className="btn">
                              <i className="fa fa-search" aria-hidden="true"></i>
                         </button>
                    </div>
               </div>
          </form>
     );
}

export default Search;
