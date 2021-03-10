const warnigText = 'Enter some values in the inputs and press GENERATE';

const textArea = document.getElementById("text-input");
const newValues = document.getElementById("new-values");
const textOutput = document.getElementById("text-output");

const textIsEmpty = () => {
  if (!_.isEmpty(textOutput.innerHTML) && textOutput.innerHTML !== warnigText) {
    return true;
  }
  return false;
}

const getvalue = () => {
  let valueTextArea = textArea.value
    .trim()
    .replace(/ +/g, ' ')
    .replace(/\n/g, '')
    .replace(/,/g, ".")

  console.log(valueTextArea);

  if (!_.isEmpty(valueTextArea)) {
    valueTextArea = valueTextArea.split(' ');
    valueTextArea = _.filter(valueTextArea, (v) => v !== '');

    console.log(valueTextArea);

    let total = 0;

    if (valueTextArea && valueTextArea.length > 0) {
      const grouped = _.groupBy(valueTextArea, (v) => v);
      const keys = _.keys(grouped);

      _.forEach(keys, (k) => { total += grouped[k].length });

      const formatValue = _.map(keys, (k) => (
        `<tr>
          <td>${k}</td>
          <td>${grouped[k].length}</td>
          <td>${Math.floor((grouped[k].length / total) * 100)}</td>
          </tr>
          `)
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
                          </tbody>                          
                         </table>
                      `

      console.log(tableFormat)

      newValues.innerHTML = tableFormat;
    }
  }
};


const onGenerateValues = () => {
  const inputyourtext = _.head(document.getElementsByName("inputyourtext")).value;
  const numberoutputs = _.head(document.getElementsByName("numberoutputs")).value;

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
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";

}
