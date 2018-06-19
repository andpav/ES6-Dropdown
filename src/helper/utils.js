/* find matches for dropdown filter */

/* eslint-disable */
// ex.: sinits -> ьштшеы
const enToRuKeyboardTranslator = {
  'q':'й', 'w':'ц', 'e':'у', 'r':'к', 't':'е', 'y':'н', 'u':'г',
  'i':'ш', 'o':'щ', 'p':'з', '[':'х', ']':'ъ', 'a':'ф', 's':'ы',
  'd':'в', 'f':'а', 'g':'п', 'h':'р', 'j':'о', 'k':'л', 'l':'д',
  ';':'ж', '\'':'э', '\\':'ё', 'z':'я', 'x':'ч', 'c':'с', 'v':'м', 'b':'и',
  'n':'т', 'm':'ь', ',':'б', '.':'ю',
};

// ex.: синиц -> cbybw
const ruToEnKeyboardTranslator = {
  'й':'q', 'ц':'w', 'у':'e', 'к':'r', 'е':'t', 'н':'y', 'г':'u',
  'ш':'i', 'щ':'o', 'з':'p', 'х':'[', 'ъ':']', 'ф':'a', 'ы':'s',
  'в':'d', 'а':'f', 'п':'g', 'р':'h', 'о':'j', 'л':'k', 'д':'l',
  'ж':';', 'э':'\'', 'ё':'//', 'я':'z', 'ч':'x', 'с':'c', 'м':'v', 'и':'b',
  'т':'n', 'ь':'m', 'б':',', 'ю':'.',
};

/*
* Так как замены по произношению сделаны однозначными, работают нормально только для простых кейсов.
* С гласными, от расположения которых в слове зависит их произношение, уже проблемы.
*  И кейсы вроде 'щ' -> 'sch' в обратную сторону уже не работают.
 */

// sinits -> синиц
const enToRuPronounceTranslator = {
  'a': 'а', 'b': 'б', 'c': 'к', 'd': 'д', 'e': 'и', 'f': 'ф', 'g': 'г', 'h': 'х', 'i': 'и', 'j': 'дж', 'k': 'к',
  'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'v': 'в',
  'w': 'в', 'x': 'кс', 'y': 'ий', 'z': 'з',
};

// синиц -> sinits
const ruToEnPronounceTranslator = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'i',
  'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
  'х': 'h', 'ц': 'ts', 'ч': 'tch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'i', 'ь': '', 'э': 'e', 'ю': 'iy', 'я': 'ia',
};

const findMatchRuCase = (array, text) => {
  const first = text.toLowerCase();
  const second = first.replace(/[А-я/,.;\'\]\[]/g, s => s === s.toLowerCase() ? ruToEnPronounceTranslator[s] : ruToEnPronounceTranslator[s.toLowerCase()].toUpperCase());
  const third = second.replace(/[A-z/,.;\'\]\[]/g, s => s === s.toLowerCase() ? enToRuKeyboardTranslator[s] : enToRuKeyboardTranslator[s.toLowerCase()].toUpperCase());
  const fourth = first.replace(/[А-я/,.;\'\]\[]/g, s => s === s.toLowerCase() ? ruToEnKeyboardTranslator[s] : ruToEnKeyboardTranslator[s.toLowerCase()].toUpperCase());
  const fifth = fourth.replace(/[A-z/,.;\'\]\[]/g, s => s === s.toLowerCase() ? enToRuPronounceTranslator[s] : enToRuPronounceTranslator[s.toLowerCase()].toUpperCase());
  const matchArray = [first, second, third, fourth, fifth];

  return array.filter(item => Boolean(matchArray.find(matchString => item.name.toLowerCase().indexOf(matchString) > -1)));
}

const findMatchEnCase = (array, text) => {
  const first = text.toLowerCase();
  const second = first.replace(/[A-z/,.;\'\]\[]/g, s => s === s.toLowerCase() ? enToRuPronounceTranslator[s] : enToRuPronounceTranslator[s.toLowerCase()].toUpperCase());
  const third = second.replace(/[А-я/,.;\'\]\[]/g, s => s === s.toLowerCase() ? ruToEnKeyboardTranslator[s] : ruToEnKeyboardTranslator[s.toLowerCase()].toUpperCase());
  const fourth = first.replace(/[A-z/,.;\'\]\[]/g, s => s === s.toLowerCase() ? enToRuKeyboardTranslator[s] : enToRuKeyboardTranslator[s.toLowerCase()].toUpperCase());
  const fifth = fourth.replace(/[А-я/,.;\'\]\[]/g, s => s === s.toLowerCase() ? ruToEnPronounceTranslator[s] : ruToEnPronounceTranslator[s.toLowerCase()].toUpperCase());
  const matchArray = [first, second, third, fourth, fifth];

  return array.filter(item => Boolean(matchArray.find(matchString => item.name.toLowerCase().indexOf(matchString) > -1)));
}
/* eslint-enable */

export const findMatch = (useSmartFilter, array, text) => {
  if (useSmartFilter) {
    const haveRuSymbols = /[а-я]/i.test(text);

    return haveRuSymbols ? findMatchRuCase(array, text) : findMatchEnCase(array, text);
  }

  return array.filter(item => item.name.indexOf(text) > -1);
};

export const parseBody = (data) => {
  if (typeof data === 'string') {
    return null;
  }

  return data;
};

/* api methods */

const parseResponse = (data) => {
  const httpCode = data.status;

  if (httpCode < 200 || httpCode >= 400 || httpCode === 204) {
    return null;
  }

  return data.json();
};

const request = (url, method) =>
  fetch(url, { method })
    .then(response => parseResponse(response))
    .then(body => (body ? parseBody(body) : null));

export const getData = text =>
  request(`http://localhost:8082/data?text=${text}`, 'GET');
