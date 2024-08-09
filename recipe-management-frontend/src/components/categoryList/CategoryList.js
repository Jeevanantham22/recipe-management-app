import React from 'react'
import './CategoryList.css';
import { NavLink } from 'react-router-dom';

const CategoryList = () => {
  return (
    <div className='categoryContainer'>
        <ul>
            <li><NavLink to='/dashboard' className="categoryLink">All</NavLink></li>
            <li><NavLink to='/dashboard' className="categoryLink">Breakfast</NavLink></li>
            <li><NavLink to='/dashboard' className="categoryLink">Lunch</NavLink></li>
            <li><NavLink to='/dashboard' className="categoryLink">Dinner</NavLink></li>
            <li><NavLink to='/dashboard' className="categoryLink">Dessert</NavLink></li>            
        </ul>
    </div>
  )
};

export default CategoryList;