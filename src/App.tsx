import { useState } from 'react';
import './App.css';
import { FontType, Style, alphabetStyleMap, fontTypeNameMap, styleString } from './tr/tr';

function App() {
  const [style, setStyle] = useState<Style>('normal');
  const [fontType, setFontType] = useState<FontType>('serif');

  const onFontTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setFontType(e.target.value as FontType);
    const styles = alphabetStyleMap[e.target.value as FontType];
    if (styles.indexOf(style) === -1) setStyle(styles[0]);
  };

  const onStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setStyle(e.target.value as Style);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    const text = e.target.value;
    e.target.value = styleString(text, fontType, style);
  };

  return (
    <>
      <div className='main'>
        <h1>Style your text!</h1>
        <div>
          <textarea
            className='text-area' rows={10} cols={50}
            placeholder='Type your text here...'
            onChange={onTextChange}></textarea>
        </div>
        <div className='selections'>
          <select className='select' onChange={onFontTypeChange}>
            {
              Object.keys(fontTypeNameMap).map((k, index) => {
                return <option key={index} value={k}>{fontTypeNameMap[k as FontType]}</option>;
              })
            }
          </select>
          <select className='select' onChange={onStyleChange}>
            {
              alphabetStyleMap[fontType].map((value, index) => {
                return <option key={index} value={value}>{value}</option>;
              })
            }
          </select>
        </div>
      </div>

    </>
  );
}

export default App;
