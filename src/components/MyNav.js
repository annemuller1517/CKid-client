import {Navbar, Nav} from  'react-bootstrap'
import {Link} from  'react-router-dom'
import {UserContext} from '../context/app.context'
import {useContext} from "react"


function MyNav(props) {

	let {onLogout} = props
	let {user} = useContext(UserContext)

return (
	<Navbar  bg="light"  expand="lg">
		<Navbar.Toggle  aria-controls="basic-navbar-nav"  />
		<Navbar.Collapse  id="basic-navbar-nav">
			<Nav  className="mr-auto">
				{user ? (
					<button onClick={onLogout} >Logout</button>
				) :
				(
				<>
					<Link  style={{marginLeft: '10px'}}  to="/signin">SignIn</Link>
					<Link  style={{marginLeft: '10px'}}  to="/signup">SignUp</Link>
				</>
				)}

			</Nav>
		</Navbar.Collapse>
	</Navbar>
	)
}
export default MyNav