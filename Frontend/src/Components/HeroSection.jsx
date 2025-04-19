import React from 'react';

const HeroSection = () => {
    return (
        <div className="hero-section text-center py-5 bg-dark text-black"><br></br><br></br><br></br><br></br>
            <p className="display-4 my-custom-text"style={{color:"skyblue", background:"transparent",width:"800px","font-size":"50px","border-radius":"10px 0px 0px 10px",position:"absolute",right:"0px",top:"180px"}}><i>You're in HelloBook</i></p>
            <p className="lead" style={{color:"white", background:"transparent",width:"600px"}}><i>Purchase books from your favorite Book Stores and read more___</i></p>
            <form className="d-flex justify-content-center" style={{float:"left"}}>
                <input
                    className="form-control w-50 me-2 bg-secondary text-white"
                    type="search"
                    placeholder="Enter Book Store Name "
                    aria-label="Search"
                />
                <button className="btn btn-outline-light custom-btn" type="submit">Find Book Stores</button>
            </form><br></br><br></br><br></br><br></br>
        </div>
    );
};

export default HeroSection;