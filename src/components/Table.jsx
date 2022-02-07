import { useState, useEffect } from "react";
import "../App.css";
import DBJSON from "../db.json";

export const Table = () => {
  // total obj in array.

  const { game } = DBJSON;
  const initialData = game || [];
  const [data, setData] = useState(initialData);
  const [showall, setShowall] = useState(initialData);
  const [filterState, setFilterState] = useState({
    method: "all",
    gamerating: 1,
  });
  const [sortBygamerating, setSortBygamerating] = useState(false);

  // single obj initial state
  const initialState = {
    gamename: "",
    gameauthor: "",
    gamedesc: "",
    gameprice: "",
    gametags: "",
    gamerating: "all",
  };

  const [formData, setformData] = useState(initialState);

  const handlesubmit = (e) => {
    e.preventDefault();
    const showalladata = () => {
      return [...data, formData];
    };
    setData(showalladata);
    setShowall(showalladata);
  };
  console.log(showall);



  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "name", value, "value");

    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sortBygameratingFunc = () => {
    setSortBygamerating((prev) => !prev);
  };


  const handlesorting = (rate) => {
    setFilterState({ ...filterState, gamerating: rate });
  };





  useEffect(() => {
    const filterSearch = () => {
      const {  gamerating } = filterState;
  
      let filteredArr = showall.filter((item) => {
        let newitem =  item.gamerating >= gamerating;
        return newitem;
      });
  
      filteredArr = filteredArr.sort((a, b) =>
        sortBygamerating ? b.gamerating - a.gamerating : a.gamerating - b.gamerating
      );
      setData(filteredArr);
    };
    filterSearch();
  }, [filterState, showall, sortBygamerating]);

  const {
    gamename,
    gameauthor,
    gamedesc,
    gamerating,
    gametags,
    forkids
  } = formData;

  console.log(filterState, "filterState filterState");

  return (
    <div className="container">
      <form className="mt-5" id="addgame">
          <label>Find Games Here</label>
      <input type="text" placeholder="Find Games" />
        <legend>game Details</legend>
        <div class="mb-2">
          <label>Game name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="gamename"
            onChange={handleChange}
            value={gamename}
          />
        </div>
        <div class="mb-2">
          <label>Game Author</label>
          <input
            type="text"
            class="form-control form-control-sm"
            onChange={handleChange}
            value={gameauthor}
            name="gameauthor"
          />
        </div>


        <div class="mb-2">
          <label>Game Description</label>
          <input
            type="text"
            class="form-control form-control-sm"
            onChange={handleChange}
            value={gamedesc}
            name="gamedesc"
          />
        </div>
        <div class="mb-2">
          <label>Game Rating</label>
          <input
            type="text"
            class="form-control form-control-sm"
            onChange={handleChange}
            value={gamerating}
            name="gamerating"
          />
        </div>
        <div class="mb-2">
          <label>Game Tags</label>
          <input
            type="text"
            class="form-control form-control-sm"
            onChange={handleChange}
            value={gametags}
            name="gametags"
          />
        </div>
        <div class="mb-2">
          <label>For Kids</label>
          <input
            type="checkbox"
            onChange={handleChange}
            value={forkids}
            name="forkids"
          />
        </div>
        <div class="mb-2">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            onClick={handlesubmit}
          >
            ADD game
          </button>
        </div>
      </form>
      <br />

      <div className="stars">
        <h5 className="sortgamerating">SORT BY RATING</h5>
        <button
          className={`${filterState.gamerating === 4 ? "isActive" : "isnotactive"}`}
          onClick={(e) => {
            handlesorting(4);
          }}
        >
          4 Star
        </button>
        <button
          className={`${filterState.gamerating === 3 ? "isActive" : "isnotactive"}`}
          onClick={(e) => {
            handlesorting(3);
          }}
        >
          3 Star
        </button>
        <button
          className={`${filterState.gamerating === 2 ? "isActive" : "isnotactive"}`}
          onClick={(e) => {
            handlesorting(2);
          }}
        >
          2 Star
        </button>
        <button
          className={`${
            filterState.gamerating === 1 ? "isnotactive" : "isnotactive"
          }`}
          onClick={(e) => {
            handlesorting(1);
          }}
        >
          1 Star
        </button>
        <button
          className={`${
            filterState.gamerating === "" ? "isActive" : "isnotactive"
          }`}
          onClick={(e) => {
            handlesorting("");
          }}
        >
          All
        </button>
      </div>
      
      <div className="sort">
        <h5 className="sortgamerating">SORT</h5>
        <button
          className={`${sortBygamerating ? "isActive" : "isnotactive"}`}
          onClick={sortBygameratingFunc}
        >
          {sortBygamerating ? "High to Low gamerating" : "Low to High gamerating"}
        </button>
      </div>

      <div>
        {data.map(
          ({
            gamename,
            gameauthor,
            gamedesc,
            gameprice,
            gamerating,
            gametags,
          }) => {

            return (
              <div>
                <div className="flexx">
                  <div className="shadoww">
                    <div className="main">
                      <div>
                        {" "}
                      </div>
                      <div>
                        <h5 className="name">{gamename}</h5>
                        <h5 className="add">Game Author-{gameauthor}</h5>
                        <h5 className="add">Game Price- ₹{gameprice} for one</h5>
                        <div className="list">
                          <h5>GameTags- {gametags} </h5>
                        </div>
                      </div>
                      <div>
                        <h4 className="gamerating">Game Rating-{gamerating} </h4>
                        <h6 className="add">Game Description -{gamedesc}</h6>
                        <h6 className="gamerating">For Kids-Yes </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
