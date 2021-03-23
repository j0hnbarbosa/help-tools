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
          <td class="td-right-border">${k}</td>
          <td class="td-right-border">${grouped[k].length}</td>
          <td class="td-right-border">${resuPerce.toFixed(2)}</td>
          <td class="td-right-border">${k * grouped[k].length}</td>
          <td >${(k * k) * grouped[k].length}</td>
        </tr>
        `)
    }
    )
    
    // It is using vs-code extension: es6-string-html
    const tableFormat = /*html*/`
      <table>
          <thead>
            <tr>
              <th class="th-style td-right-border ">Values(x.i)</th> 
              <th class="th-style td-right-border ">F.i</th> 
              <th class="th-style td-right-border ">%</th>
              <th class="th-style td-right-border ">x.i * F.i</th>
              <th class="th-style">x.i^2 * F.i</th>
            </tr>
          </thead>
          <tbody>
            ${formatValue.join(" ")}
            <tr class="total">
              <td class="td-right-border th-style">TOTAL</td>
              <td class="td-right-border th-style">${valueTextArea.length}</td>
              <td class="td-right-border th-style">${totalPercentage.toFixed(2)}</td>
              <td class="td-right-border th-style">${XiFi}</td>
              <td class="th-style">${XiSquareFi}</td>
            </tr>
          </tbody>                          
      </table>
    `
    
    frequenceContainer.style.display = 'block';
    newValues.innerHTML = tableFormat;


    if (isOnlyNumber(valueTextArea)) {
      setVarianciaValue(XiFi, XiSquareFi, valueTextArea.length);
  } else {
    varianciaDesvioPadraoContainer.style.display = 'none';
  }

  }
}

const setClasseFrequenceValue = (valuesNumber) => {
  const Xmin = _.head(valuesNumber);
  const Xmax = _.last(valuesNumber);
  frequenceByClasseContainer.style.display = 'block';
  newValuesClasses.innerHTML = `min: ${Xmin} and max ${Xmax}`;
};

const setVarianciaValue = (XiFi, XiSquareFi, N ) => {
  varianciaDesvioPadraoContainer.style.display = 'block';
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
    \\[ s^2 = ${( (XiSquareFi - ( (XiFi * XiFi) / (N) ) ) / (N - 1) ).toFixed(2)} \\]
  </p>

  `;


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
    mediaValuePos = `${valuesNumberTemp.splice(0, middlePos - 1).join(' ')} | ${firstNum} ${secondNum} | ${valuesNumberTemp.splice(2, valuesNumberTemp.length).join(' ')}`;
    calcMediana = `(${firstNum} + ${secondNum}) / 2 = ${resu}`;
  } else {
    resu = valuesNumberTemp[middlePos];
    mediaValuePos = `${valuesNumberTemp.splice(0, middlePos).join(' ')} | ${resu} | ${valuesNumberTemp.splice(1, valuesNumberTemp.length).join(' ')}`;
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
