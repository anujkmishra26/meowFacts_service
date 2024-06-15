import { useEffect, useState } from "react";
import "./App.css";
import { catFactsApi, languages } from "./utils/variables";
import Loading from "./Loading";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "./utils/helperFunctions";
import { FactCard, UserForm } from "./Components";
import Footer from "./Components/Footer";

function App() {
  const [allFacts, setAllFacts] = useState([]);
  const [input, setInput] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLang, setDefaultLang] = useState("eng");

  const getCatFacts = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await fetch(
        `${catFactsApi}?count=${!!input ? input : 10}&lang=${defaultLang}`
      );
      const facts = await apiResponse.json();
      notifySuccess(`Successfully Fetched ${facts.data.length} Facts.`);
      if (input > facts.data.length) {
        notifyInfo(`Maximum ${facts.data.length} Facts Available`);
        setInput(facts.data.length);
      }
      setAllFacts(facts.data);
    } catch (error) {
      notifyError("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input <= 0) {
      notifyError("Please Enter atleast One..");
    } else {
      getCatFacts();
    }
  };

  useEffect(() => {
    getCatFacts();
  }, [defaultLang]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="app--container">
        <h1>Meow Facts</h1>
        <UserForm
          submitHandler={submitHandler}
          input={input}
          setInput={setInput}
        />
        <div className="facts__container">
          <div className="heading__select--container">
            <h2>All Facts ({allFacts.length})</h2>
            <div className="select__container">
              <select
                value={defaultLang}
                name="lang"
                onChange={(e) => setDefaultLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.languageCode} value={lang.languageCode}>
                    {lang.languageName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="all__facts">
            {!!allFacts.length ? (
              allFacts?.map((fact) => <FactCard key={fact} fact={fact} />)
            ) : isLoading ? (
              <p className="messagePreview">Loading Facts...</p>
            ) : (
              <p className="messagePreview">No Facts Available</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
