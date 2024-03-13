import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error);
      }
    };
    fetchFoodData();
  }, []);
  const searchFood = (e) => {
    const searchValue = e.target.value;
    const filtered = data?.filter((food) => {
      return food.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredData(filtered);
  };
  const filterFood = (type) => {
    if (type == "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) => {
      return food.type.toLowerCase().includes(type.toLowerCase());
    });
    setFilteredData(filter);
    setSelectedBtn(type);
  };
  if (error) {
    return <div>Error while running</div>;
  }
  if (loading) {
    return <div>Loading ....</div>;
  }
  return (
    <Container>
      <NavBarContainer>
        <TopContainer>
          <div className="navbar">
            <div className="logo">
              <div>
                <img
                  className="logo_img"
                  src="/images/foodzone.jpeg"
                  alt="logo-img"
                />
              </div>
              <div className="logo_text_div">
                <p>
                  <h1>Tomato Foods</h1>
                </p>
              </div>
            </div>
            <div className="search">
              <input
                onChange={searchFood}
                placeholder="Search Food ..."
                type="text"
              />
            </div>
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn == value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </NavBarContainer>
      <SearchResult data={filteredData} selectedBtn={selectedBtn} />
    </Container>
  );
};
const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 14px;
`;
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#8c0505" : "#e62929")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "#ffffff" : "#e62929")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #a30404;
  }
`;

export const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  .logo_img {
    width: 75px;
    height: 75px;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    .logo_text_div {
      display: flex;
      justify-content: center;
    }
  }
  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      width: 285px;
      height: 40px;
      font-size: 20px;
      padding: 0 10px;

      &::placeholder {
        color: white;
      }
    }
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    flex-wrap: wrap;
  }
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
