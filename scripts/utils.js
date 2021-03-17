const warnigText = 'Enter some values in the inputs and press GENERATE';

const textIsEmpty = () => {
  if (!_.isEmpty(textOutput.innerHTML) && textOutput.innerHTML !== warnigText) {
    return true;
  }
  return false;
}

const onTextAreaChangeValue = () => {
  if (onlyNumber.checked && textArea.value) {
    textArea.value = textArea.value.replace(/([^ .\d])/gi, '');
  }
};

const getvalue = () => {
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


    valueTextArea = _.sortBy(valueTextArea.split(' '));
    valueTextArea = _.filter(valueTextArea, (v) => v !== '');

    onCaculateMediaMedianaModa(valueTextArea);

    let total = 0;
    let totalPercentage = 0;

    if (valueTextArea && valueTextArea.length > 0) {
      const grouped = _.groupBy(valueTextArea, (v) => v);
      const keys = _.keys(grouped);

      _.forEach(keys, (k) => { total += grouped[k].length });

      const formatValue = _.map(keys, (k) => {
        const resuPerce = ((grouped[k].length / total) * 100);
        totalPercentage += parseFloat(resuPerce, 10);

        return (
          `<tr>
          <td>${k}</td>
          <td>${grouped[k].length}</td>
          <td>${resuPerce.toFixed(2)}</td>
          </tr>
          `)
      }
      )

      const tableFormat = `<table>
                          <thead>
                            <tr>
                              <th>values</th> 
                              <th>frequence</th> 
                              <th>%</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${formatValue.join(" ")}
                            <tr class="total">
                              <td>TOTAL</td>
                              <td>${valueTextArea.length}</td>
                              <td>${totalPercentage.toFixed(2)}</td>
                            </tr>
                          </tbody>                          
                         </table>
                      `

      newValues.innerHTML = tableFormat;
    }
  }
};

const clearValue = () => {
  textArea.value = '';
  newValues.innerHTML = '';
  textOutput.innerHTML = '';
  getInputText.value = '';
  getInputNumber.value = '';

  mediaOutputCalc.innerHTML = '';
  mediaResult.innerHTML = '';

  modaResult.innerHTML = '';
  tableModaResult.innerHTML = '';

  medianaResult.innerHTML = '';
  medianaOutputCalc.innerHTML = '';
  medianaOutput.innerHTML = '';

}

const onGenerateValues = () => {
  const inputyourtext = getInputText.value;
  const numberoutputs = getInputNumber.value;

  if (!_.isEmpty(inputyourtext) && !_.isEmpty(numberoutputs)) {
    let values = ""
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
    tableModaResult.innerHTML = `
      <tr>
        <th>Value</th><th>Freq</th>
      </tr>
      ${_.chain(mostFrequent)
        .map(v => (`<tr>
                        <td>${v.value}</td><td>${v.freq}</td>
                  </tr>`))
        .join(' ').value()}
    `


    modaResult.innerHTML = _.chain(mostFrequent).map('value').join(" ").value();
  }

}

const caculateMediana = (valuesNumber) => {
  let resu = '';
  let mediaValuePos = '';
  let calcMediana = '';
  const middlePos = Math.floor(valuesNumber.length / 2);
  if (valuesNumber.length % 2 === 0) {
    const firstNum = valuesNumber[middlePos - 1];
    const secondNum = valuesNumber[middlePos];
    resu = ((firstNum + secondNum) / 2).toFixed(2)
    mediaValuePos = `${valuesNumber.splice(0, middlePos - 1).join(' ')} | ${firstNum} ${secondNum} | ${valuesNumber.splice(2, valuesNumber.length).join(' ')}`;
    calcMediana = `(${firstNum} + ${secondNum}) / 2 = ${resu}`;
  } else {
    resu = valuesNumber[middlePos];
    mediaValuePos = `${valuesNumber.splice(0, middlePos).join(' ')} | ${resu} | ${valuesNumber.splice(1, valuesNumber.length).join(' ')}`;
  }

  medianaResult.innerHTML = resu;
  medianaOutput.innerHTML = mediaValuePos;

  medianaOutputCalc.innerHTML = calcMediana;
};

const onCaculateMediaMedianaModa = (valuesNumber) => {
  if (onlyNumber.checked) {
    const orderedValues = _.chain(valuesNumber).map((value) => parseInt(value, 10)).sortBy().value();
    calculateMedia(orderedValues);
    caculateModa(orderedValues);
    caculateMediana(orderedValues);
  }
};

const onAddToTextArea = () => {
  if (textIsEmpty()) {
    const addText = `${textArea.value} ${textOutput.innerHTML}`;
    textArea.value = addText;
  } else {
    textOutput.innerHTML = warnigText;
  }

}

const onCopyText = () => {
  if (textIsEmpty()) {
    let range = document.createRange();
    range.selectNode(textOutput);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied ";
  }
}

const outFunc = () => {
  let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";

}

const openTab = (evt, tab) => {
  let i, x, tablinks;

  x = document.getElementsByClassName("tab-column");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected-tab", "");
  }

  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " selected-tab";
}