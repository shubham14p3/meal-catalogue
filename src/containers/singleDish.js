import React , { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import fetchDish from '../actions/dish';

const SingleDish = props => {
  const { mealID } = useParams();

  const {
    dish,
    loading,
    error,
    fetchDish,
  } = props;

  useEffect(() => {
    if (mealID) {
      fetchDish(mealID);
    }
  }, [fetchDish, mealID]);

  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
  } = dish;


  return (
    <section className="meals-section">
      <Container>
        <h3>{strMeal}</h3>
        <Row>
          {(() => {
            if (loading) {
              return (<p>Loading....</p>);
            }
            return (
              error ? <p>{error.message}</p> :
              <>
                <Col md={6} lg={6} sm={10}>
                  <div className="single-dish">
                    <img src={strMealThumb} style={{width: '100%'}}/>
                  </div>
                </Col>
                <Col md={6} lg={6} sm={10}>
                  <div className="dish-instructions">
                    <p>{strInstructions}</p>
                  </div>
                </Col>
              </>
            );
          })() }
        </Row>
      </Container>
    </section>
  );
};


const mapStateToProps = state => ({
  dish: state.dish.dish,
  loading: state.dish.loading,
  error: state.dish.error,
});

const mapDispatchTOProps = dispatch => ({
  fetchDish: mealId => {
    dispatch(fetchDish(mealId));
  }
});

export default connect(mapStateToProps, mapDispatchTOProps) (SingleDish);