import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PrivateScreen = ({ history }) => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [privateData, setPrivateData] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login')
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }

      try {
        console.log(config)
        const { data } = await axios.get(
          'http://localhost:5000/api/private',
          config
        )
        setPrivateData(data.data)
      } catch (error) {
        localStorage.removeItem('authToken')
        setError('You are not authorized please login')
      }
    }
    fetchPrivateData()
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return error ? (
    <span className='error-message'>{error}</span>
  ) : (
    <>
      <div style={{ background: 'green', color: 'white' }}>{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default PrivateScreen
