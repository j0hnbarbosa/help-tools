/*
  It is using vs-code extension: es6-string-html
*/
const getTab1 = () => {
  const tab1Tags = /*html*/`
  <div class="container-column">
  <div class="container-chk-only-number">
    <input type="checkbox" id="onlynumber" name="onlynumber" checked />
    <label for="onlynumber" class="onlynumber-label">Only Numbers</label>
  </div>

  <div class="container">

    <div class="container-textarea">
      <textarea id="text-input" class="text-input-class" onchange="onTextAreaChangeValue"></textarea>

      <div class="btn-container-click">
        <button class="button-click clear-btn" onclick="onClearValue()">Clear</button>
        <button class="button-click" onclick="onGetValue()">Calculate</button>
      </div>
    </div>

    <div class="container-inputs-times">
      <div class="container-actions">
        <input type="text" class="input-times" placeholder="any value" name="inputyourtext" id="inputyourtext" />
        <input type="number" min="0" class="input-times" placeholder="times it must appear" name="numberoutputs"
          id="numberoutputs" />
        <button class="button-click" onclick="onGenerateValues()">Generate</button>
      </div>

      <div class='container-button-action'>
        <button class="button-click-add" onclick="onAddToTextArea()">Add to text area</button>

        <button onclick="onCopyText()" class="button-click-add" onmouseout="onOutFunc()">
          <span id="myTooltip">Copy to clipboard</span>
        </button>

      </div>

      <div class="container-text-output">
        <div id="text-output"></div>
      </div>

    </div>
  </div>


  <div class="container-results">
    <div id="media-moda-mediana-container" class="card-solid margin-top margin-bottom" style="display: none">
      <h2>Média, Mediana e Moda</h2>
      <div>
        <h3>Média:</h3>
        <div id="media-output-calc"></div>
        <div class="space-top">
          <span>Média: <strong id="media-result"></strong></span>
        </div>
      </div>

      <div class="divider"></div>

      <div>
        <h3>Mediana:</h3>
        <div id='mediana-output'></div>
        <div id='mediana-output-calc'></div>
        <div class="space-top">
          <span>Mediana: <strong id="mediana-result"></strong></span>
        </div>
      </div>

      <div class="divider"></div>

      <div>
        <h3>Moda</h3>
        <div>
          <table id='table-moda-result'></table>
          <div class="space-top">
            <span>Moda: <strong id="moda-result"></strong></span>
          </div>
        </div>
      </div>

      <div id="new-values-medias"></div>

    </div>

    <div id="frequence-container" class="card-solid margin-top margin-bottom" style="display: none;">
      <h2>FREQUENCE:</h2>
      <div id="new-values"></div>
    </div>

    <div id="frequence-by-classe-container" class="card-solid margin-top margin-bottom" style="display: none;">
      <h2>Classe Frequence:</h2>
      <div id="new-values-classes"></div>
    </div>


    <div id="variancia-desvio-padrao-container" class="card-solid margin-top margin-bottom"
      style="display: none;">
      <h2>Variância, Desvio Padrão:</h2>
      <div>
        <h3>Variância:</h3>
        <div id='variancia-output-calc'></div>
        <div class="space-top">
          <span>Variância: <strong id="variancia-result"></strong></span>
        </div>
      </div>

      <div class="divider"></div>

      <div>
        <h3>Desvio Padrão:</h3>
        <div id='desvio-padrao-calc'></div>
        <div class="space-top">
          <span>Desvio padrão: <strong id="desvio-padrao-result"></strong></span>
        </div>
      </div>

    </div>


    <div class="card-solid margin-top margin-bottom">
      <h3>Gráfico Histograma:</h3>
      <div id='grafico-histograma' style="height: 100%;"></div>
    </div>

  </div>

</div>
`

  tab1.innerHTML = tab1Tags;

}

getTab1();