import * as usersService from '../../utilities/users-service'

export default function OrderHisotoryPage() {
  const handleCheckToken = async () => {
    const expDate = await usersService.checkToken()
    console.log(expDate)
  }
    return (
      <>
          <h1>Hotels Index Page</h1>
          <button onClick={handleCheckToken}>Check When My Login Expires</button>
      </>
    )
  }