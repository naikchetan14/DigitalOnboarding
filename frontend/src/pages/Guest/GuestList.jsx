import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCurrentGuest,
  getAllGuestList,
} from "../../Actions/guestAction/guestActions";
import EditModal from "../../compents/Header/EditModal";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/guestReducers/guestReducers";
import ReactPaginate from "react-paginate";
const GuestList = () => {
  const { message, error } = useSelector((store) => store.guest);
  const { user } = useSelector((store) => store.user);
  const [currentPage, setCurrentPage] = useState(0);

  const alert = useAlert();
  const [allGuestList, setGuestList] = useState([]);
  const [currentGuestDetails, setCurrentGuestDetails] = useState({});
  const [isOpened, setisOpened] = useState(false);
  const [viewGuestDetails, setViewGuestDetails] = useState(null);
  const dispatch = useDispatch();
  const guestPerPage = 5;
  const geAlltGuestListData = async () => {
    try {
      const res = await dispatch(getAllGuestList());
      setGuestList(res?.payload?.guestListData);
    } catch (error) {
      console.log(error.message);
      alert.error(error.message);
    }
  };

  const deleteCurrentGuestData = async (guestId) => {
    try {
      await dispatch(deleteCurrentGuest(guestId));
      await geAlltGuestListData();
    } catch (error) {
      console.log(error.message);
      alert.error(error.message);
    }
  };

  const handleViewGuest = (guest) => {
    setViewGuestDetails(guest); // Set the selected guest's details to view
  };
  const handlePrint = () => {
    window.print(); // Print the current page (guest details page)
  };

  useEffect(() => {
    geAlltGuestListData();
  }, [isOpened]);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const displayedGuest = allGuestList.slice(
    currentPage * guestPerPage,
    (currentPage + 1) * guestPerPage
  );
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg p-3">
      <h1 className="text-center text-2xl mt-3 mb-3">Guest List</h1>
      <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400 scroll-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Hotel Name
            </th>
            <th scope="col" className="px-6 py-3">
              Hotel Logo
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Guest Name
            </th>

            <th scope="col" className="px-6 py-3">
              Guest Stay From
            </th>

            <th scope="col" className="px-6 py-3">
              Guest Stay To
            </th>
            {user.role !== "mainAdmin" && (
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedGuest.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{item?.hotelId?.hotelName}</td>
              <td className="px-6 py-4">
                <img
                  src={item?.hotelId?.logo}
                  alt={item?.hotelId?.hotelName}
                  className="w-[70px] object-cover rounded-sm"
                ></img>
              </td>

              <td className="px-6 py-4">{item.address}</td>
              <td className="px-6 py-4">{item.fullName}</td>
              <td className="px-6 py-4">{item.stayFrom.substring(0, 10)}</td>
              <td className="px-6 py-4">{item.stayTo.substring(0, 10)}</td>

              {user.role !== "mainAdmin" && (
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-900 font-bold"
                    onClick={() => {
                      setisOpened(!isOpened);
                      setCurrentGuestDetails(item);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square mx-1"></i>Edit
                  </button>
                  <button
                    type="button"
                    className="ml-4 text-red-600 hover:text-red-900 font-bold"
                    onClick={() => deleteCurrentGuestData(item._id)}
                  >
                    <i className="fa-solid fa-trash mx-1"></i>Delete
                  </button>
                  <button
                    type="button"
                    className="ml-4 text-green-600 hover:text-red-900 font-bold"
                    onClick={() => handleViewGuest(item)}
                  >
                    <i className="fa-solid fa-eye mx-1"></i>View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {allGuestList.length > 0 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(allGuestList.length /guestPerPage)} // Total pages
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
      {isOpened && (
        <EditModal
          setisOpened={setisOpened}
          currentGuestData={currentGuestDetails}
        ></EditModal>
      )}

      {viewGuestDetails && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="modal-content bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-bold">Guest Details</h2>
            <p>
              <strong>Hotel Name:</strong>{" "}
              {viewGuestDetails?.hotelId?.hotelName}
            </p>
            <p>
              <strong>Hotel Logo:</strong>
            </p>
            <img
              src={viewGuestDetails?.hotelId?.logo}
              alt="Hotel Logo"
              className="w-[100px] object-cover rounded-sm mb-4"
            />
            <p>
              <strong>Address:</strong> {viewGuestDetails.address}
            </p>
            <p>
              <strong>purposeOfVisit:</strong> {viewGuestDetails.purposeOfVisit}
            </p>

            <p>
              <strong>Guest Name:</strong> {viewGuestDetails.fullName}
            </p>
            <p>
              <strong>Guest Stay From:</strong>{" "}
              {viewGuestDetails.stayFrom.substring(0, 10)}
            </p>
            <p>
              <strong>Guest Stay To:</strong>{" "}
              {viewGuestDetails.stayTo.substring(0, 10)}
            </p>
            <p>
              <strong>Email:</strong> {viewGuestDetails.email}
            </p>
            <p>
              <strong>Mobile:</strong> {viewGuestDetails.mobileNumber}
            </p>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="mt-3 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Print Details
            </button>
            <button
              onClick={() => setViewGuestDetails(null)} // Close modal
              className="ml-3 bg-gray-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestList;
