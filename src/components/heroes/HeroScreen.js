import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroesById'

export const HeroScreen = ({ history }) => {
  const { heroeId } = useParams()
  const hero = useMemo(() => getHeroesById(heroeId), [heroeId])
  if (!hero) {
    return <Redirect to='/' />
  }
  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero

  const handleClick = () => {
    if (history.length <= 2) {
      history.push('/')
    }
    history.goBack()
  }

  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img
          src={`../assets/heroes/${heroeId}.jpg`}
          alt={superhero}
          className='img-thumbnail animate__animated animate__fadeInDown'
        />
      </div>
      <div className='col-8 animate__animated animate__slideInRight'>
        <h3>{superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <strong>Alter ego:</strong> {alter_ego}
          </li>
          <li className='list-group-item'>
            <strong>Publisher:</strong> {publisher}
          </li>
          <li className='list-group-item'>
            <strong>First appearance:</strong> {first_appearance}
          </li>
        </ul>
        <h5>Characters</h5>
        <p>{characters}</p>
        <button
          className='btn btn-outline-info'
          onClick={handleClick}
        >
          Return
        </button>
      </div>
    </div>
  )
}
