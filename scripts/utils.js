const warnigText = 'Enter some values in the inputs and press GENERATE';

const textArea = document.getElementById("text-input");
const newValues = document.getElementById("new-values");
const textOutput = document.getElementById("text-output");
const getInputText = document.getElementById("inputyourtext");
const getInputNumber = document.getElementById("numberoutputs");

const textIsEmpty = () => {
  if (!_.isEmpty(textOutput.innerHTML) && textOutput.innerHTML !== warnigText) {
    return true;
  }
  return false;
}

const getvalue = () => {
  let valueTextArea = textArea.value
    .trim()
    .replace(/\t+/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/,/g, ' ')
    .replace(/ +/g, ' ')

  if (!_.isEmpty(valueTextArea)) {
    valueTextArea = _.sortBy(valueTextArea.split(' '));
    valueTextArea = _.filter(valueTextArea, (v) => v !== '');

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
          `)}
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
  getInputText.value= '';
  getInputNumber.value = '';
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