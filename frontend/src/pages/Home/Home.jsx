import React, { useEffect, useState } from "react";
import Button from "../../compents/Button/Button";
import Card from "../../compents/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotelList } from "../../Actions/hotelAction/hotelAction";
import { Link } from "react-router-dom";
import Loading from "../../compents/Loader/Loading";
import ReactPaginate from "react-paginate";
import './home.css'; // Add this line in your component if it's in a separate CSS file

const Home = () => {
  const { loading } = useSelector((store) => store.hotels);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [allHotels, setHotels] = useState([]);
  const hotelPerPage = 3;
  useEffect(() => {
    getAllhotels();
  }, []);
  const getAllhotels = async () => {
    let hotelList = await dispatch(getAllHotelList());
    setHotels(hotelList?.payload?.hotelList);
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const displayedHotels = allHotels.slice(
    currentPage * hotelPerPage,
    (currentPage + 1) * hotelPerPage
  );
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
            <div className="flex flex-row justify-center md:gap-4 gap-3 p-2 flex-wrap items-center">
              {displayedHotels ? (
                displayedHotels.map((item) => (
                  <Link
                    to={`/hotel/${item._id}`}
                    key={item._id}
                    className="w-[400px]"
                  >
                    <div>
                      <Card
                        hotelImage={item?.logo?.url || item?.logo}
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

          {allHotels.length > 0 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(allHotels.length /hotelPerPage)} // Total pages
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
