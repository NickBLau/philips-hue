import { useEffect, useState } from "react";
import "../App.css";
import user from "../assets/user.svg";
import Balcony from "../assets/roomAssets/balcony.svg";
import bathtube from "../assets/roomAssets/bathtube.svg";
import house from "../assets/roomAssets/house.svg";
import kitchen from "../assets/roomAssets/kitchen.svg";
import room from "../assets/roomAssets/room.svg";
import bedRoom from "../assets/roomAssets/bedRoom.svg";
import Footer from "../template/footer";

import tw from "tailwind-styled-components";

import { Link } from "react-router-dom";

const StyledRoomBox = tw.li`w-36 
h-36 
ml-5
bg-White 
rounded-3xl 
flex 
flex-col
justify-around
p-3
shadow-custom

`;

const StyledIcon = tw.img`
w-14 h-12
`;

const StyledRoomHeader = tw.h3`
font-bold
text-xl
text-Textblack
`;

const StyledRoomParagraph = tw.p`
font-bold
text-sm
text-TextYellow
`;

const ControlPanelPage = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Convert object to array
        const roomsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setRoomData(roomsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(roomData);
  }, []);

  return (
    <>
      <div className="flex justify-between px-8 items-center mt-12 mb-10 h-auto w-full">
        <h1 className="text-White text-3xl font-bold w-28">Control Panel</h1>

        <img src={user} alt="user" />
      </div>

      <div className=" bg-Lightgray rounded-tl-3xl pt-8 pb-10 rounded-tr-3xl ">
        <h2 className="text-Black font-bold text-lg mb-5 ml-5">All Rooms</h2>
        <nav>
          <ul className="flex gap-5 flex-wrap">
            {roomData.map((room) => (
              <Link to={`/roomDetailsPage/${room.id}`} key={room.id}>
                <StyledRoomBox>
                  <StyledIcon src={bedRoom} alt="bed Room" />
                  <div className="flex flex-col gap-2">
                    <StyledRoomHeader>{room.name}</StyledRoomHeader>
                    <StyledRoomParagraph>
                      {room.lights.length} lights
                    </StyledRoomParagraph>
                  </div>
                </StyledRoomBox>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      <Footer></Footer>
    </>
  );
};
export default ControlPanelPage;
