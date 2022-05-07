import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./room.css";

//axios
import axios from "axios";

//url base
import url_base from "../../../config/env";
//Loader
import Loader from "../../../assets/loader/Loader";
import { Category } from "@material-ui/icons";

const Room = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState("none");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader("flex");
        let data = await axios.get(`${url_base}categories`);
        setCategories(data.data.data);
        setLoader("none");
      } catch (error) {
        console.log(error.response);
        setLoader("none");
      }
    };
    getData();
  }, []);

  return (
    <div className="container-rooms">
      <Loader display={loader} />
      {categories.map((cg, i) => (
        <div className="rooms-body">
          <div>
            <h4 className="title">{cg.name}</h4>
            <hr/>
            <div className="card-body">
              <div>
                <h5>Characteristics</h5>
                <ul>
                  <li>
                    Price: <b>${cg.price}</b>
                  </li>
                  <li>
                    Max people: <b>{cg.max}</b>
                  </li>
                </ul>
                <h5>Amenities</h5>
                <ul>
                  <li>AC</li>
                  <li>Television</li>
                  <li>Internet</li>
                  <li>Refrigerator</li>
                  {i === 1 && (
                    <>
                      <li>Xbox </li>
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <li>Xbox </li>
                      <li>jacuzzi</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="description">
                <h5>Description</h5>
                <p>
                  A room assigned to one person. May have one or more beds. The
                  room size or area of Single Rooms are generally between 37 m²
                  to 45 m²
                </p>
              </div>
            </div>
          </div>
          <div>
          <h4 className="title">&nbsp;</h4>
            <Carousel
              fullHeightHover={false} // We want the nav buttons wrapper to only be as big as the button element is
              navButtonsProps={{
                // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                  backgroundColor: "cornflowerblue",
                  borderRadius: 0,
                },
              }}
              navButtonsWrapperProps={{
                // Move the buttons to the bottom. Unsetting top here to override default style.
                style: {
                  bottom: "0",
                  top: "unset",
                },
              }}
              NextIcon="next" // Change the "inside" of the next button to "next"
              PrevIcon="prev"
            >
              {cg.Images.map((im, i) => (
                <figure key={i}>
                  <img src={im.url} alt="cargando" />
                </figure>
              ))}
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Room;
