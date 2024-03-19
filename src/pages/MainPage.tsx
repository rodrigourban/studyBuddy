import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/testList";

type TestList = {
  id: number;
  name: string;
};

function MainPage() {
  const [testList, setTestList] = useState<TestList[]>([]);

  useEffect(function () {
    async function getTestList() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!data) {
          throw new Error("Failed to fetch questions");
        }

        //dispatch({ type: "data/received", payload: data });
        setTestList(data);
      } catch (err) {
        console.error("error while fetching", err);
        //dispatch({ type: "data/error" });
      }
    }
    getTestList();
  }, []);

  return (
    <div className="relative bg-indigo-100 h-svh">
      <div className="absolute h-36 w-full bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
      <div className="p-5 relative">
        <h1 className="pt-3 pl-3 text-2xl font-semibold text-white font-primaryFont">
          Select what to practice
        </h1>
        <h3 className="px-3 text-sm text-white font-secondaryFont">
          "Genius is one percent inspiration and ninety-nine percent
          perspiration." - Thomas Edison
        </h3>
        <ul className="space-y-2 mt-2 p-5 ">
          {testList.map((test) => (
            <li
              className="rounded-lg flex items-center justify-between p-5 bg-indigo-50 shadow-md"
              key={`exam-${test.id}`}
            >
              <div>
                <p className="font-primaryFont text-lg md:text-xl font-bold">
                  {test.name}
                </p>
                <p className="text-sm font-secondaryFont">Last score: 100%</p>
              </div>

              <Link
                to={`/take/${test.id}`}
                className="w-20 h-9 text-center bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 pt-1 hover:cursor-pointer"
              >
                Take
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
