const WARNIG_TEXT = 'Enter some values in the inputs and press GENERATE';

const textIsEmpty = () => {
  if (!_.isEmpty(textOutput.innerHTML) && textOutput.innerHTML !== WARNIG_TEXT) {
    return true;
  }
  return false;
}

const isOnlyNumber = (valueTextArea) => {
  if (onlyNumber.checked && !_.isEmpty(valueTextArea)) {
    return true;
  }

  return false;
}

const onTextAreaChangeValue = () => {
  if (onlyNumber.checked && textArea.value) {
    textArea.value = textArea.value.replace(/([^ .\d])/gi, '');
  }
};

const onGetValue = () => {
  let valueTextArea = textArea.value
    .trim()
    .replace(/\t+/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/,+/g, ' ')
    .replace(/ +/g, ' ')

  if (!_.isEmpty(valueTextArea)) {
    if (onlyNumber.checked) {
      valueTextArea = valueTextArea.replace(/([^ .\d])/gi, '');
    }

    valueTextArea = _.chain(valueTextArea.split(' '))
      .filter((v) => v !== '')
      .sortBy()
      .value()

    setFrequenceValue(valueTextArea);

    if (isOnlyNumber(valueTextArea)) {
      const orderedValues = _.chain(valueTextArea).map((value) => parseInt(value, 10)).sortBy().value();
      onCaculateMediaMedianaModa(orderedValues);
      setClasseFrequenceValue(orderedValues);

    } else {
      mediaModaMedianaContainer.style.display = 'none'
      frequenceByClasseContainer.style.display = 'none'
    }

  }
};

const setFrequenceValue = (valueTextArea) => {
  let total = 0;
  let totalPercentage = 0;
  let XiFi = 0;
  let XiSquareFi = 0;

  if (valueTextArea && valueTextArea.length > 0) {
    const grouped = _.groupBy(valueTextArea, (v) => v);
    const keys = _.keys(grouped);

    _.forEach(keys, (k) => { total += grouped[k].length });

    const formatValue = _.map(keys, (k) => {
      const resuPerce = ((grouped[k].length / total) * 100);
      totalPercentage += parseFloat(resuPerce, 10);

      XiFi += k * grouped[k].length;
      XiSquareFi += (k * k) * grouped[k].length;

      return (
        // It is using vs-code extension: es6-string-html
        /*html*/`
        <tr>
          <td class="">${k}</td>
          <td class="">${grouped[k].length}</td>
          <td class="">${resuPerce.toFixed(2)}</td>
          <td class="">${(k * grouped[k].length).toFixed(2)}</td>
          <td >${((k * k) * grouped[k].length).toFixed(2)}</td>
        </tr>
        `)
    }
    )

    // It is using vs-code extension: es6-string-html
    const tableFormat = /*html*/`
      <div class="padding-table">
        <table>
            <thead>
              <tr>
                <th class="th-style ">Values(x.i)</th> 
                <th class="th-style ">F.i</th> 
                <th class="th-style ">%</th>
                <th class="th-style ">x.i * F.i</th>
                <th class="th-style">x.i^2 * F.i</th>
              </tr>
            </thead>
            <tbody>
              ${formatValue.join(" ")}
              <tr class="total">
                <td class="th-style">TOTAL</td>
                <td class="th-style">${valueTextArea.length}</td>
                <td class="th-style">${totalPercentage.toFixed(2)}</td>
                <td class="th-style">${XiFi.toFixed(2)}</td>
                <td class="th-style">${XiSquareFi.toFixed(2)}</td>
              </tr>
            </tbody>                          
        </table>
      </div>
    `

    frequenceContainer.style.display = 'block';
    newValues.innerHTML = tableFormat;


    if (isOnlyNumber(valueTextArea)) {
      setVarianciaValue(XiFi, XiSquareFi, valueTextArea.length);
      
      const valuesToGraph = _.map(keys, (k) => ({ valuesX: `${k}`, Frequencia: grouped[k].length }));
      setGraphValue(valuesToGraph);
    } else {
      varianciaDesvioPadraoContainer.style.display = 'none';
    }

  }
}

const setGraphValue = (valuesToGraph) => {
  // Used to set the values to the graph

  graficoColunaResult.innerHTML = ''
  graficoColunaContainer.style.display = 'block';
  agCharts.AgChart.create(onOptionsHistogramGraph(valuesToGraph));
}

const setClasseFrequenceValue = (valuesNumber) => {

  const Xmin = _.head(valuesNumber);
  const Xmax = _.last(valuesNumber);
  const N = valuesNumber.length;
  frequenceByClasseContainer.style.display = 'block';
  const intervalClasses = Math.ceil((Xmax - Xmin) / Math.ceil(Math.sqrt(N)));
  const amountOfClass = Math.ceil(Math.sqrt(N));

  let temp = Xmin;
  const valuesIntervalClasse = [];
  let totalPercentage = 0;
  let XiFi = 0;
  let XiSquareFi = 0;

  let posFreq = 0;
  for (let i = 0; i < amountOfClass; i++) {
    let freqClass = 0;

    while (posFreq < N) {
      if (valuesNumber[posFreq] < temp + intervalClasses) {
        freqClass += 1;
      } else {
        break;
      }
      posFreq += 1;
    }

    let resuPerce = freqClass > 0 ? (freqClass / N * 100) : 0;
    totalPercentage += parseFloat(resuPerce, 10);

    valuesIntervalClasse.push({ value: temp, freq: freqClass, freqPercent: resuPerce.toFixed(2) })
    temp = temp + intervalClasses;

    if (temp > Xmax) {
      break
    }
  }

  const formatValueClasse = _.map(valuesIntervalClasse, (v) => {
    let middlePoint = Math.round(((v.value * 2) + intervalClasses) / 2);
    const tempXiFi = middlePoint * v.freq;
    const tempXiSquareFi = middlePoint * middlePoint * v.freq;

    XiFi += tempXiFi;
    XiSquareFi = tempXiSquareFi;

    return /*html*/`
    <tr>
      <td class="">
        ${v.value} &#x022A2; ${v.value + intervalClasses}
      </td>
      <td class="">
        ${v.freq}
      </td>
      <td class="">
        ${v.freqPercent}
      </td>
      <td class="">
        ${middlePoint.toFixed(2)}
      </td>
      <td class="">
        ${tempXiFi.toFixed(2)}
      </td>
      <td>
        ${tempXiSquareFi.toFixed(2)}
      </td>
    </tr>

  `});

  const formatTableClasses = /*html*/`
    <div class="padding-table">
      <table>
        <thead>
          <tr>
            <th class="th-style ">Values</th> 
            <th class="th-style ">F.i</th> 
            <th class="th-style ">%</th>
            <th class="th-style ">Ponto Médio(x.i)</th>
            <th class="th-style ">x.i * F.i</th>
            <th class="th-style">x.i^2 * F.i</th>
          </tr>
        </thead>
        <tbody>
          ${formatValueClasse.join(' ')}
          <tr class="total">
            <td class="th-style">TOTAL</td>
            <td class="th-style">${N}</td>
            <td class="th-style">${totalPercentage.toFixed(2)}</td>
            <td class="th-style"> - </td>
            <td class="th-style">${XiFi.toFixed(2)}</td>
            <td class="th-style">${XiSquareFi.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  const formatClasseFrequence = /*html*/`
    <p><b>Values:</b> ${valuesNumber.join(' ')}</p>
    <p><b>AT</b> = Xmax − Xmin</p>
    <p><b>AT</b> = ${Xmax} − ${Xmin}</p>
    <p><b>AT</b> = ${Xmax - Xmin}</p>

    <p>\\[ c = \\sqrt{N} \\]</p>
    <p>\\[ c = \\sqrt{ ${N} } \\]</p>
    <p><b>c</b> = ${Math.sqrt(N).toFixed(2)}  (aproxima para cima)</p>
    <p><b>c</b> = ${Math.ceil(Math.sqrt(N))} </p>

    <br />

    <p>\\[ h \\cong { {AT} \\over c } \\]</p>
    <p>\\[h \\cong { { ${Xmax - Xmin} } \\over ${Math.ceil(Math.sqrt(N))} } \\]</p>
    <p><b>h</b> &#8773; ${((Xmax - Xmin) / Math.ceil(Math.sqrt(N))).toFixed(2)}  (aproxima para cima)</p>
    <p><b>h</b> &#8773; ${intervalClasses}</p>

    ${formatTableClasses}

  `


  newValuesClasses.innerHTML = formatClasseFrequence;


  // It should be called for the MathJax reprocess the values after it is inserted in the page
  MathJax.typeset();
};

const setVarianciaValue = (XiFi, XiSquareFi, N) => {
  varianciaDesvioPadraoContainer.style.display = 'block';
  const varianciaCalcResult = ((XiSquareFi - ((XiFi * XiFi) / (N))) / (N - 1)).toFixed(2);

  varianciaOutputCalc.innerHTML = /*html*/`
    <p>
      \\[ s^2 = { { \\sum_{i=1}^k x_i^2 * F_i - ({ { (\\sum_{i=1}^k x_i * F_i)^2 } \\over n}) } \\over n - 1 } \\]
    </p>
    <p>
    \\[ s^2 = { { ${XiSquareFi} - ({ { ${XiFi}^2 } \\over ${N}}) } \\over ${N} - 1 } \\]
  </p>

  <p>
    \\[ s^2 = { { ${XiSquareFi} - ({ { ${XiFi * XiFi} } \\over ${N}}) } \\over ${N - 1} } \\]
  </p>

  <p>
    \\[ s^2 = { { ${XiSquareFi} - ${((XiFi * XiFi) / (N)).toFixed(2)} } \\over ${N - 1} } \\]
  </p>

  <p>
    \\[ s^2 = { { ${(XiSquareFi - ((XiFi * XiFi) / (N))).toFixed(2)} } \\over ${N - 1} } \\]
  </p>

  <p>
    \\[ s^2 = ${varianciaCalcResult} \\]
  </p>

  `;


  varianciaResult.innerHTML = varianciaCalcResult;

  const desvioPadraoCalcValue = /*html*/`
  <p>
    \\[ \\sqrt{s} \\]
  </p>
  <p>
    \\[ \\sqrt{${varianciaCalcResult}} = ${(Math.sqrt(varianciaCalcResult)).toFixed(2)}  \\]
  </p>
  `;

  desvioPadraoCalc.innerHTML = desvioPadraoCalcValue;
  desvioPadraoResult.innerHTML = (Math.sqrt(varianciaCalcResult)).toFixed(2);

  // It should be called for the MathJax reprocess the values after it is inserted in the page
  MathJax.typeset();
};

const onGenerateValues = () => {
  const inputyourtext = getInputText.value;
  const numberoutputs = getInputNumber.value;

  if (!_.isEmpty(inputyourtext) && !_.isEmpty(numberoutputs)) {
    let values = " "
    const count = parseInt(numberoutputs, 10);

    _.times(count, () => values += `${inputyourtext} `);

    textOutput.innerHTML = values.trim();

    // Clear inputs fields
    getInputText.value = '';
    getInputNumber.value = '';
  }

}

const calculateMedia = (valuesNumber) => {
  if (valuesNumber) {

    mediaOutputCalc.innerHTML = `(${valuesNumber.join(" + ")})/${valuesNumber.length}`;
    mediaResult.innerHTML = (_.reduce(valuesNumber, (total, amount) => total + amount) / valuesNumber.length).toFixed(2)
  }
}

const caculateModa = (valuesNumber) => {
  let mostFrequent = [];
  const grouped = _.groupBy(valuesNumber, (v) => v);

  _.forEach(grouped, (v) => {
    if (_.isEmpty(mostFrequent)) {
      mostFrequent.push({ value: _.head(v), freq: v.length });
    } else if (_.head(mostFrequent).freq === v.length) {
      // If there are values that have the same frequence
      mostFrequent.push({ value: _.head(v), freq: v.length });
    } else if (_.head(mostFrequent).freq < v.length) {
      mostFrequent = [];
      mostFrequent.push({ value: _.head(v), freq: v.length });
    }
  });

  if (!_.isEmpty(mostFrequent)) {
    tableModaResult.innerHTML =
    /*html*/`
      <tr>
        <th>Value</th><th>Freq</th>
      </tr>
      ${_.chain(mostFrequent)
        .map(v => (
          /*html*/`
        <tr>
            <td>${v.value}</td><td>${v.freq}</td>
        </tr>
          `))
        .join(' ').value()}
    `

    modaResult.innerHTML = _.chain(mostFrequent).map('value').join(" ").value();
  }

}

const caculateMediana = (valuesNumber) => {
  const valuesNumberTemp = [...valuesNumber];
  let resu = '';
  let mediaValuePos = '';
  let calcMediana = '';
  const middlePos = Math.floor(valuesNumberTemp.length / 2);

  if (valuesNumberTemp.length % 2 === 0) {
    const firstNum = valuesNumberTemp[middlePos - 1];
    const secondNum = valuesNumberTemp[middlePos];
    resu = ((firstNum + secondNum) / 2).toFixed(2)
    mediaValuePos = `<p>${valuesNumberTemp.splice(0, middlePos - 1).join(' ')} <b>| ${firstNum} ${secondNum} |</b> ${valuesNumberTemp.splice(2, valuesNumberTemp.length).join(' ')}</p>`;
    calcMediana = `(${firstNum} + ${secondNum}) / 2 = ${resu}`;
  } else {
    resu = valuesNumberTemp[middlePos];
    mediaValuePos = `<p>${valuesNumberTemp.splice(0, middlePos).join(' ')} | ${resu} | ${valuesNumberTemp.splice(1, valuesNumberTemp.length).join(' ')}</p>`;
  }

  medianaResult.innerHTML = resu;
  medianaOutput.innerHTML = mediaValuePos;

  medianaOutputCalc.innerHTML = calcMediana;
};

const onCaculateMediaMedianaModa = (valuesNumber) => {
  mediaModaMedianaContainer.style.display = 'block'

  calculateMedia(valuesNumber);
  caculateModa(valuesNumber);
  caculateMediana(valuesNumber);


};

const onAddToTextArea = () => {
  if (textIsEmpty()) {
    const addText = `${textArea.value} ${textOutput.innerHTML}`;
    textArea.value = addText;
  } else {
    textOutput.innerHTML = WARNIG_TEXT;
  }

}


const onOptionsHistogramGraph = (histogramData) => {
  return {
    container: graficoColunaResult,
    title: {
      text: 'Informações dos Dados',
    },
    data: histogramData,
    series: [
      {
        type: 'column',
        xKey: 'valuesX',
        yKeys: ['Frequencia'],
        grouped: true
      },
    ],
  };

};

