import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Casestudies.css';

const CaseStudiesList = () => {
  const caseStudies = [
    {
      id: 1,
      title: 'EDA Basics in E-Commerce',
      description: 'Analyze customer purchase patterns in an e-commerce dataset using Python libraries like Pandas, Matplotlib, and Seaborn.',
      image: '/images/ecommerce.jpg', // Update to the correct path
    },
    {
      id: 2,
      title: 'Feature Engineering in Healthcare',
      description: 'Predict diabetes risk using patient health data while learning feature engineering and classification models.',
      image: '/images/healthcare.jpg',
    },
    {
      id: 3,
      title: 'Regression Modeling in Finance',
      description: 'Predict house prices using regression techniques, feature selection, and evaluation metrics.',
      image: '/images/finance.jpg',
    },
  ];

  return (
    <div className="case-studies-list">
      <h1>Case Studies</h1>
      <div className="case-studies-container">
        {caseStudies.map((caseStudy) => (
          <Link
            to={`/case-studies/${caseStudy.id}`} // Dynamically route based on the id
            key={caseStudy.id}
            className="case-study-card"
          >
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="case-study-image"
            />
            <div className="case-study-info">
              <h2>{caseStudy.title}</h2>
              <p>{caseStudy.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesList;
