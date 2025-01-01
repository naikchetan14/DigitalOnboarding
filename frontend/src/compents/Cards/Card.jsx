import React from "react";
import Button from "../Button/Button";

const Card = ({ hotelName, address, hotelImage, qrCodeImage }) => {
  return (
    <div className="p-8 rounded-md shadow-2xl bg-white flex flex-col gap-1 max-w-[400px] w-full hover:border-violet-950 hover:border-2 transition-all">
      <div className="flex-1 flex flex-col gap-2">
        <img
          src={hotelImage}
          alt={`Image of ${hotelName}`}
          className="w-full h-full object-cover rounded-md md:mb-0"
        />
        <h1 className="text-3xl font-bold text-center">{hotelName}</h1>
        <h4 className="text-md text-gray-60 text-center">{address}</h4>
        <p className="text-center font-bold">Scan This Below Code to fill the guest details...</p>
        <div className="w-100 mx-auto"><i className="fa-sharp fa-solid fa-arrow-down text-3xl text-violet-950 font-bold"></i></div>
      </div>

      <div className="flex-1">
        <img
          src={qrCodeImage}
          alt={`QR Code for ${hotelName}`}
          className="h-32 md:w-full md:h-[300px] object-contain block m-auto"
        />
      </div>

      {/* <div className="flex flex-row gap-2">
          <Button
            btnType={"button"}
            btnText={"DELETE"}
            btnBgColor={"red"}
            btnTextColor={"white"}
            btnIcon={<i className="fa fa-trash mx-1" aria-hidden="true"></i>}
          ></Button>
          <Button
            btnType={"button"}
            btnText={"GUEST"}
            btnBgColor={"orange"}
            btnTextColor={"white"}
            btnIcon={<i className="fa-solid fa-hotel mx-1"></i>}
          ></Button>
        </div>{" "} */}
    </div>
  );
};

Card.defaultProps = {
  hotelName: "Taj Hotel",
  address: "Mumbai Solapur 9000",
  hotelImage:
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=",
  qrCodeImage:
    "data:image/png;base64,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",
};

export default Card;
