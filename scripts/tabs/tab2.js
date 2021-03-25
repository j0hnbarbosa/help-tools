/*
  It is using vs-code extension: es6-string-html
*/

const getTab2 = () => {

  const tab2Tags = /*html*/`
  <div class="tab2-container">

    <div class="card-solid mansory-grid">

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

    <div class="card-solid mansory-grid">
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

    <div class="card-solid mansory-grid">
      <div>
        <h2>Margem de Erro:</h2>
        <p>A margem de erro quantifica o total de erro de amostragem aleatória na estimativa de um parâmetro, como a
          média ou proporção. A margem de erro é frequentemente usada nos resultados da pesquisa. Por exemplo, uma
          pesquisa política pode relatar que o índice de aprovação de um candidato é 55% com uma margem de erro de
          5%.
          Isso significa que o real índice de aprovação é de +/- 5%, e está em algum ponto entre 50% e 60%.</p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Estatística:</h2>
        <p>Estatística: é a medida numérica que descreve uma característica da amostra. Uma estatística mede algo em
          uma
          amostra.</p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Parâmetro:</h2>
        <p>É a medida numérica que descreve uma característica da população. Um parâmetro mede algo em uma
          população.
        </p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Variável:</h2>
        <p>As variáveis nos estudos estatísticos são os valores que assumem determinadas características dentro de
          uma
          pesquisa e podem ser classificadas em qualitativas ou quantitativas.

        </p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
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

    <div class="card-solid mansory-grid">
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

    <div class="card-solid mansory-grid">
      <div>
        <h2>Desvio Padrão:</h2>
        <p>O desvio padrão é a raiz quadrada da variância.
          O desvio padrão é capaz de identificar o “erro” em um conjunto de dados, caso quiséssemos substituir um
          dos valores coletados pela média aritmética.

          O desvio padrão aparece junto à média aritmética, informando o quão “confiável” é esse valor.
        </p>
        <p>Exemplo:</p>
        <p>Se a variância for:</p>
        <p>
          \\[ s^2 = 42.12 \\]
        </p>
        <p>O desvio padrão é a raiz desse valor:</p>

        <p>
        \\[ \\sqrt{42.12} = 6.49 \\]
      </p>

      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Variação Percentual:</h2>
        <p>Podemos dizer que variação percentual é uma forma de apresentar a relação entre dois números na forma
          percentual.
          Por exemplo, um produto que custava R$ 10 aumentou para R$ 15, Qual foi a variação percentual de aumento?
          Este é um caso muito simples e dá para resolver inclusive sem usar calculadora.

          Se subiu de 10 para 15, ele teve uma variação percentual e 50% ou seja um aumento de 50%.
          <p>
            Para calcular: <b>((Valor maior - Valor Menor) / Valor Menor) * 100</b>
          </p>
          <!-- Used to show the equation -->
          \\\[x = { ({ 15-10 \\\over 10 }) * 100 } = 50\% \\\]

        </p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Variância:</h2>
        <p>Dado um conjunto de dados, a variância é uma medida de dispersão que mostra o quão distante cada valor
          desse conjunto está do valor central (médio).

          Quanto menor é a variância, mais próximos os valores estão da média; mas quanto maior ela é, mais os
          valores estão distantes da média.
        </p>

        <p>Exemplo: 15 15 16 17 17 18 18 18 18 18 19 21 22 41</p>

        <div class="center-content">
          <table>
            <thead>
              <tr>
                <th class="th-style  ">Values(x.i)</th> 
                <th class="th-style  ">F.i</th> 
                <th class="th-style  ">%</th>
                <th class="th-style  ">x.i * F.i</th>
                <th class="th-style">x.i^2 * F.i</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td class="">15</td>
            <td class="">2</td>
            <td class="">14.29</td>
            <td class="">30</td>
            <td>450</td>
          </tr>
          
          <tr>
            <td class="">16</td>
            <td class="">1</td>
            <td class="">7.14</td>
            <td class="">16</td>
            <td>256</td>
          </tr>
          
          <tr>
            <td class="">17</td>
            <td class="">2</td>
            <td class="">14.29</td>
            <td class="">34</td>
            <td>578</td>
          </tr>
          
          <tr>
            <td class="">18</td>
            <td class="">5</td>
            <td class="">35.71</td>
            <td class="">90</td>
            <td>1620</td>
          </tr>
          
          <tr>
            <td class="">19</td>
            <td class="">1</td>
            <td class="">7.14</td>
            <td class="">19</td>
            <td>361</td>
          </tr>
          
          <tr>
            <td class="">21</td>
            <td class="">1</td>
            <td class="">7.14</td>
            <td class="">21</td>
            <td>441</td>
          </tr>
          
          <tr>
            <td class="">22</td>
            <td class="">1</td>
            <td class="">7.14</td>
            <td class="">22</td>
            <td>484</td>
          </tr>
          
          <tr>
            <td class="">41</td>
            <td class="">1</td>
            <td class="">7.14</td>
            <td class="">41</td>
            <td>1681</td>
          </tr>
        
            <tr class="total">
              <td class=" th-style">TOTAL</td>
              <td class=" th-style">14</td>
              <td class=" th-style">100.00</td>
              <td class=" th-style">273</td>
              <td class="th-style">5871</td>
            </tr>
          </tbody>                          
        </table>
      </div>
      
      <p>
        \\[ s^2 = { { \\sum_{i=1}^k x_i^2 * F_i - ({ { (\\sum_{i=1}^k x_i * F_i)^2 } \\over n}) } \\over n - 1 } \\]
      </p>
      
      <p>
        \\[ s^2 = { { 5871 - ({ { 273^2 } \\over 14}) } \\over 14 - 1 } \\]
      </p>

      <p>
        \\[ s^2 = { { 5871 - ({ { 74529 } \\over 14}) } \\over 13 } \\]
      </p>

      <p>
        \\[ s^2 = { { 5871 - 5323.5 } \\over 13 } \\]
      </p>

      <p>
        \\[ s^2 = { { 547.5 } \\over 13 } \\]
      </p>

      <p>
        \\[ s^2 = 42.12 \\]
      </p>

      </div>
    </div>


    <div class="card-solid mansory-grid">
      <div>
        <h2>Classe:</h2>
        <p>
          É cada um dos grupos de valores em que se subdivide os dados observados.

        </p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Distribuição de Frequências por Classes:</h2>

        <p>Determinação da Amplitude Total:</p>
        <p>AT = Xmax − Xmin</p>
        <p>Exemplo: 2 2 2 9 9 9 9 9 9 11 11 13 13 15 15 23 23 23 27 31 37 41 41 43 45 45 45</p>
        <p><b>AT</b> = 45 − 2 = 43</p>

        <p>Determinar número de classes (c):</p>
        <p>
          \\[ c = \\sqrt{N} \\] "Onde <b>N</b> é a quantidade de observações. Nesse exemplo é <b>27</b>"
          Exemplo: \\[ c = \\sqrt{27} \\]
          <b>c</b> = 5.19 (aproxima para cima)
        </p>
        <p><b>c</b> = 6</p>

        <p>Determinação da Amplitude das Classes (h):</p>
        <p>\\[ h \\cong {AT \\over c} \\]</p>
        <p>Exemplo: \\[ h \\cong {43 \\over 6} \\]</p>

        <p><b>h</b> = 7.16 (aproxima para cima)</p>
        <p><b>h</b> = 8</p>

        <div class="center-content">
          <table>
            <thead>
              <tr>
                <th class="th-style ">Classes</th>
                <th class="th-style">F.i</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class=''>2 &#x022A2; 10</td>
                <td>9</td>
              </tr>
              <tr>
                <td class=''>10 &#x022A2; 18</td>
                <td>6</td>
              </tr>
              <tr>
                <td class=''>18 &#x022A2; 26</td>
                <td>3</td>
              </tr>
              <tr>
                <td class=''>26 &#x022A2; 34</td>
                <td>2</td>
              </tr>
              <tr>
                <td class=''>34 &#x022A2; 42</td>
                <td>3</td>
              </tr>
              <tr>
                <td class=''>42 &#x022A2; 50</td>
                <td>4</td>
              </tr>

              <tr>
                <td class="th-style "> &#8721; </td>
                <td class="th-style">27</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Geralmente se utiliza o gráfico do tipo <b>Histograma</b> para exibir as informações.
        </p>

      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Amplitude total:</h2>
        <p>
          A amplitude total é a diferença entre o maior e o menor valor observado.
        </p>
        <p>AT = x(máx.) – x(mín.)</p>
          <b>Onde:</b>
          <p>AT = amplitude total</p>
          <p>X(máx.) – valor máximo da amostra</p>
          <p>X(mín.) – valor mínimo da amostra</p>

          <b>Exemplo:</b>
          <p>Para os valores 15 15 16 17 17 18 18 18 18 18 19 21 22 41 temos:</p>
          <p>AT = 41 – 15 = <b>26</b></p>
          <p>Quando dizemos que a amplitude total dos valores é <b>26</b>, estamos afirmando alguma coisa referente à sua concentração. Quanto maior a amplitude total, maior a dispersão ou variabilidade dos dados da variável.</p>
      </div>
    </div>

    <div class="card-solid mansory-grid">
      <div>
        <h2>Coeficiente de Variação:</h2>
        <p>
          O coeficiente de variação é usado para analisar a dispersão em termos relativos a seu valor médio quando duas ou mais séries de valores apresentam unidades de medida diferentes. Dessa forma, podemos dizer que o coeficiente de variação é uma forma de expressar a variabilidade dos dados excluindo a influência da ordem de grandeza da variável.
        </p>
        <p>
        Como o coeficiente de variação analisa a dispersão em termos relativos, ele será dado em %. Quanto menor for o valor do coeficiente de variação, mais homogêneos serão os dados, ou seja, menor será a dispersão em torno da média. De uma forma geral, se o CV:
        </p>
        <p>For menor ou igual a 15% → baixa dispersão: dados homogêneos</p>
        <p>For entre 15 e 30% → média dispersão</p>
        <p>For maior que 30% → alta dispersão: dados heterogêneos</p>
        
        
        <p>O cálculo do coeficiente de variação é feito através da fórmula:</p>
        \\[ { {s} \\over X } * 100 \\]
 
        <p>Onde:</p>
        <p><b>s</b> é o desvio padrão</p>
        <p><b>X</b> é a média dos dados</p>
        <p><b>CV</b> é o coeficiente de variação</p>

        <p>Exemplo:</p>

        <p>
        \\[ { {6.49} \\over 19.50 } * 100 = 33.29\\% \\]
        </p>

      </div>
    </div>

    
    <div class="card-solid mansory-grid">
      <div>
        <h2>Ponto Médio De Classe:</h2>
        <p>
          É o ponto que divide o intervalo de classe em duas partes iguais. 
        </p>

        <p>
          Exemplo: 
        </p>
        
        <p>
          Em <b>49 |-- 53</b> o ponto médio x3 = (53+49)/2 = 51, ou seja  x3=( l3 + L3 )/2.
        </p>

      </div>
    </div>


  </div>
    
`

  tab2.innerHTML = tab2Tags;

};

getTab2();