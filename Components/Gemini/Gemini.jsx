// import { useContext } from "react";
// import { assets } from "../../assets/assets";
// import "./Gemini.css";
// import { Context } from "../../context/Context";
// import bgimage from "./Geminiui.png"

// const Main = () => {
//     const {
//         onSent,
//         recentPrompt,
//         showResults,
//         loading,
//         resultData,
//         setInput,
//         input,
//     } = useContext(Context);

//     const handleCardClick = (promptText) => {
//         setInput(promptText);
//     };

//     return (
//         <div className="main">
//             <div className="background-video">
//                 {/* <video autoPlay loop muted>
//                     <source src={assets.animationUI} type="video/mp4" />
//                 </video> */}
// 				<img src={bgimage} alt="image" />
//             </div>
//             <div className="nav">
//                 <p>YouTube AI</p>
//                 <img src={assets.user} alt="User Avatar" />
//             </div>
//             <div className="main-container">
//                 {!showResults ? (
//                     <>
//                         <div className="greet">
//                             <p>
//                                 Hello, <span className="name">Tanay</span>
//                             </p>
//                             <p>What's on your YouTube today?</p>
//                         </div>
//                         <div className="cards">
//                             <div
//                                 className="card"
//                                 onClick={() =>
//                                     handleCardClick("Give me the C++ code to reverse a string on yt")
//                                 }
//                             >
//                                 <p>Reverse a string using C++</p>
//                                 <img src={assets.compass_icon} alt="Compass Icon" />
//                             </div>
//                             <div
//                                 className="card"
//                                 onClick={() =>
//                                     handleCardClick("Educational yt channels python?")
//                                 }
//                             >
//                                 <p>Education channels teaching Python?</p>
//                                 <img src={assets.message_icon} alt="Message Icon" />
//                             </div>
//                             <div
//                                 className="card"
//                                 onClick={() =>
//                                     handleCardClick("What are some trending videos in news right now on yt?")
//                                 }
//                             >
//                                 <p>What are some trending videos in news right now?</p>
//                                 <img src={assets.bulb_icon} alt="Bulb Icon" />
//                             </div>
//                             <div
//                                 className="card"
//                                 onClick={() => {
//                                     handleCardClick(
//                                         "Create a script for the YouTube video about coding"
//                                     );
//                                 }}
//                             >
//                                 <p>Create a script for the YouTube video about coding</p>
//                                 <img src={assets.code_icon} alt="Code Icon" />
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="result">
//                         <div className="result-title">
//                             <img src={assets.user} alt="User Avatar" />
//                             <p>{recentPrompt}</p>
//                         </div>
//                         <div className="result-data">
//                             <img src={assets.gemini_icon} alt="Gemini Icon" />
//                             {loading ? (
//                                 <div className="loader">
//                                     <hr />
//                                     <hr />
//                                     <hr />
//                                 </div>
//                             ) : (
//                                 <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 <div className="main-bottom">
//                     <div className="search-box">
//                         <input
//                             onChange={(e) => {
//                                 setInput(e.target.value);
//                             }}
//                             value={input}
//                             type="text"
//                             placeholder="Enter the prompt here"
//                         />
//                         <div>
//                             <img
//                                 src={assets.send_icon}
//                                 alt="Send Icon"
//                                 onClick={() => {
//                                     onSent();
//                                 }}
//                             />
//                         </div>
//                     </div>
//                     <div className="bottom-info">
//                         <p></p>
//                     </div>
//                 </div>
//             </div>
//             <div className="background-image"></div>
//         </div>
//     );
// };

// export default Main;
import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Gemini.css";
import { Context } from "../../context/Context";
import bgimage from "./Geminiui.png";

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResults,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context);

    const handleCardClick = (promptText) => {
        setInput(promptText);
    };

    return (
        <div className="main">
            <div className="background-image">
                <img src={bgimage} alt="Background" />
            </div>
            <div className="nav">
                <p>YouTube AI</p>
                <img src={assets.user} alt="User Avatar" />
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p>
                                Hello, <span className="name">Tanay</span>
                            </p>
                            <p>What's on your YouTube today?</p>
                        </div>
                        <div className="cards">
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("Give me the C++ code to reverse a string on yt")
                                }
                            >
                                <p>Reverse a string using C++</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("Educational yt channels python?")
                                }
                            >
                                <p>Education channels teaching Python?</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("What are some trending videos in news right now on yt?")
                                }
                            >
                                <p>What are some trending videos in news right now?</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div
                                className="card"
                                onClick={() => {
                                    handleCardClick(
                                        "Create a script for the YouTube video about coding"
                                    );
                                }}
                            >
                                <p>Create a script for the YouTube video about coding</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user} alt="User Avatar" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                            type="text"
                            placeholder="Enter the prompt here"
                        />
                        <div>
                            <img
                                src={assets.send_icon}
                                alt="Send Icon"
                                onClick={() => {
                                    onSent();
                                }}
                            />
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
