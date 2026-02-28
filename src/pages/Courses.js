import React, { useState, useEffect } from 'react';
import './Courses.css';
import EnrollModal from './EnrollModal';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Courses = () => {
  // State for the modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCoursesData(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = [...new Set(coursesData.map(course => course.category))].filter(Boolean);

  // (Optional) If you still want a cart, keep this – otherwise you can remove it
  // const [cart, setCart] = useState([]);

  const handleAddToCart = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    // If you want to also add to cart, uncomment the next line:
    // setCart([...cart, course]);
  };

  return (
    <div className="courses-page">
      <section className="courses-hero">
        {/* ... hero section unchanged ... */}
        <div className="container">
          <h1>Transform Your Career</h1>
          <p>Master in-demand skills with our premium courses at <span className="highlight">50% OFF</span></p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">100K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat">
              <span className="stat-number">50%</span>
              <span className="stat-label">OFF Today</span>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
          <h2>Loading Courses...</h2>
        </div>
      ) : coursesData.length === 0 ? (
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
          <h2>No courses available right now.</h2>
        </div>
      ) : categories.map(category => (
        <section key={category} className="category-section">
          <div className="container">
            <h2 className="category-title">{category}</h2>
            <div className="courses-grid">
              {coursesData
                .filter(course => course.category === category)
                .map(course => (
                  <div className="course-card" key={course.id}>
                    <div className="course-image">
                      <img src={course.image} alt={course.title} />
                    </div>
                    <div className="course-info">
                      <h3>{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <div className="price-section">
                        <span className="original-price">₹{course.originalPrice}</span>
                        <span className="discounted-price">₹{course.discountedPrice}</span>
                        <span className="discount-badge">{course.discount}</span>
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(course)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* Render the modal when a course is selected */}
      {isModalOpen && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Courses;