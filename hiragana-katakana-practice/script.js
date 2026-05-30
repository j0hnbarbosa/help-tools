const KANA_SETS = [
  { set: 'a', items: [['a', 'あ', 'ア'], ['i', 'い', 'イ'], ['u', 'う', 'ウ'], ['e', 'え', 'エ'], ['o', 'お', 'オ']] },
  { set: 'ka', items: [['ka', 'か', 'カ'], ['ki', 'き', 'キ'], ['ku', 'く', 'ク'], ['ke', 'け', 'ケ'], ['ko', 'こ', 'コ']] },
  { set: 'sa', items: [['sa', 'さ', 'サ'], ['shi', 'し', 'シ'], ['su', 'す', 'ス'], ['se', 'せ', 'セ'], ['so', 'そ', 'ソ']] },
  { set: 'ta', items: [['ta', 'た', 'タ'], ['chi', 'ち', 'チ'], ['tsu', 'つ', 'ツ'], ['te', 'て', 'テ'], ['to', 'と', 'ト']] },
  { set: 'na', items: [['na', 'な', 'ナ'], ['ni', 'に', 'ニ'], ['nu', 'ぬ', 'ヌ'], ['ne', 'ね', 'ネ'], ['no', 'の', 'ノ']] },
  { set: 'ha', items: [['ha', 'は', 'ハ'], ['hi', 'ひ', 'ヒ'], ['fu', 'ふ', 'フ'], ['he', 'へ', 'ヘ'], ['ho', 'ほ', 'ホ']] },
  { set: 'ma', items: [['ma', 'ま', 'マ'], ['mi', 'み', 'ミ'], ['mu', 'む', 'ム'], ['me', 'め', 'メ'], ['mo', 'も', 'モ']] },
  { set: 'ya', items: [['ya', 'や', 'ヤ'], ['yu', 'ゆ', 'ユ'], ['yo', 'よ', 'ヨ']] },
  { set: 'ra', items: [['ra', 'ら', 'ラ'], ['ri', 'り', 'リ'], ['ru', 'る', 'ル'], ['re', 'れ', 'レ'], ['ro', 'ろ', 'ロ']] },
  { set: 'wa', items: [['wa', 'わ', 'ワ'], ['wo', 'を', 'ヲ'], ['n', 'ん', 'ン']] },
  { set: 'kya', items: [['kya', 'きゃ', 'キャ'], ['kyu', 'きゅ', 'キュ'], ['kyo', 'きょ', 'キョ']] },
  { set: 'sha', items: [['sha', 'しゃ', 'シャ'], ['shu', 'しゅ', 'シュ'], ['sho', 'しょ', 'ショ']] },
  { set: 'cha', items: [['cha', 'ちゃ', 'チャ'], ['chu', 'ちゅ', 'チュ'], ['cho', 'ちょ', 'チョ']] },
  { set: 'nya', items: [['nya', 'にゃ', 'ニャ'], ['nyu', 'にゅ', 'ニュ'], ['nyo', 'にょ', 'ニョ']] },
  { set: 'hya', items: [['hya', 'ひゃ', 'ヒャ'], ['hyu', 'ひゅ', 'ヒュ'], ['hyo', 'ひょ', 'ヒョ']] },
  { set: 'mya', items: [['mya', 'みゃ', 'ミャ'], ['myu', 'みゅ', 'ミュ'], ['myo', 'みょ', 'ミョ']] },
  { set: 'rya', items: [['rya', 'りゃ', 'リャ'], ['ryu', 'りゅ', 'リュ'], ['ryo', 'りょ', 'リョ']] },
  { set: 'gya', items: [['gya', 'ぎゃ', 'ギャ'], ['gyu', 'ぎゅ', 'ギュ'], ['gyo', 'ぎょ', 'ギョ']] },
  { set: 'ja', items: [['ja', 'じゃ', 'ジャ'], ['ju', 'じゅ', 'ジュ'], ['jo', 'じょ', 'ジョ']] },
  { set: 'bya', items: [['bya', 'びゃ', 'ビャ'], ['byu', 'びゅ', 'ビュ'], ['byo', 'びょ', 'ビョ']] },
  { set: 'pya', items: [['pya', 'ぴゃ', 'ピャ'], ['pyu', 'ぴゅ', 'ピュ'], ['pyo', 'ぴょ', 'ピョ']] },
];

const state = {
  selectedScripts: new Set(['hiragana', 'katakana']),
  selectedSets: new Set(KANA_SETS.map((s) => s.set)),
  audioEnabled: true,
  currentQuestion: null,
  options: [],
  score: {
    correct: 0,
    total: 0,
  },
};

const speech = {
  supported: 'speechSynthesis' in window,
  lang: 'ja-JP',
};

const els = {
  setsContainer: document.getElementById('sets-container'),
  toggleAllSets: document.getElementById('toggle-all-sets'),
  kanaCharacter: document.getElementById('kana-character'),
  answerForm: document.getElementById('answer-form'),
  answerInput: document.getElementById('answer-input'),
  feedback: document.getElementById('feedback'),
  optionsContainer: document.getElementById('options-container'),
  nextQuestion: document.getElementById('next-question'),
  activeSetBadge: document.getElementById('active-set-badge'),
  scoreCorrect: document.getElementById('score-correct'),
  scoreTotal: document.getElementById('score-total'),
  setModal: document.getElementById('set-modal'),
  setModalTitle: document.getElementById('set-modal-title'),
  setModalList: document.getElementById('set-modal-list'),
  setModalClose: document.getElementById('set-modal-close'),
  audioToggle: document.getElementById('audio-toggle'),
  audioSupportText: document.getElementById('audio-support-text'),
};

function getKanaFromTuple(tuple, script) {
  return script === 'hiragana' ? tuple[1] : tuple[2];
}

function getSelectedScriptsArray() {
  return Array.from(state.selectedScripts);
}

function formatSetTuple(tuple, scripts) {
  const romaji = tuple[0];
  if (scripts.length === 1) {
    const kana = getKanaFromTuple(tuple, scripts[0]);
    return `${kana}|${romaji}`;
  }
  return `${tuple[1]}/${tuple[2]}|${romaji}`;
}

function getSetPreviewItems(setObj) {
  return setObj.items.map(([romaji, hira, kata]) => ({
    kanaPair: `${hira}|${kata}`,
    romaji,
  }));
}

function getSetDisplayLabel(setObj) {
  const scripts = getSelectedScriptsArray();
  const firstTuple = setObj.items[0];

  if (scripts.length === 1) {
    const kana = getKanaFromTuple(firstTuple, scripts[0]);
    return `${kana}|${setObj.set}`;
  }

  return `${firstTuple[1]}/${firstTuple[2]}|${setObj.set}`;
}

function openSetModal(setObj) {
  const previewItems = getSetPreviewItems(setObj);
  els.setModalTitle.textContent = `Conjunto ${getSetDisplayLabel(setObj)}`;
  els.setModalList.innerHTML = '';

  previewItems.forEach((value) => {
    const li = createSetPreviewNode('li', value);
    els.setModalList.appendChild(li);
  });

  els.setModal.classList.remove('hidden');
  els.setModal.classList.add('flex');
}

function closeSetModal() {
  els.setModal.classList.add('hidden');
  els.setModal.classList.remove('flex');
}

function createSetPreviewNode(tagName, previewItem) {
  const node = document.createElement(tagName);
  node.className = 'rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700';

  const kanaLine = document.createElement('p');
  kanaLine.className = 'font-bold leading-tight';
  kanaLine.textContent = previewItem.kanaPair;

  const romajiLine = document.createElement('p');
  romajiLine.className = 'mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500';
  romajiLine.textContent = previewItem.romaji;

  node.appendChild(kanaLine);
  node.appendChild(romajiLine);

  return node;
}

function pronounceKana(text) {
  if (!speech.supported || !state.audioEnabled || !text) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speech.lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function setupAudioControls() {
  if (!els.audioToggle || !els.audioSupportText) {
    return;
  }

  els.audioToggle.checked = true;

  if (!speech.supported) {
    state.audioEnabled = false;
    els.audioToggle.checked = false;
    els.audioToggle.disabled = true;
    els.audioSupportText.textContent = 'Seu navegador nao suporta audio automatico.';
    return;
  }

  els.audioSupportText.textContent = 'Ativo por padrao ao acertar.';
  els.audioToggle.addEventListener('change', (event) => {
    state.audioEnabled = event.target.checked;
  });
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems(onlySelectedSets) {
  const scripts = getSelectedScriptsArray();

  return KANA_SETS.filter((setObj) => (onlySelectedSets ? state.selectedSets.has(setObj.set) : true)).flatMap((setObj) =>
    setObj.items.flatMap(([romaji, hira, kata]) =>
      scripts.map((script) => ({
        set: setObj.set,
        script,
        romaji,
        char: script === 'hiragana' ? hira : kata,
      }))
    )
  );
}

function updateScoreUI() {
  els.scoreCorrect.textContent = String(state.score.correct);
  els.scoreTotal.textContent = String(state.score.total);
}

function updateFeedback(message, type) {
  els.feedback.textContent = message;
  if (type === 'ok') {
    els.feedback.className = 'mt-1 min-h-5 text-center text-sm font-semibold text-emerald-600';
    return;
  }
  if (type === 'error') {
    els.feedback.className = 'mt-1 min-h-5 text-center text-sm font-semibold text-red-600';
    return;
  }
  els.feedback.className = 'mt-1 min-h-5 text-center text-sm font-semibold text-slate-600';
}

function renderSetControls() {
  els.setsContainer.innerHTML = '';

  KANA_SETS.forEach((setObj) => {
    const id = `set-${setObj.set}`;
    const previewItems = getSetPreviewItems(setObj);
    const displayLabel = getSetDisplayLabel(setObj);
    const [kanaLabel, romajiLabel] = displayLabel.split('|');

    const card = document.createElement('div');
    card.className = 'relative z-0 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2.5 text-sm font-medium shadow-sm transition hover:z-30 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow';

    const row = document.createElement('div');
    row.className = 'flex items-center justify-between gap-2';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = 'flex min-w-0 cursor-pointer items-center gap-2';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.checked = state.selectedSets.has(setObj.set);
    input.className = 'mr-2 align-middle';
    input.addEventListener('change', () => {
      if (input.checked) {
        state.selectedSets.add(setObj.set);
      } else {
        state.selectedSets.delete(setObj.set);
      }
      ensureAtLeastOneSetSelected();
      updateToggleAllText();
      generateQuestion();
    });

    const textWrap = document.createElement('span');
    textWrap.className = 'min-w-0 leading-tight';

    const kanaText = document.createElement('span');
    kanaText.className = 'block truncate text-base font-bold text-slate-900';
    kanaText.textContent = kanaLabel || displayLabel;

    const romajiText = document.createElement('span');
    romajiText.className = 'block truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500';
    romajiText.textContent = romajiLabel || setObj.set;

    const helpWrap = document.createElement('div');
    helpWrap.className = 'group relative z-10 shrink-0';

    const helpBtn = document.createElement('button');
    helpBtn.type = 'button';
    helpBtn.className = 'inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs font-bold text-slate-700 transition hover:border-sky-500 hover:text-sky-700';
    helpBtn.textContent = '?';
    helpBtn.setAttribute('aria-label', `Ver valores do conjunto ${setObj.set}`);
    helpBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openSetModal(setObj);
    });

    const tooltip = document.createElement('div');
    tooltip.className = 'pointer-events-none absolute right-0 top-0 z-[100] hidden w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-slate-200 group-hover:block';

    const tooltipList = document.createElement('div');
    tooltipList.className = 'grid gap-1';

    previewItems.forEach((item) => {
      tooltipList.appendChild(createSetPreviewNode('div', item));
    });

    tooltip.appendChild(tooltipList);

    textWrap.appendChild(kanaText);
    textWrap.appendChild(romajiText);
    label.appendChild(input);
    label.appendChild(textWrap);
    helpWrap.appendChild(helpBtn);
    helpWrap.appendChild(tooltip);
    row.appendChild(label);
    row.appendChild(helpWrap);
    card.appendChild(row);
    els.setsContainer.appendChild(card);
  });

  updateToggleAllText();
}

function ensureAtLeastOneSetSelected() {
  if (state.selectedSets.size > 0) {
    return;
  }
  const fallback = KANA_SETS[0].set;
  state.selectedSets.add(fallback);
  renderSetControls();
  updateFeedback('Pelo menos um conjunto precisa ficar marcado.', 'error');
}

function updateToggleAllText() {
  const allSelected = state.selectedSets.size === KANA_SETS.length;
  els.toggleAllSets.textContent = allSelected ? 'Desmarcar todos' : 'Marcar todos';
}

function buildOptions(correctRomaji, allItems) {
  const uniqueRomajis = Array.from(new Set(allItems.map((item) => item.romaji)));
  const distractors = shuffle(uniqueRomajis.filter((romaji) => romaji !== correctRomaji));

  const picked = distractors.slice(0, 4);
  const options = shuffle([correctRomaji, ...picked]);

  return options;
}

function renderOptions() {
  els.optionsContainer.innerHTML = '';

  state.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.className = 'rounded-xl border border-slate-300 bg-white px-3 py-3 text-left text-base font-semibold transition hover:border-coral hover:bg-orange-50';
    button.addEventListener('click', () => checkAnswer(option));
    els.optionsContainer.appendChild(button);
  });
}

function generateQuestion() {
  const selectedItems = buildItems(true);
  const allItems = buildItems(false);

  if (selectedItems.length === 0) {
    state.currentQuestion = null;
    state.options = [];
    els.kanaCharacter.textContent = '-';
    els.activeSetBadge.textContent = 'set: -';
    renderOptions();
    updateFeedback('Selecione ao menos um conjunto.', 'error');
    return;
  }

  const previousChar = state.currentQuestion?.char;
  const pool = selectedItems.length > 1 ? selectedItems.filter((item) => item.char !== previousChar) : selectedItems;
  const question = pool[Math.floor(Math.random() * pool.length)];

  state.currentQuestion = question;
  state.options = buildOptions(question.romaji, allItems);

  els.kanaCharacter.textContent = question.char;
  const label = `${question.char}|${question.set}`;
  els.activeSetBadge.textContent = `set: ${label}`;
  els.answerInput.value = '';
  els.answerInput.focus();
  renderOptions();
  updateFeedback('Digite ou clique em uma alternativa.', 'neutral');
}

function checkAnswer(rawAnswer) {
  if (!state.currentQuestion) {
    return;
  }

  const answer = rawAnswer.trim().toLowerCase();
  if (!answer) {
    updateFeedback('Digite uma resposta antes de conferir.', 'error');
    return;
  }

  const isCorrect = answer === state.currentQuestion.romaji;
  state.score.total += 1;

  if (isCorrect) {
    state.score.correct += 1;
    updateScoreUI();
    updateFeedback(`Correto: ${state.currentQuestion.char} = ${state.currentQuestion.romaji}`, 'ok');
    pronounceKana(state.currentQuestion.char);
    setTimeout(() => generateQuestion(), 700);
    return;
  }

  updateScoreUI();
  updateFeedback(`Errado. Resposta correta: ${state.currentQuestion.romaji}`, 'error');
}

function setupScriptControls() {
  const checkboxes = document.querySelectorAll('input[name="script"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const script = event.target.value;

      if (event.target.checked) {
        state.selectedScripts.add(script);
      } else {
        state.selectedScripts.delete(script);
      }

      if (state.selectedScripts.size === 0) {
        state.selectedScripts.add('hiragana');
        event.target.checked = script === 'hiragana';
        const hiraCheckbox = document.querySelector('input[name="script"][value="hiragana"]');
        if (hiraCheckbox) {
          hiraCheckbox.checked = true;
        }
        updateFeedback('Pelo menos um sistema precisa ficar marcado.', 'error');
      }

      renderSetControls();
      generateQuestion();
    });
  });
}

function setupToggleAllButton() {
  els.toggleAllSets.addEventListener('click', () => {
    const allSelected = state.selectedSets.size === KANA_SETS.length;

    if (allSelected) {
      state.selectedSets = new Set([KANA_SETS[0].set]);
    } else {
      state.selectedSets = new Set(KANA_SETS.map((s) => s.set));
    }

    renderSetControls();
    generateQuestion();
  });
}

function setupAnswerForm() {
  els.answerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkAnswer(els.answerInput.value);
  });
}

function setupNextButton() {
  els.nextQuestion.addEventListener('click', () => {
    generateQuestion();
  });
}

function setupSetModal() {
  els.setModalClose.addEventListener('click', closeSetModal);
  els.setModal.addEventListener('click', (event) => {
    if (event.target === els.setModal) {
      closeSetModal();
    }
  });
}

function init() {
  renderSetControls();
  setupScriptControls();
  setupToggleAllButton();
  setupAudioControls();
  setupAnswerForm();
  setupNextButton();
  setupSetModal();
  updateScoreUI();
  generateQuestion();
}

init();
