import "./style.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./OptionSelection";
import Chatbot from "./Chatbot";
import { arrayItems } from "./cbdata";
import { useState } from "react";

function ChatbotMain() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const selectOption = (option) => {
    setOption(option);
  };

  const askme = async () => {
    let object = { ...option, prompt: input };

    const response = await openai.createCompletion(object);

    setResult(response.data.choices[0].text);
    // setResult(response.data.text);
  };

  return (
    <>
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Chatbot askme={askme} setInput={setInput} result={result} />
      )}
    </div>
    </>
  );
}

export default ChatbotMain;
