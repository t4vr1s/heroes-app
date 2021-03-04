import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../heroes/HeroCard'
import { getHeroesByName } from '../../selectors/getHeroesByName'

export const SearchScreen = ({ history }) => {
  const location = useLocation()
  const { q = '' } = queryString.parse(location.search)
  const initialState = {
    search: q
  }
  const [values, handleInputChange] = useForm(initialState)
  const { search } = values
  const heroesFilteres = useMemo(() => getHeroesByName(q), [q])
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`?q=${search}`)
  }

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className='row'>
        <h4>Search Form</h4>
        <div className='row'>
          <div className='col-5'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Find your hero'
                className='form-control'
                name='search'
                onChange={handleInputChange}
              />
              <button
                type='submit'
                className='btn m-1 btn-block btn-outline-primary'
              >
                Search...

              </button>
            </form>
          </div>
          <div className='col-7'>
            <h4>Results</h4>
            <hr />
            {
              q === '' &&
              (
                <div className='alert alert-info'>
                  Search a hero
                </div>
              )
            }
            {
              q !== '' && heroesFilteres.length === 0 &&
              (
                <div className='alert alert-danger'>
                  There is not a hero with {q}
                </div>
              )
            }
            {
              heroesFilteres.map(heroe => (
                <HeroCard key={heroe.id} {...heroe} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
