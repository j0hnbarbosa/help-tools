/*
  It is using vs-code extension: es6-string-html
*/
const getTab3 = () => {

  const tab3Tags = /*html*/`
  <div class="container">
    <div>
      <h3>
        Cole a URL e escolha a quantidade de vezes que a URL deve ser aberta em uma nova aba do navegador.
      </h3>


      <label class="margin-right">URL: <input id="text-input-url" type="text" /></label>
      <label class="margin-right">Quantidade: <input id="number-input-url" type="number" /></label>
      <button onclick="generateUrl()">Gerar URL</button>

    <div id="openedTabsUrl"></div>

    </div>
  </div>
`

  tab3.innerHTML = tab3Tags;

};

getTab3();