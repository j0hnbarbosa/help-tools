/*
  It is using vs-code extension: es6-string-html
*/
const getTab2 = () => {

  const tab2Tags = /*html*/`
  <div class="tab2-container">

    <div class="container-solid mansory-grid">

      <div>
        <h2>População:</h2>
        <p>A população de pesquisa é um conjunto completo de elementos que têm um parâmetro comum entre si.
          A população pesquisada não precisa necessariamente ser humana. Pode ser qualquer coleção de dados que
          tenha
          um
          parâmetro comum, como o número total de lojas de animais em uma cidade.
        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Amostra:</h2>
        <p>Uma amostra é a menor parte do total, ou seja, um subconjunto de toda a população. Quando são realizadas
          pesquisas, a amostra são os membros da população convidados a participar da pesquisa. Simplificando, uma
          amostra é um subgrupo ou subconjunto da população, que pode ser estudado para investigar as
          características
          ou
          o comportamento dos dados da população.</p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Margem de Erro:</h2>
        <p>A margem de erro quantifica o total de erro de amostragem aleatória na estimativa de um parâmetro, como a
          média ou proporção. A margem de erro é frequentemente usada nos resultados da pesquisa. Por exemplo, uma
          pesquisa política pode relatar que o índice de aprovação de um candidato é 55% com uma margem de erro de
          5%.
          Isso significa que o real índice de aprovação é de +/- 5%, e está em algum ponto entre 50% e 60%.</p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Estatística:</h2>
        <p>Estatística: é a medida numérica que descreve uma característica da amostra. Uma estatística mede algo em
          uma
          amostra.</p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Parâmetro:</h2>
        <p>É a medida numérica que descreve uma característica da população. Um parâmetro mede algo em uma
          população.
        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Variável:</h2>
        <p>As variáveis nos estudos estatísticos são os valores que assumem determinadas características dentro de
          uma
          pesquisa e podem ser classificadas em qualitativas ou quantitativas.

        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Variáveis Qualitativas:</h2>
        <p>As variáveis qualitativas não podem ser expressas numericamente, pois relacionam situações como a cor da
          pele, cor dos olhos, marca de refrigerante, marca de automóvel, preferência musical entre outras. Elas
          podem
          ser divididas em ordinais e nominais. As variáveis qualitativas ordinais, apesar de não serem numéricas,
          obedecem a uma relação de ordem, por exemplo: conceitos como ótimo, bom, regular e ruim, classe social,
          grau
          de instrução, etc. Já as variáveis qualitativas nominais não estão relacionadas à ordem, elas são
          identificadas apenas por nomes, por exemplo, as cores: vermelho, amarelo, preto, azul, rosa, verde, etc.
        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Variáveis Quantitativas:</h2>
        <p>
          variáveis quantitativas usamos a representação numérica. Elas podem ser classificadas em discretas e
          contínuas. As variáveis quantitativas discretas acontecem relacionadas a situações limitadas, por exemplo:
          número de revistas vendidas, quantidade de consultas médicas, número de filhos de um casal. No caso das
          variáveis quantitativas contínuas, a abrangência pertence a um intervalo que se caracteriza por infinitos
          valores, como exemplo podemos citar: o peso de um produto, altura dos alunos de uma escola, velocidade de
          objetos, entre outras situações.
        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Desvio Padrão:</h2>
        <p>O desvio padrão é a raiz quadrada da variância.
          O desvio padrão é capaz de identificar o “erro” em um conjunto de dados, caso quiséssemos substituir um
          dos valores coletados pela média aritmética.

          O desvio padrão aparece junto à média aritmética, informando o quão “confiável” é esse valor.

        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Variação Percentual:</h2>
        <p>Podemos dizer que variação percentual é uma forma de apresentar a relação entre dois números na forma
          percentual.
          Por exemplo, um produto que custava R$ 10 aumentou para R$ 15, Qual foi a variação percentual de aumento?
          Este é um caso muito simples e dá para resolver inclusive sem usar calculadora.

          Se subiu de 10 para 15, ele teve uma variação percentual e 50% ou seja um aumento de 50%.
          Para calcular: ((Valor maior - Valor Menor) / Valor Menor) * 100

          <!-- Used to show the equation -->
          \[x = { ({ 15-10 \over 10 }) * 100 } = 50\% \]

        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Variância:</h2>
        <p>Dado um conjunto de dados, a variância é uma medida de dispersão que mostra o quão distante cada valor
          desse conjunto está do valor central (médio).

          Quanto menor é a variância, mais próximos os valores estão da média; mas quanto maior ela é, mais os
          valores estão distantes da média.
        </p>
      </div>
    </div>


    <div class="container-solid mansory-grid">
      <div>
        <h2>Classe:</h2>
        <p>
          É cada um dos grupos de valores em que se subdivide os dados observados.

        </p>
      </div>
    </div>

    <div class="container-solid mansory-grid">
      <div>
        <h2>Distribuição de Frequências por Classes:</h2>

        <p>Determinação da Amplitude Total:</p>
        <p>AT = Xmax − Xmin</p>
        <p>Exemplo: 2 2 2 9 9 9 9 9 9 11 11 13 13 15 15 23 23 23 27 31 37 41 41 43 45 45 45</p>
        <p><b>AT</b> = 45 − 2 = 43</p>

        <p>Determinar número de classes (c):</p>
        <p>
          \[ c = \sqrt{N} \] "Onde <b>N</b> é a quantidade de observações. Nesse exemplo é <b>27</b>"
          Exemplo: \[ c = \sqrt{27} \]
          <b>c</b> = 5.19 (aproxima para cima)
        </p>
        <p><b>c</b> = 6</p>

        <p>Determinação da Amplitude das Classes (h):</p>
        <p>\[ h \cong {AT \over c} \]</p>
        <p>Exemplo: \[ h \cong {43 \over 6} \]</p>

        <p><b>h</b> = 7</p>

        <div class="center-content">
          <table>
            <thead>
              <tr>
                <th class="th-style td-right-border">Classes</th>
                <th class="th-style">F.i</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class='td-right-border'>2 &#x022A2; 9</td>
                <td>3</td>
              </tr>
              <tr>
                <td class='td-right-border'>9 &#x022A2; 16</td>
                <td>12</td>
              </tr>
              <tr>
                <td class='td-right-border'>16 &#x022A2; 23</td>
                <td>2</td>
              </tr>
              <tr>
                <td class='td-right-border'>23 &#x022A2; 30</td>
                <td>4</td>
              </tr>
              <tr>
                <td class='td-right-border'>30 &#x022A2; 37</td>
                <td>1</td>
              </tr>
              <tr>
                <td class='td-right-border'>37 &#x022A2; 44</td>
                <td>4</td>
              </tr>
              <tr>
                <td class='td-right-border'>44 &#x022A2; 51</td>
                <td>3</td>
              </tr>

              <tr>
                <td class="th-style td-right-border"> &#8721; </td>
                <td class="th-style">50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Geralmente se utiliza o gráfico do tipo <b>Histograma</b> para exibir as informações.
        </p>

      </div>
    </div>

  </div>
    
`

  tab2.innerHTML = tab2Tags;

};

getTab2();