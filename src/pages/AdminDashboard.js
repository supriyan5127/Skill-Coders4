import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('courses');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        category: '',
        description: '',
        originalPrice: '',
        discountedPrice: '',
        discount: '50% OFF',
        image: ''
    });

    // Root password for access
    const ROOT_PASSWORD = 'skillcoders-admin-root';

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ROOT_PASSWORD) {
            setIsAuthenticated(true);
            fetchData(activeTab);
        } else {
            alert('Access Denied: Incorrect Root Password');
        }
    };

    const fetchData = async (collectionName) => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setData(items);
        } catch (error) {
            console.error("Error fetching documents: ", error);
            alert("Failed to load data. Is Firebase configured correctly?");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData(activeTab);
        }
    }, [activeTab, isAuthenticated]);

    const handleDelete = async (id) => {
        try {
            // Determine the correct collection name
            const targetCollection = (activeTab === 'contact_messages' || activeTab === 'enrollments') ? activeTab : activeTab;
            await deleteDoc(doc(db, targetCollection, id));
            setData(data.filter(item => item.id !== id));
            alert("Message deleted successfully!");
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error deleting: " + error.message);
        }
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            setFormData({
                title: item.title || '',
                name: item.name || '',
                category: item.category || '',
                description: item.description || '',
                originalPrice: item.originalPrice || '',
                discountedPrice: item.discountedPrice || '',
                discount: item.discount || '50% OFF',
                image: item.image || ''
            });
        } else {
            setFormData({
                title: '',
                name: '',
                category: activeTab, // default to current tab
                description: '',
                originalPrice: '',
                discountedPrice: '',
                discount: '50% OFF',
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Clean up data based on active tab
        const submitData = { ...formData };
        if (activeTab === 'gadgets') {
            submitData.name = submitData.title || submitData.name;
            delete submitData.title;
        } else {
            submitData.title = submitData.name || submitData.title;
            delete submitData.name;
        }

        try {
            if (editingItem) {
                // Update existing
                await updateDoc(doc(db, activeTab, editingItem.id), submitData);
            } else {
                // Add new
                await addDoc(collection(db, activeTab), submitData);
            }
            handleCloseModal();
            fetchData(activeTab); // Refresh data
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Failed to save changes.");
        }
    };



    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-box">
                    <h2>ROOT ACCESS REQUIRED</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Root Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">ACCESS PANEL</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <button
                    className={activeTab === 'courses' ? 'active' : ''}
                    onClick={() => setActiveTab('courses')}
                >
                    Manage Courses
                </button>
                <button
                    className={activeTab === 'careers' ? 'active' : ''}
                    onClick={() => setActiveTab('careers')}
                >
                    Manage Careers
                </button>
                <button
                    className={activeTab === 'gadgets' ? 'active' : ''}
                    onClick={() => setActiveTab('gadgets')}
                >
                    Manage Gadgets
                </button>
                <button
                    className={activeTab === 'contact_messages' ? 'active' : ''}
                    onClick={() => setActiveTab('contact_messages')}
                >
                    View Messages
                </button>
                <button
                    className={activeTab === 'enrollments' ? 'active' : ''}
                    onClick={() => setActiveTab('enrollments')}
                >
                    View Enrollments
                </button>
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <h1>{activeTab === 'contact_messages' ? 'Contact Inquiries' : activeTab === 'enrollments' ? 'Enrollments & Course Applications' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Management'}</h1>
                    <div>
                        {activeTab !== 'contact_messages' && activeTab !== 'enrollments' && (
                            <button className="add-btn" onClick={() => handleOpenModal()}>+ Add New</button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    {activeTab === 'contact_messages' ? (
                                        <>
                                            <th>Name</th>
                                            <th>Contact Info</th>
                                            <th>Message</th>
                                            <th>Actions</th>
                                        </>
                                    ) : activeTab === 'enrollments' ? (
                                        <>
                                            <th>Name</th>
                                            <th>Contact Info</th>
                                            <th>Course/Item</th>
                                            <th>Message</th>
                                            <th>Actions</th>
                                        </>
                                    ) : (
                                        <>
                                            <th>Title/Name</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={activeTab === 'contact_messages' ? "4" : activeTab === 'enrollments' ? "5" : "3"}>
                                            {activeTab === 'contact_messages' || activeTab === 'enrollments' ? "No messages found." : "No records found. Please migrate data to Firebase."}
                                        </td>
                                    </tr>
                                ) : (
                                    data.map(item => (
                                        <tr key={item.id}>
                                            {activeTab === 'contact_messages' ? (
                                                <>
                                                    <td>{item.fullName}</td>
                                                    <td>
                                                        <div>{item.email}</div>
                                                        <div style={{ fontSize: '0.85em', color: '#ccc' }}>{item.phone}</div>
                                                    </td>
                                                    <td style={{ maxWidth: '300px' }}>{item.message}</td>
                                                    <td>
                                                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                                    </td>
                                                </>
                                            ) : activeTab === 'enrollments' ? (
                                                <>
                                                    <td>{item.fullName}</td>
                                                    <td>
                                                        <div>{item.email}</div>
                                                        <div style={{ fontSize: '0.85em', color: '#ccc' }}>{item.phone}</div>
                                                    </td>
                                                    <td style={{ maxWidth: '200px' }}>{item.course}</td>
                                                    <td style={{ maxWidth: '300px' }}>{item.message}</td>
                                                    <td>
                                                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.title || item.name}</td>
                                                    <td>{item.category}</td>
                                                    <td>
                                                        <button className="edit-btn" onClick={() => handleOpenModal(item)}>Edit</button>
                                                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                        <form onSubmit={handleFormSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Title/Name</label>
                                <input
                                    type="text"
                                    name={activeTab === 'gadgets' ? 'name' : 'title'}
                                    value={activeTab === 'gadgets' ? formData.name : formData.title}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Original Price (₹)</label>
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={formData.originalPrice}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Discounted Price (₹)</label>
                                    <input
                                        type="number"
                                        name="discountedPrice"
                                        value={formData.discountedPrice}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image Path/URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="save-btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
