import React from "react";

const sections = [
  {
    id: "img2",
    text: "A Student Focussed Landmark & Place of Arrival",
    type: "Residential Property",
    location: "Jalandhar, Punjab",
  },
  {
    id: "img3",
    text: "A Student Focussed Landmark & Place of Arrival",
    type: "Commercial Property",

    location: "Jalandhar, Punjab",
  },
  {
    id: "img4",
    text: "A Student Focussed Landmark & Place of Arrival",
    type: "Industrial Property",

    location: "Jalandhar, Punjab",
  },
  {
    id: "img5",
    text: "A Student Focussed Landmark & Place of Arrival",
    type: "Interior Design Property",

    location: "Jalandhar, Punjab",
  },
];

const Home2 = () => {
  return (
    <div>
      {sections.map((section) => (
        <div
          key={section.id}
          className={`${section.id} mb-1 relative text-`}
        >
          <div className="lg:p-10 p-5">
          <span className="text-2xl font-semibold lg:text-6xl lg:font-medium">
            {section.text.split(" & ").map((line, index) => (
              <React.Fragment key={index}>
                {line} {index === 0 && <br />}
              </React.Fragment>
            ))}
          </span>
          </div>

          <div className=" backdrop-blur-[2px] px-5 w-full bg-slate-400/10 flex items-center absolute bottom-0 pt-5 pb-5">
            {/* <div className=""> */}
            <div className="text-xl font-semibold lg:ps-20 lg:text-3xl lg:font-semibold">
              <div className="">
                <span className="">
                  {section.type}
                </span>{" "}
                <br />
                <span className="text-base font-light lg:text-2xl lg:font-medium ">
                  {section.location}
                </span>
              </div>
            </div>

            <div className="group flex  items-center absolute right-10 lg:right-20">
              <div
                className="bg-white text-black  p-3 py-5 cursor-pointer hover1 group-hover:bg-primary group-hover:text-white font-semibold"
                style={{ borderRadius: "500px" }}
              >
                More
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home2;
