import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import MustBeLoggedIn from './MustBeLoggedIn'

const ColoredBackground = ({ children, color }) => {
  console.log(children)
  return <div style={{ background: color, padding: '5px' }}>{children}</div>
}

const StyledButton = ({ children, color, ...rest }) => {
  return (
    <button {...rest} style={{ background: color }}>
      {children}
    </button>
  )
}
const SuperheroRow = ({
  name,
  alterEgo,
  homeCity,
  onSuperheroSelected,
  deleteSuperhero,
}) => (
  <tr>
    <td onClick={() => onSuperheroSelected()}>{name}</td>
    <td>{alterEgo}</td>
    <td>{homeCity}</td>
    <MustBeLoggedIn>
      <td>
        <ColoredBackground color="green">
          <StyledButton color="yellow" onClick={() => deleteSuperhero()}>
            Delete
          </StyledButton>
        </ColoredBackground>
      </td>
    </MustBeLoggedIn>
  </tr>
)

const SuperheroList = ({ setSelectedSuperheroId }) => {
  const [superheroes, setSuperheroes] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      console.log('Fetching superhero data!')
      let fetchResult = await fetch('/api/superhero')
      let superheroList = await fetchResult.json()
      setSuperheroes(superheroList)
    }
    fetchData()
  }, [])

  function selectSuperhero(id) {
    console.log('selectSuperhero called on id', id)
    setSelectedSuperheroId(id)
  }

  async function deleteSuperhero(id) {
    await fetch('/api/superhero/' + id, {
      method: 'DELETE',
    })
    navigate('/')
  }

  return (
    <div>
      <h2>Superhuman List</h2>
      <table style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alter Ego</th>
            <th>Home City</th>
          </tr>
        </thead>
        <tbody>
          {superheroes.map((hero, index) => {
            return (
              <SuperheroRow
                key={index}
                onSuperheroSelected={() => selectSuperhero(hero._id)}
                name={hero.superheroName}
                alterEgo={hero.alterEgo}
                homeCity={hero.homeCity}
                deleteSuperhero={() => deleteSuperhero(hero._id)}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SuperheroList
