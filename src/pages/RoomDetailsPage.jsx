///////////////------imports///////////////------
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import "../App.css";
import Footer from "../template/footer";
////////////----images---////////

import lampWithoutBulb from "../assets/lampWithoutBulb.svg";
import LightBulb from "../assets/LightBulb.svg";
import LightBulbOn from "../assets/LightBulbOn.svg";
import LightBulbOff from "../assets/LightBulbOff.svg";
import PowerButton from "../assets/PowerButton.svg";
import backArrow from "../assets/backArrow.svg";
import xyToRgb from "../lib/convert-to-rgb";
const StyledButton = tw.button`
min-w-32
h-11
text-Black 
flex 
gap-5 
justify-center
items-center 
bg-White 
rounded-2xl
${(props) => (props.isActive ? "bg-blue-600" : "")}
${(props) => (props.isActive ? "border-solid border-slate-600 border-2" : "")}
${(props) => (props.isActive ? "text-white" : "")}

`;

const BedRoomPage = () => {
  const [lightData, setlightData] = useState([]);
  const [singlelightData, setSinglelightData] = useState([]);
  const [LightOn, setLightOn] = useState();
  const { id } = useParams();
  const [ActiveLightBulb, setActiveLightBulb] = useState(lightData.lights?.[0]);
  const [rangeValue, setRangeValue] = useState(singlelightData.state?.bri);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRGBColor, setSelectedRGBColor] = useState("");
  ///---get group----///
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups/${id}`,
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
        setlightData(data);
        setLightOn(data.state.on);
        setActiveLightBulb(data.lights?.[0]);
        // Set brightness and color before changing state
        setRangeValue(data.state.bri);
        setSelectedColor(data.state.xy);

        // const x = singlelightData?.state?.xy[0];
        // const y = singlelightData?.state?.xy[1];
        // const bri = singlelightData?.state?.bri || 0;
        // console.log("XX", singlelightData.state.xy[0]);
        // console.log("YY", singlelightData.state.xy[1]);
        // console.log(y + "y");
        // const newCssColor = xyToRgb({ x, y, bri });
        // setSelectedRGBColor(newCssColor);
        // console.log(selectedRGBColor, "hello2");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  ///---get single---///
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/lights/${ActiveLightBulb}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSinglelightData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, selectedColor, rangeValue, ActiveLightBulb]);

  // const handleColorButtonClick = (color) => {
  //   setSelectedColor(color);
  // };

  const handleLightButtonClick = (light) => {
    setActiveLightBulb(light);
  };

  const handleRangeChange = async (event) => {
    const newBrightness = event.target.value;

    try {
      const response = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups/${id}/action`,
        {
          method: "PUT",
          body: JSON.stringify({ bri: parseInt(newBrightness), on: true }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setRangeValue(newBrightness);
    } catch (error) {
      console.error("Error updating brightness:", error);
    }
  };

  const handleColorButtonClick = async (color) => {
    setSelectedColor(color);

    try {
      const response = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/lights/${ActiveLightBulb}/state`,
        {
          method: "PUT",
          body: JSON.stringify({
            xy: getColorCoordinatesForColor(color),
            on: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleScenesButtonClick = async (color) => {
    setSelectedColor(color);

    try {
      const response = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups/${id}/action`,
        {
          method: "PUT",
          body: JSON.stringify({
            xy: getColorCoordinatesForColor(color),
            on: true,
            effect: "breathe",
            alert: "select",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };
  const handleBirthdayButtonClick = async (color) => {
    setSelectedColor(color);

    try {
      const response = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups/${id}/action`,
        {
          method: "PUT",
          body: JSON.stringify({
            xy: getColorCoordinatesForColor(color),
            on: true,
            effect: "colorloop",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleRelaxButtonClick = async (color) => {
    setSelectedColor(color);

    try {
      const response = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups/${id}/action`,
        {
          method: "PUT",
          body: JSON.stringify({
            xy: getColorCoordinatesForColor(color),
            on: true,
            effect: "none",
            alert: "none",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      const lightsInGroup = lightData.lights || [];

      // Fetch the current state of the first light in the group
      const firstLightId = lightsInGroup[0];
      const firstLightResponse = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/lights/${firstLightId}`,
        {
          method: "GET",
        }
      );

      if (!firstLightResponse.ok) {
        throw new Error(`HTTP error! Status: ${firstLightResponse.status}`);
      }

      const firstLightData = await firstLightResponse.json();
      const firstLightState = firstLightData.state.on;

      // Toggle the state for each light in the group
      for (const lightId of lightsInGroup) {
        await fetch(
          `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/lights/${lightId}/state`,
          {
            method: "PUT",
            body: JSON.stringify({ on: !firstLightState }),
          }
        );
      }

      // Toggle the overall group state
      const groupResponse = await fetch(
        `http://192.168.8.100/api/FSbAjwIiVCW5vJ2M9f7B8oUVbvNjVKmunI0vJb9J/groups/${id}/action`,
        {
          method: "PUT",
          body: JSON.stringify({ on: !firstLightState }),
        }
      );

      if (!groupResponse.ok) {
        throw new Error(`HTTP error! Status: ${groupResponse.status}`);
      }

      setLightOn(!firstLightState);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // console.log("single", singlelightData);

  // const handleRangeChange = (event) => {
  //   setRangeValue(event.target.value);
  // };
  // console.log(rangeValue);
  // console.log(lightData.state.hue);

  const getColorCoordinatesForColor = (color) => {
    switch (color) {
      case "bg-LightPink":
        return [0.4754, 0.2119];
      case "bg-LightGreen":
        return [0.4085, 0.5175];
      case "bg-LightBlue":
        return [0.1689, 0.0418];
      case "bg-Purple":
        return [0.2738, 0.0912];
      case "bg-LightPurple":
        return [0.3012, 0.102];
      case "bg-LightYellow":
        return [0.4438, 0.4994];
      default:
        return [0.5, 0.5];
    }
  };
  console.log(lightData);
  // console.log(singlelightData.state?.bri);
  // console.log(LightOn);

  console.log("YY", singlelightData?.state?.xy[0]);
  // useEffect(() => {
  //   const x = singlelightData?.state?.xy[0];
  //   const y = singlelightData?.state?.xy[1];
  //   const bri = singlelightData?.state?.bri || 0;
  //   const newCssColor = xyToRgb({ x, y });
  //   setSelectedColor(newCssColor);
  // }, [singlelightData?.state?.bri, singlelightData?.state.xy]);
  console.log(selectedRGBColor, "hello");
  return (
    <>
      <div className="flex justify-around">
        <div className="flex flex-col gap-1">
          <h1 className="text-White text-3xl mt-10 font-bold  w-28">
            <Link to="/">
              <img src={backArrow} alt="back" />
            </Link>
            {lightData.name}
          </h1>
          <p className="text-DarkYellow text-xl font-bold">
            {lightData.lights?.length} lights
          </p>
        </div>
        <div className="flex flex-col  mb-10">
          <img className="z-50" src={lampWithoutBulb} alt="Lamp" />

          <div
            className={`w-7 h-7 m-auto -mt-3 blur-[1px] ${selectedColor} rounded-full`}
          ></div>
        </div>
      </div>
      <div className="flex ml-10  overflow-x-auto scrollbar-hidden gap-4 m-auto mb-5">
        {lightData.lights?.map((light, index) => (
          <StyledButton
            key={index}
            isActive={light === ActiveLightBulb}
            onClick={() => handleLightButtonClick(light)}
          >
            <img className="font-bold" src={LightBulb} alt="Light Bulb" />
            <span className="font-bold">nr. {light}</span>
          </StyledButton>
        ))}
      </div>
      <div className=" bg-Lightgray rounded-tl-3xl rounded-tr-3xl h-[480px]">
        <div className="flex justify-end mt-8 w-full">
          <button
            onClick={() => {
              handleButtonClick();
              handleColorButtonClick(LightOn ? "bg-black" : "bg-white");
            }}
          >
            <img className="mr-4 -mt-4" src={PowerButton} alt="PowerButton" />
          </button>
        </div>
        <div
          className={`w-7 h-7 m-auto -mt-3 blur-[1px]  rounded-full`}
          // style={{ backgroundColor: selectedRGBColor }}
        ></div>
        <h2 className="text-Black font-bold bg text-lg mb-5 ml-3">Intensity</h2>
        {/* <div className="flex justify-around pl-6 pr-6 flex-wrap gap-3">
          {" "}
          <p>{singlelightData?.state?.bri} bri</p>
          <p>{singlelightData?.state?.xy[0]} x</p>
          <p>{singlelightData?.state?.xy[1]} y</p>
        </div> */}

        <div className="flex items-center">
          <img
            className="mx-3 text-Lightgray"
            src={LightBulbOff}
            alt="Light Bulb"
            onClick={() => handleButtonBrigtnessClick()}
          />

          <input
            className="w-3/4  text-DarkYellow "
            type="range"
            min="1"
            max="254"
            value={singlelightData?.state?.bri}
            onChange={handleRangeChange}
          ></input>

          <img
            className="mx-3 text-Lightgray"
            src={LightBulbOn}
            alt="Light Bulb"
          />
        </div>
        <h2 className="text-Black font-bold text-lg mt-4 mb-5 ml-3">Color</h2>
        <div>
          <div className="flex ml-3 mt-2 justify-evenly mb-8 items-center">
            <button
              className="w-7 h-7 bg-LightPink rounded-full"
              onClick={() => handleColorButtonClick("bg-LightPink")}
            ></button>
            <button
              className="w-7 h-7 bg-LightGreen rounded-full"
              onClick={() => handleColorButtonClick("bg-LightGreen")}
            ></button>
            <button
              className="w-7 h-7 bg-LightBlue rounded-full"
              onClick={() => handleColorButtonClick("bg-LightBlue")}
            ></button>
            <button
              className="w-7 h-7 bg-LightPurple rounded-full"
              onClick={() => handleColorButtonClick("bg-LightPurple")}
            ></button>
            <button
              className="w-7 h-7 bg-Purple rounded-full"
              onClick={() => handleColorButtonClick("bg-Purple")}
            ></button>
            <button
              className="w-7 h-7 bg-LightYellow rounded-full"
              onClick={() => handleColorButtonClick("bg-LightYellow")}
            ></button>
            <button
              className="w-7 h-7 flex justify-center bg-White rounded-full"
              onClick={() => handleColorButtonClick("bg-White")}
            >
              +
            </button>
          </div>
        </div>

        <h2 className="text-Black font-bold text-lg mb-5 ml-3">Scenes</h2>
        <div className="flex justify-center text-white  gap-6 m-auto flex-wrap">
          <button
            className="w-36 h-14 flex items-center text-White justify-around bg-LightPink rounded-2xl"
            onClick={() => handleBirthdayButtonClick("bg-LightPink")}
          >
            <img
              src={LightBulb}
              alt="Light Bulb"
              className="filter brightness-0 invert"
            />{" "}
            Birthday
          </button>
          <button
            className="w-36 h-14 flex items-center text-White justify-around bg-Purple rounded-2xl"
            onClick={() => handleScenesButtonClick("bg-LightPurple")}
          >
            <img
              src={LightBulb}
              alt="Light Bulb"
              className="filter brightness-0 invert"
            />
            Party
          </button>
          <button
            className="w-36 h-14  flex items-center text-White justify-around bg-LightBlue rounded-2xl"
            onClick={() => handleRelaxButtonClick("bg-LightBlue")}
          >
            <img
              src={LightBulb}
              alt="Light Bulb"
              className="filter brightness-0 invert"
            />
            Relax
          </button>
          <button
            className="w-36 h-14  flex items-center text-White justify-around bg-LightGreen rounded-2xl"
            onClick={() => handleScenesButtonClick("bg-LightGreen")}
          >
            <img
              src={LightBulb}
              alt="Light Bulb"
              className="filter brightness-0 invert"
            />
            Fun
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BedRoomPage;
