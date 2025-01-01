import React, { useEffect, useState } from "react";
import Button from "../../compents/Button/Button";
import Card from "../../compents/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotelList } from "../../Actions/hotelAction/hotelAction";
import { Link } from "react-router-dom";
import Loading from "../../compents/Loader/Loading";

const Home = () => {
  const { loading } = useSelector((store) => store.hotels);
  const dispatch = useDispatch();
  const [allHotels, setHotels] = useState([]);
  useEffect(() => {
    getAllhotels();
  }, []);
  const getAllhotels = async () => {
    let hotelList = await dispatch(getAllHotelList());
    setHotels(hotelList?.payload?.hotelList);
  };
  return (
    <div>
      <div>
        <div className="md:px-9">
          <div>
            {/* <Button btnType={'button'} btnText={'view All Guests'} btnTextColor={'white'} btnBgColor={'red'}></Button> */}
            <h1 className="text-violet-950  mb-3 mt-3 font-bold text-4xl text-center">
              Hotels List
            </h1>
          </div>

          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="flex flex-row justify-center md:gap-4 gap-3 flex-wrap items-center">
              {allHotels ? (
                allHotels.map((item) => (
                  <Link to={`/hotel/${item._id}`} key={item._id}>
                    <div>
                      <Card
                        hotelImage={item.logo}
                        hotelName={item.hotelName}
                        address={item.address}
                        qrCodeImage={item.qrCode}
                      ></Card>
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  <h3 className="text-gray-500">
                    No Hotels to Show!{" "}
                    <span className="text-red-500">Sorry</span>Sorry
                  </h3>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
