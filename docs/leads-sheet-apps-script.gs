/**
 * מוסיף ליד מטופס בדיקת ההתאמה לגיליון "לידים – אבחון".
 *
 * איך מחברים (פעם אחת):
 * 1. פותחים את הגיליון "לידים – אבחון".
 * 2. תפריט Extensions → Apps Script.
 * 3. מוחקים את מה שיש בעורך ומדביקים את כל הקובץ הזה. שומרים.
 * 4. Deploy → New deployment → סוג: Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. מאשרים הרשאות. מעתיקים את כתובת ה-Web app.
 * 6. ב-Supabase, SQL Editor, מריצים:
 *    insert into public.app_config (key, value) values
 *      ('leads_sheet_webhook_url', 'הכתובת שהועתקה');
 *    אם המפתח כבר קיים:
 *    update public.app_config set value = 'הכתובת', updated_at = now()
 *      where key = 'leads_sheet_webhook_url';
 *    השרת קורא את זה לבד. אין צורך במשתנה חדש בוורסל.
 *    LEADS_SHEET_WEBHOOK_URL בוורסל, אם הוא קיים, גובר על הטבלה.
 *
 * אופציונלי, כדי שרק האתר יוכל לכתוב:
 * Project Settings → Script properties → LEADS_WEBHOOK_SECRET
 * ואותו ערך בשורה leads_sheet_webhook_secret בטבלה app_config
 * (או ב-LEADS_SHEET_WEBHOOK_SECRET בוורסל, אם הוא קיים הוא גובר).
 * אם אין סיסמה, הכתובת עצמה היא המפתח. לא לשתף אותה.
 *
 * עמודות כמו ב-n8n. מזהה L-001 עולה לפי המספר הגבוה שכבר קיים בגיליון "לידים".
 * נוסחאות "שיחה אחרונה" / "המשימה הבאה" / "תאריך יעד" מניחות שמזהה הליד בעמודה A.
 * רשימת ההערות תואמת ל-lib/leads/audit.ts.
 */

var LEADS_TAB = 'לידים';
var CRM_TAB = 'גיליון1';

var LEAD_HEADERS = [
  'מזהה ליד',
  'תאריך כניסה',
  'שם',
  'עסק',
  'אימייל אישי',
  'מייל העסק',
  'ווטסאפ',
  'מקור',
  'סטטוס',
  'דחיפות',
  'מטרת הפרויקט',
  'הבעיה המרכזית',
  'מה חסר',
  'קישור לאתר',
  'שיחה אחרונה',
  'המשימה הבאה',
  'תאריך יעד',
  'הערות',
];

var CRM_HEADERS = [
  'תאריך',
  'שם',
  'אימייל',
  'קשר',
  'עסק',
  'מטרה',
  'יום עבודה',
  'משימה חוזרת',
  'שיקרה לבד',
  'מקור לקוחות',
  'אחרי פנייה',
  'שאלות חוזרות',
  'כלים',
  'קישור לאתר',
  'מצב אתר',
  'חסר',
  'בעיה מרכזית',
  'דחיפות',
  'סטטוס',
];

var NOTE_EXTRAS = [
  ['כלים היום', 'כלים'],
  ['מצב אתר', 'אתר'],
  ['רוצה שיקרה לבד', 'שיקרה לבד'],
  ['משימה חוזרת', 'משימה חוזרת'],
  ['יום עבודה', 'יום עבודה'],
  ['שאלות חוזרות', 'שאלות חוזרות'],
  ['אחרי פנייה', 'אחרי פנייה'],
  ['מקור לקוחות', 'מקור לקוחות'],
];

var LEAD_COLUMN_KEYS = {
  'שם': true,
  'העסק': true,
  'אימייל': true,
  'טלפון': true,
  'דחיפות': true,
  'מטרה': true,
  'הבעיה הכי חשובה': true,
  'חסר': true,
  'קישור לאתר': true,
};

var FORMULA_KEYS = {
  'שיחה אחרונה': true,
  'המשימה הבאה': true,
  'תאריך יעד': true,
};

function doGet() {
  return json_({ ok: true, ping: true });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
  } catch (err) {
    return json_({ ok: false, error: 'busy' });
  }
  try {
    var body = {};
    try {
      body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    } catch (parseErr) {
      return json_({ ok: false, error: 'invalid json' });
    }
    if (!allowed_(body)) return json_({ ok: false, error: 'forbidden' });

    var answers = body.answers && typeof body.answers === 'object' ? body.answers : body;
    var submissionId = String(body.submissionId || '').trim();
    var name = String(answers['שם'] || '').trim();
    if (!name || !submissionId) return json_({ ok: false, error: 'missing name' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var leads = ss.getSheetByName(LEADS_TAB);
    var crm = ss.getSheetByName(CRM_TAB);
    if (!leads || !crm) return json_({ ok: false, error: 'missing tab' });

    var leadMap = ensureHeaders_(leads, LEAD_HEADERS);
    var crmMap = ensureHeaders_(crm, CRM_HEADERS);
    assertHeaders_(leadMap, LEAD_HEADERS);
    assertHeaders_(crmMap, CRM_HEADERS);

    var notesCol = leadMap['הערות'];
    if (notesContain_(leads, notesCol, submissionId)) {
      var existingId = existingLeadId_(leads, leadMap['מזהה ליד'], notesCol, submissionId);
      return json_({ ok: true, leadId: existingId || 'existing', duplicate: true });
    }

    var leadId = nextLeadId_(leads, leadMap['מזהה ליד']);
    var notes = typeof body.notes === 'string' && body.notes
      ? body.notes
      : buildNotes_(answers, submissionId);
    var day = Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'dd/MM/yyyy');
    var stamp = Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'dd/MM/yyyy HH:mm');

    appendByHeaders_(leads, leadMap, {
      'מזהה ליד': leadId,
      'תאריך כניסה': day,
      'שם': name,
      'עסק': str_(answers['העסק']),
      'אימייל אישי': str_(answers['אימייל']),
      'מייל העסק': '',
      'ווטסאפ': str_(answers['טלפון']),
      'מקור': 'טופס אבחון',
      'סטטוס': 'ליד חדש',
      'דחיפות': str_(answers['דחיפות']),
      'מטרת הפרויקט': str_(answers['מטרה']),
      'הבעיה המרכזית': str_(answers['הבעיה הכי חשובה']),
      'מה חסר': str_(answers['חסר']),
      'קישור לאתר': str_(answers['קישור לאתר']),
      'שיחה אחרונה': formulaLast_(),
      'המשימה הבאה': formulaNext_(),
      'תאריך יעד': formulaDue_(),
      'הערות': notes,
    });

    appendByHeaders_(crm, crmMap, {
      'תאריך': stamp,
      'שם': name,
      'אימייל': str_(answers['אימייל']),
      'קשר': str_(answers['טלפון']),
      'עסק': str_(answers['העסק']),
      'מטרה': str_(answers['מטרה']),
      'יום עבודה': str_(answers['יום עבודה']),
      'משימה חוזרת': str_(answers['משימה חוזרת']),
      'שיקרה לבד': str_(answers['שיקרה לבד']),
      'מקור לקוחות': str_(answers['מקור לקוחות']),
      'אחרי פנייה': str_(answers['אחרי פנייה']),
      'שאלות חוזרות': str_(answers['שאלות חוזרות']),
      'כלים': str_(answers['כלים']),
      'קישור לאתר': str_(answers['קישור לאתר']),
      'מצב אתר': str_(answers['אתר']),
      'חסר': str_(answers['חסר']),
      'בעיה מרכזית': str_(answers['הבעיה הכי חשובה']),
      'דחיפות': str_(answers['דחיפות']),
      'סטטוס': 'חדש',
    });

    return json_({ ok: true, leadId: leadId });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    lock.releaseLock();
  }
}

function allowed_(body) {
  var secret = PropertiesService.getScriptProperties().getProperty('LEADS_WEBHOOK_SECRET');
  if (!secret) return true;
  return String(body.secret || '') === secret;
}

function str_(value) {
  return String(value == null ? '' : value).trim();
}

function buildNotes_(answers, submissionId) {
  var parts = [];
  var used = {};
  for (var i = 0; i < NOTE_EXTRAS.length; i++) {
    var label = NOTE_EXTRAS[i][0];
    var key = NOTE_EXTRAS[i][1];
    used[key] = true;
    var value = str_(answers[key]);
    if (value) parts.push(label + ': ' + value);
  }
  var rest = [];
  for (var k in answers) {
    if (!Object.prototype.hasOwnProperty.call(answers, k)) continue;
    if (used[k] || LEAD_COLUMN_KEYS[k]) continue;
    var v = str_(answers[k]);
    if (v) rest.push(k);
  }
  rest.sort();
  for (var r = 0; r < rest.length; r++) parts.push(rest[r] + ': ' + str_(answers[rest[r]]));
  parts.unshift('submissionId: ' + submissionId);
  return parts.join(' | ').slice(0, 45000);
}

function ensureHeaders_(sheet, headers) {
  var first = String(sheet.getRange(1, 1).getValue() || '').trim();
  if (sheet.getLastRow() === 0 || !first) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return headersOf_(sheet);
}

function headersOf_(sheet) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var row = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var map = {};
  for (var i = 0; i < row.length; i++) {
    var key = String(row[i] || '').trim();
    if (key && !map[key]) map[key] = i + 1;
  }
  return map;
}

function assertHeaders_(map, keys) {
  var missing = [];
  for (var i = 0; i < keys.length; i++) {
    if (!map[keys[i]]) missing.push(keys[i]);
  }
  if (missing.length) throw new Error('חסרות עמודות: ' + missing.join(', '));
}

function appendByHeaders_(sheet, map, data) {
  var row = sheet.getLastRow() + 1;
  for (var key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
    var col = map[key];
    if (!col) throw new Error('חסרה עמודה: ' + key);
    var cell = sheet.getRange(row, col);
    if (FORMULA_KEYS[key]) cell.setFormula(localizeFormula_(data[key]));
    else cell.setValue(data[key]);
  }
}

function notesContain_(sheet, notesCol, submissionId) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var values = sheet.getRange(2, notesCol, last - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0] || '').indexOf(submissionId) !== -1) return true;
  }
  return false;
}

function existingLeadId_(sheet, idCol, notesCol, submissionId) {
  var last = sheet.getLastRow();
  if (last < 2) return '';
  var notes = sheet.getRange(2, notesCol, last - 1, 1).getValues();
  var ids = sheet.getRange(2, idCol, last - 1, 1).getValues();
  for (var i = 0; i < notes.length; i++) {
    if (String(notes[i][0] || '').indexOf(submissionId) !== -1) return String(ids[i][0] || '');
  }
  return '';
}

function nextLeadId_(sheet, idCol) {
  var maxN = 0;
  var last = sheet.getLastRow();
  if (last >= 2) {
    var values = sheet.getRange(2, idCol, last - 1, 1).getValues();
    for (var i = 0; i < values.length; i++) {
      var match = String(values[i][0] || '').match(/(\d+)\s*$/);
      if (match) maxN = Math.max(maxN, parseInt(match[1], 10));
    }
  }
  var n = String(maxN + 1);
  while (n.length < 3) n = '0' + n;
  return 'L-' + n;
}

function refA_() {
  return 'INDIRECT("A"&ROW())';
}

function formulaLast_() {
  var a = refA_();
  return '=IF(' + a + '="","",IF(SUMPRODUCT(MAX((שיחות!$A$2:$A$500=' + a + ')*שיחות!$B$2:$B$500))=0,"",SUMPRODUCT(MAX((שיחות!$A$2:$A$500=' + a + ')*שיחות!$B$2:$B$500))))';
}

function formulaNext_() {
  var a = refA_();
  var match = 'MATCH(1,INDEX((משימות!$B$2:$B$500=' + a + ')*(משימות!$F$2:$F$500="פתוחה"),0),0)';
  return '=IF(' + a + '="","",IFERROR(INDEX(משימות!$C$2:$C$500,' + match + '),""))';
}

function formulaDue_() {
  var a = refA_();
  var match = 'MATCH(1,INDEX((משימות!$B$2:$B$500=' + a + ')*(משימות!$F$2:$F$500="פתוחה"),0),0)';
  return '=IF(' + a + '="","",IFERROR(INDEX(משימות!$D$2:$D$500,' + match + '),""))';
}

function localizeFormula_(formula) {
  var locale = '';
  try {
    locale = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetLocale() || '';
  } catch (err) {
    locale = '';
  }
  if (/^en/i.test(locale)) return formula;
  return String(formula).replace(/,/g, ';');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
