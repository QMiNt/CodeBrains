import React, { useState } from 'react';
import "./exp.css";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey:"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",
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);
let textUp = "#include<iostream>/n using namespace std;/n int main()/n{/nint x=9,y=8;/ncout<<x+y;/n}/n";
function Textocode() {
  const [explanation, setExplanation] = useState('');

  const explainCode = async () => {
    textUp = document.getElementById("code1").value;
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Write a code for :" + textUp,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
      });
      const exp = JSON.parse(response.request.response);
      setExplanation(exp.choices[0].text);
      console.log(explanation)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea defaultValue={textUp}
      id='code1'/>
      <br/>
      <button onClick={explainCode}>Explain Code</button>
      <p>{explanation}</p>
    </div>
  );
}

export default Textocode;