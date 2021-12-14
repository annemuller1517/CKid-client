import {Navbar, Nav} from  'react-bootstrap'
import {Link} from  'react-router-dom'
import {UserContext} from '../context/app.context'
import {useContext} from "react"
import Button from '@restart/ui/esm/Button'

function MyNav(props) {

	let {onLogout} = props
	let {user} = useContext(UserContext)

return (
	<Navbar  bg="dark"  expand="lg">
		<Navbar.Toggle  aria-controls="basic-navbar-nav"  />
		<Navbar.Collapse  id="basic-navbar-nav">
			<Nav  className="mr-auto">
                <Link  style={{marginLeft: '10px', color:"white", textDecoration:"none"}}  to="/">Home</Link>
				{user ? (
                    <>
                    <Link  style={{marginLeft: '10px', color:"white", textDecoration:"none"}}  to="/profile">profile</Link>
					<Button onClick={onLogout} variant="text">Logout</Button>
                    </>
				) :
				(
				<>
					<Link  style={{marginLeft: '10px', color:"white", textDecoration:"none"}}  to="/signin">SignIn</Link>
					<Link  style={{marginLeft: '10px', color:"white", textDecoration:"none"}}  to="/signup">SignUp</Link>
				</>
				)}

			</Nav>
		</Navbar.Collapse>
	</Navbar>
	)
}
export default MyNav
