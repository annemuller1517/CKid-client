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
                    <Link  style={{marginLeft: '10px', color:"white", textDecoration:"none"}}  to="/map">Map</Link>
                    <Link  style={{marginLeft: '10px', color:"white", textDecoration:"none"}}  to="/profile">Profile</Link>
					<Link onClick={onLogout} to="/signin" style={{marginLeft: '10px', color:"white", textDecoration:"none"}} >Logout</Link>
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
