import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings'
import Upload from '@mui/icons-material/Upload'
import Category from '@mui/icons-material/Category'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Menubar = () => {

	const { user } = useSelector(state => state.user)

	const [openDrawer, setOpenDrawer] = useState(false);
	const [tab, setTab] = useState(window.location.pathname);

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};


	let id;
	if (user) {
		id = user._id;
	}


	return (
		<div className='menu-main'>

			


			<div className='notmobj'>

				<Link to="/" onClick={() => setTab("/")}>

					<div className='' >
						{
							tab === "/" ? (
								<div className='menus a2'>
									<HomeIcon />
									<h4>Home</h4>
								</div>
							) : (
								<div className='menus a1'>
									<HomeIcon />
									<h4>Home</h4>
								</div>
							)
						}
					</div>
				</Link>

				<Link to="/discussion">
					{tab === "/discussion" ? (
						<div className='menus a2'>
							<PeopleAltIcon />
							<h4>Discussion</h4>
						</div>

					) : (
						<div className='menus a1'>
							<PeopleAltIcon />
							<h4>Discussion</h4>
						</div>
					)
					}
				</Link>

				<Link to="/category">

					{
						tab === "/category" ? (
					<div className='menus a2'>
						<Category />
						<h4>Category</h4>
					</div>

						) : (
							<div className='menus a1'>
							<Category />
							<h4>Category</h4>
						</div>
						)
					}
				</Link>


				{
					user && user.role === "admin" ? (
						<>
							<Link to="/admin">

								{
									tab === "/admin" ? (
								<div className='menus a2' onClick={toggleDrawer}>
									<VerifiedUserIcon />
									<h4>Admin</h4>
								</div>

									) : (
										<div className='menus a1' onClick={toggleDrawer}>
										<VerifiedUserIcon />
										<h4>Admin</h4>
									</div>
									)
								}
							</Link>

						</>
					) : ""
				}


{user && (user.role === "admin" || user.role ==="instructer") ? (
						<Link to="/upload">

							{
								tab === "/upload" ? (
							<div className='menus a2'>
								<Upload />
								<h4>Upload</h4>
							</div>

								): (
									<div className='menus a1'>
									<Upload />
									<h4>Upload</h4>
								</div>
								)
							}
						</Link>

) :" "
 }

				{user  ? (
					<>



						<Link to={`/fav/${id}`}>
						
						{
							tab === `/fav/${id}` ? (
							<div className='menus a2'>
								<FavoriteIcon />
								<h4>Fav</h4>
							</div>

							):(
								<div className='menus a1'>
								<FavoriteIcon />
								<h4>Fav</h4>
							</div>
							)
						}
						</Link>

						<Link to={`/profile/${id}`}>

							{
								tab === `/profile/${id}` ? (
							<div className='menus a2'>
								<PersonIcon />
								<h4>Profile</h4>
							</div>

								): (
									<div className='menus a1'>
									<PersonIcon />
									<h4>Profile</h4>
								</div>
								)
							}
						</Link>

						{/* <div className='menus a1'>
							<SettingIcon />
							<h4>Settings</h4>
						</div> */}

					</>
				) : (
					""
				)}


			</div>



		</div>
	)
}

export default Menubar