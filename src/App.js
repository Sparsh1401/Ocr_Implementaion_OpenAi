import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';
import {Configuration, OpenAIApi} from 'openai'
import OptionSelection from './components/OptionSelection'
import Translation from './components/Translation';
import { arrayItems } from './AIOptions';

function App() {
  const configuration = new Configuration({
    apiKey:"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",
  });

// console.log(process.env.REACT_APP_OPEN_AI_KEY)
  const openai = new OpenAIApi(configuration)
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [option, setOption] = useState({});
  const [input, setInput]= useState("");
  const [result, setResult] = useState("");

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if(!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText])

  const handleChangeImage = e => {
    if(e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("")
    }
  }
  const selectOption = (option) => {
    if(textResult)
      setInput(textResult)
    setOption(option)
  };

  const doStuff = async() => {

    let object = { ...option, prompt:textResult === ""?input:textResult+input };
    const response = await openai.createCompletion(object);

    setResult(response.data.choices[0].text);
  }

  return (
    <div className="App">
      <h1>ImText</h1>
      <p>Gets words in image!</p>
      <div className="input-wrapper">
        <label htmlFor="upload">Upload Image</label>
        <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
      </div>

      <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </div>
        )}
        {
        textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
      <div>
        {Object.values(option).length === 0 ?
        (<OptionSelection arrayItems = {arrayItems} selectOption = {selectOption}/>)
        :( <Translation doStuff = {doStuff} setInput = {setInput} textResult = {textResult} result = {result}/>)}
      </div>
    </div>
  );
}

export default App;
