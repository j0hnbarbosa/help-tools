const onClearValue = () => {
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

  mediaModaMedianaContainer.style.display = 'none';
  frequenceContainer.style.display = 'none';
  frequenceByClasseContainer.style.display = 'none';
  varianciaDesvioPadraoContainer.style.display = 'none';

  graficoColunaResult.innerHTML = ''
  graficoColunaContainer.style.display = 'none'
}