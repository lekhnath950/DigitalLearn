import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'
import Navbar from '../Navbar/Navbar';
import LeftNav from '../Navbar/LeftNav';

const Admin = () => {
	const [allUser, setAllUser] = useState([]);
	const [editUserId, setEditUserId] = useState('');
	const [editName, setEditName] = useState('');
	const [editEmail, setEditEmail] = useState('');
	const [editRole, setEditRole] = useState('');

	useEffect(() => {
		const fetchAllUsers = async () => {
			const res = await axios.get('/users/allusers');
			setAllUser(res.data);
		};
		fetchAllUsers();
	}, []);

	const handleEdit = (userId) => {
		setEditUserId(userId);
		const user = allUser.find((u) => u._id === userId);
		setEditName(user.name);
		setEditEmail(user.email);
		setEditRole(user.role);
	};

	const handleSave = async () => {
		const res = await axios.post(`/users/find/${editUserId}`, {
			name: editName,
			email: editEmail,
			role: editRole,
		});
		// Update the user in the state
		const updatedUser = res.data;
		setAllUser((prevState) =>
			prevState.map((user) =>
				user._id === updatedUser._id ? updatedUser : user
			)
		);
		// Clear the edit state
		setEditUserId('');
		setEditName('');
		setEditEmail('');
		setEditRole('');
	};

	return (
		<div>

			<div>
				<Navbar />
			</div>
			<div>
				<LeftNav />
			</div>
			<div style={{ 'margin': 200 }}>
				<table className='adminTable'>
					<thead>
						<tr>
							<th>Role</th>
							<th>Name</th>
							<th>Email</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{allUser.map((user) => (

							<tr key={user._id}>
								<td>
									{editUserId === user._id && user.role !== "owner" ? (

										<select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
											<option value="user">User</option>
											<option value="admin">Admin</option>
											<option value="owner">Owner</option>
										</select>

									) : (
										user.role
									)}
								</td>
								<td>
									{editUserId === user._id ? (
										<input
											type="text"
											value={editName}
											onChange={(e) => setEditName(e.target.value)}
										/>
									) : (
										user.name
									)}
								</td>
								<td>
									{editUserId === user._id ? (
										<input
											type="text"
											value={editEmail}
											onChange={(e) => setEditEmail(e.target.value)}
										/>
									) : (
										user.email
									)}
								</td>
								<td>
									{editUserId === user._id ? (
										<button onClick={handleSave}>Save</button>
									) : (
										<button onClick={() => handleEdit(user._id)}>Edit</button>
									)}
								</td>
							</tr>
						))}
					</tbody>

				</table>
			</div>
		</div>
	);
};

export default Admin;
