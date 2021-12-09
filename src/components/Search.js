import React from 'react'

function Search(props) {

    let {btnSearch} = props

    return (
        <div>
            
            <form onSubmit={btnSearch}>
                <input type="text" name="country"></input>
                <input type="text" name="city"></input>
                <button type="submit">Submit </button>
            </form>
        </div>
    )
}

export default Search
