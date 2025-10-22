import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleTypeIn = () => {
    navigate("/review");
  };

  return (
    <div
      className="maxHeight column crossCenter"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <h1>Blitter</h1>
      <p>Snap a receipt, or type it in</p>
      <div className="row" style={{ gap: 20 }}>
        <button className="iconButton" style={{ fontSize: "3em" }}>
          📸
        </button>
        <button
          className="iconButton"
          style={{ fontSize: "3em" }}
          onClick={handleTypeIn}
        >
          📝
        </button>
      </div>
    </div>
  );
}

export default HomePage;
