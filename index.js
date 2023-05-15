import React, { useState } from 'react';
import { csvFormat } from 'd3';
import { saveAs } from 'file-saver';

const WordFrequency = () => {
  const [wordData, setWordData] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await response.text();

    // Parse the text content and calculate word frequency
    const words = text.split(/\s+/);
    const frequency = {};
    words.forEach((word) => {
      if (frequency[word]) {
        frequency[word] += 1;
      } else {
        frequency[word] = 1;
      }
    });

    // Sort frequency data in descending order
    const sortedData = Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 20);

    setWordData(sortedData);
  };

  const handleExport = () => {
    // Convert frequency data to CSV and download
    const csv = csvFormat(wordData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'word_frequency.csv');
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      {wordData && <Histogram data={wordData} />}
      {wordData && <button onClick={handleExport}>Export</button>}
    </div>
  );
};

const Histogram = ({ data }) => {
  return (
    <div>
      <h2>Word Frequency Histogram</h2>
      <svg width={600} height={400}>
        {/* Render histogram bars using data */}
      </svg>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <WordFrequency />
    </div>
  );
};

export default App;
