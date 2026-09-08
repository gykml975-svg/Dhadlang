"use strict";
(function (root, factory) {
    root.Dhad = factory();
})(typeof window !== 'undefined' ? window : this, function () {
    'use strict';
    'use strict';
    const KINDS = [
        'SyntaxError',
        'NameError',
        'TypeError',
        'RuntimeError',
        'ImportError',
        'IndexError',
        'ArgumentError',
        'PermissionError',
    ];
    const KIND_LABELS_AR = {
        SyntaxError: 'خطأ في الصياغة',
        NameError: 'خطأ في الاسم',
        TypeError: 'خطأ في النوع',
        RuntimeError: 'خطأ تنفيذ',
        ImportError: 'خطأ استيراد',
        IndexError: 'خطأ فهرسة',
        ArgumentError: 'خطأ في الوسائط',
        PermissionError: 'صلاحية مرفوضة',
    };
    const ERROR_CATALOG = [
        ['DHD-001', /رمز غير معروف/, 'هذا الرمز غير مدعوم في لغة ضاد. احذفه أو استبدله برمز مدعوم.'],
        ['DHD-002', /نص غير مغلق/, 'أغلق النص بعلامة الاقتباس نفسها التي بدأ بها.'],
        ['DHD-003', /رمز فرض اتجاه بيدي/, 'احذف رمز التحكم في اتجاه النص، ثم أعد كتابة الجزء المتأثر يدويًا.'],
        ['DHD-004', /رقم فارسي\/أردي ممتد غير مدعوم/, 'استخدم الأرقام 0-9 أو ٠-٩ في الأرقام البرمجية.'],
        ['DHD-005', /تسلسل هروب غير معروف/, 'استخدم فقط تسلسلات الهروب الموثقة في مواصفة النصوص.'],
        ['DHD-006', /فاصلة آلاف عربية غير صحيحة|فاصل عشري بلا أرقام/, 'استخدم تجميع آلاف من 3 أرقام، وفاصلًا عشريًا يتبعه رقم واحد على الأقل.'],
        ['DHD-010', /توقعت إغلاق القوس "\)"|توقعت إغلاق القوس "\)"|القوس.*لم يُغلق بقوس \}/, 'أضف القوس أو القوس المعقوف المطلوب في الموضع المشار إليه.'],
        ['DHD-011', /توقعت فتح القوس "\("|توقعت القوس "\("/, 'أضف ( في هذا الموضع، ثم أغلقه بـ ).'],
        ['DHD-012', /متوقّع نهاية جملة/, 'أنه هذه الجملة بسطر جديد أو بفاصلة منقوطة ؛.'],
        ['DHD-013', /توقعت إغلاق القوس المربع "\]"/, 'أضف ] لإغلاق الفهرسة أو القائمة.'],
        ['DHD-014', /توقعت إغلاق القوس "\)" بعد استدعاء الدالة/, 'أضف ) بعد آخر وسيط في استدعاء الدالة.'],
        ['DHD-015', /تعبير غير متوقّع/, 'تحقق من أن التعبير يبدأ بقيمة أو اسم أو قوس صالح.'],
        ['DHD-016', /الجانب الأيسر من التعيين/, 'استخدم = مع متغير أو عنصر قائمة أو عضو وحدة صالح.'],
        ['DHD-017', /القوس \{.*لم يُغلق/, 'أضف } لإغلاق الكتلة التي بدأت بـ {.'],
        ['DHD-018', /توقعت اسم الدالة|اسم الدالة/, 'اكتب اسمًا صالحًا للدالة بعد كلمة دالة.'],
        ['DHD-019', /توقعت اسم متغير|الثابت .* يجب أن يُعطى قيمة/, 'اكتب اسم متغير صالحًا، أو أعطِ الثابت قيمة بصيغة ثابت الاسم = قيمة.'],
        ['DHD-020', /توقعت فاصلة/, 'افصل بين الوسائط أو عناصر القائمة بفاصلة ، أو ,.'],
        ['DHD-021', /توقعت قوس معقوف|RBRACE/, 'أضف } لإغلاق الكتلة المطلوبة.'],
        ['DHD-022', /توقعت قوس مربع|RBRACKET/, 'أضف ] لإغلاق القائمة أو الفهرسة.'],
        ['DHD-023', /توقعت اسمًا بعد النقطة|DOT/, 'اكتب اسم عضو صالحًا بعد النقطة.'],
        ['DHD-100', /متغير غير معرّف/, 'عرّف المتغير أولًا باستخدام خلي/متغير، أو تحقق من إملائه.'],
        ['DHD-101', /غير موجود داخل/, 'تحقق من اسم العضو الموجود داخل الوحدة.'],
        ['DHD-110', /لا يمكن جمع|العملية .* تحتاج أرقامًا|عملية \(-\) تحتاج رقمًا|لا يمكن المقارنة/, 'تحقق من أنواع القيم المستخدمة في العملية.'],
        ['DHD-111', /لا يمكن الفهرسة/, 'استخدم [ ] مع نص أو قائمة فقط.'],
        ['DHD-112', /الفهرس يجب أن يكون/, 'اجعل الفهرس رقمًا صحيحًا وضمن الحدود.'],
        ['DHD-113', /لا يمكن الإسناد بالفهرسة/, 'الإسناد بالفهرسة مسموح للقوائم فقط.'],
        ['DHD-114', /لا يمكن تغيير الثابت/, 'الثابت لا يمكن تغيير قيمته بعد تعريفه. استخدم خلي إذا احتجت قيمة قابلة للتغيير.'],
        ['DHD-115', /القراءة فقط/, 'هذه الوحدة للقراءة فقط ولا يمكن تعديل عناصرها.'],
        ['DHD-120', /القسمة على صفر|باقي القسمة على صفر/, 'تحقق من أن المقام ليس صفرًا قبل العملية.'],
        ['DHD-130', /وحدة غير معروفة/, 'تحقق من اسم الوحدة المتاحة أو من إملائها.'],
        ['DHD-140', /تحتاج .*وسيط|وسيطين بالضبط/, 'طابق عدد الوسائط مع تعريف الدالة.'],
        ['DHD-150', /القيمة ليست دالة قابلة للاستدعاء/, 'استدعِ دالة فعلية بدل قيمة عادية.'],
        ['DHD-160', /توقف التنفيذ|تجاوز التنفيذ/, 'تحقق من وجود شرط توقف أو من عمق التداخل.'],
    ];
    function catalogFor(kind, message) {
        const hit = ERROR_CATALOG.find(([, re]) => re.test(message || ''));
        if (hit)
            return { code: hit[0], suggestion: hit[2] };
        const fallback = {
            SyntaxError: 'DHD-090',
            NameError: 'DHD-190',
            TypeError: 'DHD-290',
            RuntimeError: 'DHD-390',
            ImportError: 'DHD-490',
            IndexError: 'DHD-590',
            ArgumentError: 'DHD-690',
            PermissionError: 'DHD-790',
        };
        return { code: fallback[kind] || 'DHD-999', suggestion: 'راجع السطر المشار إليه وتحقق من الصياغة والقيم المحيطة به.' };
    }
    class DhadError extends Error {
        constructor(message, loc = {}) {
            super(message);
            const kind = KINDS.includes(loc.kind) ? loc.kind : 'RuntimeError';
            const catalog = catalogFor(kind, message);
            this.line = loc.line;
            this.column = loc.column;
            this.length = loc.length || 1;
            this.kind = kind;
            this.name = this.kind;
            this.code = loc.code || catalog.code;
            this.text = loc.text !== undefined && loc.text !== null ? String(loc.text) : undefined;
            this.tokenText = this.text;
            this.suggestion = loc.suggestion || catalog.suggestion;
            this.errorType = this.kind;
            this.source = loc.source !== undefined ? String(loc.source) : undefined;
            this.stackTrace = Array.isArray(loc.stackTrace) ? loc.stackTrace.map(x => ({ ...x })) : [];
        }
    }
    const err = {};
    for (const kind of KINDS) {
        err[kind] = (message, loc = {}) => new DhadError(message, { ...loc, kind });
    }
    function formatError(e, sourceLines = [], filename = '<source>') {
        const label = KIND_LABELS_AR[e.kind] || 'خطأ';
        const lines = [
            `${e.code || 'DHD-999'}: ${label}`,
            e.message,
        ];
        if (e.line !== undefined && e.line !== null) {
            const col = e.column || 1;
            lines.push(`السطر ${e.line}، العمود ${col}`);
            lines.push(`  --> ${filename}:${e.line}:${col}`);
            const srcLine = sourceLines[e.line - 1] !== undefined ? sourceLines[e.line - 1] : '';
            const gutterWidth = String(e.line).length;
            const pad = ' '.repeat(gutterWidth);
            lines.push(`${pad} |`);
            lines.push(`${String(e.line).padStart(gutterWidth)} | ${srcLine}`);
            const caretLead = ' '.repeat(Math.max(0, col - 1));
            const caret = '^'.repeat(Math.max(1, e.length || 1));
            lines.push(`${pad} | ${caretLead}${caret}`);
        }
        if (e.text !== undefined && e.text !== null && e.text !== '') {
            lines.push(`الهدف: ${e.text === 'EOF' ? 'نهاية الملف' : JSON.stringify(e.text)}`);
        }
        if (e.source)
            lines.push(`المصدر: ${e.source}`);
        if (Array.isArray(e.stackTrace) && e.stackTrace.length) {
            lines.push('سلسلة الاستدعاء:');
            for (const frame of e.stackTrace) {
                const at = frame.line != null ? `:${frame.line}:${frame.column || 1}` : '';
                lines.push(`  ← ${frame.name || '<مجهول>'}${at}`);
            }
        }
        if (e.suggestion)
            lines.push(`الاقتراح: ${e.suggestion}`);
        return lines.join('\n');
    }
    function normalizeError(e) {
        if (e instanceof DhadError)
            return e;
        if (e instanceof RangeError && /call stack/i.test(e.message || '')) {
            return err.RuntimeError('تجاوز التنفيذ الحد الأقصى للتداخل (تعبير أو بنية متداخلة بعمق كبير جدًا، مثل أقواس كثيرة جدًا أو تعبير طويل جدًا)');
        }
        return err.RuntimeError('حدث خطأ داخلي غير متوقع أثناء تنفيذ البرنامج.');
    }
    'use strict';
    const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
    function normalizeDigits(str) {
        return str.replace(/[٠-٩]/g, d => String(ARABIC_DIGITS.indexOf(d)));
    }
    const KEYWORDS = {
        'اطبع': 'PRINT',
        'متغير': 'VAR',
        'خلي': 'VAR',
        'ثابت': 'CONST',
        'إذا': 'IF',
        'اذا': 'IF',
        'وإلا': 'ELSE',
        'والا': 'ELSE',
        'طالما': 'WHILE',
        'لكل': 'FOR',
        'من': 'FROM',
        'إلى': 'TO',
        'الى': 'TO',
        'دالة': 'FUNC',
        'مكوّن': 'COMPONENT',
        'مكون': 'COMPONENT',
        'غير_متزامن': 'ASYNC',
        'غيرمتزامن': 'ASYNC',
        'انتظر': 'AWAIT',
        'إرجع': 'RETURN',
        'ارجع': 'RETURN',
        'صحيح': 'TRUE',
        'خطأ': 'FALSE',
        'خطا': 'FALSE',
        'فارغ': 'NULL',
        'و': 'AND',
        'أو': 'OR',
        'او': 'OR',
        'ليس': 'NOT',
        'توقف': 'BREAK',
        'استمر': 'CONTINUE',
        'استورد': 'IMPORT',
        'باسم': 'AS',
        'تصدير': 'EXPORT',
        'حاول': 'TRY',
        'التقط': 'CATCH',
        'أخيرًا': 'FINALLY',
        'اخيرا': 'FINALLY',
        'أخيرا': 'FINALLY',
        'اعرض': 'PRINT',
        'عرّف': 'VAR',
        'عرف': 'VAR',
        'اجعل': 'VAR',
        'ثبّت': 'CONST',
        'ثبت': 'CONST',
        'إذا_كان': 'IF',
        'اذا_كان': 'IF',
        'كرّر': 'WHILE',
        'كرر': 'WHILE',
        'طالما_كان': 'WHILE',
        'لكل_رقم': 'FOR',
        'أرجع': 'RETURN',
        'ارجع_بقيمة': 'RETURN',
        'اكسر': 'BREAK',
        'تابع': 'CONTINUE',
        'ادخل': 'IMPORT',
        'استورد_وحدة': 'IMPORT',
        'صدّر': 'EXPORT',
        'صدر': 'EXPORT',
        'حاول_تنفيذ': 'TRY',
        'التقط_الخطأ': 'CATCH',
        'نظّف': 'FINALLY',
        'نظف': 'FINALLY',
        'نعم': 'TRUE',
        'لا': 'FALSE',
        'عدم': 'NOT',
        'وإلا_فـ': 'ELSE',
    };
    const ARABIC_LETTER = '\u0621-\u063A\u0641-\u064A';
    const ARABIC_INDIC_DIGIT = '\u0660-\u0669';
    const ARABIC_EXTRA_CONT = '\u0640\u0651';
    const ARABIC_DECORATIVE = '\u064B-\u0650\u0652\u0670';
    const INVISIBLE_IGNORABLE = '\u061C\u200B-\u200F';
    const BIDI_OVERRIDE_NAMES = {
        '\u202A': 'LRE (U+202A)', '\u202B': 'RLE (U+202B)', '\u202C': 'PDF (U+202C)',
        '\u202D': 'LRO (U+202D)', '\u202E': 'RLO (U+202E)',
    };
    const BIDI_OVERRIDE_RE = /[\u202A-\u202E]/;
    const IDENT_START_RE = new RegExp(`[A-Za-z_${ARABIC_LETTER}]`);
    const IDENT_CONT_RE = new RegExp(`[A-Za-z0-9_${ARABIC_LETTER}${ARABIC_INDIC_DIGIT}${ARABIC_EXTRA_CONT}]`);
    const ARABIC_DECORATIVE_RE = new RegExp(`[${ARABIC_DECORATIVE}]`);
    const INVISIBLE_IGNORABLE_RE = new RegExp(`[${INVISIBLE_IGNORABLE}]`);
    const EXTENDED_INDIC_DIGIT_RE = /[\u06F0-\u06F9]/;
    function isIdentStart(c) {
        return c !== undefined && IDENT_START_RE.test(c);
    }
    function isIdentCont(c) {
        return c !== undefined && IDENT_CONT_RE.test(c);
    }
    function isIdentTransparent(c) {
        return c !== undefined && (ARABIC_DECORATIVE_RE.test(c) || INVISIBLE_IGNORABLE_RE.test(c));
    }
    function isAsciiOrArabicDigit(c) {
        return c !== undefined && /[0-9٠-٩]/.test(c);
    }
    class Lexer {
        constructor(src) {
            const withoutBom = src.charCodeAt(0) === 0xFEFF ? src.slice(1) : src;
            this.src = withoutBom.normalize('NFC');
            this.pos = 0;
            this.line = 1;
            this.col = 1;
            this.tokens = [];
            this.markupTagMode = false;
            this.markupTextMode = false;
            this.markupExprDepth = 0;
            this.markupDepth = 0;
            this.markupClosing = false;
            this.indentStack = [0];
            this.atLineStart = true;
            this.braceDepth = 0;
        }
        pushToken(type, value, line, column) {
            this.tokens.push({ type, value, line, column });
        }
        error(msg, length, loc = {}) {
            throw err.SyntaxError(msg, {
                line: loc.line || this.line,
                column: loc.column || this.col,
                length,
                code: loc.code,
                text: loc.text,
                suggestion: loc.suggestion,
            });
        }
        advance(n = 1) {
            for (let i = 0; i < n; i++) {
                if (this.src[this.pos] === '\n') {
                    this.line++;
                    this.col = 1;
                }
                else {
                    this.col++;
                }
                this.pos++;
            }
        }
        tokenize() {
            while (this.pos < this.src.length) {
                if (this.atLineStart && !this.markupTextMode && !this.markupTagMode && this.braceDepth === 0) {
                    const line = this.line, col = this.col;
                    let i = this.pos, width = 0;
                    while (i < this.src.length && (this.src[i] === ' ' || this.src[i] === '\t')) {
                        width += this.src[i] === '\t' ? 4 : 1;
                        i++;
                    }
                    if (i < this.src.length && this.src[i] !== '\n' && this.src[i] !== '#') {
                        const before = this.src.slice(0, this.pos).split('\n').slice(0, -1).reverse().find(x => x.trim() !== '');
                        const header = before ? before.trim() : '';
                        const isBlockHeader = /^(?:دالة|مكوّن|مكون|غير_متزامن|غيرمتزامن|إذا|اذا|طالما|كرّر|كرر|لكل|حاول|التقط|أخيرًا|اخيرا|أخيرا|وإلا|والا)(?:\s|$)/.test(header);
                        const current = this.indentStack[this.indentStack.length - 1];
                        if (isBlockHeader && width > current) {
                            this.indentStack.push(width);
                            this.pushToken('INDENT', width, line, col);
                        }
                        else if (width < current && this.indentStack.length > 1) {
                            while (this.indentStack.length > 1 && width < this.indentStack[this.indentStack.length - 1]) {
                                this.indentStack.pop();
                                this.pushToken('DEDENT', width, line, col);
                            }
                            if (width !== this.indentStack[this.indentStack.length - 1]) {
                                this.error('مسافة بادئة غير متوافقة مع مستوى سابق.', Math.max(1, width), { code: 'DHD-037', text: String(width), suggestion: 'استخدم نفس عدد المسافات لكل مستوى تعشيش.' });
                            }
                        }
                    }
                    this.atLineStart = false;
                }
                this.skipWhitespaceAndComments();
                if (this.pos >= this.src.length)
                    break;
                const c = this.src[this.pos];
                const startLine = this.line, startCol = this.col;
                if (this.markupTextMode) {
                    if (c === '<') {
                        if (this.src[this.pos + 1] === '/') {
                            this.pushToken('MARKUP_END', '</', startLine, startCol);
                            this.advance(2);
                            this.markupTagMode = true;
                            this.markupClosing = true;
                            this.markupTextMode = false;
                            continue;
                        }
                        if (isIdentStart(this.src[this.pos + 1])) {
                            this.pushToken('MARKUP_LT', '<', startLine, startCol);
                            this.advance();
                            this.markupTagMode = true;
                            this.markupTextMode = false;
                            continue;
                        }
                    }
                    if (c === '{') {
                        this.pushToken('LBRACE', '{', startLine, startCol);
                        this.advance();
                        this.markupExprDepth = 1;
                        this.markupTextMode = false;
                        continue;
                    }
                    let text = '';
                    while (this.pos < this.src.length && !['<', '{'].includes(this.src[this.pos])) {
                        if (BIDI_OVERRIDE_RE.test(this.src[this.pos]))
                            this.error(`رمز فرض اتجاه بيدي مرفوض داخل نص Markup: ${BIDI_OVERRIDE_NAMES[this.src[this.pos]]}`, 1, { code: 'DHD-003', text: this.src[this.pos] });
                        text += this.src[this.pos];
                        this.advance();
                    }
                    if (text) {
                        this.pushToken('MARKUP_TEXT', text, startLine, startCol);
                        continue;
                    }
                }
                if (!this.markupTagMode && c === '<' && (this.src[this.pos + 1] === '/' || isIdentStart(this.src[this.pos + 1])) && this.canStartMarkup()) {
                    if (this.src[this.pos + 1] === '/') {
                        this.pushToken('MARKUP_END', '</', startLine, startCol);
                        this.advance(2);
                        this.markupClosing = true;
                    }
                    else {
                        this.pushToken('MARKUP_LT', '<', startLine, startCol);
                        this.advance();
                        this.markupClosing = false;
                    }
                    this.markupTagMode = true;
                    this.markupTextMode = false;
                    continue;
                }
                if (BIDI_OVERRIDE_RE.test(c)) {
                    this.error(`رمز فرض اتجاه بيدي مرفوض: ${BIDI_OVERRIDE_NAMES[c]} — يمكن استخدامه لإخفاء كود ضار عبر ` +
                        `إعادة ترتيب العرض البصري لبقية السطر (نمط "Trojan Source")`, 1, { code: 'DHD-003', text: c, suggestion: 'احذف رمز التحكم في اتجاه النص، ثم أعد كتابة الجزء المتأثر يدويًا.' });
                }
                if (c === '\n') {
                    this.pushToken('NEWLINE', '\n', startLine, startCol);
                    this.advance();
                    this.atLineStart = true;
                    continue;
                }
                if (isAsciiOrArabicDigit(c)) {
                    this.readNumber(startLine, startCol);
                    continue;
                }
                if (EXTENDED_INDIC_DIGIT_RE.test(c)) {
                    this.error(`رقم فارسي/أردي ممتد غير مدعوم حاليًا: '${c}' — استخدم ٠-٩ (Naskh) أو 0-9`, 1, { code: 'DHD-004', text: c, suggestion: 'استخدم الأرقام 0-9 أو ٠-٩.' });
                }
                if (c === '"' || c === "'") {
                    this.readString(c, startLine, startCol);
                    continue;
                }
                if (c === ';' || c === '؛') {
                    this.pushToken('SEMI', c, startLine, startCol);
                    this.advance();
                    continue;
                }
                if (c === ',' || c === '،') {
                    this.pushToken('COMMA', c, startLine, startCol);
                    this.advance();
                    continue;
                }
                if (isIdentStart(c)) {
                    this.readIdentOrKeyword(startLine, startCol);
                    continue;
                }
                const two = this.src.slice(this.pos, this.pos + 2);
                if (['==', '!=', '<=', '>='].includes(two)) {
                    this.pushToken('OP', two, startLine, startCol);
                    this.advance(2);
                    continue;
                }
                if ('+-*/%()[]{}.<> =|?'.replace(/ /g, '').includes(c)) {
                    if (this.markupTagMode && c === '>') {
                        this.pushToken('MARKUP_GT', '>', startLine, startCol);
                        this.advance();
                        if (this.tokens[this.tokens.length - 2]?.type === 'MARKUP_SLASH') {
                            this.markupTagMode = false;
                        }
                        else if (this.markupClosing) {
                            this.markupDepth = Math.max(0, this.markupDepth - 1);
                            this.markupTagMode = false;
                            this.markupTextMode = this.markupDepth > 0;
                            this.markupClosing = false;
                        }
                        else {
                            this.markupDepth++;
                            this.markupTagMode = false;
                            this.markupTextMode = true;
                        }
                        continue;
                    }
                    if (this.markupTagMode && c === '/') {
                        this.pushToken('MARKUP_SLASH', '/', startLine, startCol);
                        this.advance();
                        continue;
                    }
                    if (this.markupExprDepth > 0 && c === '{')
                        this.markupExprDepth++;
                    if (this.markupExprDepth > 0 && c === '}') {
                        this.markupExprDepth--;
                        this.pushToken('RBRACE', '}', startLine, startCol);
                        this.advance();
                        if (this.markupExprDepth === 0)
                            this.markupTextMode = true;
                        continue;
                    }
                    const map = {
                        '(': 'LPAREN', ')': 'RPAREN', '[': 'LBRACKET', ']': 'RBRACKET',
                        '{': 'LBRACE', '}': 'RBRACE', '.': 'DOT',
                        '+': 'OP', '-': 'OP', '*': 'OP', '/': 'OP', '%': 'OP', '|': 'OP', '?': 'OP',
                        '<': 'OP', '>': 'OP', '=': 'ASSIGN',
                    };
                    this.pushToken(map[c], c, startLine, startCol);
                    if (c === '{')
                        this.braceDepth++;
                    if (c === '}' && this.braceDepth > 0)
                        this.braceDepth--;
                    this.advance();
                    continue;
                }
                if (c === ':') {
                    this.pushToken('COLON', c, startLine, startCol);
                    this.advance();
                    continue;
                }
                this.error(`رمز غير معروف: '${c}'`, 1, { code: 'DHD-001', text: c, suggestion: 'احذف الرمز أو استبدله برمز مدعوم في لغة ضاد.' });
            }
            this.tokens.push({ type: 'EOF', value: null, line: this.line, column: this.col });
            return this.tokens;
        }
        canStartMarkup() {
            const t = this.tokens[this.tokens.length - 1];
            if (!t)
                return true;
            return ['NEWLINE', 'SEMI', 'ASSIGN', 'LPAREN', 'COMMA', 'LBRACKET', 'LBRACE', 'RETURN', 'PRINT', 'OP', 'COLON'].includes(t.type);
        }
        skipWhitespaceAndComments() {
            for (;;) {
                const c = this.src[this.pos];
                if (c === ' ' || c === '\t' || c === '\r') {
                    this.advance();
                    continue;
                }
                if (c === '\u00A0') {
                    this.advance();
                    continue;
                }
                if (c !== undefined && INVISIBLE_IGNORABLE_RE.test(c)) {
                    this.advance();
                    continue;
                }
                if (c === '#' || (c === '/' && this.src[this.pos + 1] === '/')) {
                    while (this.pos < this.src.length && this.src[this.pos] !== '\n') {
                        if (BIDI_OVERRIDE_RE.test(this.src[this.pos])) {
                            this.error(`رمز فرض اتجاه بيدي مرفوض جوه تعليق: ${BIDI_OVERRIDE_NAMES[this.src[this.pos]]} — نمط "Trojan Source"`, 1, { code: 'DHD-003', text: this.src[this.pos], suggestion: 'احذف رمز التحكم في اتجاه النص من التعليق.' });
                        }
                        this.advance();
                    }
                    continue;
                }
                break;
            }
        }
        readNumber(startLine, startCol) {
            let raw = '';
            let integerDigits = '';
            while (this.pos < this.src.length && /[0-9٠-٩]/.test(this.src[this.pos])) {
                const c = this.src[this.pos];
                raw += c;
                integerDigits += c;
                this.advance();
            }
            if (this.src[this.pos] === '٬') {
                while (this.src[this.pos] === '٬') {
                    const sepLine = this.line, sepCol = this.col;
                    raw += '٬';
                    this.advance();
                    let group = '';
                    while (this.pos < this.src.length && /[0-9٠-٩]/.test(this.src[this.pos])) {
                        const c = this.src[this.pos];
                        raw += c;
                        group += c;
                        this.advance();
                    }
                    if (group.length !== 3) {
                        this.error('فاصلة آلاف عربية غير صحيحة داخل الرقم؛ يجب أن تتبعها 3 أرقام.', 1, {
                            line: sepLine, column: sepCol, code: 'DHD-006', text: '٬',
                            suggestion: 'استخدم فقط تسلسلات الهروب الموثقة في مواصفة النصوص.'
                        });
                    }
                    integerDigits += group;
                }
            }
            let normalized = normalizeDigits(integerDigits);
            if ((this.src[this.pos] === '.' || this.src[this.pos] === '٫') && /[0-9٠-٩]/.test(this.src[this.pos + 1] || '')) {
                const decimal = this.src[this.pos];
                raw += decimal;
                this.advance();
                let fraction = '';
                while (this.pos < this.src.length && /[0-9٠-٩]/.test(this.src[this.pos])) {
                    const c = this.src[this.pos];
                    raw += c;
                    fraction += c;
                    this.advance();
                }
                normalized += '.' + normalizeDigits(fraction);
            }
            else if (this.src[this.pos] === '٫') {
                this.error('فاصل عشري بلا أرقام بعده.', 1, {
                    line: this.line, column: this.col, code: 'DHD-006', text: '٫',
                    suggestion: 'أضف أرقامًا بعد الفاصل العشري، مثل ١٫٥.'
                });
            }
            this.tokens.push({
                type: 'NUMBER', value: parseFloat(normalized),
                line: startLine, column: startCol, length: raw.length,
            });
        }
        readString(quote, startLine, startCol) {
            this.advance();
            let s = '';
            while (this.pos < this.src.length && this.src[this.pos] !== quote) {
                let c = this.src[this.pos];
                if (BIDI_OVERRIDE_RE.test(c)) {
                    this.error(`رمز فرض اتجاه بيدي مرفوض جوه نص: ${BIDI_OVERRIDE_NAMES[c]} — نمط "Trojan Source"`, 1, { code: 'DHD-003', text: c, suggestion: 'احذف رمز التحكم في اتجاه النص من النص البرمجي.' });
                }
                if (c === '\\') {
                    this.advance();
                    const esc = this.src[this.pos];
                    const map = { n: '\n', t: '\t', '"': '"', "'": "'", '\\': '\\' };
                    if (map[esc] === undefined) {
                        const escaped = `\\${esc}`;
                        this.error(`تسلسل هروب غير معروف: ${escaped}`, 2, {
                            line: this.line, column: this.col - 1, code: 'DHD-005',
                            text: escaped,
                            suggestion: 'استخدم فقط تسلسلات الهروب الموثقة في مواصفة النصوص.'
                        });
                    }
                    s += map[esc];
                    this.advance();
                    continue;
                }
                s += c;
                this.advance();
            }
            if (this.src[this.pos] !== quote) {
                this.error('نص غير مغلق (علامة اقتباس مفقودة)', 1, { line: startLine, column: startCol, code: 'DHD-002', text: quote, suggestion: `أغلق النص بعلامة الاقتباس ${quote} نفسها.` });
            }
            this.advance();
            this.tokens.push({
                type: 'STRING', value: s, line: startLine, column: startCol, length: s.length + 2,
            });
        }
        readIdentOrKeyword(startLine, startCol) {
            let s = '', raw = '';
            let rawLen = 0;
            while (this.pos < this.src.length) {
                const c = this.src[this.pos];
                if (isIdentCont(c)) {
                    s += c;
                    raw += c;
                    this.advance();
                    rawLen++;
                    continue;
                }
                if (isIdentTransparent(c)) {
                    raw += c;
                    this.advance();
                    rawLen++;
                    continue;
                }
                break;
            }
            const type = KEYWORDS[s] || 'IDENT';
            this.tokens.push({ type, value: type === 'IDENT' ? s : raw, line: startLine, column: startCol, length: rawLen });
        }
    }
    'use strict';
    const NODE_SHAPES = {
        Program: { body: '[Statement]' },
        Block: { body: '[Statement]' },
        Print: { args: '[Expression]' },
        VarDecl: { name: 'string', annotation: 'Type | null', init: 'Expression | null' },
        ConstDecl: { name: 'string', annotation: 'Type | null', init: 'Expression' },
        If: { cond: 'Expression', thenBlock: 'Block', elseBranch: 'If | Block | null' },
        While: { cond: 'Expression', body: 'Block' },
        For: { varName: 'string', from: 'Expression', to: 'Expression', body: 'Block' },
        FuncDecl: { name: 'string', params: '[string | {name:string, annotation:Type|null}]', returnType: 'Type | null', body: 'Block' },
        FuncExpr: { params: '[string]', body: 'Block' },
        Object: { entries: '[{key:string,value:Expression}]' },
        Return: { value: 'Expression | null' },
        Break: {},
        Continue: {},
        Import: { name: 'string', alias: 'string | null' },
        Export: { names: 'string[]' },
        ExprStmt: { expr: 'Expression' },
        Number: { value: 'number' },
        String: { value: 'string' },
        Bool: { value: 'boolean' },
        Null: {},
        Ident: { name: 'string' },
        List: { items: '[Expression]' },
        Assign: { target: 'Ident | Index | Member', value: 'Expression' },
        Logical: { op: "'أو' | 'و'", left: 'Expression', right: 'Expression' },
        Unary: { op: "'-' | 'ليس'", operand: 'Expression' },
        Await: { operand: 'Expression' },
        Binary: { op: 'string', left: 'Expression', right: 'Expression' },
        Call: { callee: 'Expression', args: '[Expression]' },
        Index: { object: 'Expression', index: 'Expression' },
        Member: { object: 'Expression', property: 'string' },
        Markup: { name: 'string', props: '[{key:string,value:Expression}]', children: '[Expression | MarkupText]', selfClosing: 'boolean' },
        MarkupText: { value: 'string' },
    };
    'use strict';
    const TOKEN_LABELS = {
        EOF: 'نهاية الملف',
        IDENT: 'اسمًا صالحًا',
        NUMBER: 'رقمًا',
        STRING: 'نصًا',
        LPAREN: 'القوس "("',
        RPAREN: 'القوس ")"',
        LBRACKET: 'القوس "["',
        RBRACKET: 'القوس "]"',
        LBRACE: 'القوس "{"',
        RBRACE: 'القوس "}"',
        COMMA: 'فاصلة',
        DOT: 'النقطة "."',
        ASSIGN: 'علامة الإسناد "="',
        NEWLINE: 'سطرًا جديدًا',
        SEMI: 'فاصلة منقوطة',
        OP: 'عاملًا',
    };
    class Parser {
        constructor(tokens) {
            this.tokens = tokens;
            this.pos = 0;
        }
        cur() {
            return this.tokens[this.pos];
        }
        at(type) {
            return this.cur().type === type;
        }
        tokenLabel(type) {
            return TOKEN_LABELS[type] || `العنصر '${type}'`;
        }
        error(msg, tok, meta = {}) {
            const t = tok || this.cur();
            const actualText = t && t.value !== undefined && t.value !== null ? String(t.value) : (t && t.type);
            throw err.SyntaxError(msg, {
                line: t && t.line,
                column: t && t.column,
                length: (t && t.length) || 1,
                text: meta.text !== undefined ? meta.text : actualText,
                code: meta.code,
                suggestion: meta.suggestion,
            });
        }
        eat(type, meta = {}) {
            if (!this.at(type)) {
                const actual = this.cur();
                const actualText = actual && actual.value !== undefined && actual.value !== null ? String(actual.value) : actual.type;
                const defaultCodes = { RPAREN: 'DHD-010', LPAREN: 'DHD-011', RBRACKET: 'DHD-013', RBRACE: 'DHD-017', IDENT: 'DHD-019', COMMA: 'DHD-020', DOT: 'DHD-023' };
                const code = meta.code || defaultCodes[type] || 'DHD-090';
                this.error(meta.message || `توقعت ${this.tokenLabel(type)} لكن وُجد ${this.tokenLabel(actual.type)}`, actual, {
                    code,
                    text: meta.text !== undefined ? meta.text : actualText,
                    suggestion: meta.suggestion,
                });
            }
            return this.tokens[this.pos++];
        }
        skipNewlines() {
            while (this.at('NEWLINE') || this.at('SEMI')) {
                this.pos++;
            }
        }
        skipTerminator() {
            if (this.at('SEMI') || this.at('NEWLINE')) {
                this.pos++;
                this.skipNewlines();
                return;
            }
            if (this.at('RBRACE') || this.at('EOF'))
                return;
            this.error(`توقعت نهاية جملة لكن وُجد ${this.tokenLabel(this.cur().type)}`, this.cur(), { code: 'DHD-012', suggestion: 'أنه هذه الجملة بسطر جديد أو بفاصلة منقوطة ؛.' });
        }
        parseProgram() {
            const stmts = [];
            this.skipNewlines();
            while (!this.at('EOF')) {
                stmts.push(this.parseStatement());
                this.skipNewlines();
            }
            return { type: 'Program', body: stmts };
        }
        parseBlock() {
            if (this.at('LBRACE')) {
                const openTok = this.eat('LBRACE');
                this.skipNewlines();
                const stmts = [];
                while (!this.at('RBRACE')) {
                    if (this.at('EOF')) {
                        this.error(`القوس { الذي فُتح في السطر ${openTok.line} لم يُغلق بقوس }`, openTok, { code: 'DHD-017', text: '{', suggestion: 'أضف } لإغلاق الكتلة.' });
                    }
                    stmts.push(this.parseStatement());
                    this.skipNewlines();
                }
                this.eat('RBRACE', { code: 'DHD-017', message: 'توقعت إغلاق القوس المعقوف "}" لإنهاء الكتلة.', suggestion: 'أضف } لإغلاق الكتلة.' });
                return { type: 'Block', body: stmts, line: openTok.line, column: openTok.column };
            }
            const start = this.cur();
            this.skipNewlines();
            if (!this.at('INDENT')) {
                this.error('توقعت بداية كتلة. استخدم مسافة بادئة بعد السطر السابق، أو { للصياغة القديمة.', this.cur(), { code: 'DHD-038', suggestion: 'زد المسافة البادئة للسطر التالي بدل كتابة {.' });
            }
            this.eat('INDENT');
            const stmts = [];
            this.skipNewlines();
            while (!this.at('DEDENT') && !this.at('EOF')) {
                stmts.push(this.parseStatement());
                this.skipNewlines();
            }
            if (this.at('DEDENT'))
                this.eat('DEDENT');
            return { type: 'Block', body: stmts, line: start.line, column: start.column };
        }
        parseStatement() {
            switch (this.cur().type) {
                case 'PRINT': return this.parsePrint();
                case 'VAR': return this.parseVarDecl();
                case 'CONST': return this.parseConstDecl();
                case 'IF': return this.parseIf();
                case 'WHILE': return this.parseWhile();
                case 'FOR': return this.parseFor();
                case 'FUNC': return this.parseFuncDecl(false);
                case 'COMPONENT': return this.parseFuncDecl(true);
                case 'ASYNC': {
                    const t = this.eat('ASYNC');
                    if (!this.at('FUNC') && !this.at('COMPONENT'))
                        this.error('غير_متزامن يجب أن يسبق دالة أو مكوّنًا.', t, { code: 'DHD-040' });
                    const component = this.at('COMPONENT');
                    const n = this.parseFuncDecl(component);
                    n.async = true;
                    return n;
                }
                case 'RETURN': return this.parseReturn();
                case 'BREAK': {
                    const t = this.eat('BREAK');
                    this.skipTerminator();
                    return { type: 'Break', line: t.line, column: t.column };
                }
                case 'CONTINUE': {
                    const t = this.eat('CONTINUE');
                    this.skipTerminator();
                    return { type: 'Continue', line: t.line, column: t.column };
                }
                case 'IMPORT': return this.parseImport();
                case 'EXPORT': return this.parseExport();
                case 'TRY': return this.parseTry();
                case 'LBRACE': return this.parseBlock();
                default: return this.parseExpressionStatement();
            }
        }
        parsePrint() {
            const t = this.eat('PRINT');
            this.eat('LPAREN', { code: 'DHD-011', message: 'توقعت فتح القوس "(" بعد اطبع.', suggestion: 'اكتب اطبع( ... ) لبدء استدعاء الطباعة.' });
            const args = [];
            if (!this.at('RPAREN')) {
                args.push(this.parseExpression());
                while (this.at('COMMA')) {
                    this.eat('COMMA');
                    args.push(this.parseExpression());
                }
            }
            this.eat('RPAREN', { code: 'DHD-010', message: 'توقعت إغلاق القوس ")" بعد استدعاء اطبع.', suggestion: 'أضف ) بعد آخر قيمة داخل اطبع(...).' });
            this.skipTerminator();
            return { type: 'Print', args, line: t.line, column: t.column };
        }
        parseVarDecl() {
            const t = this.eat('VAR');
            const nameTok = this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسم متغير بعد كلمة تعريف.', suggestion: 'اكتب اسمًا صالحًا للمتغير بعد خلي/متغير/ثابت.' });
            let annotation = null;
            if (this.at('COLON')) {
                this.eat('COLON');
                annotation = this.parseTypeRef();
            }
            let init = null;
            if (this.at('ASSIGN')) {
                this.eat('ASSIGN');
                init = this.parseExpression();
            }
            this.skipTerminator();
            return { type: 'VarDecl', name: nameTok.value, annotation, init, line: t.line, column: t.column };
        }
        parseConstDecl() {
            const t = this.eat('CONST');
            const nameTok = this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسم متغير بعد كلمة تعريف.', suggestion: 'اكتب اسمًا صالحًا للمتغير بعد خلي/متغير/ثابت.' });
            if (!this.at('ASSIGN')) {
                this.error(`الثابت '${nameTok.value}' يجب أن يُعطى قيمة عند تعريفه، مثل: ثابت ${nameTok.value} = ...`);
            }
            this.eat('ASSIGN');
            let annotation = null;
            if (this.at('COLON')) {
                this.eat('COLON');
                annotation = this.parseTypeRef();
            }
            const init = this.parseExpression();
            this.skipTerminator();
            return { type: 'ConstDecl', name: nameTok.value, annotation, init, line: t.line, column: t.column };
        }
        parseIf() {
            const t = this.eat('IF');
            const parenthesized = this.at('LPAREN');
            if (parenthesized)
                this.eat('LPAREN', { code: 'DHD-011', message: 'توقعت فتح القوس "(" بعد إذا.', suggestion: 'اكتب الشرط مباشرة أو داخل ( ... ).' });
            const cond = this.parseExpression();
            if (parenthesized)
                this.eat('RPAREN', { code: 'DHD-011', message: 'توقعت إغلاق القوس ")" بعد شرط إذا.', suggestion: 'أغلق شرط إذا بـ ).' });
            this.skipNewlines();
            const thenBlock = this.parseBlock();
            let elseBranch = null;
            const save = this.pos;
            this.skipNewlines();
            if (this.at('ELSE')) {
                this.eat('ELSE');
                this.skipNewlines();
                elseBranch = this.at('IF') ? this.parseIf() : this.parseBlock();
            }
            else {
                this.pos = save;
            }
            return { type: 'If', cond, thenBlock, elseBranch, line: t.line, column: t.column };
        }
        parseWhile() {
            const t = this.eat('WHILE');
            const parenthesized = this.at('LPAREN');
            if (parenthesized)
                this.eat('LPAREN', { code: 'DHD-011', message: 'توقعت فتح القوس "(" بعد طالما.', suggestion: 'اكتب الشرط مباشرة أو داخل ( ... ).' });
            const cond = this.parseExpression();
            if (parenthesized)
                this.eat('RPAREN', { code: 'DHD-011', message: 'توقعت إغلاق القوس ")" بعد شرط طالما.', suggestion: 'أغلق شرط طالما بـ ).' });
            this.skipNewlines();
            const body = this.parseBlock();
            return { type: 'While', cond, body, line: t.line, column: t.column };
        }
        parseFor() {
            const t = this.eat('FOR');
            const varTok = this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسم المتغير بعد كلمة لكل.', suggestion: 'اكتب اسم المتغير الذي سيحمل قيمة العداد.' });
            this.eat('FROM');
            const from = this.parseExpression();
            this.eat('TO');
            const to = this.parseExpression();
            this.skipNewlines();
            const body = this.parseBlock();
            return { type: 'For', varName: varTok.value, from, to, body, line: t.line, column: t.column };
        }
        parseFuncDecl(component = false) {
            const t = component ? this.eat('COMPONENT') : this.eat('FUNC');
            const nameTok = this.eat('IDENT', { code: 'DHD-018', message: 'توقعت اسم الدالة بعد كلمة دالة.', suggestion: 'اكتب اسمًا للدالة قبل (.' });
            this.eat('LPAREN', { code: 'DHD-011', message: 'توقعت فتح القوس "(" بعد اسم الدالة.', suggestion: 'أضف ( لبدء قائمة معاملات الدالة.' });
            const params = [];
            if (!this.at('RPAREN')) {
                const p = this.eat('IDENT');
                let annotation = null;
                if (this.at('COLON')) {
                    this.eat('COLON');
                    annotation = this.parseTypeRef();
                }
                params.push(annotation ? { name: p.value, annotation } : p.value);
                while (this.at('COMMA')) {
                    this.eat('COMMA');
                    const q = this.eat('IDENT');
                    let qa = null;
                    if (this.at('COLON')) {
                        this.eat('COLON');
                        qa = this.parseTypeRef();
                    }
                    params.push(qa ? { name: q.value, annotation: qa } : q.value);
                }
            }
            this.eat('RPAREN', { code: 'DHD-012', message: 'توقعت إغلاق القوس ")" بعد معاملات الدالة.', suggestion: 'أغلق قائمة معاملات الدالة بـ ).' });
            let returnType = null;
            if (this.at('COLON')) {
                this.eat('COLON');
                returnType = this.parseTypeRef();
            }
            this.skipNewlines();
            const body = this.parseBlock();
            return { type: 'FuncDecl', name: nameTok.value, params, returnType, body, component, async: false, line: t.line, column: t.column };
        }
        parseTypeRef() {
            const parts = [];
            const first = this.eat('IDENT', { code: 'DHD-025', message: 'توقعت اسم نوع بعد :', suggestion: 'استخدم نوعًا مثل رقم أو نص أو منطقي أو قائمة<رقم>.' });
            parts.push(first.value);
            if (this.at('OP') && this.cur().value === '<') {
                this.eat('OP');
                parts.push('<');
                while (!this.at('EOF')) {
                    const t = this.eat('IDENT', { code: 'DHD-025', message: 'توقعت نوعًا داخل <...>' });
                    parts.push(t.value);
                    if (this.at('COMMA')) {
                        this.eat('COMMA');
                        parts.push(',');
                        continue;
                    }
                    if (this.at('OP') && this.cur().value === '>') {
                        this.eat('OP');
                        parts.push('>');
                        break;
                    }
                    this.error('توقعت , أو > داخل النوع المركب', this.cur(), { code: 'DHD-025' });
                }
            }
            if (this.at('OP') && this.cur().value === '|') {
                this.eat('OP');
                parts.push('|');
                parts.push(this.parseTypeRef());
            }
            if (this.at('OP') && this.cur().value === '?') {
                this.eat('OP');
                parts.push('?');
            }
            return parts.join('');
        }
        parseReturn() {
            const t = this.eat('RETURN');
            let value = null;
            if (!this.at('SEMI') && !this.at('NEWLINE') && !this.at('RBRACE') && !this.at('EOF')) {
                value = this.parseExpression();
            }
            this.skipTerminator();
            return { type: 'Return', value, line: t.line, column: t.column };
        }
        parseImport() {
            const t = this.eat('IMPORT');
            let nameTok;
            if (this.at('STRING'))
                nameTok = this.eat('STRING');
            else
                nameTok = this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسم الوحدة بعد كلمة استورد.', suggestion: 'اكتب اسم الوحدة أو مسار الملف بين علامتي اقتباس.' });
            let alias = null;
            if (this.at('AS')) {
                this.eat('AS');
                alias = this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسمًا بعد باسم.' }).value;
            }
            this.skipTerminator();
            return { type: 'Import', name: nameTok.value, alias, line: t.line, column: t.column };
        }
        parseTry() {
            const t = this.eat('TRY');
            this.skipNewlines();
            const tryBlock = this.parseBlock();
            let catchBlock = null, catchName = null, finallyBlock = null;
            this.skipNewlines();
            if (this.at('CATCH')) {
                this.eat('CATCH');
                if (this.at('IDENT'))
                    catchName = this.eat('IDENT').value;
                else if (this.at('FALSE')) {
                    this.eat('FALSE');
                    catchName = 'خطأ';
                }
                this.skipNewlines();
                catchBlock = this.parseBlock();
            }
            this.skipNewlines();
            if (this.at('FINALLY')) {
                this.eat('FINALLY');
                this.skipNewlines();
                finallyBlock = this.parseBlock();
            }
            if (!catchBlock && !finallyBlock)
                this.error('يجب أن يتبع حاول التقط أو أخيرًا', t, { code: 'DHD-024' });
            return { type: 'Try', tryBlock, catchBlock, catchName, finallyBlock, line: t.line, column: t.column };
        }
        parseExport() {
            const t = this.eat('EXPORT');
            const names = [this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسمًا بعد كلمة تصدير.', suggestion: 'اكتب اسم الدالة أو القيمة التي تريد إتاحتها لمستخدمي الوحدة.' }).value];
            while (this.at('COMMA')) {
                this.eat('COMMA');
                names.push(this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسمًا بعد الفاصلة في قائمة التصدير.', suggestion: 'اكتب اسمًا صالحًا للتصدير.' }).value);
            }
            this.skipTerminator();
            return { type: 'Export', names, line: t.line, column: t.column };
        }
        parseExpressionStatement() {
            const t = this.cur();
            const expr = this.parseExpression();
            this.skipTerminator();
            return { type: 'ExprStmt', expr, line: t.line, column: t.column };
        }
        parseExpression() { return this.parseAssignment(); }
        parseAssignment() {
            const left = this.parseLogicalOr();
            if (this.at('ASSIGN')) {
                const t = this.eat('ASSIGN');
                const right = this.parseAssignment();
                if (left.type !== 'Ident' && left.type !== 'Index' && left.type !== 'Member') {
                    this.error('الجانب الأيسر من التعيين يجب أن يكون متغيرًا', t, { code: 'DHD-016', text: t.value, suggestion: 'استخدم = مع متغير أو عنصر قائمة أو عضو وحدة.' });
                }
                return { type: 'Assign', target: left, value: right, line: t.line, column: t.column };
            }
            return left;
        }
        parseLogicalOr() {
            let left = this.parseLogicalAnd();
            while (this.at('OR')) {
                const t = this.eat('OR');
                const right = this.parseLogicalAnd();
                left = { type: 'Logical', op: 'أو', left, right, line: t.line, column: t.column };
            }
            return left;
        }
        parseLogicalAnd() {
            let left = this.parseLogicalNot();
            while (this.at('AND')) {
                const t = this.eat('AND');
                const right = this.parseLogicalNot();
                left = { type: 'Logical', op: 'و', left, right, line: t.line, column: t.column };
            }
            return left;
        }
        parseLogicalNot() {
            if (this.at('NOT')) {
                const t = this.eat('NOT');
                const operand = this.parseLogicalNot();
                return { type: 'Unary', op: 'ليس', operand, line: t.line, column: t.column };
            }
            return this.parseEquality();
        }
        parseEquality() {
            let left = this.parseRelational();
            while (this.at('OP') && (this.cur().value === '==' || this.cur().value === '!=')) {
                const t = this.eat('OP');
                const right = this.parseRelational();
                left = { type: 'Binary', op: t.value, left, right, line: t.line, column: t.column };
            }
            return left;
        }
        parseRelational() {
            let left = this.parseAdditive();
            while (this.at('OP') && ['<', '>', '<=', '>='].includes(this.cur().value)) {
                const t = this.eat('OP');
                const right = this.parseAdditive();
                left = { type: 'Binary', op: t.value, left, right, line: t.line, column: t.column };
            }
            return left;
        }
        parseAdditive() {
            let left = this.parseMultiplicative();
            while (this.at('OP') && ['+', '-'].includes(this.cur().value)) {
                const t = this.eat('OP');
                const right = this.parseMultiplicative();
                left = { type: 'Binary', op: t.value, left, right, line: t.line, column: t.column };
            }
            return left;
        }
        parseMultiplicative() {
            let left = this.parseUnary();
            while (this.at('OP') && ['*', '/', '%'].includes(this.cur().value)) {
                const t = this.eat('OP');
                const right = this.parseUnary();
                left = { type: 'Binary', op: t.value, left, right, line: t.line, column: t.column };
            }
            return left;
        }
        parseUnary() {
            if (this.at('AWAIT')) {
                const t = this.eat('AWAIT');
                return { type: 'Await', operand: this.parseUnary(), line: t.line, column: t.column };
            }
            if (this.at('OP') && this.cur().value === '-') {
                const t = this.eat('OP');
                const operand = this.parseUnary();
                return { type: 'Unary', op: '-', operand, line: t.line, column: t.column };
            }
            return this.parseCallOrIndex();
        }
        parseCallOrIndex() {
            let expr = this.parsePrimary();
            for (;;) {
                if (this.at('LPAREN')) {
                    const t = this.eat('LPAREN');
                    const args = [];
                    if (!this.at('RPAREN')) {
                        args.push(this.parseExpression());
                        while (this.at('COMMA')) {
                            this.eat('COMMA');
                            args.push(this.parseExpression());
                        }
                    }
                    this.eat('RPAREN', { code: 'DHD-014', message: 'توقعت إغلاق القوس ")" بعد استدعاء الدالة.', suggestion: 'أضف ) بعد آخر وسيط في استدعاء الدالة.' });
                    expr = { type: 'Call', callee: expr, args, line: t.line, column: t.column };
                }
                else if (this.at('LBRACKET')) {
                    const t = this.eat('LBRACKET');
                    const index = this.parseExpression();
                    this.eat('RBRACKET', { code: 'DHD-013', message: 'توقعت إغلاق القوس المربع "]" بعد الفهرسة.', suggestion: 'أضف ] لإغلاق الفهرسة.' });
                    expr = { type: 'Index', object: expr, index, line: t.line, column: t.column };
                }
                else if (this.at('DOT')) {
                    const t = this.eat('DOT');
                    const propTok = this.eat('IDENT', { code: 'DHD-023', message: 'توقعت اسم عضو بعد النقطة.', suggestion: 'اكتب اسم العضو مباشرة بعد النقطة.' });
                    expr = { type: 'Member', object: expr, property: propTok.value, line: t.line, column: t.column };
                }
                else
                    break;
            }
            return expr;
        }
        parseMarkup() {
            const open = this.eat('MARKUP_LT');
            const nameTok = this.eat('IDENT', { code: 'DHD-030', message: 'توقعت اسم عنصر أو مكوّن بعد <.', suggestion: 'اكتب مثل <div> أو <بطاقة ... />.' });
            const name = nameTok.value;
            const props = [];
            while (!this.at('MARKUP_GT') && !this.at('MARKUP_SLASH')) {
                const key = this.eat('IDENT', { code: 'DHD-031', message: 'توقعت اسم خاصية داخل Markup.', suggestion: 'اكتب خاصية مثل عنوان="مرحبا" أو قيمة={متغير}.' }).value;
                let value = { type: 'Bool', value: true, line: nameTok.line, column: nameTok.column };
                if (this.at('ASSIGN')) {
                    this.eat('ASSIGN');
                    if (this.at('LBRACE')) {
                        this.eat('LBRACE');
                        value = this.parseExpression();
                        this.eat('RBRACE', { code: 'DHD-032', message: 'توقعت } لإغلاق تعبير الخاصية.' });
                    }
                    else
                        value = this.parseExpression();
                }
                props.push({ key, value });
            }
            let selfClosing = false;
            if (this.at('MARKUP_SLASH')) {
                this.eat('MARKUP_SLASH');
                selfClosing = true;
            }
            this.eat('MARKUP_GT', { code: 'DHD-033', message: 'توقعت > لإنهاء وسم Markup.' });
            const children = [];
            if (!selfClosing) {
                while (!this.at('MARKUP_END')) {
                    if (this.at('EOF'))
                        this.error(`وسم <${name}> لم يُغلق.`, open, { code: 'DHD-034', suggestion: `أضف </${name}>.` });
                    if (this.at('MARKUP_TEXT')) {
                        const x = this.eat('MARKUP_TEXT');
                        if (x.value)
                            children.push({ type: 'MarkupText', value: x.value, line: x.line, column: x.column });
                        continue;
                    }
                    if (this.at('MARKUP_LT')) {
                        children.push(this.parseMarkup());
                        continue;
                    }
                    if (this.at('LBRACE')) {
                        this.eat('LBRACE');
                        const e = this.parseExpression();
                        this.eat('RBRACE', { code: 'DHD-032', message: 'توقعت } لإغلاق تعبير داخل Markup.' });
                        children.push(e);
                        continue;
                    }
                    this.error('عنصر غير متوقع داخل Markup.', this.cur(), { code: 'DHD-035', suggestion: 'استخدم نصًا، <مكوّن>، أو {تعبير} داخل الوسم.' });
                }
                this.eat('MARKUP_END', { code: 'DHD-036', message: `توقعت </${name}> لإغلاق العنصر.` });
                const closeName = this.eat('IDENT', { code: 'DHD-036', message: `توقعت اسم الإغلاق </${name}>.` }).value;
                if (closeName !== name)
                    this.error(`وسم الإغلاق </${closeName}> لا يطابق <${name}>.`, this.tokens[this.pos - 1], { code: 'DHD-036', suggestion: `استخدم </${name}>.` });
                this.eat('MARKUP_GT', { code: 'DHD-033', message: 'توقعت > بعد وسم الإغلاق.' });
            }
            return { type: 'Markup', name, props, children, selfClosing, line: open.line, column: open.column };
        }
        parsePrimary() {
            const t = this.cur();
            switch (t.type) {
                case 'MARKUP_LT': return this.parseMarkup();
                case 'NUMBER':
                    this.pos++;
                    return { type: 'Number', value: t.value, line: t.line, column: t.column, length: t.length };
                case 'STRING':
                    this.pos++;
                    return { type: 'String', value: t.value, line: t.line, column: t.column, length: t.length };
                case 'TRUE':
                    this.pos++;
                    return { type: 'Bool', value: true, line: t.line, column: t.column };
                case 'FALSE':
                    if (t.value === 'خطأ' && this.tokens[this.pos + 1] && this.tokens[this.pos + 1].type === 'DOT') {
                        this.pos++;
                        return { type: 'Ident', name: 'خطأ', line: t.line, column: t.column, length: t.length };
                    }
                    this.pos++;
                    return { type: 'Bool', value: false, line: t.line, column: t.column };
                case 'NULL':
                    this.pos++;
                    return { type: 'Null', line: t.line, column: t.column };
                case 'IDENT':
                    this.pos++;
                    return { type: 'Ident', name: t.value, line: t.line, column: t.column, length: t.length };
                case 'LPAREN': {
                    this.eat('LPAREN', { code: 'DHD-011', message: 'توقعت فتح القوس "(" قبل التعبير.', suggestion: 'أضف ( قبل التعبير.' });
                    const e = this.parseExpression();
                    this.eat('RPAREN', { code: 'DHD-010', message: 'توقعت إغلاق القوس ")" بعد التعبير.', suggestion: 'أضف ) بعد التعبير.' });
                    return e;
                }
                case 'FUNC': {
                    this.eat('FUNC');
                    this.eat('LPAREN', { code: 'DHD-011', message: 'توقعت ( بعد دالة المجهولة.' });
                    const params = [];
                    if (!this.at('RPAREN')) {
                        const pt = this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسم وسيط للدالة المجهولة.' });
                        params.push(pt.value);
                        while (this.at('COMMA')) {
                            this.eat('COMMA');
                            params.push(this.eat('IDENT', { code: 'DHD-019', message: 'توقعت اسم وسيط بعد الفاصلة.' }).value);
                        }
                    }
                    this.eat('RPAREN', { code: 'DHD-010' });
                    this.skipNewlines();
                    const body = this.parseBlock();
                    return { type: 'FuncExpr', params, body, line: t.line, column: t.column };
                }
                case 'LBRACE': {
                    this.eat('LBRACE');
                    this.skipNewlines();
                    const entries = [];
                    if (!this.at('RBRACE')) {
                        while (true) {
                            const kt = this.cur();
                            let key;
                            if (kt.type === 'STRING' || kt.type === 'IDENT' || kt.type === 'NUMBER') {
                                this.pos++;
                                key = String(kt.value);
                            }
                            else
                                this.error('توقعت مفتاحًا صالحًا داخل القاموس.', kt, { code: 'DHD-015' });
                            this.eat('COLON', { code: 'DHD-020', message: 'توقعت : بعد مفتاح القاموس.' });
                            const value = this.parseExpression();
                            entries.push({ key, value });
                            this.skipNewlines();
                            if (!this.at('COMMA'))
                                break;
                            this.eat('COMMA');
                            this.skipNewlines();
                            if (this.at('RBRACE'))
                                break;
                        }
                    }
                    this.eat('RBRACE', { code: 'DHD-017', message: 'توقعت } لإغلاق القاموس.' });
                    return { type: 'Object', entries, line: t.line, column: t.column };
                }
                case 'LBRACKET': {
                    this.eat('LBRACKET');
                    this.skipNewlines();
                    const items = [];
                    if (!this.at('RBRACKET')) {
                        items.push(this.parseExpression());
                        this.skipNewlines();
                        while (this.at('COMMA')) {
                            this.eat('COMMA');
                            this.skipNewlines();
                            if (this.at('RBRACKET'))
                                break;
                            items.push(this.parseExpression());
                            this.skipNewlines();
                        }
                    }
                    this.eat('RBRACKET', { code: 'DHD-013', message: 'توقعت إغلاق القوس المربع "]" بعد عناصر القائمة.', suggestion: 'أضف ] لإغلاق القائمة.' });
                    return { type: 'List', items, line: t.line, column: t.column };
                }
                default:
                    this.error(`تعبير غير متوقّع: ${this.tokenLabel(t.type)}`, t, { code: 'DHD-015', text: t.value !== null && t.value !== undefined ? String(t.value) : t.type, suggestion: 'اكتب قيمة أو اسمًا أو تعبيرًا صالحًا في هذا الموضع.' });
            }
        }
    }
    'use strict';
    class DhadFunction {
        constructor(decl, closure) { this.decl = decl; this.closure = closure; }
    }
    class DhadObject {
        constructor(entries = {}) { this.fields = new Map(Object.entries(entries)); }
    }
    class DhadModule {
        constructor(name, fields, { readonly = false, version = 'builtin', api = '1', packageType = 'builtin', dependencies = {}, exports = null } = {}) {
            this.name = name;
            this.fields = fields;
            this.readonly = readonly;
            this.version = version;
            this.api = api;
            this.packageType = packageType;
            this.dependencies = { ...dependencies };
            this.exports = exports ? [...exports] : [...fields.keys()];
        }
    }
    class ReturnSignal {
        constructor(value) { this.value = value; }
    }
    class TailCallSignal {
        constructor(callee, args, loc = {}) { this.callee = callee; this.args = args; this.loc = loc; }
    }
    class BreakSignal {
    }
    class ContinueSignal {
    }
    class Environment {
        constructor(parent = null) {
            this.vars = new Map();
            this.consts = new Set();
            this.parent = parent;
        }
        declare(name, value, isConst = false, loc) {
            if (this.consts.has(name)) {
                throw err.TypeError(`لا يمكن تغيير الثابت '${name}' بعد تعريفه`, loc);
            }
            this.vars.set(name, value);
            if (isConst)
                this.consts.add(name);
        }
        get(name, loc) {
            if (this.vars.has(name))
                return this.vars.get(name);
            if (this.parent)
                return this.parent.get(name, loc);
            throw err.NameError(`متغير غير معرّف: '${name}'`, loc);
        }
        set(name, value, loc) {
            if (this.vars.has(name)) {
                if (this.consts.has(name)) {
                    throw err.TypeError(`لا يمكن تغيير الثابت '${name}' بعد تعريفه`, loc);
                }
                this.vars.set(name, value);
                return;
            }
            if (this.parent) {
                this.parent.set(name, value, loc);
                return;
            }
            throw err.NameError(`متغير غير معرّف: '${name}'`, loc);
        }
    }
    'use strict';
    class TrustedHTML {
        constructor(value) { this.value = String(value ?? ''); Object.freeze(this); }
        toString() { return this.value; }
    }
    class SafeText {
        constructor(value) { this.value = String(value ?? ''); Object.freeze(this); }
        toString() { return this.value; }
    }
    const ARABIC_TAGS = Object.freeze({
        'جذر': 'html', 'صفحة': 'body', 'رأس': 'head', 'عنوان_صفحة': 'title', 'بيانات': 'meta', 'رابط_خارجي': 'link',
        'حاوية': 'div', 'قسم': 'section', 'مقالة': 'article', 'رئيسية': 'main', 'محتوى': 'main', 'جانبي': 'aside', 'تذييل': 'footer', 'تنقل': 'nav',
        'مجموعة': 'div', 'عنصر': 'div', 'نص': 'span', 'فقرة': 'p', 'سطر': 'br', 'خط_فاصل': 'hr', 'عنوان1': 'h1', 'عنوان2': 'h2', 'عنوان3': 'h3', 'عنوان4': 'h4', 'عنوان5': 'h5', 'عنوان6': 'h6',
        'رابط': 'a', 'زر': 'button', 'صورة': 'img', 'صوت': 'audio', 'فيديو': 'video', 'مصدر': 'source', 'قائمة': 'ul', 'قائمة_مرقمة': 'ol', 'عنصر_قائمة': 'li',
        'جدول': 'table', 'رأس_جدول': 'thead', 'جسم_جدول': 'tbody', 'صف_جدول': 'tr', 'خلية_عنوان': 'th', 'خلية': 'td', 'نموذج': 'form', 'حقل': 'input', 'اختيار': 'select', 'خيار': 'option', 'منطقة_نص': 'textarea', 'تسمية': 'label',
        'تفصيل': 'details', 'ملخص': 'summary', 'حوار': 'dialog', 'مضمن': 'iframe', 'قالب': 'template', 'تقدم': 'progress', 'مقياس': 'meter', 'مسار': 'track', 'رسم': 'canvas', 'مجهري': 'small', 'قوي': 'strong', 'مائل': 'em', 'مقتبس': 'blockquote', 'شفرة': 'code', 'قبل_منسق': 'pre',
        'ترويسة': 'header'
    });
    const ARABIC_ATTRS = Object.freeze({
        'صنف': 'class', 'معرف': 'id', 'نمط': 'style', 'رابط': 'href', 'مصدر': 'src', 'بديل': 'alt', 'عنوان': 'title', 'نوع': 'type', 'قيمة': 'value', 'اسم': 'name',
        'نائب_نص': 'placeholder', 'معطل': 'disabled', 'محدد': 'checked', 'مختار': 'selected', 'مطلوب': 'required', 'متعدد': 'multiple', 'مفاتيح': 'key', 'دور': 'role', 'لغة': 'lang', 'هدف': 'target',
        'عرض': 'width', 'ارتفاع': 'height', 'تحميل': 'loading', 'تلقائي': 'autoplay', 'تحكم': 'controls', 'صورة_مغطاة': 'poster', 'ترميز': 'charset', 'وصف': 'content', 'مرجع': 'rel',
        'تسمية_أريا': 'aria-label', 'موصوف_بأريا': 'aria-describedby', 'مخفي_أريا': 'aria-hidden', 'مختار_أريا': 'aria-selected', 'حالة_أريا': 'aria-current'
    });
    const ARABIC_EVENTS = Object.freeze({
        'عند_النقر': 'click', 'عند_التغيير': 'change', 'عند_الإدخال': 'input', 'عند_الإرسال': 'submit', 'عند_التركيز': 'focus', 'عند_فقدان_التركيز': 'blur',
        'عند_الضغط': 'keydown', 'عند_رفع_الزر': 'keyup', 'عند_مرور_الفأرة': 'mouseenter', 'عند_مغادرة_الفأرة': 'mouseleave', 'عند_تحميل': 'load'
    });
    function htmlTag(type) { return ARABIC_TAGS[type] || type; }
    function htmlAttr(key) { return ARABIC_ATTRS[key] || key; }
    function htmlEvent(key) { return ARABIC_EVENTS[key] || null; }
    class VNode {
        constructor(type, props = {}, children = [], key = null) {
            this.type = type;
            this.props = props || {};
            this.children = normalizeChildren(children);
            this.key = key;
            Object.freeze(this.children);
            Object.freeze(this.props);
            Object.freeze(this);
        }
    }
    function normalizeChildren(children) {
        const out = [];
        const add = v => {
            if (v === null || v === undefined || v === false)
                return;
            if (Array.isArray(v))
                return v.forEach(add);
            out.push(v);
        };
        add(children);
        return out;
    }
    function h(type, props, children) {
        const p = { ...(props || {}) };
        const key = p.key ?? null;
        delete p.key;
        return new VNode(type, p, children || [], key);
    }
    class ReactiveState {
        constructor(value) { this.value = value; this.listeners = new Set(); }
        get() { return this.value; }
        set(value) {
            if (Object.is(this.value, value))
                return value;
            const old = this.value;
            this.value = value;
            for (const listener of [...this.listeners])
                listener(value, old);
            return value;
        }
        update(fn) { return this.set(fn(this.value)); }
        subscribe(listener) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
    }
    function createState(value) { return new ReactiveState(value); }
    function escapeText(v) {
        return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function escapeAttr(v) {
        return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function vnodeToHTML(v) {
        if (v instanceof SafeText)
            return escapeText(v.value);
        if (v instanceof TrustedHTML)
            return v.value;
        if (v === null || v === undefined || v === false)
            return '';
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
            return escapeText(v);
        if (Array.isArray(v))
            return v.map(vnodeToHTML).join('');
        if (!(v instanceof VNode))
            return escapeText(String(v));
        if (typeof v.type === 'function')
            return vnodeToHTML(v.type(v.props, v.children));
        const tag = htmlTag(v.type);
        const attrs = Object.entries(v.props || {}).filter(([k, val]) => val !== false && val !== null && val !== undefined && k !== 'children' && k !== 'on' && !htmlEvent(k) && !k.startsWith('on')).map(([k, val]) => {
            k = htmlAttr(k);
            if (k === 'className')
                k = 'class';
            if (val === true)
                return ` ${k}=""`;
            return ` ${k}="${escapeAttr(val)}"`;
        }).join('');
        const voids = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
        const body = v.children.map(vnodeToHTML).join('');
        return voids.has(String(tag).toLowerCase()) ? `<${tag}${attrs}>` : `<${tag}${attrs}>${body}</${tag}>`;
    }
    function assertSafeDOMTag(name) {
        const tag = String(name || '').toLowerCase();
        if (['script', 'iframe', 'object', 'embed', 'base', 'frame', 'frameset'].includes(tag))
            throw err.PermissionError(`عنصر DOM '${tag}' غير مسموح به داخل بيئة تنفيذ ضاد`);
        return tag;
    }
    function validateDOMURL(runtime, value, attribute) {
        const raw = String(value ?? '').trim();
        if (!raw)
            return;
        const lower = raw.toLowerCase();
        if (/^(javascript|vbscript):/.test(lower) || /^data:(text\/html|application\/javascript|text\/javascript)/i.test(lower))
            throw err.PermissionError(`قيمة السمة '${attribute}' تحتوي مخططًا غير آمن`);
        if (/^(https?:|wss?:)/i.test(raw))
            runtime.requireCapability('network');
    }
    function createDOM(v, doc, runtime) {
        if (v === null || v === undefined || v === false)
            return doc.createComment('dhad-empty');
        if (v instanceof TrustedHTML) {
            const t = doc.createElement('template');
            t.innerHTML = v.value;
            t.content.querySelectorAll('script,iframe,object,embed,base,frame,frameset').forEach(n => n.remove());
            t.content.querySelectorAll('*').forEach(el => { for (const a of [...el.attributes]) {
                if (/^on/i.test(a.name))
                    el.removeAttribute(a.name);
                if (['src', 'href', 'poster', 'action', 'formaction', 'xlink:href'].includes(a.name.toLowerCase()))
                    validateDOMURL(runtime, a.value, a.name);
                if (a.name.toLowerCase() === 'srcdoc')
                    el.removeAttribute(a.name);
            } });
            const f = doc.createDocumentFragment();
            f.append(...t.content.cloneNode(true).childNodes);
            return f;
        }
        if (v instanceof SafeText || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
            return doc.createTextNode(v instanceof SafeText ? v.value : String(v));
        if (Array.isArray(v)) {
            const f = doc.createDocumentFragment();
            v.forEach(x => f.appendChild(createDOM(x, doc, runtime)));
            return f;
        }
        if (typeof v.type === 'function')
            return createDOM(v.type(v.props, v.children), doc, runtime);
        const tagName = htmlTag(v.type);
        assertSafeDOMTag(tagName);
        const el = doc.createElement(tagName);
        patchProps(el, {}, v.props || {}, runtime);
        v.children.forEach(c => el.appendChild(createDOM(c, doc, runtime)));
        return el;
    }
    function applyStyleProperty(el, key, value) {
        const cssKey = STYLE_PROP_ALIASES[key] || (key.startsWith('--') ? key : cssName(key));
        if (value && typeof value === 'object' && value.value !== undefined)
            value = value.value;
        el.style.setProperty(cssKey, String(value));
    }
    function patchProps(el, oldP, newP, runtime) {
        const all = new Set([...Object.keys(oldP || {}), ...Object.keys(newP || {})]);
        for (const k of all) {
            if (k === 'children' || k === 'key')
                continue;
            const a = oldP?.[k], b = newP?.[k];
            if (a === b)
                continue;
            const attrName = htmlAttr(k);
            if (k === 'srcdoc' || attrName.toLowerCase() === 'srcdoc')
                throw err.PermissionError('سمة srcdoc غير مسموح بها داخل بيئة تنفيذ ضاد');
            if (/^on/i.test(attrName) && typeof b !== 'function')
                throw err.PermissionError('سمات الأحداث النصية غير مسموح بها؛ استخدم معالج حدث دالة');
            if (['href', 'src', 'poster', 'action', 'formaction', 'xlink:href'].includes(attrName.toLowerCase()) && b !== false && b !== null && b !== undefined)
                validateDOMURL(runtime, String(b), attrName);
            if ((k === 'نمط' || k === 'style') && typeof b === 'string' && /@import\s+|url\s*\(/i.test(b))
                runtime.requireCapability('network');
            if (STYLE_PROP_ALIASES[k] || k.startsWith('--')) {
                if (b === false || b === null || b === undefined || b === '')
                    el.style.removeProperty(STYLE_PROP_ALIASES[k] || k);
                else
                    applyStyleProperty(el, k, b);
                continue;
            }
            if (k === 'نمط' || k === 'style') {
                if (a && typeof a === 'object')
                    Object.keys(a).forEach(x => el.style.removeProperty(STYLE_PROP_ALIASES[x] || cssName(x)));
                if (b && typeof b === 'object')
                    Object.entries(b).forEach(([x, v]) => { if (v !== null && v !== undefined && v !== '')
                        applyStyleProperty(el, x, v); });
                else if (b)
                    el.setAttribute('style', String(b));
                else
                    el.removeAttribute('style');
                continue;
            }
            const event = htmlEvent(k) || (k.startsWith('on') ? k.slice(2).toLowerCase() : null);
            if (event && typeof b === 'function') {
                if (a)
                    el.removeEventListener(event, a);
                el.addEventListener(event, b);
                continue;
            }
            const attr = htmlAttr(k);
            if (b === false || b === null || b === undefined)
                el.removeAttribute(attr === 'className' ? 'class' : attr);
            else if (b === true)
                el.setAttribute(attr === 'className' ? 'class' : attr, '');
            else
                el.setAttribute(attr === 'className' ? 'class' : attr, String(b));
        }
    }
    function sameVNode(a, b) {
        if (a === b)
            return true;
        if (!a || !b)
            return false;
        if (typeof a !== 'object' || typeof b !== 'object')
            return false;
        return a.type === b.type && a.key === b.key;
    }
    const RENDERED_TREES = new WeakMap();
    function reconcile(parent, oldV, newV, dom, doc, runtime) {
        if (!oldV) {
            const n = createDOM(newV, doc, runtime);
            parent.appendChild(n);
            return n;
        }
        if (!newV) {
            if (dom)
                parent.removeChild(dom);
            return null;
        }
        if (!dom) {
            const n = createDOM(newV, doc, runtime);
            parent.appendChild(n);
            return n;
        }
        if (!sameVNode(oldV, newV)) {
            const n = createDOM(newV, doc, runtime);
            parent.replaceChild(n, dom);
            return n;
        }
        if (newV instanceof SafeText || typeof newV !== 'object') {
            const ov = oldV instanceof SafeText ? oldV.value : oldV;
            const nv = newV instanceof SafeText ? newV.value : newV;
            if (String(ov) !== String(nv))
                dom.nodeValue = String(nv);
            return dom;
        }
        if (typeof newV.type === 'function') {
            const oldRendered = RENDERED_TREES.get(oldV) || oldV.type(oldV.props, oldV.children);
            const nextRendered = newV.type(newV.props, newV.children);
            RENDERED_TREES.set(newV, nextRendered);
            const nextDom = reconcile(parent, oldRendered, nextRendered, dom, doc, runtime);
            try {
                Object.defineProperty(newV, '__rendered', { value: nextRendered, writable: true, configurable: true });
            }
            catch (_) { }
            return nextDom;
        }
        patchProps(dom, oldV.props || {}, newV.props || {}, runtime);
        const oldC = oldV.children || [], newC = newV.children || [];
        const keyed = new Map(), unkeyed = [];
        oldC.forEach((v, i) => { const d = dom.childNodes[i]; if (v && typeof v === 'object' && v.key != null)
            keyed.set(String(v.key), { v, d });
        else
            unkeyed.push({ v, d }); });
        let unkeyedIndex = 0;
        for (let i = 0; i < newC.length; i++) {
            const nv = newC[i];
            let entry = null;
            if (nv && typeof nv === 'object' && nv.key != null)
                entry = keyed.get(String(nv.key)) || null;
            else
                entry = unkeyed[unkeyedIndex++] || null;
            const target = dom.childNodes[i];
            if (entry) {
                if (entry.d !== target)
                    dom.insertBefore(entry.d, target || null);
                reconcile(dom, entry.v, nv, entry.d, doc, runtime);
                if (nv && typeof nv === 'object' && nv.key != null)
                    keyed.delete(String(nv.key));
            }
            else
                reconcile(dom, null, nv, target || null, doc, runtime);
        }
        while (dom.childNodes.length > newC.length)
            dom.removeChild(dom.lastChild);
        return dom;
    }
    class Renderer {
        constructor(doc = (typeof document !== 'undefined' ? document : null), runtime = null) { this.doc = doc; this.runtime = runtime; this.roots = new WeakMap(); this.stateSubscriptions = new WeakMap(); this.componentInstances = new WeakMap(); this.renderedTrees = new WeakMap(); }
        _validateComponentTree(v) {
            if (!v || typeof v !== 'object')
                return;
            if (Array.isArray(v)) {
                v.forEach(x => this._validateComponentTree(x));
                return;
            }
            if (typeof v.type === 'function' && v.type.propsSchema) {
                const props = v.props || {}, schema = v.type.propsSchema || {};
                for (const [name, expected] of Object.entries(schema)) {
                    const required = typeof expected === 'object' ? expected.required !== false : true;
                    if (required && !(name in props))
                        throw err.TypeError(`المكوّن '${v.type.name}' يحتاج الخاصية '${name}'`);
                    if (name in props && typeof expected === 'string') {
                        const actual = typeof props[name] === 'number' ? { kind: 'رقم' } : typeof props[name] === 'string' ? { kind: 'نص' } : typeof props[name] === 'boolean' ? { kind: 'منطقي' } : { kind: 'مجهول' };
                        if (!same(actual, normalizeType(expected)))
                            throw err.TypeError(`الخاصية '${name}' في المكوّن '${v.type.name}' نوعها غير صحيح`);
                    }
                }
                this._validateComponentTree(v.type(v.props || {}, v.children || []));
                return;
            }
            (v.children || []).forEach(x => this._validateComponentTree(x));
        }
        _componentInstance(vnode) {
            if (!vnode || typeof vnode.type !== 'function')
                return null;
            let instance = this.componentInstances.get(vnode);
            if (!instance) {
                instance = { mounted: false, cleanups: [] };
                this.componentInstances.set(vnode, instance);
            }
            return instance;
        }
        _callLifecycle(vnode, hook, props, children) {
            if (!vnode || typeof vnode.type !== 'function')
                return;
            const component = vnode.type;
            const instance = this._componentInstance(vnode);
            const fn = component && component[hook];
            if (typeof fn === 'function') {
                const cleanup = fn(props || {}, children || [], instance);
                if (typeof cleanup === 'function')
                    instance.cleanups.push(cleanup);
            }
        }
        bindState(state, root, renderFn) {
            if (!(state instanceof ReactiveState))
                throw err.TypeError('ربط_الحالة() تحتاج حالة تفاعلية');
            const unsubscribe = state.subscribe(() => renderFn());
            let set = this.stateSubscriptions.get(root);
            if (!set) {
                set = new Set();
                this.stateSubscriptions.set(root, set);
            }
            set.add(unsubscribe);
            return unsubscribe;
        }
        unmount(root) {
            const subs = this.stateSubscriptions.get(root);
            if (subs) {
                for (const off of subs)
                    off();
                this.stateSubscriptions.delete(root);
            }
            const old = this.roots.get(root);
            if (old)
                this._walkUnmount(old);
            root.textContent = '';
            this.roots.delete(root);
        }
        _walkUnmount(v) {
            if (!v || typeof v !== 'object')
                return;
            if (Array.isArray(v)) {
                v.forEach(x => this._walkUnmount(x));
                return;
            }
            if (typeof v.type === 'function') {
                const instance = this.componentInstances.get(v);
                this._callLifecycle(v, 'قبل_الفك', v.props, v.children);
                if (instance) {
                    for (const off of instance.cleanups.splice(0)) {
                        try {
                            off();
                        }
                        catch (_) { }
                    }
                }
                this._walkUnmount(instance && instance.rendered);
                this.componentInstances.delete(v);
                return;
            }
            (v.children || []).forEach(x => this._walkUnmount(x));
        }
        render(vnode, root) {
            if (!this.doc)
                throw err.RuntimeError('تصيير() يتطلب بيئة متصفح');
            this._validateComponentTree(vnode);
            const old = this.roots.get(root) || null;
            const dom = old ? root.firstChild : null;
            const next = reconcile(root, old, vnode, dom, this.doc, this.runtime);
            if (!old)
                this._walkMount(vnode);
            else
                this._walkUpdate(vnode, old);
            this.roots.set(root, vnode);
            return next;
        }
        _walkUpdate(next, old) {
            if (!next || typeof next !== 'object')
                return;
            if (Array.isArray(next)) {
                const a = Array.isArray(old) ? old : [];
                next.forEach((x, i) => this._walkUpdate(x, a[i]));
                return;
            }
            if (typeof next.type === 'function') {
                const instance = this._componentInstance(next);
                const oldInstance = old && typeof old.type === 'function' ? this.componentInstances.get(old) : null;
                const rendered = instance.rendered || next.type(next.props || {}, next.children || []);
                instance.rendered = rendered;
                RENDERED_TREES.set(next, rendered);
                if (typeof next.type.بعد_التحديث === 'function')
                    next.type.بعد_التحديث(next.props || {}, next.children || [], old?.props || {}, instance);
                this._walkUpdate(rendered, oldInstance && oldInstance.rendered);
                return;
            }
            const oc = old && old.children || [];
            (next.children || []).forEach((x, i) => this._walkUpdate(x, oc[i]));
        }
        _walkMount(v) {
            if (!v || typeof v !== 'object')
                return;
            if (Array.isArray(v)) {
                v.forEach(x => this._walkMount(x));
                return;
            }
            if (typeof v.type === 'function') {
                const instance = this._componentInstance(v);
                instance.rendered = v.type(v.props || {}, v.children || []);
                RENDERED_TREES.set(v, instance.rendered);
                this._callLifecycle(v, 'بعد_التركيب', v.props, v.children);
                this._walkMount(instance.rendered);
                return;
            }
            (v.children || []).forEach(x => this._walkMount(x));
        }
        hydrate(vnode, root) {
            if (!this.doc)
                throw err.RuntimeError('ترطيب() يتطلب بيئة متصفح');
            const first = root.firstChild;
            if (!first && vnode)
                return this.render(vnode, root);
            const dom = this._hydrateNode(vnode, first);
            this.roots.set(root, vnode);
            this._walkMount(vnode);
            return dom;
        }
        _hydrateNode(v, dom) {
            if (v == null || v === false)
                return dom;
            if (Array.isArray(v)) {
                let d = dom;
                for (const c of v)
                    d = this._hydrateNode(c, d);
                return d;
            }
            if (typeof v !== 'object' || v instanceof SafeText) {
                if (dom && String(dom.nodeValue) !== String(v instanceof SafeText ? v.value : v))
                    dom.nodeValue = String(v);
                return dom;
            }
            if (typeof v.type === 'function') {
                const rendered = v.type(v.props || {}, v.children || []);
                RENDERED_TREES.set(v, rendered);
                return this._hydrateNode(rendered, dom);
            }
            if (!dom || dom.nodeType !== 1 || dom.tagName.toLowerCase() !== String(htmlTag(v.type)).toLowerCase()) {
                const n = createDOM(v, this.doc, this.runtime);
                if (dom)
                    dom.parentNode.replaceChild(n, dom);
                return n;
            }
            patchProps(dom, {}, v.props || {}, this.runtime);
            let child = dom.firstChild;
            for (const c of v.children || []) {
                const used = this._hydrateNode(c, child);
                child = used ? used.nextSibling : child;
            }
            return dom;
        }
    }
    function propsToJS(props, runtime) {
        if (props instanceof DhadObject)
            return runtime.toJS(props);
        return props || {};
    }
    class CSSRule {
        constructor(selector, declarations = {}) { this.selector = String(selector); this.declarations = { ...declarations }; }
    }
    class CSSStyleSheetModel {
        constructor(rules = [], options = {}) { this.rules = rules; this.options = options; }
        add(selector, declarations) { this.rules.push(new CSSRule(selector, declarations)); return this; }
        toString(scope = '') {
            const prefix = scope ? `[data-dhad-c="${escapeAttr(scope)}"] ` : '';
            return this.rules.map(r => `${prefix}${r.selector}{${Object.entries(r.declarations).map(([k, v]) => `${k}:${v};`).join('')}}`).join('');
        }
    }
    function cssScope(id) { return String(id || 'default').replace(/[^A-Za-z0-9_-]/g, '_'); }
    function token(name, value) { return { name: String(name), value: String(value) }; }
    function createComponent(name, fn, propsSchema = null, lifecycle = {}) {
        if (typeof fn !== 'function')
            throw err.TypeError('المكوّن يحتاج دالة تصيير');
        const component = function (props, children) { return fn(props || {}, children || []); };
        Object.defineProperty(component, 'name', { value: String(name) });
        component.__dhadComponent = true;
        component.propsSchema = propsSchema || null;
        component.بعد_التركيب = lifecycle.بعد_التركيب || lifecycle.mount || null;
        component.قبل_الفك = lifecycle.قبل_الفك || lifecycle.unmount || null;
        component.بعد_التحديث = lifecycle.بعد_التحديث || lifecycle.update || null;
        return component;
    }
    'use strict';
    function nodeFs() { return typeof require === 'function' ? require('fs') : null; }
    function nodePath() { return typeof require === 'function' ? require('path') : null; }
    function satisfiesApi(actual, required) {
        if (!required)
            return true;
        return String(actual || '') === String(required);
    }
    function parseVersion(value) {
        const m = String(value || '').trim().replace(/^v/i, '').match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z.-]+))?$/);
        if (!m)
            return null;
        return { major: Number(m[1]), minor: Number(m[2] || 0), patch: Number(m[3] || 0), prerelease: m[4] || '' };
    }
    function cmpVersion(a, b) {
        for (const k of ['major', 'minor', 'patch']) {
            if (a[k] !== b[k])
                return a[k] < b[k] ? -1 : 1;
        }
        if (!a.prerelease && b.prerelease)
            return 1;
        if (a.prerelease && !b.prerelease)
            return -1;
        if (a.prerelease === b.prerelease)
            return 0;
        return a.prerelease < b.prerelease ? -1 : 1;
    }
    function satisfiesComparator(version, comparator) {
        const v = parseVersion(version);
        if (!v)
            return false;
        let r = String(comparator || '').trim();
        if (!r || r === '*' || /^x$/i.test(r))
            return true;
        const m = r.match(/^(<=|>=|<|>|=|~\s*|^\^\s*)?\s*(\d+|x|\*)(?:\.(\d+|x|\*))?(?:\.(\d+|x|\*))?$/i);
        if (!m)
            return false;
        const op = (m[1] || '=').replace(/\s/g, '');
        const parts = [m[2], m[3], m[4]];
        const wildMinor = parts[1] === undefined || /^x|\*$/i.test(parts[1] || '');
        const wildPatch = parts[2] === undefined || /^x|\*$/i.test(parts[2] || '');
        const base = {
            major: Number(parts[0]),
            minor: wildMinor ? 0 : Number(parts[1]),
            patch: wildPatch ? 0 : Number(parts[2]),
            prerelease: ''
        };
        if (op === '=') {
            if (parts[0] === 'x' || parts[0] === '*')
                return true;
            if (wildMinor)
                return v.major === base.major;
            if (wildPatch)
                return v.major === base.major && v.minor === base.minor;
            return cmpVersion(v, base) === 0;
        }
        if (op === '^') {
            if (base.major > 0)
                return v.major === base.major && cmpVersion(v, base) >= 0;
            if (base.minor > 0)
                return v.major === 0 && v.minor === base.minor && cmpVersion(v, base) >= 0;
            return v.major === 0 && v.minor === 0 && v.patch === base.patch && cmpVersion(v, base) >= 0;
        }
        if (op === '~')
            return v.major === base.major && v.minor === base.minor && cmpVersion(v, base) >= 0;
        const c = cmpVersion(v, base);
        return op === '>=' ? c >= 0 : op === '<=' ? c <= 0 : op === '>' ? c > 0 : op === '<' ? c < 0 : false;
    }
    function satisfiesVersion(actual, range) {
        if (range === undefined || range === null || String(range).trim() === '' || String(range).trim() === '*' || String(range).trim() === 'latest')
            return true;
        return String(range).split('||').some(group => {
            const comparators = group.trim().split(/\s+/).filter(Boolean);
            return comparators.length > 0 && comparators.every(c => satisfiesComparator(actual, c));
        });
    }
    class ModuleRegistry {
        constructor({ projectRoot = (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.'), stdlibPaths = [], packagePaths = [], apiVersion = '1' } = {}) {
            this.projectRoot = projectRoot;
            this.stdlibPaths = [...stdlibPaths];
            this.packagePaths = [...packagePaths];
            this.apiVersion = String(apiVersion);
            this.providers = new Map();
            this.cache = new Map();
            this.loading = [];
            this.loader = null;
        }
        register(name, module, meta = {}) {
            if (!(module instanceof DhadModule)) {
                throw err.ImportError(`الوحدة '${name}' غير صالحة: يجب تسجيل DhadModule`, {});
            }
            this.providers.set(name, { module, meta: { name, version: module.version || 'builtin', api: module.api || this.apiVersion, ...meta } });
            return module;
        }
        setLoader(loader) { this.loader = loader; }
        import(name, importer = '<main>', loc = {}) {
            if (this.cache.has(name))
                return this.cache.get(name);
            if (this.loading.includes(name)) {
                const chain = [...this.loading, name].join(' ← ');
                throw err.ImportError(`استيراد دائري بين الوحدات: ${chain}`, loc);
            }
            const provider = this.providers.get(name);
            if (provider) {
                this.cache.set(name, provider.module);
                return provider.module;
            }
            this.loading.push(name);
            try {
                let result = null;
                if (this.loader)
                    result = this.loader(name, { importer, registry: this, loc });
                if (!result)
                    result = this.loadPackage(name, loc);
                if (!(result instanceof DhadModule)) {
                    throw err.ImportError(`الوحدة '${name}' لم تُرجع وحدة صالحة`, loc);
                }
                this.cache.set(name, result);
                return result;
            }
            finally {
                this.loading.pop();
            }
        }
        loadPackage(name, loc = {}) {
            const fs = nodeFs(), path = nodePath();
            if (!fs || !path)
                return null;
            const roots = [
                this.projectRoot,
                ...this.packagePaths,
                ...this.stdlibPaths,
                path.join(this.projectRoot, 'dhad_modules'),
                path.join(this.projectRoot, 'stdlib'),
            ];
            for (const root of roots) {
                const dir = path.resolve(root, name);
                const manifestPath = path.join(dir, 'dhad.json');
                if (!fs.existsSync(manifestPath))
                    continue;
                let manifest;
                try {
                    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                }
                catch (e) {
                    throw err.ImportError(`ملف dhad.json للوحدة '${name}' غير صالح: ${e.message}`, loc);
                }
                if (manifest.name !== name)
                    throw err.ImportError(`اسم الحزمة '${manifest.name}' لا يطابق الاسم المطلوب '${name}'`, loc);
                if (!satisfiesApi(manifest.api || '1', this.apiVersion)) {
                    throw err.ImportError(`واجهة الحزمة '${name}' غير متوافقة مع Runtime API ${this.apiVersion}`, loc);
                }
                const dependencies = manifest.dependencies || {};
                for (const [dep, range] of Object.entries(dependencies)) {
                    const depModule = this.import(dep, name, loc);
                    if (!satisfiesVersion(depModule.version, range)) {
                        throw err.ImportError(`إصدار الاعتماد '${dep}' (${depModule.version}) لا يطابق المطلوب '${range}' للحزمة '${name}'`, loc);
                    }
                }
                const entry = manifest.entry || 'index.dhad';
                const entryPath = path.resolve(dir, entry);
                if (!entryPath.startsWith(dir + path.sep) && entryPath !== dir) {
                    throw err.ImportError(`نقطة دخول الحزمة '${name}' تتجاوز مجلد الحزمة`, loc);
                }
                if (!fs.existsSync(entryPath))
                    throw err.ImportError(`نقطة دخول الوحدة '${name}' غير موجودة: ${entry}`, loc);
                if (!this.loader)
                    throw err.ImportError(`لا يوجد محمّل وحدات لقراءة '${name}'`, loc);
                const source = fs.readFileSync(entryPath, 'utf8');
                return this.loader(name, { source, filename: entryPath, manifest, importer: '<package>', registry: this, loc });
            }
            throw err.ImportError(`وحدة غير معروفة: '${name}'`, loc);
        }
        clearCache() { this.cache.clear(); }
    }
    'use strict';
    class ResourceManager {
        constructor() { this.resources = new Map(); this.nextId = 1; }
        track(resource, { kind = 'native', disposer = null, label = kind } = {}) { const id = this.nextId++; this.resources.set(id, { resource, kind, disposer, label, released: false }); return id; }
        get(id) { const e = this.resources.get(id); if (!e || e.released)
            throw err.RuntimeError(`المورد '${id}' غير متاح`); return e.resource; }
        release(id) { const e = this.resources.get(id); if (!e)
            return false; if (!e.released) {
            e.released = true;
            if (typeof e.disposer === 'function')
                e.disposer(e.resource);
        } this.resources.delete(id); return true; }
        releaseAll() { for (const id of [...this.resources.keys()])
            this.release(id); }
        stats() { const byKind = {}; for (const e of this.resources.values())
            byKind[e.kind] = (byKind[e.kind] || 0) + 1; return { active: this.resources.size, byKind }; }
    }
    class MemoryModel {
        constructor() { this.resources = new ResourceManager(); this.heap = { objects: 0, lists: 0, modules: 0, functions: 0 }; }
        observe(v) { if (v && v.fields instanceof Map)
            this.heap.objects++;
        else if (Array.isArray(v))
            this.heap.lists++; return v; }
        snapshot() { return { heap: { ...this.heap }, resources: this.resources.stats() }; }
    }
    'use strict';
    class DhadRuntime {
        constructor({ onPrint, onInput, projectRoot, stdlibPaths, packagePaths, apiVersion = '1', capabilities = {}, domDocument = null, domWindow = null } = {}) {
            this.apiVersion = String(apiVersion);
            this.domDocument = domDocument || (typeof document !== 'undefined' ? document : null);
            this.domWindow = domWindow || (typeof window !== 'undefined' ? window : null);
            this.capabilities = Object.freeze({ network: false, storage: false, popup: false, navigation: false, clipboard: false, ...(capabilities || {}) });
            this.memory = new MemoryModel();
            this.onPrint = onPrint || (() => { });
            this.onInput = onInput || (() => '');
            this.modules = new ModuleRegistry({ projectRoot, stdlibPaths, packagePaths, apiVersion: this.apiVersion });
            this.values = {
                nullValue: () => null,
                typeOf: this.typeOf.bind(this),
                isUndefined: v => v === undefined,
                normalize: this.normalize.bind(this),
                truthy: this.truthy.bind(this),
                equals: this.equals.bind(this),
                stringify: this.stringify.bind(this),
            };
            this.functions = { native: this.native.bind(this), isCallable: this.isCallable.bind(this) };
            this.io = { print: (...xs) => this.onPrint(xs.map(x => this.stringify(x)).join(' ')), input: this.onInput };
            this.errors = { err, normalize: normalizeError, DhadError };
            this.collections = {
                index: (obj, idx, loc) => this.index(obj, idx, loc),
                setIndex: (obj, idx, value, loc) => this.setIndex(obj, idx, value, loc),
                length: (obj, loc) => this.length(obj, loc),
                copy: (list, loc) => { if (!Array.isArray(list))
                    throw err.TypeError('نسخ() تحتاج قائمة', loc); return list.slice(); },
            };
            this.resources = { track: (...a) => this.memory.resources.track(...a), release: id => this.memory.resources.release(id), stats: () => this.memory.snapshot() };
            this.foreign = {
                wrapNative: this.native.bind(this),
                unwrap: v => v,
                fromJS: this.normalize.bind(this),
                toJS: v => v,
            };
        }
        requireCapability(name, loc) {
            if (this.capabilities[name] === true)
                return true;
            const labels = { network: 'الشبكة', storage: 'التخزين المحلي', popup: 'النوافذ المنبثقة', navigation: 'التنقل', clipboard: 'الحافظة' };
            throw err.PermissionError(`صلاحية ${labels[name] || name} غير مفعّلة لهذا البرنامج. فعّلها من «صلاحيات التشغيل» ثم أعد التشغيل.`, loc || {});
        }
        module(name, fields = {}, options = {}) {
            const map = fields instanceof Map ? fields : new Map(Object.entries(fields));
            return new DhadModule(name, map, options);
        }
        registerModule(name, module, meta = {}) { return this.modules.register(name, module, meta); }
        importModule(name, importer, loc) { return this.modules.import(name, importer, loc); }
        native(fn, { min = null, max = null, name = 'الدالة', loc } = {}) {
            const runtime = this;
            return {
                __native: true, min, max, name,
                call(args) {
                    if ((min !== null && args.length < min) || (max !== null && args.length > max)) {
                        const expected = min === max ? `تحتاج ${min} وسيطًا` : `تقبل من ${min} إلى ${max} وسائط`;
                        throw err.ArgumentError(`${name}() ${expected} لكن استُقبل ${args.length}`, loc || {});
                    }
                    try {
                        return runtime.normalize(fn(args, runtime));
                    }
                    catch (e) {
                        throw normalizeError(e);
                    }
                }
            };
        }
        isCallable(v) { return v instanceof DhadFunction || !!(v && v.__native === true); }
        toJS(v) {
            if (v instanceof DhadObject) {
                const o = {};
                for (const [k, x] of v.fields)
                    o[k] = this.toJS(x);
                return o;
            }
            if (Array.isArray(v))
                return v.map(x => this.toJS(x));
            if (v instanceof DhadModule) {
                const o = {};
                for (const [k, x] of v.fields)
                    o[k] = this.toJS(x);
                return o;
            }
            return v;
        }
        normalize(v) {
            if (v === undefined)
                return null;
            if (v && typeof v.then === 'function')
                return v;
            if (v instanceof DhadObject || v instanceof DhadModule || v instanceof DhadFunction || v instanceof TrustedHTML || v instanceof SafeText || v instanceof VNode)
                return v;
            if (v && typeof v === 'object' && (typeof v.addEventListener === 'function' || typeof v.nodeType === 'number'))
                return v;
            if (Array.isArray(v))
                return v.map(x => this.normalize(x));
            if (v && typeof v === 'object' && !(v instanceof Date) && !(typeof Buffer !== 'undefined' && Buffer.isBuffer(v))) {
                const o = new DhadObject();
                for (const [k, value] of Object.entries(v))
                    o.fields.set(k, this.normalize(value));
                return o;
            }
            return v;
        }
        truthy(v) { return !(v === null || v === undefined || v === false || v === 0 || v === ''); }
        equals(a, b) {
            if (Array.isArray(a) && Array.isArray(b))
                return a.length === b.length && a.every((v, i) => this.equals(v, b[i]));
            return a === b;
        }
        typeOf(v) {
            if (v === null || v === undefined)
                return 'فارغ';
            if (typeof v === 'boolean')
                return 'منطقي';
            if (typeof v === 'number')
                return 'رقم';
            if (typeof v === 'string')
                return 'نص';
            if (Array.isArray(v))
                return 'قائمة';
            if (v instanceof TrustedHTML)
                return 'TrustedHTML';
            if (v instanceof SafeText)
                return 'نص';
            if (v instanceof VNode)
                return 'VNode';
            if (v instanceof DhadError)
                return 'خطأ';
            if (v instanceof DhadObject)
                return 'قاموس';
            if (v instanceof DhadModule)
                return 'وحدة';
            if (this.isCallable(v))
                return 'دالة';
            return 'غير معروف';
        }
        stringify(v) {
            v = this.normalize(v);
            if (v === null)
                return 'فارغ';
            if (v === true)
                return 'صحيح';
            if (v === false)
                return 'خطأ';
            if (v instanceof TrustedHTML)
                return v.value;
            if (v instanceof SafeText)
                return escapeText(v.value);
            if (v instanceof VNode)
                return '<VNode>';
            if (v instanceof DhadError)
                return `خطأ {النوع: ${KIND_LABELS_AR[v.kind] || 'خطأ'}, الرمز: ${v.code || 'DHD-999'}, الرسالة: ${v.message}}`;
            if (v instanceof DhadFunction || (v && v.__native === true))
                return '<دالة>';
            if (v instanceof DhadObject) {
                return '{' + [...v.fields.entries()].map(([k, x]) => `${k}: ${this.stringify(x)}`).join('، ') + '}';
            }
            if (v instanceof DhadModule)
                return `<وحدة ${v.name}>`;
            if (Array.isArray(v))
                return '[' + v.map(x => this.stringify(x)).join('، ') + ']';
            if (typeof v === 'number') {
                if (Number.isNaN(v))
                    return 'ليس رقمًا';
                if (v === Infinity)
                    return 'لانهاية';
                if (v === -Infinity)
                    return '-لانهاية';
                if (Number.isInteger(v))
                    return String(v);
                const rounded = Math.round(v * 1e6) / 1e6;
                if (rounded === 0 && v !== 0)
                    return Number(v).toExponential(6).replace('+', '');
                return String(rounded);
            }
            return String(v);
        }
        index(obj, idx, loc = {}) {
            if (obj instanceof DhadObject) {
                if (typeof idx !== 'string')
                    throw err.TypeError('فهرس القاموس يجب أن يكون نصًا', loc);
                if (!obj.fields.has(idx))
                    throw err.IndexError(`المفتاح '${idx}' غير موجود في القاموس`, loc);
                return obj.fields.get(idx);
            }
            if (typeof obj !== 'string' && !Array.isArray(obj))
                throw err.TypeError('لا يمكن الفهرسة إلا في نص أو قائمة', loc);
            if (typeof idx !== 'number')
                throw err.TypeError('الفهرس يجب أن يكون رقمًا', loc);
            if (!Number.isInteger(idx))
                throw err.TypeError('الفهرس يجب أن يكون عددًا صحيحًا (بدون كسور)', loc);
            if (idx < 0 || idx >= obj.length)
                throw err.IndexError('فهرس خارج الحدود', loc);
            return obj[idx];
        }
        setIndex(obj, idx, value, loc = {}) {
            if (obj instanceof DhadObject) {
                if (typeof idx !== 'string')
                    throw err.TypeError('مفتاح القاموس يجب أن يكون نصًا', loc);
                obj.fields.set(idx, this.normalize(value));
                return obj.fields.get(idx);
            }
            if (!Array.isArray(obj))
                throw err.TypeError('الإسناد بالفهرسة مسموح للقوائم أو القواميس', loc);
            this.index(obj, idx, loc);
            obj[idx] = this.normalize(value);
            return obj[idx];
        }
        length(obj, loc = {}) {
            if (obj instanceof DhadObject)
                return obj.fields.size;
            if (typeof obj === 'string' || Array.isArray(obj))
                return obj.length;
            throw err.TypeError('طول() تحتاج نصًا أو قائمة', loc);
        }
    }
    'use strict';
    const native = (fn, { min = null, max = null, name = 'الدالة' } = {}) => ({
        __native: true,
        min,
        max,
        name,
        call(args) {
            if (min !== null && args.length < min || max !== null && args.length > max) {
                const expected = min === max ? `تحتاج ${min} وسيطًا` : `تقبل من ${min} إلى ${max} وسائط`;
                throw err.ArgumentError(`${name}() ${expected} لكن استُقبل ${args.length}`);
            }
            return fn(args);
        }
    });
    function typeName(v) {
        if (v === null || v === undefined)
            return 'فارغ';
        if (typeof v === 'boolean')
            return 'منطقي';
        if (typeof v === 'number')
            return 'رقم';
        if (typeof v === 'string')
            return 'نص';
        if (Array.isArray(v))
            return 'قائمة';
        if (v instanceof DhadError)
            return 'خطأ';
        if (v instanceof DhadObject)
            return 'قاموس';
        if (v instanceof DhadModule)
            return 'وحدة';
        if (v instanceof DhadFunction || (v && v.__native))
            return 'دالة';
        return 'غير معروف';
    }
    function installGlobalBuiltins(env, interpreter, runtime = null) {
        runtime = runtime || new DhadRuntime({ onPrint: interpreter && interpreter.onPrint, onInput: interpreter && interpreter.onInput });
        env.declare('طول', runtime.native(([v]) => {
            if (typeof v === 'string' || Array.isArray(v))
                return v.length;
            throw err.TypeError('طول() تحتاج نصًا أو قائمة');
        }, { min: 1, max: 1, name: 'طول' }));
        env.declare('نص', runtime.native(([v]) => runtime.stringify(v), { min: 1, max: 1, name: 'نص' }));
        env.declare('رقم', runtime.native(([v]) => {
            const n = parseFloat(normalizeDigits(String(v)));
            if (isNaN(n))
                throw err.TypeError('تعذّر تحويل القيمة إلى رقم');
            return n;
        }, { min: 1, max: 1, name: 'رقم' }));
        env.declare('عشوائي', runtime.native(([a, b]) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw err.TypeError('عشوائي() تحتاج رقمًا (الحد الأدنى والحد الأقصى)');
            }
            const lo = Math.min(a, b), hi = Math.max(a, b);
            return Math.floor(Math.random() * (hi - lo + 1)) + lo;
        }, { min: 2, max: 2, name: 'عشوائي' }));
        env.declare('إضافة', runtime.native((args) => {
            if (args.length !== 2) {
                throw err.ArgumentError(`إضافة() تحتاج وسيطين بالضبط (قائمة والعنصر المطلوب إضافته) لكن استُقبل ${args.length}`);
            }
            const [list, item] = args;
            if (!Array.isArray(list))
                throw err.TypeError('إضافة() تحتاج قائمة');
            list.push(item);
            return list;
        }, { min: 2, max: 2, name: 'إضافة' }));
        env.declare('اضافة', env.get('إضافة'));
        env.declare('حذف_أخير', runtime.native(([list]) => {
            if (!Array.isArray(list))
                throw err.TypeError('حذف_أخير() تحتاج قائمة');
            if (list.length === 0)
                throw err.IndexError('لا يمكن حذف عنصر من قائمة فارغة');
            return list.pop();
        }, { min: 1, max: 1, name: 'حذف_أخير' }));
        env.declare('انسخ', runtime.native(([v]) => {
            if (!Array.isArray(v))
                throw err.TypeError('انسخ() تحتاج قائمة');
            return v.slice();
        }, { min: 1, max: 1, name: 'انسخ' }));
        env.declare('إدخال', runtime.native(([msg]) => runtime.onInput(msg !== undefined ? runtime.stringify(msg) : ''), { min: 0, max: 1, name: 'إدخال' }));
        env.declare('ادخال', env.get('إدخال'));
        env.declare('نوع', runtime.native(([v]) => typeName(v), { min: 1, max: 1, name: 'نوع' }));
        return runtime;
    }
    function assertNumber(v, fnName) {
        if (typeof v !== 'number')
            throw err.TypeError(`${fnName}() تحتاج رقمًا`);
    }
    function buildMathModule(runtime = new DhadRuntime()) {
        const fields = new Map();
        fields.set('باي', Math.PI);
        fields.set('هـ', Math.E);
        fields.set('لانهاية', Infinity);
        fields.set('جيب', runtime.native(([x]) => { assertNumber(x, 'جيب'); return Math.sin(x); }, { min: 1, max: 1, name: 'جيب' }));
        fields.set('جتا', runtime.native(([x]) => { assertNumber(x, 'جتا'); return Math.cos(x); }, { min: 1, max: 1, name: 'جتا' }));
        fields.set('ظا', runtime.native(([x]) => { assertNumber(x, 'ظا'); return Math.tan(x); }, { min: 1, max: 1, name: 'ظا' }));
        fields.set('جذر', runtime.native(([x]) => {
            assertNumber(x, 'جذر');
            if (x < 0)
                throw err.TypeError('جذر() لا يقبل رقمًا سالبًا');
            return Math.sqrt(x);
        }, { min: 1, max: 1, name: 'جذر' }));
        fields.set('قوة', runtime.native(([x, n]) => { assertNumber(x, 'قوة'); assertNumber(n, 'قوة'); return Math.pow(x, n); }, { min: 2, max: 2, name: 'قوة' }));
        fields.set('مطلق', runtime.native(([x]) => { assertNumber(x, 'مطلق'); return Math.abs(x); }, { min: 1, max: 1, name: 'مطلق' }));
        fields.set('أرضية', runtime.native(([x]) => { assertNumber(x, 'أرضية'); return Math.floor(x); }, { min: 1, max: 1, name: 'أرضية' }));
        fields.set('سقف', runtime.native(([x]) => { assertNumber(x, 'سقف'); return Math.ceil(x); }, { min: 1, max: 1, name: 'سقف' }));
        fields.set('تقريب', runtime.native(([x]) => { assertNumber(x, 'تقريب'); return Math.round(x); }, { min: 1, max: 1, name: 'تقريب' }));
        fields.set('أكبر', runtime.native(([a, b]) => { assertNumber(a, 'أكبر'); assertNumber(b, 'أكبر'); return Math.max(a, b); }, { min: 2, max: 2, name: 'أكبر' }));
        fields.set('أصغر', runtime.native(([a, b]) => { assertNumber(a, 'أصغر'); assertNumber(b, 'أصغر'); return Math.min(a, b); }, { min: 2, max: 2, name: 'أصغر' }));
        fields.set('لوغاريتم', runtime.native(([x, base]) => {
            assertNumber(x, 'لوغاريتم');
            if (x <= 0)
                throw err.TypeError('لوغاريتم() يحتاج رقمًا أكبر من صفر');
            if (base === undefined)
                return Math.log(x);
            assertNumber(base, 'لوغاريتم');
            return Math.log(x) / Math.log(base);
        }, { min: 1, max: 2, name: 'لوغاريتم' }));
        fields.set('حوّل_لراديان', runtime.native(([d]) => { assertNumber(d, 'حوّل_لراديان'); return d * Math.PI / 180; }, { min: 1, max: 1, name: 'حوّل_لراديان' }));
        fields.set('حوّل_لدرجات', runtime.native(([r]) => { assertNumber(r, 'حوّل_لدرجات'); return r * 180 / Math.PI; }, { min: 1, max: 1, name: 'حوّل_لدرجات' }));
        fields.set('قوس_جيب', runtime.native(([x]) => { assertNumber(x, 'قوس_جيب'); return Math.asin(x); }, { min: 1, max: 1, name: 'قوس_جيب' }));
        fields.set('قوس_جتا', runtime.native(([x]) => { assertNumber(x, 'قوس_جتا'); return Math.acos(x); }, { min: 1, max: 1, name: 'قوس_جتا' }));
        fields.set('قوس_ظا', runtime.native(([x]) => { assertNumber(x, 'قوس_ظا'); return Math.atan(x); }, { min: 1, max: 1, name: 'قوس_ظا' }));
        fields.set('قوس_ظا2', runtime.native(([y, x]) => { assertNumber(y, 'قوس_ظا2'); assertNumber(x, 'قوس_ظا2'); return Math.atan2(y, x); }, { min: 2, max: 2, name: 'قوس_ظا2' }));
        fields.set('جيب_زائدي', runtime.native(([x]) => { assertNumber(x, 'جيب_زائدي'); return Math.sinh(x); }, { min: 1, max: 1, name: 'جيب_زائدي' }));
        fields.set('جتا_زائدي', runtime.native(([x]) => { assertNumber(x, 'جتا_زائدي'); return Math.cosh(x); }, { min: 1, max: 1, name: 'جتا_زائدي' }));
        fields.set('ظا_زائدي', runtime.native(([x]) => { assertNumber(x, 'ظا_زائدي'); return Math.tanh(x); }, { min: 1, max: 1, name: 'ظا_زائدي' }));
        fields.set('أس', runtime.native(([x]) => { assertNumber(x, 'أس'); return Math.exp(x); }, { min: 1, max: 1, name: 'أس' }));
        fields.set('لوغاريتم_عشري', runtime.native(([x]) => { assertNumber(x, 'لوغاريتم_عشري'); return Math.log10(x); }, { min: 1, max: 1, name: 'لوغاريتم_عشري' }));
        fields.set('لوغاريتم_ثنائي', runtime.native(([x]) => { assertNumber(x, 'لوغاريتم_ثنائي'); return Math.log2(x); }, { min: 1, max: 1, name: 'لوغاريتم_ثنائي' }));
        fields.set('إشارة', runtime.native(([x]) => { assertNumber(x, 'إشارة'); return Math.sign(x); }, { min: 1, max: 1, name: 'إشارة' }));
        fields.set('جذران', runtime.native(([x]) => { assertNumber(x, 'جذران'); return Math.cbrt(x); }, { min: 1, max: 1, name: 'جذران' }));
        fields.set('وتر', runtime.native(([...xs]) => { xs.forEach(x => assertNumber(x, 'وتر')); return Math.hypot(...xs); }, { min: 1, name: 'وتر' }));
        fields.set('أسفل_قريب', runtime.native(([x]) => { assertNumber(x, 'أسفل_قريب'); return Math.trunc(x); }, { min: 1, max: 1, name: 'أسفل_قريب' }));
        fields.set('حد', runtime.native(([x, min, max]) => { assertNumber(x, 'حد'); assertNumber(min, 'حد'); assertNumber(max, 'حد'); return Math.min(Math.max(x, Math.min(min, max)), Math.max(min, max)); }, { min: 3, max: 3, name: 'حد' }));
        fields.set('استيفاء', runtime.native(([a, b, t]) => { assertNumber(a, 'استيفاء'); assertNumber(b, 'استيفاء'); assertNumber(t, 'استيفاء'); return a + (b - a) * t; }, { min: 3, max: 3, name: 'استيفاء' }));
        fields.set('تحويل_نطاق', runtime.native(([x, inMin, inMax, outMin, outMax]) => { [x, inMin, inMax, outMin, outMax].forEach(v => assertNumber(v, 'تحويل_نطاق')); if (inMax === inMin)
            throw err.TypeError('تحويل_نطاق() لا يقبل نطاقًا داخليًا صفريًا'); return outMin + (x - inMin) * (outMax - outMin) / (inMax - inMin); }, { min: 5, max: 5, name: 'تحويل_نطاق' }));
        fields.set('عامل', runtime.native(([n]) => { assertNumber(n, 'عامل'); if (n < 0 || !Number.isInteger(n))
            throw err.TypeError('عامل() يحتاج عددًا صحيحًا غير سالب'); let r = 1; for (let i = 2; i <= n; i++)
            r *= i; return r; }, { min: 1, max: 1, name: 'عامل' }));
        fields.set('تباديل', runtime.native(([n, r]) => { assertNumber(n, 'تباديل'); assertNumber(r, 'تباديل'); if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n)
            throw err.TypeError('تباديل() تحتاج أعدادًا صحيحة مع 0≤r≤n'); let z = 1; for (let i = 0; i < r; i++)
            z *= n - i; return z; }, { min: 2, max: 2, name: 'تباديل' }));
        fields.set('توافيق', runtime.native(([n, r]) => { assertNumber(n, 'توافيق'); assertNumber(r, 'توافيق'); if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n)
            throw err.TypeError('توافيق() تحتاج أعدادًا صحيحة مع 0≤r≤n'); r = Math.min(r, n - r); let z = 1; for (let i = 1; i <= r; i++)
            z = z * (n - r + i) / i; return z; }, { min: 2, max: 2, name: 'توافيق' }));
        fields.set('قاسم_مشترك', runtime.native(([a, b]) => { assertNumber(a, 'قاسم_مشترك'); assertNumber(b, 'قاسم_مشترك'); a = Math.abs(a); b = Math.abs(b); while (b) {
            const t = a % b;
            a = b;
            b = t;
        } return a; }, { min: 2, max: 2, name: 'قاسم_مشترك' }));
        fields.set('مضاعف_مشترك', runtime.native(([a, b]) => { assertNumber(a, 'مضاعف_مشترك'); assertNumber(b, 'مضاعف_مشترك'); if (a === 0 || b === 0)
            return 0; let x = Math.abs(a), y = Math.abs(b); while (y) {
            const t = x % y;
            x = y;
            y = t;
        } return Math.abs(a * b) / x; }, { min: 2, max: 2, name: 'مضاعف_مشترك' }));
        fields.set('عشوائي', runtime.native(([min, max]) => { assertNumber(min, 'عشوائي'); assertNumber(max, 'عشوائي'); return Math.random() * (max - min) + min; }, { min: 2, max: 2, name: 'عشوائي' }));
        fields.set('عشوائي_صحيح', runtime.native(([min, max]) => { assertNumber(min, 'عشوائي_صحيح'); assertNumber(max, 'عشوائي_صحيح'); const lo = Math.ceil(Math.min(min, max)), hi = Math.floor(Math.max(min, max)); return Math.floor(Math.random() * (hi - lo + 1)) + lo; }, { min: 2, max: 2, name: 'عشوائي_صحيح' }));
        return new DhadModule('رياضيات', fields, { readonly: true });
    }
    'use strict';
    class AnalysisScope {
        constructor(parent = null) {
            this.names = new Map();
            this.parent = parent;
        }
        declare(name, info = {}) {
            this.names.set(name, { isConst: !!info.isConst, funcArity: info.funcArity ?? null, type: info.type ? normalizeType(info.type) : null, returnType: info.returnType ? normalizeType(info.returnType) : null, paramTypes: info.paramTypes || null });
        }
        lookup(name) {
            if (this.names.has(name))
                return this.names.get(name);
            return this.parent ? this.parent.lookup(name) : null;
        }
        hasLocally(name) { return this.names.has(name); }
    }
    class SemanticAnalyzer {
        constructor(options = {}) {
            this.errors = [];
            this.strictTypes = !!options.strictTypes;
            const seed = new Environment();
            installGlobalBuiltins(seed, null);
            this.builtinNames = [...seed.vars.keys()];
        }
        loc(node) { return { line: node.line, column: node.column, length: node.length }; }
        report(e) { this.errors.push(e); }
        analyze(program) {
            this.errors = [];
            const root = new AnalysisScope();
            for (const name of this.builtinNames)
                root.declare(name);
            this.walkBlock(program.body, root, 0, false);
            return this.errors;
        }
        walkBlock(stmts, scope, loopDepth, inFunction = false) {
            for (const s of stmts)
                this.walkStatement(s, scope, loopDepth, inFunction);
        }
        walkStatement(node, scope, loopDepth, inFunction = false) {
            switch (node.type) {
                case 'Print':
                    node.args.forEach(a => this.walkExpr(a, scope));
                    return;
                case 'VarDecl':
                    if (node.init) {
                        this.walkExpr(node.init, scope);
                        this.checkAnnotation(node.annotation, node.init, scope, node);
                    }
                    this.declareChecked(scope, node.name, node, { isConst: false, type: node.annotation || infer(node.init, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } }) });
                    return;
                case 'ConstDecl':
                    this.walkExpr(node.init, scope);
                    this.checkAnnotation(node.annotation, node.init, scope, node);
                    this.declareChecked(scope, node.name, node, { isConst: true, type: node.annotation || infer(node.init, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } }) });
                    return;
                case 'ExprStmt':
                    this.walkExpr(node.expr, scope);
                    return;
                case 'Block':
                    this.walkBlock(node.body, new AnalysisScope(scope), loopDepth, inFunction);
                    return;
                case 'If':
                    this.walkExpr(node.cond, scope);
                    if (this.strictTypes) {
                        const t = infer(node.cond, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
                        if (t.kind !== 'منطقي' && t.kind !== 'مجهول' && t.kind !== 'أي')
                            this.report(err.TypeError(`شرط 'إذا' يجب أن يكون منطقيًا، وليس ${typeName(t)}`, this.loc(node.cond)));
                    }
                    this.walkBlock(node.thenBlock.body, new AnalysisScope(scope), loopDepth, inFunction);
                    if (node.elseBranch) {
                        if (node.elseBranch.type === 'If')
                            this.walkStatement(node.elseBranch, scope, loopDepth, inFunction);
                        else
                            this.walkBlock(node.elseBranch.body, new AnalysisScope(scope), loopDepth, inFunction);
                    }
                    return;
                case 'While':
                    this.walkExpr(node.cond, scope);
                    if (this.strictTypes) {
                        const t = infer(node.cond, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
                        if (t.kind !== 'منطقي' && t.kind !== 'مجهول' && t.kind !== 'أي')
                            this.report(err.TypeError(`شرط 'طالما' يجب أن يكون منطقيًا، وليس ${typeName(t)}`, this.loc(node.cond)));
                    }
                    this.walkBlock(node.body.body, new AnalysisScope(scope), loopDepth + 1, inFunction);
                    return;
                case 'For': {
                    this.walkExpr(node.from, scope);
                    this.walkExpr(node.to, scope);
                    const loopScope = new AnalysisScope(scope);
                    loopScope.declare(node.varName);
                    this.walkBlock(node.body.body, loopScope, loopDepth + 1, inFunction);
                    return;
                }
                case 'FuncDecl': {
                    this.declareChecked(scope, node.name, node, { isConst: false, type: node.component ? 'دالة' : null, funcArity: node.params.length, returnType: node.returnType, paramTypes: node.params.map(p => typeof p === 'string' ? null : p.annotation) });
                    const fnScope = new AnalysisScope(scope);
                    for (const p of node.params)
                        fnScope.declare(typeof p === 'string' ? p : p.name, { type: typeof p === 'string' ? null : p.annotation });
                    this.walkBlock(node.body.body, fnScope, 0, true);
                    if (node.returnType)
                        this.checkReturns(node.body.body, node.returnType, fnScope);
                    return;
                }
                case 'Return':
                    if (!inFunction)
                        this.report(err.SyntaxError("'ارجع' مسموح فقط داخل دالة", this.loc(node)));
                    if (node.value)
                        this.walkExpr(node.value, scope);
                    return;
                case 'Break':
                    if (loopDepth === 0)
                        this.report(err.SyntaxError("'توقف' مسموح فقط داخل حلقة (لكل أو طالما)", this.loc(node)));
                    return;
                case 'Continue':
                    if (loopDepth === 0)
                        this.report(err.SyntaxError("'استمر' مسموح فقط داخل حلقة (لكل أو طالما)", this.loc(node)));
                    return;
                case 'Import':
                    this.declareChecked(scope, node.name, node, { isConst: false });
                    return;
                case 'Export':
                    for (const name of node.names) {
                        if (!scope.lookup(name))
                            this.report(err.NameError(`لا يمكن تصدير اسم غير معرّف: '${name}'`, this.loc(node)));
                    }
                    return;
                default:
                    return;
            }
        }
        checkAnnotation(annotation, expr, scope, node) {
            if (!annotation)
                return;
            const expected = normalizeType(annotation), actual = infer(expr, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
            if (!same(actual, expected))
                this.report(err.TypeError(`النوع المعلن '${typeName(expected)}' لا يطابق القيمة '${typeName(actual)}'`, this.loc(node)));
        }
        checkReturns(stmts, expected, scope) {
            const walk = (xs) => { for (const n of xs) {
                if (n.type === 'Return' && n.value) {
                    const actual = infer(n.value, { get: k => scope.lookup(k)?.type || { kind: 'مجهول' } });
                    if (!same(actual, expected))
                        this.report(err.TypeError(`نوع الإرجاع غير صحيح: المتوقع ${typeName(expected)} لكن الموجود ${typeName(actual)}`, this.loc(n)));
                }
                if (n.type === 'Block')
                    walk(n.body);
                if (n.type === 'If') {
                    walk(n.thenBlock.body);
                    if (n.elseBranch)
                        walk(n.elseBranch.type === 'If' ? [n.elseBranch] : n.elseBranch.body);
                }
                if (n.type === 'While' || n.type === 'For')
                    walk(n.body.body);
            } };
            walk(stmts);
        }
        declareChecked(scope, name, node, info) {
            if (scope.hasLocally(name) && scope.lookup(name).isConst) {
                this.report(err.TypeError(`لا يمكن تغيير الثابت '${name}' بعد تعريفه`, this.loc(node)));
                return;
            }
            scope.declare(name, info);
        }
        walkExpr(node, scope) {
            switch (node.type) {
                case 'Number':
                case 'String':
                case 'Bool':
                case 'Null':
                    return;
                case 'Ident': {
                    if (!scope.lookup(node.name)) {
                        this.report(err.NameError(`متغير غير معرّف: '${node.name}'`, this.loc(node)));
                    }
                    return;
                }
                case 'Assign': {
                    this.walkExpr(node.value, scope);
                    if (node.target.type === 'Ident') {
                        const info = scope.lookup(node.target.name);
                        if (!info) {
                            this.report(err.NameError(`متغير غير معرّف: '${node.target.name}'`, this.loc(node.target)));
                        }
                        else if (info.isConst) {
                            this.report(err.TypeError(`لا يمكن تغيير الثابت '${node.target.name}' بعد تعريفه`, this.loc(node.target)));
                        }
                        else if (info.funcArity !== null) {
                            info.funcArity = null;
                        }
                    }
                    else if (node.target.type === 'Index') {
                        this.walkExpr(node.target.object, scope);
                        this.walkExpr(node.target.index, scope);
                    }
                    else if (node.target.type === 'Member') {
                        this.walkExpr(node.target.object, scope);
                    }
                    return;
                }
                case 'Logical':
                    this.walkExpr(node.left, scope);
                    this.walkExpr(node.right, scope);
                    if (this.strictTypes) {
                        const l = infer(node.left, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } }), r = infer(node.right, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
                        if (l.kind !== 'منطقي' && l.kind !== 'مجهول' && l.kind !== 'أي')
                            this.report(err.TypeError(`المعامل الأيسر لـ'${node.op}' يجب أن يكون منطقيًا`, this.loc(node.left)));
                        if (r.kind !== 'منطقي' && r.kind !== 'مجهول' && r.kind !== 'أي')
                            this.report(err.TypeError(`المعامل الأيمن لـ'${node.op}' يجب أن يكون منطقيًا`, this.loc(node.right)));
                    }
                    return;
                case 'Binary':
                    this.walkExpr(node.left, scope);
                    this.walkExpr(node.right, scope);
                    if (this.strictTypes) {
                        const l = infer(node.left, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } }), r = infer(node.right, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
                        if (['-', '*', '/', '%'].includes(node.op) && [l, r].some(t => t.kind !== 'رقم' && t.kind !== 'مجهول' && t.kind !== 'أي'))
                            this.report(err.TypeError(`المعامل '${node.op}' يحتاج رقمين`, this.loc(node)));
                        if (node.op === '+' && !((l.kind === 'رقم' || l.kind === 'نص' || l.kind === 'مجهول' || l.kind === 'أي') && (r.kind === 'رقم' || r.kind === 'نص' || r.kind === 'مجهول' || r.kind === 'أي')))
                            this.report(err.TypeError("المعامل '+' يحتاج رقمين أو نصين", this.loc(node)));
                        if (['<', '>', '<=', '>='].includes(node.op) && l.kind !== r.kind && l.kind !== 'مجهول' && r.kind !== 'مجهول' && l.kind !== 'أي' && r.kind !== 'أي')
                            this.report(err.TypeError(`لا يمكن مقارنة ${typeName(l)} مع ${typeName(r)}`, this.loc(node)));
                    }
                    return;
                case 'Unary':
                case 'Await':
                    this.walkExpr(node.operand, scope);
                    return;
                case 'Markup':
                    for (const p of node.props)
                        this.walkExpr(p.value, scope);
                    for (const c of node.children)
                        if (c.type !== 'MarkupText')
                            this.walkExpr(c, scope);
                    return;
                case 'Call': {
                    this.walkExpr(node.callee, scope);
                    node.args.forEach(a => this.walkExpr(a, scope));
                    if (node.callee.type === 'Member' && node.callee.object.type === 'Ident' && node.callee.object.name === 'ويب' && (node.callee.property === 'ضبط_HTML' || node.callee.property === 'إضافة')) {
                        const arg = node.args[1];
                        if (arg) {
                            const actual = infer(arg, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
                            if (!same(actual, { kind: 'TrustedHTML' }))
                                this.report(err.TypeError(`${node.callee.property}() يتطلب TrustedHTML. استخدم ويب.خام(...) صراحةً للـHTML الخام.`, this.loc(arg)));
                        }
                    }
                    if (node.callee.type === 'Ident') {
                        const info = scope.lookup(node.callee.name);
                        if (info && info.funcArity !== null && info.funcArity !== node.args.length) {
                            this.report(err.ArgumentError(`الدالة '${node.callee.name}' تحتاج ${info.funcArity} وسيطًا لكن استُقبل ${node.args.length}`, this.loc(node)));
                        }
                        if (info && info.paramTypes) {
                            node.args.forEach((arg, i) => { const expected = info.paramTypes[i]; if (expected) {
                                const actual = infer(arg, { get: n => scope.lookup(n)?.type || { kind: 'مجهول' } });
                                if (!same(actual, expected))
                                    this.report(err.TypeError(`الوسيط ${i + 1} للدالة '${node.callee.name}' نوعه غير صحيح: المتوقع ${typeName(expected)} لكن الموجود ${typeName(actual)}`, this.loc(arg)));
                            } });
                        }
                    }
                    return;
                }
                case 'Index':
                    this.walkExpr(node.object, scope);
                    this.walkExpr(node.index, scope);
                    return;
                case 'Member':
                    this.walkExpr(node.object, scope);
                    return;
                case 'List':
                    node.items.forEach(it => this.walkExpr(it, scope));
                    return;
                default:
                    return;
            }
        }
    }
    'use strict';
    const CALL_STACK_RE = /call stack/i;
    class Interpreter {
        constructor({ onPrint, onInput, projectRoot, packagePaths, stdlibPaths, runtime, filename, onStep, capabilities, domDocument = null, domWindow = null } = {}) {
            this.runtime = runtime || new DhadRuntime({ onPrint, onInput, projectRoot, packagePaths, stdlibPaths, capabilities, domDocument, domWindow });
            this.onPrint = onPrint || this.runtime.onPrint || (() => { });
            this.onInput = onInput || this.runtime.onInput || (() => '');
            this.scheduler = new Scheduler();
            this.runtime.scheduler = this.scheduler;
            this.global = new Environment();
            this.steps = 0;
            this.maxSteps = 2000000;
            this.onStep = typeof onStep === 'function' ? onStep : null;
            this.callDepth = 0;
            this.maxCallDepth = 1000;
            this.maxNativeCallDepth = 100;
            this.callStack = [];
            this.currentFilename = filename ? path.resolve(filename) : null;
            this.runtime.registerModule('رياضيات', buildMathModule(this.runtime), { version: 'builtin', api: this.runtime.apiVersion });
            for (const [name, mod] of buildStdlib(this.runtime))
                this.runtime.registerModule(name, mod, { version: 'builtin', api: this.runtime.apiVersion });
            this.runtime.registerModule('ويب', buildWeb(this.runtime), { version: 'builtin', api: this.runtime.apiVersion });
            this.runtime.modules.setLoader((name, ctx) => this.loadModule(name, ctx));
            this.runtime.callValue = (fn, args, loc) => this.callValue(fn, args, loc);
            installGlobalBuiltins(this.global, this, this.runtime);
        }
        async runAsync(source) {
            try {
                const tokens = new Lexer(source).tokenize();
                const program = new Parser(tokens).parseProgram();
                try {
                    await this.execBlockStmtsAsync(program.body, this.global);
                }
                catch (sig) {
                    if (sig instanceof BreakSignal)
                        throw err.SyntaxError("'توقف' مسموح فقط داخل حلقة (لكل أو طالما)");
                    if (sig instanceof ContinueSignal)
                        throw err.SyntaxError("'استمر' مسموح فقط داخل حلقة (لكل أو طالما)");
                    if (sig instanceof ReturnSignal)
                        throw err.SyntaxError("'ارجع' مسموح فقط داخل دالة");
                    throw sig;
                }
            }
            catch (e) {
                const clean = normalizeError(e);
                if (clean && typeof clean === 'object') {
                    clean.source = source;
                    clean.stackTrace = Array.isArray(clean.stackTrace) && clean.stackTrace.length ? clean.stackTrace : this.callStack.slice().reverse();
                }
                throw clean;
            }
        }
        run(source) {
            try {
                const tokens = new Lexer(source).tokenize();
                const program = new Parser(tokens).parseProgram();
                try {
                    this.execBlockStmts(program.body, this.global);
                }
                catch (sig) {
                    if (sig instanceof BreakSignal)
                        throw err.SyntaxError("'توقف' مسموح فقط داخل حلقة (لكل أو طالما)");
                    if (sig instanceof ContinueSignal)
                        throw err.SyntaxError("'استمر' مسموح فقط داخل حلقة (لكل أو طالما)");
                    if (sig instanceof ReturnSignal)
                        throw err.SyntaxError("'ارجع' مسموح فقط داخل دالة");
                    throw sig;
                }
            }
            catch (e) {
                const clean = normalizeError(e);
                if (clean && typeof clean === 'object') {
                    clean.source = source;
                    clean.stackTrace = Array.isArray(clean.stackTrace) && clean.stackTrace.length ? clean.stackTrace : this.callStack.slice().reverse();
                }
                throw clean;
            }
        }
        step(loc) {
            this.steps++;
            if (this.onStep)
                this.onStep({ ...(loc || {}), step: this.steps, callDepth: this.callDepth, filename: this.currentFilename });
            if (this.steps > this.maxSteps) {
                throw err.RuntimeError('توقف التنفيذ: عدد كبير جدًا من الخطوات (احتمال حلقة لا نهائية)', loc);
            }
        }
        loc(node) { return { line: node.line, column: node.column, length: node.length }; }
        execBlockStmts(stmts, env) { for (const s of stmts)
            this.execStatement(s, env); }
        execStatement(node, env) {
            this.step(this.loc(node));
            switch (node.type) {
                case 'Print': {
                    const vals = node.args.map(a => this.stringify(this.evalExpr(a, env)));
                    this.onPrint(vals.join(' '));
                    return;
                }
                case 'VarDecl': {
                    const val = node.init ? this.evalExpr(node.init, env) : null;
                    env.declare(node.name, val, false, this.loc(node));
                    return;
                }
                case 'ConstDecl': {
                    const val = this.evalExpr(node.init, env);
                    env.declare(node.name, val, true, this.loc(node));
                    return;
                }
                case 'ExprStmt':
                    this.evalExpr(node.expr, env);
                    return;
                case 'Block':
                    this.execBlockStmts(node.body, new Environment(env));
                    return;
                case 'If': {
                    if (this.truthy(this.evalExpr(node.cond, env))) {
                        this.execBlockStmts(node.thenBlock.body, new Environment(env));
                    }
                    else if (node.elseBranch) {
                        if (node.elseBranch.type === 'If')
                            this.execStatement(node.elseBranch, env);
                        else
                            this.execBlockStmts(node.elseBranch.body, new Environment(env));
                    }
                    return;
                }
                case 'While': {
                    while (this.truthy(this.evalExpr(node.cond, env))) {
                        this.step(this.loc(node));
                        try {
                            this.execBlockStmts(node.body.body, new Environment(env));
                        }
                        catch (sig) {
                            if (sig instanceof BreakSignal)
                                break;
                            if (sig instanceof ContinueSignal)
                                continue;
                            throw sig;
                        }
                    }
                    return;
                }
                case 'For': {
                    const from = this.evalExpr(node.from, env);
                    const to = this.evalExpr(node.to, env);
                    if (typeof from !== 'number' || typeof to !== 'number') {
                        throw err.TypeError('حدود حلقة لكل (من...إلى) يجب أن تكون أرقامًا', this.loc(node));
                    }
                    const dir = to >= from ? 1 : -1;
                    for (let i = from; dir > 0 ? i <= to : i >= to; i += dir) {
                        this.step(this.loc(node));
                        const loopEnv = new Environment(env);
                        loopEnv.declare(node.varName, i);
                        try {
                            this.execBlockStmts(node.body.body, loopEnv);
                        }
                        catch (sig) {
                            if (sig instanceof BreakSignal)
                                break;
                            if (sig instanceof ContinueSignal)
                                continue;
                            throw sig;
                        }
                    }
                    return;
                }
                case 'FuncDecl': {
                    const fn = new DhadFunction(node, env);
                    if (node.component)
                        fn.__dhadComponent = true;
                    if (node.async)
                        fn.__dhadAsync = true;
                    env.declare(node.name, fn, false, this.loc(node));
                    return;
                }
                case 'Return': {
                    if (node.value && node.value.type === 'Call') {
                        const callee = this.evalExpr(node.value.callee, env);
                        const args = node.value.args.map(a => this.evalExpr(a, env));
                        if (callee instanceof DhadFunction)
                            throw new TailCallSignal(callee, args, this.loc(node));
                    }
                    throw new ReturnSignal(node.value ? this.evalExpr(node.value, env) : null);
                }
                case 'Break': throw new BreakSignal();
                case 'Continue': throw new ContinueSignal();
                case 'Import': {
                    const mod = this.runtime.importModule(node.name, this.currentFilename || '<source>', this.loc(node));
                    const binding = node.alias || node.name.split('/').pop().replace(/\.(?:dhad|ضاد)$/, '') || node.name;
                    env.declare(binding, mod, false, this.loc(node));
                    return;
                }
                case 'Export': {
                    if (!this.currentModuleExports)
                        throw err.SyntaxError(`'تصدير' مسموح فقط داخل ملف وحدة`, this.loc(node));
                    for (const name of node.names)
                        this.currentModuleExports.set(name, undefined);
                    return;
                }
                case 'Try': {
                    let pending = null;
                    try {
                        this.execBlockStmts(node.tryBlock.body, new Environment(env));
                    }
                    catch (e) {
                        pending = e;
                        const isSignal = (e instanceof ReturnSignal) || (e instanceof BreakSignal) || (e instanceof ContinueSignal);
                        if (node.catchBlock && !isSignal) {
                            const ce = new Environment(env);
                            if (node.catchName)
                                ce.declare(node.catchName, normalizeError(e));
                            try {
                                this.execBlockStmts(node.catchBlock.body, ce);
                                pending = null;
                            }
                            catch (e2) {
                                pending = e2;
                            }
                        }
                    }
                    finally {
                        if (node.finallyBlock) {
                            try {
                                this.execBlockStmts(node.finallyBlock.body, new Environment(env));
                            }
                            catch (e3) {
                                pending = e3;
                            }
                        }
                    }
                    if (pending)
                        throw pending;
                    return;
                }
                default:
                    throw err.RuntimeError(`عبارة غير معروفة: ${node.type}`, this.loc(node));
            }
        }
        loadModule(name, ctx = {}) {
            if (!ctx.source && (name.startsWith('./') || name.startsWith('../') || (name.endsWith('.dhad') || name.endsWith('.ضاد')))) {
                const importer = ctx.importer && ctx.importer !== '<source>' ? ctx.importer : this.currentFilename;
                const base = importer && path.isAbsolute(importer) ? path.dirname(importer) : (this.runtime.modules.projectRoot || process.cwd());
                let filename = path.resolve(base, name);
                if (!path.extname(filename)) {
                    const arabic = filename + '.ضاد';
                    const legacy = filename + '.dhad';
                    filename = fs.existsSync(arabic) ? arabic : legacy;
                }
                if (!fs.existsSync(filename))
                    throw err.ImportError(`ملف الوحدة المحلي غير موجود: '${filename}'`, ctx.loc || {});
                ctx.source = fs.readFileSync(filename, 'utf8');
                ctx.filename = filename;
            }
            if (!ctx.source)
                return null;
            const tokens = new Lexer(ctx.source).tokenize();
            const program = new Parser(tokens).parseProgram();
            const moduleEnv = new Environment(this.global);
            const exports = new Map();
            const previous = this.currentModuleExports;
            const previousFilename = this.currentFilename;
            this.currentModuleExports = exports;
            this.currentFilename = ctx.filename || previousFilename;
            try {
                this.execBlockStmts(program.body, moduleEnv);
                for (const name2 of [...exports.keys()]) {
                    if (!moduleEnv.vars.has(name2))
                        throw err.ImportError(`لا يمكن تصدير اسم غير معرّف: '${name2}'`, ctx.loc || {});
                    exports.set(name2, moduleEnv.vars.get(name2));
                }
            }
            catch (e) {
                throw normalizeError(e);
            }
            finally {
                this.currentModuleExports = previous;
                this.currentFilename = previousFilename;
            }
            const manifestExports = ctx.manifest && Array.isArray(ctx.manifest.exports) ? ctx.manifest.exports : null;
            if (manifestExports) {
                for (const name2 of manifestExports) {
                    if (!exports.has(name2)) {
                        if (!moduleEnv.vars.has(name2))
                            throw err.ImportError(`الحزمة '${name}' تعلن تصدير '${name2}' لكنه غير معرّف`, ctx.loc || {});
                        exports.set(name2, moduleEnv.vars.get(name2));
                    }
                }
            }
            if (exports.size === 0)
                throw err.ImportError(`الوحدة '${name}' لا تصدّر أي قيمة. استخدم 'تصدير اسم'.`, ctx.loc || {});
            return new DhadModule(name, exports, { readonly: true, version: (ctx.manifest && ctx.manifest.version) || '1.0.0', api: (ctx.manifest && ctx.manifest.api) || '1', packageType: (ctx.manifest && ctx.manifest.type) || 'dhad-library', dependencies: (ctx.manifest && ctx.manifest.dependencies) || {}, exports: [...exports.keys()] });
        }
        evalExpr(node, env) {
            switch (node.type) {
                case 'Number': return node.value;
                case 'String': return node.value;
                case 'Bool': return node.value;
                case 'Null': return null;
                case 'Ident': return env.get(node.name, this.loc(node));
                case 'List': return node.items.map(it => this.evalExpr(it, env));
                case 'Object': {
                    const o = new DhadObject();
                    for (const e of node.entries)
                        o.fields.set(e.key, this.evalExpr(e.value, env));
                    return o;
                }
                case 'FuncExpr': return new DhadFunction({ name: 'دالة_مجهولة', params: node.params, body: node.body }, env);
                case 'Assign': {
                    let targetRef = null;
                    if (node.target.type === 'Ident') {
                        targetRef = { kind: 'Ident', name: node.target.name };
                    }
                    else if (node.target.type === 'Index') {
                        const obj = this.evalExpr(node.target.object, env);
                        const idx = this.evalExpr(node.target.index, env);
                        targetRef = { kind: 'Index', obj, idx };
                    }
                    else if (node.target.type === 'Member') {
                        const obj = this.evalExpr(node.target.object, env);
                        targetRef = { kind: 'Member', obj, property: node.target.property };
                    }
                    const val = this.evalExpr(node.value, env);
                    if (targetRef.kind === 'Ident') {
                        env.set(targetRef.name, val, this.loc(node.target));
                    }
                    else if (targetRef.kind === 'Index') {
                        this.runtime.setIndex(targetRef.obj, targetRef.idx, val, this.loc(node.target));
                    }
                    else if (targetRef.kind === 'Member') {
                        if (targetRef.obj instanceof DhadObject)
                            targetRef.obj.fields.set(targetRef.property, val);
                        else {
                            if (!(targetRef.obj instanceof DhadModule))
                                throw err.TypeError("لا يمكن الإسناد بـ '.' إلا داخل وحدة أو قاموس", this.loc(node));
                            if (targetRef.obj.readonly)
                                throw err.TypeError(`الوحدة '${targetRef.obj.name}' للقراءة فقط ولا يمكن تعديل عناصرها`, this.loc(node));
                            targetRef.obj.fields.set(targetRef.property, val);
                        }
                    }
                    return val;
                }
                case 'Logical': {
                    const l = this.evalExpr(node.left, env);
                    if (node.op === 'أو')
                        return this.truthy(l) ? l : this.evalExpr(node.right, env);
                    return this.truthy(l) ? this.evalExpr(node.right, env) : l;
                }
                case 'Unary': {
                    const v = this.evalExpr(node.operand, env);
                    if (node.op === '-') {
                        if (typeof v !== 'number')
                            throw err.TypeError('عملية (-) تحتاج رقمًا', this.loc(node));
                        return -v;
                    }
                    if (node.op === 'ليس')
                        return !this.truthy(v);
                    break;
                }
                case 'Await': {
                    const v = this.evalExpr(node.operand, env);
                    if (v && typeof v.then === 'function')
                        throw err.RuntimeError('انتظر لا يعمل إلا داخل دالة غير_متزامن');
                    return v;
                }
                case 'Markup': return this.evalMarkup(node, env);
                case 'MarkupText': return new SafeText(node.value);
                case 'Binary': return this.evalBinary(node, env);
                case 'Call': return this.evalCall(node, env);
                case 'Index': {
                    const obj = this.evalExpr(node.object, env);
                    const idx = this.evalExpr(node.index, env);
                    return this.runtime.index(obj, idx, this.loc(node));
                }
                case 'Member': {
                    const obj = this.evalExpr(node.object, env);
                    if (obj instanceof DhadError) {
                        const errorFields = {
                            الرسالة: obj.message,
                            النوع: obj.kind,
                            الرمز: obj.code,
                            السطر: obj.line ?? null,
                            العمود: obj.column ?? null,
                            الطول: obj.length ?? 1,
                            النص: obj.text ?? null,
                            الاقتراح: obj.suggestion ?? null,
                            errorType: obj.errorType,
                            message: obj.message,
                            kind: obj.kind,
                            code: obj.code,
                            line: obj.line ?? null,
                            column: obj.column ?? null,
                            suggestion: obj.suggestion ?? null,
                            المصدر: obj.source ?? null,
                            سلسلة_الاستدعاء: obj.stackTrace ?? []
                        };
                        if (!(node.property in errorFields))
                            throw err.NameError(`'${node.property}' غير موجود داخل الخطأ`, this.loc(node));
                        return errorFields[node.property];
                    }
                    if (!(obj instanceof DhadModule) && !(obj instanceof DhadObject))
                        throw err.TypeError("لا يمكن الوصول بـ '.' إلا داخل وحدة مستوردة عبر استورد", this.loc(node));
                    if (!obj.fields.has(node.property)) {
                        if (obj instanceof DhadModule)
                            throw err.NameError(`'${node.property}' غير موجود داخل '${obj.name}'`, this.loc(node));
                        throw err.NameError(`'${node.property}' غير موجود داخل القاموس`, this.loc(node));
                    }
                    return obj.fields.get(node.property);
                }
                default:
                    throw err.RuntimeError(`تعبير غير معروف: ${node.type}`, this.loc(node));
            }
        }
        evalBinary(node, env) {
            const l = this.evalExpr(node.left, env);
            const r = this.evalExpr(node.right, env);
            const op = node.op;
            const typeLoc = node.left.line !== undefined ? this.loc(node.left) : this.loc(node);
            if (op === '+') {
                if (typeof l === 'string' || typeof r === 'string')
                    return this.stringify(l) + this.stringify(r);
                if (Array.isArray(l) && Array.isArray(r))
                    return l.concat(r);
                if (typeof l === 'number' && typeof r === 'number')
                    return l + r;
                throw err.TypeError('لا يمكن جمع هذه القيم', typeLoc);
            }
            if (['-', '*', '/', '%'].includes(op)) {
                if (typeof l !== 'number' || typeof r !== 'number') {
                    throw err.TypeError(`العملية '${op}' تحتاج أرقامًا`, typeLoc);
                }
                if (op === '-')
                    return l - r;
                if (op === '*')
                    return l * r;
                if (op === '/') {
                    if (r === 0)
                        throw err.RuntimeError('القسمة على صفر', this.loc(node));
                    return l / r;
                }
                if (op === '%') {
                    if (r === 0)
                        throw err.RuntimeError('لا يمكن حساب باقي القسمة على صفر', this.loc(node));
                    return l % r;
                }
            }
            if (op === '==')
                return this.equals(l, r);
            if (op === '!=')
                return !this.equals(l, r);
            if (['<', '>', '<=', '>='].includes(op)) {
                if (typeof l !== typeof r || (typeof l !== 'number' && typeof l !== 'string')) {
                    throw err.TypeError('لا يمكن المقارنة بين هذه القيم', typeLoc);
                }
                if (op === '<')
                    return l < r;
                if (op === '>')
                    return l > r;
                if (op === '<=')
                    return l <= r;
                if (op === '>=')
                    return l >= r;
            }
            throw err.RuntimeError(`عملية غير معروفة: '${op}'`, this.loc(node));
        }
        callLinearRecursive(fn, initialArgs, loc = {}) {
            const continuations = [];
            let current = fn;
            let currentArgs = initialArgs;
            let frames = 0;
            while (current instanceof DhadFunction) {
                const step = this.linearFunctionStep(current, currentArgs, loc);
                if (!step.handled)
                    return { handled: false };
                frames++;
                if (frames > this.maxCallDepth) {
                    throw err.RuntimeError(`تجاوز عمق الاستدعاءات المتداخلة الحد الأقصى (${this.maxCallDepth}) — يبدو أن الدالة '${current.decl.name}' تستدعي نفسها بلا نهاية (استدعاء ذاتي recursion بلا حالة توقف واضحة)`, loc);
                }
                if (step.kind === 'return') {
                    let value = step.value;
                    while (continuations.length) {
                        const c = continuations.pop();
                        value = this.applyLinearContinuation(c, value, loc);
                    }
                    return { handled: true, value };
                }
                continuations.push(step.continuation);
                current = step.callee;
                currentArgs = step.args;
            }
            return { handled: false };
        }
        linearFunctionStep(fn, args, loc = {}) {
            const params = fn.decl.params;
            if (args.length !== params.length)
                throw err.ArgumentError(`الدالة '${fn.decl.name}' تحتاج ${params.length} وسيطًا لكن استُقبل ${args.length}`, loc);
            if (!this.functionContainsSelfCall(fn))
                return { handled: false };
            const env = new Environment(fn.closure);
            params.forEach((p, i) => env.declare(typeof p === 'string' ? p : p.name, args[i]));
            const result = this.findLinearReturn(fn.decl.body.body, env, fn, loc);
            if (!result || !result.returnNode)
                return { handled: false };
            const value = result.returnNode.value;
            if (!value)
                return { handled: true, kind: 'return', value: null };
            if (value.type === 'Call')
                return { handled: false };
            const recursive = this.findSingleDirectSelfCall(value, fn);
            if (!recursive)
                return { handled: true, kind: 'return', value: this.evalExpr(value, env) };
            if (recursive.node.type !== 'Binary')
                return { handled: false };
            const callNode = recursive.call;
            const callee = this.evalExpr(callNode.callee, env);
            if (callee !== fn)
                return { handled: false };
            const nextArgs = callNode.args.map(a => this.evalExpr(a, env));
            const sideNode = recursive.side === 'left' ? recursive.node.right : recursive.node.left;
            const sideValue = this.evalExpr(sideNode, env);
            return {
                handled: true,
                kind: 'recurse',
                callee: fn,
                args: nextArgs,
                continuation: { op: recursive.node.op, side: recursive.side, value: sideValue }
            };
        }
        functionContainsSelfCall(fn) {
            const name = fn && fn.decl && fn.decl.name;
            const visit = n => {
                if (!n || typeof n !== 'object')
                    return false;
                if (n.type === 'Call')
                    return !!(n.callee && n.callee.type === 'Ident' && n.callee.name === name);
                for (const k of Object.keys(n)) {
                    if (k === 'loc' || k === 'line' || k === 'column' || k === 'length')
                        continue;
                    const v = n[k];
                    if (Array.isArray(v)) {
                        if (v.some(visit))
                            return true;
                    }
                    else if (v && typeof v === 'object' && visit(v))
                        return true;
                }
                return false;
            };
            return visit(fn.decl.body);
        }
        findLinearReturn(stmts, env, fn, loc) {
            for (const stmt of stmts) {
                if (stmt.type === 'Return')
                    return { returnNode: stmt };
                if (stmt.type === 'If') {
                    if (this.truthy(this.evalExpr(stmt.cond, env))) {
                        const nested = this.findLinearReturn(stmt.thenBlock.body, env, fn, loc);
                        if (nested)
                            return nested;
                        return null;
                    }
                    if (stmt.elseBranch) {
                        const branch = stmt.elseBranch.type === 'If' ? [stmt.elseBranch] : stmt.elseBranch.body;
                        const nested = this.findLinearReturn(branch, env, fn, loc);
                        if (nested)
                            return nested;
                        return null;
                    }
                    continue;
                }
                if (stmt.type === 'VarDecl') {
                    const v = stmt.init ? this.evalExpr(stmt.init, env) : null;
                    env.declare(stmt.name, v, false, this.loc(stmt));
                    continue;
                }
                if (stmt.type === 'ConstDecl') {
                    env.declare(stmt.name, this.evalExpr(stmt.init, env), true, this.loc(stmt));
                    continue;
                }
                if (stmt.type === 'ExprStmt') {
                    this.evalExpr(stmt.expr, env);
                    continue;
                }
                return null;
            }
            return null;
        }
        findSingleDirectSelfCall(node, fn) {
            let found = null;
            const visit = n => {
                if (!n || found === false)
                    return;
                if (n.type === 'Call') {
                    const candidate = { node, call: n };
                    if (found) {
                        found = false;
                        return;
                    }
                    found = candidate;
                    return;
                }
                if (n.type === 'Binary') {
                    visit(n.left);
                    visit(n.right);
                    return;
                }
                if (n.type === 'Unary' || n.type === 'Await') {
                    visit(n.operand);
                    return;
                }
            };
            if (node.type !== 'Binary')
                return null;
            const leftCalls = this.directCallCount(node.left);
            const rightCalls = this.directCallCount(node.right);
            if (leftCalls + rightCalls !== 1)
                return null;
            if (leftCalls === 1 && node.left.type === 'Call')
                return { node, call: node.left, side: 'left' };
            if (rightCalls === 1 && node.right.type === 'Call')
                return { node, call: node.right, side: 'right' };
            return null;
        }
        directCallCount(node) {
            if (!node)
                return 0;
            if (node.type === 'Call')
                return 1;
            if (node.type === 'Binary')
                return this.directCallCount(node.left) + this.directCallCount(node.right);
            return 0;
        }
        applyLinearContinuation(c, value, loc) {
            const l = c.side === 'left' ? value : c.value;
            const r = c.side === 'left' ? c.value : value;
            const node = { type: 'Binary', op: c.op, left: { type: 'Number', value: l }, right: { type: 'Number', value: r }, line: loc.line, column: loc.column };
            return this.applyBinaryValues(c.op, l, r, loc);
        }
        applyBinaryValues(op, l, r, loc = {}) {
            if (op === '+') {
                if (typeof l === 'string' || typeof r === 'string')
                    return this.stringify(l) + this.stringify(r);
                if (Array.isArray(l) && Array.isArray(r))
                    return l.concat(r);
                if (typeof l === 'number' && typeof r === 'number')
                    return l + r;
                throw err.TypeError('لا يمكن جمع هذه القيم', loc);
            }
            if (['-', '*', '/', '%'].includes(op)) {
                if (typeof l !== 'number' || typeof r !== 'number')
                    throw err.TypeError(`العملية '${op}' تحتاج أرقامًا`, loc);
                if ((op === '/' || op === '%') && r === 0)
                    throw err.RuntimeError(op === '/' ? 'القسمة على صفر' : 'لا يمكن حساب باقي القسمة على صفر', loc);
                if (op === '-')
                    return l - r;
                if (op === '*')
                    return l * r;
                if (op === '/')
                    return l / r;
                return l % r;
            }
            if (op === '==')
                return this.equals(l, r);
            if (op === '!=')
                return !this.equals(l, r);
            if (['<', '>', '<=', '>='].includes(op)) {
                if (typeof l !== typeof r || (typeof l !== 'number' && typeof l !== 'string'))
                    throw err.TypeError('لا يمكن المقارنة بين هذه القيم', loc);
                return op === '<' ? l < r : op === '>' ? l > r : op === '<=' ? l <= r : l >= r;
            }
            throw err.RuntimeError(`عملية غير معروفة: '${op}'`, loc);
        }
        callValue(callee, args, loc = {}) {
            if (callee && callee.__native) {
                const result = callee.call(args);
                return result === undefined ? null : result;
            }
            if (callee instanceof DhadFunction && callee.decl.async)
                return this.callValueAsync(callee, args, loc);
            if (!(callee instanceof DhadFunction))
                throw err.TypeError('القيمة ليست دالة قابلة للاستدعاء', loc);
            const linear = this.callLinearRecursive(callee, args, loc);
            if (linear.handled)
                return linear.value;
            let current = callee, currentArgs = args, tailDepth = 0;
            while (current instanceof DhadFunction) {
                const params = current.decl.params;
                if (currentArgs.length !== params.length)
                    throw err.ArgumentError(`الدالة '${current.decl.name}' تحتاج ${params.length} وسيطًا لكن استُقبل ${currentArgs.length}`, loc);
                tailDepth++;
                if (tailDepth > this.maxCallDepth)
                    throw err.RuntimeError(`تجاوز عمق الاستدعاءات المتداخلة الحد الأقصى (${this.maxCallDepth}) — يبدو أن الدالة '${current.decl.name}' تستدعي نفسها بلا نهاية (استدعاء ذاتي recursion بلا حالة توقف واضحة)`, loc);
                const fnEnv = new Environment(current.closure);
                params.forEach((p, i) => fnEnv.declare(typeof p === 'string' ? p : p.name, currentArgs[i]));
                if (this.callDepth >= Math.min(this.maxCallDepth, this.maxNativeCallDepth)) {
                    throw err.RuntimeError(`تجاوز عمق الاستدعاءات المتداخلة الآمن للمفسر (${this.maxNativeCallDepth}) — الدالة '${current.decl.name}' وصلت إلى الحد الآمن للاستدعاءات غير الذيلية. الحد المنطقي العام هو ${this.maxCallDepth}.`, loc);
                }
                this.callDepth++;
                this.callStack.push({ name: current.decl.name, line: current.decl.line, column: current.decl.column });
                try {
                    try {
                        this.execBlockStmts(current.decl.body.body, fnEnv);
                        return null;
                    }
                    catch (sig) {
                        if (sig instanceof ReturnSignal)
                            return sig.value;
                        if (sig instanceof TailCallSignal) {
                            current = sig.callee;
                            currentArgs = sig.args;
                            continue;
                        }
                        if (sig instanceof RangeError && CALL_STACK_RE.test(sig.message || ''))
                            throw err.RuntimeError(`تجاوز عمق الاستدعاءات المتداخلة الحد الأقصى (${this.maxCallDepth}) — يبدو أن الدالة '${current.decl.name}' تستدعي نفسها بلا نهاية (استدعاء ذاتي recursion بلا حالة توقف واضحة)`, sig.loc || loc);
                        if (sig && sig instanceof Error) {
                            sig.stackTrace = Array.isArray(sig.stackTrace) ? sig.stackTrace : [];
                            sig.stackTrace = [...sig.stackTrace, ...this.callStack.slice().reverse()];
                        }
                        throw sig;
                    }
                }
                finally {
                    this.callStack.pop();
                    this.callDepth--;
                }
            }
            return null;
        }
        evalMarkup(node, env) {
            const props = new DhadObject();
            for (const p of node.props)
                props.fields.set(p.key, this.evalExpr(p.value, env));
            const children = node.children.map(c => this.evalExpr(c, env));
            const existing = (() => { try {
                return env.get(node.name, this.loc(node));
            }
            catch (_) {
                return null;
            } })();
            if (existing && (existing instanceof DhadFunction || (existing && existing.__native))) {
                if (existing instanceof DhadFunction && existing.__dhadComponent) {
                    const args = existing.decl.params.length >= 2 ? [props, children] : [props];
                    return this.callValue(existing, args, this.loc(node));
                }
                if (existing.__dhadComponent)
                    return this.callValue(existing, [props, children], this.loc(node));
            }
            const jsProps = this.runtime.toJS(props);
            const key = jsProps.key ?? jsProps.مفاتيح ?? null;
            if (key !== null)
                delete jsProps.key;
            delete jsProps.مفاتيح;
            return new VNode(node.name, jsProps, children, key);
        }
        async callValueAsync(callee, args, loc = {}) {
            if (callee && callee.__native) {
                const result = callee.call(args);
                return result && typeof result.then === 'function' ? await result : (result === undefined ? null : result);
            }
            if (!(callee instanceof DhadFunction))
                throw err.TypeError('القيمة ليست دالة قابلة للاستدعاء', loc);
            const params = callee.decl.params;
            if (args.length !== params.length)
                throw err.ArgumentError(`الدالة '${callee.decl.name}' تحتاج ${params.length} وسيطًا لكن استُقبل ${args.length}`, loc);
            if (this.callDepth >= Math.min(this.maxCallDepth, this.maxNativeCallDepth))
                throw err.RuntimeError(`تجاوز عمق الاستدعاءات المتداخلة الآمن للمفسر (${this.maxNativeCallDepth}) — الدالة '${callee.decl.name}' وصلت إلى الحد الآمن للاستدعاءات غير الذيلية. الحد المنطقي العام هو ${this.maxCallDepth}.`, loc);
            const fnEnv = new Environment(callee.closure);
            params.forEach((p, i) => fnEnv.declare(typeof p === 'string' ? p : p.name, args[i]));
            this.callDepth++;
            this.callStack.push({ name: callee.decl.name, line: callee.decl.line, column: callee.decl.column });
            try {
                await this.execBlockStmtsAsync(callee.decl.body.body, fnEnv);
                return null;
            }
            catch (sig) {
                if (sig instanceof ReturnSignal)
                    return await this.resolveAsync(sig.value);
                throw sig;
            }
            finally {
                this.callStack.pop();
                this.callDepth--;
            }
        }
        async resolveAsync(v) { return v && typeof v.then === 'function' ? await v : v; }
        async evalExprAsync(node, env) {
            if (!node)
                return null;
            if (node.type === 'Await')
                return await this.resolveAsync(await this.evalExprAsync(node.operand, env));
            if (node.type === 'Call') {
                const callee = await this.evalExprAsync(node.callee, env);
                const args = [];
                for (const a of node.args)
                    args.push(await this.evalExprAsync(a, env));
                return await this.resolveAsync(this.callValue(callee, args, this.loc(node)));
            }
            if (node.type === 'Markup') {
                const props = new DhadObject();
                for (const p of node.props)
                    props.fields.set(p.key, await this.evalExprAsync(p.value, env));
                const children = [];
                for (const c of node.children)
                    children.push(await this.evalExprAsync(c, env));
                const existing = (() => { try {
                    return env.get(node.name, this.loc(node));
                }
                catch (_) {
                    return null;
                } })();
                if (existing && existing instanceof DhadFunction && existing.__dhadComponent)
                    return await this.callValueAsync(existing, existing.decl.params.length >= 2 ? [props, children] : [props], this.loc(node));
                const jsProps = this.runtime.toJS(props);
                const key = jsProps.key ?? jsProps.مفاتيح ?? null;
                if (key !== null)
                    delete jsProps.key;
                delete jsProps.مفاتيح;
                return new VNode(node.name, jsProps, children, key);
            }
            if (node.type === 'Assign') {
                const v = await this.evalExprAsync(node.value, env);
                if (node.target.type === 'Ident')
                    env.set(node.target.name, v, this.loc(node.target));
                else
                    return this.evalExpr(node, env);
                return v;
            }
            return this.evalExpr(node, env);
        }
        async execBlockStmtsAsync(stmts, env) { for (const s of stmts)
            await this.execStatementAsync(s, env); }
        async execStatementAsync(node, env) {
            this.step(this.loc(node));
            switch (node.type) {
                case 'Return': throw new ReturnSignal(node.value ? await this.evalExprAsync(node.value, env) : null);
                case 'VarDecl':
                    env.declare(node.name, node.init ? await this.evalExprAsync(node.init, env) : null, false, this.loc(node));
                    return;
                case 'ConstDecl':
                    env.declare(node.name, await this.evalExprAsync(node.init, env), true, this.loc(node));
                    return;
                case 'ExprStmt':
                    await this.evalExprAsync(node.expr, env);
                    return;
                case 'Print': {
                    const vals = [];
                    for (const a of node.args)
                        vals.push(this.stringify(await this.evalExprAsync(a, env)));
                    this.onPrint(vals.join(' '));
                    return;
                }
                case 'If': {
                    if (this.truthy(await this.evalExprAsync(node.cond, env)))
                        await this.execBlockStmtsAsync(node.thenBlock.body, new Environment(env));
                    else if (node.elseBranch)
                        await this.execStatementAsync(node.elseBranch, env);
                    return;
                }
                case 'Block':
                    await this.execBlockStmtsAsync(node.body, new Environment(env));
                    return;
                case 'Try': {
                    try {
                        await this.execBlockStmtsAsync(node.tryBlock.body, new Environment(env));
                    }
                    catch (e) {
                        const isSignal = (e instanceof ReturnSignal) || (e instanceof BreakSignal) || (e instanceof ContinueSignal);
                        if (!node.catchBlock || isSignal)
                            throw e;
                        const ce = new Environment(env);
                        if (node.catchName)
                            ce.declare(node.catchName, normalizeError(e));
                        await this.execBlockStmtsAsync(node.catchBlock.body, ce);
                    }
                    finally {
                        if (node.finallyBlock)
                            await this.execBlockStmtsAsync(node.finallyBlock.body, new Environment(env));
                    }
                    return;
                }
                case 'FuncDecl': {
                    const fn = new DhadFunction(node, env);
                    if (node.component)
                        fn.__dhadComponent = true;
                    fn.__dhadAsync = !!node.async;
                    env.declare(node.name, fn, false, this.loc(node));
                    return;
                }
                default: this.execStatement(node, env);
            }
        }
        evalCall(node, env) {
            const callee = this.evalExpr(node.callee, env);
            const args = node.args.map(a => this.evalExpr(a, env));
            try {
                return this.callValue(callee, args, this.loc(node));
            }
            catch (e) {
                if (e.line === undefined) {
                    e.line = node.line;
                    e.column = node.column;
                }
                throw e;
            }
        }
        checkIndex(obj, idx, loc) { return this.runtime.index(obj, idx, loc); }
        truthy(v) { return this.runtime.truthy(v); }
        equals(a, b) { return this.runtime.equals(a, b); }
        stringify(v) { return this.runtime.stringify(v); }
    }
    'use strict';
    function esc(v) { return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    function attrs(runtime, value) {
        if (!value)
            return '';
        const o = runtime.toJS(value) || {};
        return Object.entries(o).filter(([k, v]) => v !== null && v !== undefined && v !== false).map(([k, v]) => ` ${k}="${esc(v === true ? '' : v)}"`).join('');
    }
    function tag(runtime, name, content = '', attributes = null) {
        const n = String(name).trim();
        if (!/^[A-Za-z][A-Za-z0-9:-]*$/.test(n))
            throw err.ArgumentError('اسم عنصر HTML غير صالح');
        const voids = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
        const a = attrs(runtime, attributes);
        if (voids.has(n.toLowerCase()))
            return `<${n}${a}>`;
        return `<${n}${a}>${content == null ? '' : String(content)}</${n}>`;
    }
    function dom(runtime, name) {
        if (typeof document === 'undefined')
            throw err.RuntimeError(`${name}() يتطلب بيئة متصفح`);
    }
    function makeState(runtime, initial) {
        const state = createState(initial);
        const fields = {
            قيمة: runtime.native(() => state.get(), { name: 'قيمة', min: 0, max: 0 }),
            غيّر: runtime.native(([v]) => state.set(v), { name: 'غيّر', min: 1, max: 1 }),
            حدّث: runtime.native(([fn]) => state.update(v => runtime.callValue(fn, [v])), { name: 'حدّث', min: 1, max: 1 }),
            اشترك: runtime.native(([fn]) => state.subscribe((v, old) => runtime.callValue(fn, [v, old])), { name: 'اشترك', min: 1, max: 1 }),
            الحالة: state
        };
        return new DhadModule('حالة', new Map(Object.entries(fields)), { readonly: true, api: runtime.apiVersion });
    }
    function makeRouter(runtime) {
        const routes = [];
        const win = runtime.domWindow || (typeof window !== 'undefined' ? window : null);
        const doc = runtime.domDocument || (typeof document !== 'undefined' ? document : null);
        const loc = win?.location || (typeof location !== 'undefined' ? location : { pathname: '/', search: '' });
        const hist = win?.history || (typeof history !== 'undefined' ? history : null);
        let started = false;
        let currentPath = '';
        const normalizePath = path => { try {
            return decodeURIComponent(String(path));
        }
        catch (_) {
            return String(path);
        } };
        const match = path => { path = normalizePath(path); return routes.find(r => r.path === path || (r.path === '*') || (r.path.endsWith('*') && path.startsWith(r.path.slice(0, -1)))); };
        const invokeRoute = (handler, path) => { const n = handler && handler.decl && Array.isArray(handler.decl.params) ? handler.decl.params.length : null; return runtime.callValue(handler, n === 0 ? [] : [path]); };
        const navigate = path => {
            dom(runtime, 'موجه.انتقل');
            const target = String(path);
            if (loc.pathname + loc.search !== target)
                hist.pushState({}, '', target);
            currentPath = target;
            const r = match(loc.pathname);
            if (r)
                return invokeRoute(r.handler, target);
            return null;
        };
        const fields = {
            أضف: runtime.native(([path, handler]) => { routes.push({ path: String(path), handler }); return null; }, { name: 'أضف', min: 2, max: 2 }),
            انتقل: runtime.native(([path]) => navigate(path), { name: 'انتقل', min: 1, max: 1 }),
            مسار: runtime.native(() => currentPath || loc.pathname, { name: 'مسار', min: 0, max: 0 }),
            بدأ: runtime.native(() => started, { name: 'بدأ', min: 0, max: 0 }),
            تشغيل: runtime.native(() => { if (!started) {
                started = true;
                currentPath = loc.pathname;
                win?.addEventListener?.('popstate', () => { currentPath = loc.pathname; const r = match(currentPath); if (r)
                    invokeRoute(r.handler, currentPath); });
                const r = match(currentPath);
                if (r)
                    invokeRoute(r.handler, currentPath);
            } return null; }, { name: 'تشغيل', min: 0, max: 0 }),
            رابط: runtime.native(([path, label]) => { const a = doc.createElement('a'); a.href = String(path); a.textContent = String(label ?? path); a.addEventListener('click', e => { if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                navigate(path);
            } }); return a; }, { name: 'رابط', min: 1, max: 2 })
        };
        return new DhadModule('موجه', new Map(Object.entries(fields)), { readonly: true, api: runtime.apiVersion });
    }
    function lazy(runtime, loader) {
        if (typeof loader !== 'function' && !(loader && loader.__native))
            throw err.TypeError('تحميل() تحتاج دالة تحميل');
        let promise = null;
        return runtime.native(() => { if (!promise)
            promise = Promise.resolve(runtime.callValue(loader, [])); return promise; }, { name: 'تحميل', min: 0, max: 0 });
    }
    function chunk(runtime, url) {
        dom(runtime, 'تحميل_حزمة');
        runtime.requireCapability('network');
        const raw = String(url || '').trim();
        let parsed;
        try {
            const base = runtime.domWindow?.location?.href || (typeof location !== 'undefined' ? location.href : 'https://dhad.local/');
            parsed = new URL(raw, base);
        }
        catch (_) {
            throw err.TypeError('تحميل_حزمة() تحتاج رابطًا صالحًا');
        }
        if (!['https:', 'http:'].includes(parsed.protocol))
            throw err.PermissionError('تحميل_حزمة() تسمح فقط بوحدات HTTP/HTTPS مع صلاحية الشبكة');
        let promise = null;
        return runtime.native(() => {
            if (!promise)
                promise = import(parsed.href).then(m => m.default ?? m);
            return promise;
        }, { name: 'تحميل_حزمة', min: 0, max: 0 });
    }
    function buildWeb(runtime) {
        const doc = runtime.domDocument || (typeof document !== 'undefined' ? document : null);
        const win = runtime.domWindow || (typeof window !== 'undefined' ? window : null);
        const nav = typeof navigator !== 'undefined' ? navigator : null;
        const loc = win?.location || (typeof location !== 'undefined' ? location : null);
        const hist = win?.history || (typeof history !== 'undefined' ? history : null);
        const native = (fn, name, min = 0, max = null) => runtime.native(fn, { name, min, max });
        const fields = {
            نص: native(([v]) => new SafeText(v), 'نص', 1, 1),
            خام: native(([v]) => new TrustedHTML(v), 'خام', 1, 1),
            VNode: native(([v]) => v, 'VNode', 1, 1),
            مكوّن: native(([name, renderFn, propsSchema]) => createComponent(name, renderFn, runtime.toJS(propsSchema) || null), 'مكوّن', 2, 3),
            إلى_HTML: native(([v]) => vnodeToHTML(v), 'إلى_HTML', 1, 1),
            تصيير: native(([v, root]) => { dom(runtime, 'تصيير'); if (!root)
                throw err.TypeError('تصيير() تحتاج عنصر جذر'); runtime.__renderer = runtime.__renderer || new Renderer(doc, runtime); return runtime.__renderer.render(v, root); }, 'تصيير', 2, 2),
            ترطيب: native(([v, root]) => { dom(runtime, 'ترطيب'); if (!root)
                throw err.TypeError('ترطيب() تحتاج عنصر جذر'); runtime.__renderer = runtime.__renderer || new Renderer(doc, runtime); return runtime.__renderer.hydrate(v, root); }, 'ترطيب', 2, 2),
            حالة: native(([initial]) => makeState(runtime, initial), 'حالة', 0, 1),
            موجه: native(() => makeRouter(runtime), 'موجه', 0, 0),
            تحميل: native(([loader]) => lazy(runtime, loader), 'تحميل', 1, 1),
            تحميل_حزمة: native(([url]) => chunk(runtime, url), 'تحميل_حزمة', 1, 1),
            فك_الربط: native(([root]) => { dom(runtime, 'فك_الربط'); if (runtime.__renderer)
                runtime.__renderer.unmount(root); return null; }, 'فك_الربط', 1, 1),
            تطبيق_CSS: native(([sheet, scope]) => { dom(runtime, 'تطبيق_CSS'); const css = sheet instanceof CSSStyleSheetModel ? sheet.toString(sheet.options?.scope || '') : String(sheet); if (/@import\s+|url\s*\(/i.test(css))
                runtime.requireCapability('network'); const id = String(scope || 'dhad-style').replace(/[^\u0600-\u06FFA-Za-z0-9_-]/g, '-'); let el = doc.querySelector(`style[data-dhad-style=\"${id}\"]`); if (!el) {
                el = doc.createElement('style');
                el.setAttribute('data-dhad-style', id);
                doc.head.appendChild(el);
            } el.textContent = css; return el; }, 'تطبيق_CSS', 1, 2),
            عنصر: native(([name, content, attributes]) => tag(runtime, name, content, attributes), 'عنصر', 1, 3),
            صفحة: native(([title, body, attributes]) => { const a = runtime.toJS(attributes) || {}; const lang = a.lang || a.لغة || 'ar'; const dir = a.dir || a.اتجاه || 'rtl'; delete a.lang; delete a.dir; delete a.لغة; delete a.اتجاه; return `<!doctype html><html lang="${esc(lang)}" dir="${esc(dir)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head><body${attrs(runtime, a)}>${body || ''}</body></html>`; }, 'صفحة', 2, 3),
            رأس_صفحة: native(([title, content, attributes]) => `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>${content || ''}</head>`, 'رأس_صفحة', 2, 3),
            وصف_صفحة: native(([text]) => tag(runtime, 'meta', '', { name: 'description', content: text }), 'وصف_صفحة', 1, 1),
            رابط: native(([href, text, attributes]) => tag(runtime, 'a', esc(text), Object.assign({}, runtime.toJS(attributes) || {}, { href })), 'رابط', 2, 3),
            صورة: native(([src, alt, attributes]) => tag(runtime, 'img', '', Object.assign({}, runtime.toJS(attributes) || {}, { src, alt: alt || '' })), 'صورة', 2, 3),
            زر: native(([text, attributes]) => tag(runtime, 'button', esc(text), attributes), 'زر', 1, 2),
            رابط_خارجي: native(([href, text, attributes]) => tag(runtime, 'a', esc(text), Object.assign({}, runtime.toJS(attributes) || {}, { href, target: '_blank', rel: 'noopener noreferrer' })), 'رابط_خارجي', 2, 3),
            إدخال: native(([type, name, attributes]) => tag(runtime, 'input', '', Object.assign({}, runtime.toJS(attributes) || {}, { type: type || 'text', name: name || '' })), 'إدخال', 0, 3),
            اختيار: native(([name, options, attributes]) => { if (!Array.isArray(options))
                throw err.TypeError('ويب.اختيار() تحتاج قائمة'); const opts = options.map(x => { const o = runtime.toJS(x); if (o && typeof o === 'object' && !Array.isArray(o))
                return tag(runtime, 'option', esc(o.label ?? o.نص ?? o.value ?? o.قيمة), { value: o.value ?? o.قيمة ?? '' }); return tag(runtime, 'option', esc(x), { value: x }); }).join(''); return tag(runtime, 'select', opts, Object.assign({}, runtime.toJS(attributes) || {}, { name })); }, 'اختيار', 2, 3),
            نموذج: native(([content, attributes]) => tag(runtime, 'form', content, attributes), 'نموذج', 1, 2),
            جدول: native(([headers, rows, attributes]) => { if (!Array.isArray(headers) || !Array.isArray(rows))
                throw err.TypeError('ويب.جدول() تحتاج قائمة عناوين وقائمة صفوف'); const head = tag(runtime, 'thead', tag(runtime, 'tr', headers.map(x => tag(runtime, 'th', esc(x))).join(''))); const body = tag(runtime, 'tbody', rows.map(r => tag(runtime, 'tr', (Array.isArray(r) ? r : []).map(x => tag(runtime, 'td', esc(x))).join(''))).join('')); return tag(runtime, 'table', head + body, attributes); }, 'جدول', 2, 3),
            فيديو: native(([src, attributes]) => tag(runtime, 'video', '', Object.assign({}, runtime.toJS(attributes) || {}, { src, controls: true })), 'فيديو', 1, 2),
            صوت: native(([src, attributes]) => tag(runtime, 'audio', '', Object.assign({}, runtime.toJS(attributes) || {}, { src, controls: true })), 'صوت', 1, 2),
            نمط: native(([css]) => tag(runtime, 'style', css || ''), 'نمط', 1, 1),
            سكربت: native(([js, attributes]) => tag(runtime, 'script', js || '', attributes), 'سكربت', 1, 2),
            سكربت_خارجي: native(([src, attributes]) => tag(runtime, 'script', '', Object.assign({}, runtime.toJS(attributes) || {}, { src, defer: true })), 'سكربت_خارجي', 1, 2),
            رابط_نمط: native(([href, attributes]) => tag(runtime, 'link', '', Object.assign({}, runtime.toJS(attributes) || {}, { rel: 'stylesheet', href })), 'رابط_نمط', 1, 2),
            أيقونة: native(([href, type]) => tag(runtime, 'link', '', { rel: 'icon', href, type: type || 'image/svg+xml' }), 'أيقونة', 1, 2),
            مجموعة: native(([items, separator]) => Array.isArray(items) ? items.join(separator === undefined ? '' : String(separator)) : String(items), 'مجموعة', 1, 2),
            تركيب: native(([parts]) => Array.isArray(parts) ? parts.join('') : String(parts ?? ''), 'تركيب', 1, 1),
            رئيسية: native(([content, attributes]) => tag(runtime, 'main', content, attributes), 'رئيسية', 1, 2),
            رأس: native(([content, attributes]) => tag(runtime, 'header', content, attributes), 'رأس', 1, 2),
            تذييل: native(([content, attributes]) => tag(runtime, 'footer', content, attributes), 'تذييل', 1, 2),
            تنقل: native(([content, attributes]) => tag(runtime, 'nav', content, attributes), 'تنقل', 1, 2),
            قسم: native(([content, attributes]) => tag(runtime, 'section', content, attributes), 'قسم', 1, 2),
            مقال: native(([content, attributes]) => tag(runtime, 'article', content, attributes), 'مقال', 1, 2),
            شريط: native(([content, attributes]) => tag(runtime, 'aside', content, attributes), 'شريط', 1, 2),
            حاوية_رئيسية: native(([content, attributes]) => tag(runtime, 'div', content, Object.assign({ class: 'dhad-container' }, runtime.toJS(attributes) || {})), 'حاوية_رئيسية', 1, 2),
            قائمة: native(([items, attributes]) => tag(runtime, 'ul', Array.isArray(items) ? items.map(x => tag(runtime, 'li', String(x))).join('') : '', attributes), 'قائمة', 1, 2),
            قائمة_مرقمة: native(([items, attributes]) => tag(runtime, 'ol', Array.isArray(items) ? items.map(x => tag(runtime, 'li', String(x))).join('') : '', attributes), 'قائمة_مرقمة', 1, 2),
            اقتباس: native(([text, cite, attributes]) => tag(runtime, 'blockquote', esc(text) + (cite ? tag(runtime, 'cite', esc(cite)) : ''), attributes), 'اقتباس', 1, 3),
            تفاصيل: native(([summary, content, open]) => tag(runtime, 'details', tag(runtime, 'summary', esc(summary)) + (content || ''), open ? { open: true } : null), 'تفاصيل', 2, 3),
            فاصل: native(() => '<hr>', 'فاصل', 0, 0),
            استعلام: native(([selector]) => { dom(runtime, 'استعلام'); return doc.querySelector(String(selector)) || null; }, 'استعلام', 1, 1),
            عناصر: native(([selector]) => { dom(runtime, 'عناصر'); return Array.from(doc.querySelectorAll(String(selector))); }, 'عناصر', 1, 1),
            نص_عنصر: native(([el]) => { if (!el || typeof el.textContent === 'undefined')
                throw err.TypeError('نص_عنصر() تحتاج عنصر DOM'); return el.textContent; }, 'نص_عنصر', 1, 1),
            ضبط_نص: native(([el, text]) => { if (!el || typeof el.textContent === 'undefined')
                throw err.TypeError('ضبط_نص() تحتاج عنصر DOM'); el.textContent = String(text); return el; }, 'ضبط_نص', 2, 2),
            HTML: native(([el]) => { if (!el || typeof el.innerHTML === 'undefined')
                throw err.TypeError('HTML() تحتاج عنصر DOM'); return el.innerHTML; }, 'HTML', 1, 1),
            ضبط_HTML: native(([el, html]) => { if (!el || typeof el.innerHTML === 'undefined')
                throw err.TypeError('ضبط_HTML() تحتاج عنصر DOM'); if (!(html instanceof TrustedHTML))
                throw err.TypeError('ضبط_HTML() تحتاج TrustedHTML؛ استخدم ويب.خام(...) صراحةً للـHTML الخام.'); el.innerHTML = html.value; return el; }, 'ضبط_HTML', 2, 2),
            إضافة: native(([el, html]) => { if (!el || typeof el.insertAdjacentHTML !== 'function')
                throw err.TypeError('إضافة() تحتاج عنصر DOM'); if (!(html instanceof TrustedHTML))
                throw err.TypeError('إضافة() تحتاج TrustedHTML؛ استخدم ويب.خام(...) صراحةً.'); el.insertAdjacentHTML('beforeend', html.value); return el; }, 'إضافة', 2, 2),
            حذف: native(([el]) => { if (!el || typeof el.remove !== 'function')
                throw err.TypeError('حذف() تحتاج عنصر DOM'); el.remove(); return null; }, 'حذف', 1, 1),
            صنف_إضافة: native(([el, name]) => { if (!el?.classList)
                throw err.TypeError('صنف_إضافة() تحتاج عنصر DOM'); el.classList.add(String(name)); return el; }, 'صنف_إضافة', 2, 2),
            صنف_إزالة: native(([el, name]) => { if (!el?.classList)
                throw err.TypeError('صنف_إزالة() تحتاج عنصر DOM'); el.classList.remove(String(name)); return el; }, 'صنف_إزالة', 2, 2),
            صنف_تبديل: native(([el, name]) => { if (!el?.classList)
                throw err.TypeError('صنف_تبديل() تحتاج عنصر DOM'); el.classList.toggle(String(name)); return el; }, 'صنف_تبديل', 2, 2),
            خاصية: native(([el, name, value]) => { if (!el?.style)
                throw err.TypeError('خاصية() تحتاج عنصر DOM'); const v = String(value); if (/@import\s+|url\s*\(/i.test(v))
                runtime.requireCapability('network'); el.style.setProperty(String(name), v); return el; }, 'خاصية', 3, 3),
            سمة: native(([el, name, value]) => { if (!el?.setAttribute)
                throw err.TypeError('سمة() تحتاج عنصر DOM'); if (value === null || value === undefined)
                el.removeAttribute(String(name));
            else
                el.setAttribute(String(name), String(value)); return el; }, 'سمة', 2, 3),
            قيمة_سمة: native(([el, name]) => { if (!el?.getAttribute)
                throw err.TypeError('قيمة_سمة() تحتاج عنصر DOM'); return el.getAttribute(String(name)); }, 'قيمة_سمة', 2, 2),
            إنشاء: native(([name]) => { dom(runtime, 'إنشاء'); assertSafeDOMTag(name); return doc.createElement(String(name)); }, 'إنشاء', 1, 1),
            إضافة_للصفحة: native(([el, target]) => { dom(runtime, 'إضافة_للصفحة'); const parent = target || doc.body; if (!parent?.appendChild)
                throw err.TypeError('الهدف ليس عنصر DOM'); parent.appendChild(el); return el; }, 'إضافة_للصفحة', 1, 2),
            حدث: native(([el, event, handler]) => { if (!el?.addEventListener)
                throw err.TypeError('حدث() تحتاج عنصر DOM'); if (!runtime.isCallable(handler))
                throw err.TypeError('معالج الحدث يجب أن يكون دالة'); el.addEventListener(String(event), e => runtime.callValue(handler, [runtime.normalize({ type: e.type, target: e.target, currentTarget: e.currentTarget })])); return el; }, 'حدث', 3, 3),
            جاهز: native(([handler]) => { dom(runtime, 'جاهز'); if (!runtime.isCallable(handler))
                throw err.TypeError('جاهز() تحتاج دالة'); if (doc.readyState === 'loading')
                doc.addEventListener('DOMContentLoaded', () => runtime.callValue(handler, []), { once: true });
            else
                runtime.callValue(handler, []); return null; }, 'جاهز', 1, 1),
            منع_الافتراضي: native(([event]) => { if (!event?.preventDefault)
                throw err.TypeError('منع_الافتراضي() تحتاج حدثًا'); event.preventDefault(); return null; }, 'منع_الافتراضي', 1, 1),
            إيقاف_الانتشار: native(([event]) => { if (!event?.stopPropagation)
                throw err.TypeError('إيقاف_الانتشار() تحتاج حدثًا'); event.stopPropagation(); return null; }, 'إيقاف_الانتشار', 1, 1),
            تخزين_محلي: native(([key, value]) => { runtime.requireCapability('storage'); dom(runtime, 'تخزين_محلي'); if (value === undefined || value === null)
                return localStorage.getItem(String(key)); localStorage.setItem(String(key), String(value)); return value; }, 'تخزين_محلي', 1, 2),
            حذف_محلي: native(([key]) => { runtime.requireCapability('storage'); dom(runtime, 'حذف_محلي'); localStorage.removeItem(String(key)); return null; }, 'حذف_محلي', 1, 1),
            طلب: native(([url, options]) => { runtime.requireCapability('network'); if (typeof fetch !== 'function')
                throw err.RuntimeError('ويب.طلب() يحتاج fetch في المتصفح'); const o = runtime.toJS(options) || {}; return fetch(String(url), o).then(async (r) => runtime.normalize({ status: r.status, ok: r.ok, url: r.url, headers: Object.fromEntries(r.headers.entries()), body: await r.text() })); }, 'طلب', 1, 2),
            طلب_JSON: native(([url, options]) => { runtime.requireCapability('network'); if (typeof fetch !== 'function')
                throw err.RuntimeError('ويب.طلب_JSON() يحتاج fetch في المتصفح'); const o = runtime.toJS(options) || {}; return fetch(String(url), o).then(async (r) => { const text = await r.text(); let body = null; try {
                body = text ? JSON.parse(text) : null;
            }
            catch (_) {
                throw err.RuntimeError(`الاستجابة ليست JSON صالحًا (HTTP ${r.status})`);
            } return runtime.normalize({ status: r.status, ok: r.ok, url: r.url, headers: Object.fromEntries(r.headers.entries()), body }); }); }, 'طلب_JSON', 1, 2),
            إرسال_JSON: native(([url, data, options]) => { runtime.requireCapability('network'); if (typeof fetch !== 'function')
                throw err.RuntimeError('ويب.إرسال_JSON() يحتاج fetch في المتصفح'); const o = runtime.toJS(options) || {}; const headers = Object.assign({ 'Content-Type': 'application/json' }, o.headers || {}); return fetch(String(url), Object.assign({}, o, { method: o.method || 'POST', headers, body: JSON.stringify(runtime.toJS(data)) })).then(async (r) => { const text = await r.text(); let body = null; try {
                body = text ? JSON.parse(text) : text;
            }
            catch (_) {
                body = text;
            } return runtime.normalize({ status: r.status, ok: r.ok, url: r.url, headers: Object.fromEntries(r.headers.entries()), body }); }); }, 'إرسال_JSON', 2, 3),
            تخزين_كائن: native(([key, value]) => { runtime.requireCapability('storage'); dom(runtime, 'تخزين_كائن'); const k = String(key); if (value === undefined || value === null) {
                const raw = localStorage.getItem(k);
                if (raw === null)
                    return null;
                try {
                    return runtime.normalize(JSON.parse(raw));
                }
                catch (_) {
                    return null;
                }
            } const js = runtime.toJS(value); localStorage.setItem(k, JSON.stringify(js)); return value; }, 'تخزين_كائن', 1, 2),
            عنوان: native(() => { dom(runtime, 'عنوان'); return win.loc.href; }, 'عنوان', 0, 0),
            استعلام_URL: native(([key]) => { dom(runtime, 'استعلام_URL'); return new URLSearchParams(win.loc.search).get(String(key)); }, 'استعلام_URL', 1, 1),
            تغيير_العنوان: native(([url]) => { runtime.requireCapability('navigation'); dom(runtime, 'تغيير_العنوان'); hist.replaceState({}, '', String(url)); return String(url); }, 'تغيير_العنوان', 1, 1),
            انتقال: native(([url]) => { runtime.requireCapability('navigation'); dom(runtime, 'انتقال'); win.loc.assign(String(url)); return null; }, 'انتقال', 1, 1),
            تأخير: native(([ms]) => new Promise(resolve => setTimeout(resolve, Math.max(0, Number(ms) || 0))), 'تأخير', 1, 1),
            تخزين_جلسة: native(([key, value]) => { runtime.requireCapability('storage'); dom(runtime, 'تخزين_جلسة'); const k = String(key); if (value === undefined || value === null)
                return sessionStorage.getItem(k); sessionStorage.setItem(k, String(value)); return value; }, 'تخزين_جلسة', 1, 2),
            حذف_جلسة: native(([key]) => { runtime.requireCapability('storage'); dom(runtime, 'حذف_جلسة'); sessionStorage.removeItem(String(key)); return null; }, 'حذف_جلسة', 1, 1),
            تخفيض_الحدث: native(([handler, ms]) => { if (!runtime.isCallable(handler))
                throw err.TypeError('تخفيض_الحدث() تحتاج دالة'); let timer = null; return runtime.native(args => { clearTimeout(timer); timer = setTimeout(() => runtime.callValue(handler, args), Math.max(0, Number(ms) || 0)); return null; }, { name: 'معالج_مخفض', min: 0 }); }, 'تخفيض_الحدث', 2, 2),
            WebSocket: native(([url]) => { runtime.requireCapability('network'); dom(runtime, 'WebSocket'); let u; try {
                u = new URL(String(url), loc.href);
            }
            catch (_) {
                throw err.TypeError('WebSocket() تحتاج رابطًا صالحًا');
            } if (!['ws:', 'wss:'].includes(u.protocol))
                throw err.PermissionError('WebSocket() تسمح فقط بروابط ws/wss'); return new WebSocket(u.href); }, 'WebSocket', 1, 1),
            عامل: native(([script]) => { dom(runtime, 'عامل'); return new Worker(String(script)); }, 'عامل', 1, 1),
            رسم_لوحة: native(([canvas]) => { dom(runtime, 'رسم_لوحة'); if (!canvas?.getContext)
                throw err.TypeError('رسم_لوحة() تحتاج canvas'); return canvas.getContext('2d'); }, 'رسم_لوحة', 1, 1),
        };
        fields.استماع = native(([el, event, handler, options]) => { if (!el?.addEventListener)
            throw err.TypeError('استماع() تحتاج عنصر DOM'); if (!runtime.isCallable(handler))
            throw err.TypeError('معالج الحدث يجب أن يكون دالة'); const fn = e => runtime.callValue(handler, [runtime.normalize({ type: e.type, target: e.target, currentTarget: e.currentTarget, مفتاح: e.key || null, قيمة: e.target?.value ?? null })]); el.addEventListener(String(event), fn, runtime.toJS(options) || {}); return () => el.removeEventListener(String(event), fn, runtime.toJS(options) || {}); }, 'استماع', 3, 4);
        fields.قياس = native(([el]) => { if (!el?.getBoundingClientRect)
            throw err.TypeError('قياس() تحتاج عنصر DOM'); const r = el.getBoundingClientRect(); return runtime.normalize({ x: r.x, y: r.y, العرض: r.width, الارتفاع: r.height, أعلى: r.top, يمين: r.right, أسفل: r.bottom, يسار: r.left }); }, 'قياس', 1, 1);
        fields.مرر = native(([el, options]) => { if (!el?.scrollIntoView)
            throw err.TypeError('مرر() تحتاج عنصر DOM'); el.scrollIntoView(runtime.toJS(options) || { behavior: 'smooth', block: 'start' }); return el; }, 'مرر', 1, 2);
        fields.تركيز = native(([el]) => { if (!el?.focus)
            throw err.TypeError('تركيز() تحتاج عنصر DOM'); el.focus(); return el; }, 'تركيز', 1, 1);
        fields.قيمة = native(([el, value]) => { if (!el || !('value' in el))
            throw err.TypeError('قيمة() تحتاج عنصر إدخال'); if (value === undefined)
            return el.value; el.value = String(value); return el; }, 'قيمة', 1, 2);
        fields.إظهار = native(([el]) => { if (!el?.style)
            throw err.TypeError('إظهار() تحتاج عنصر DOM'); el.hidden = false; return el; }, 'إظهار', 1, 1);
        fields.إخفاء = native(([el]) => { if (!el?.style)
            throw err.TypeError('إخفاء() تحتاج عنصر DOM'); el.hidden = true; return el; }, 'إخفاء', 1, 1);
        fields.مراقبة_الحجم = native(([el, handler]) => { if (!el || typeof ResizeObserver === 'undefined')
            throw err.RuntimeError('مراقبة_الحجم() تحتاج ResizeObserver'); if (!runtime.isCallable(handler))
            throw err.TypeError('مراقبة_الحجم() تحتاج دالة'); const ro = new ResizeObserver(entries => entries.forEach(e => runtime.callValue(handler, [runtime.normalize({ العرض: e.contentRect.width, الارتفاع: e.contentRect.height, العنصر: e.target })]))); ro.observe(el); return () => ro.disconnect(); }, 'مراقبة_الحجم', 2, 2);
        fields.مراقبة_الرؤية = native(([el, handler, options]) => { if (!el || typeof IntersectionObserver === 'undefined')
            throw err.RuntimeError('مراقبة_الرؤية() تحتاج IntersectionObserver'); if (!runtime.isCallable(handler))
            throw err.TypeError('مراقبة_الرؤية() تحتاج دالة'); const io = new IntersectionObserver(entries => entries.forEach(e => runtime.callValue(handler, [runtime.normalize({ ظاهر: e.isIntersecting, النسبة: e.intersectionRatio, العنصر: e.target })])), runtime.toJS(options) || {}); io.observe(el); return () => io.disconnect(); }, 'مراقبة_الرؤية', 2, 3);
        fields.حفظ = native(([key, value]) => { runtime.requireCapability('storage'); dom(runtime, 'حفظ'); localStorage.setItem('dhad:' + String(key), JSON.stringify(runtime.toJS(value))); return value; }, 'حفظ', 2, 2);
        fields.استرجاع = native(([key, defaultValue]) => { runtime.requireCapability('storage'); dom(runtime, 'استرجاع'); const raw = localStorage.getItem('dhad:' + String(key)); if (raw === null)
            return defaultValue ?? null; try {
            return runtime.normalize(JSON.parse(raw));
        }
        catch (_) {
            return defaultValue ?? null;
        } }, 'استرجاع', 1, 2);
        fields.حذف_حفظ = native(([key]) => { runtime.requireCapability('storage'); dom(runtime, 'حذف_حفظ'); localStorage.removeItem('dhad:' + String(key)); return null; }, 'حذف_حفظ', 1, 1);
        fields.عرض_نافذة = native(([url, target, features]) => { runtime.requireCapability('popup'); dom(runtime, 'عرض_نافذة'); return win.open(String(url || ''), String(target || '_blank'), features ? String(features) : undefined); }, 'عرض_نافذة', 0, 3);
        fields.وقت = native(() => Date.now(), 'وقت', 0, 0);
        fields.إطار = native(([handler]) => { if (!runtime.isCallable(handler))
            throw err.TypeError('إطار() تحتاج دالة'); return requestAnimationFrame(() => runtime.callValue(handler, [Date.now()])); }, 'إطار', 1, 1);
        fields.حذف_إطار = native(([id]) => { cancelAnimationFrame(Number(id)); return null; }, 'حذف_إطار', 1, 1);
        fields.نسخ = native(([text]) => { runtime.requireCapability('clipboard'); if (!nav?.clipboard?.writeText)
            throw err.RuntimeError('نسخ() غير متاح في هذا السياق'); return nav.clipboard.writeText(String(text)); }, 'نسخ', 1, 1);
        fields.طلب_JSON_آمن = native(([url, options, retries]) => { runtime.requireCapability('network'); if (typeof fetch !== 'function')
            throw err.RuntimeError('طلب_JSON_آمن() يحتاج fetch'); const o = runtime.toJS(options) || {}; const n = Math.max(0, Math.floor(Number(retries) || 0)); const run = attempt => fetch(String(url), o).then(async (r) => { const text = await r.text(); let body = null; try {
            body = text ? JSON.parse(text) : null;
        }
        catch (_) {
            body = text;
        } if (!r.ok && attempt < n)
            return new Promise(res => setTimeout(res, Math.min(1000 * 2 ** attempt, 8000))).then(() => run(attempt + 1)); return runtime.normalize({ status: r.status, ok: r.ok, url: r.url, headers: Object.fromEntries(r.headers.entries()), body }); }); return run(0); }, 'طلب_JSON_آمن', 1, 3);
        return new DhadModule('ويب', new Map(Object.entries(fields)), { readonly: true, api: runtime.apiVersion, version: '1.0.0' });
    }
    'use strict';
    function esc(v) { return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    const STYLE_PROP_ALIASES = Object.freeze({
        'لون': 'color', 'لون_نص': 'color', 'لون_النص': 'color', 'خلفية': 'background', 'لون_خلفية': 'background', 'لون_الخلفية': 'background',
        'حواف': 'border-radius', 'تدوير': 'border-radius', 'ظل': 'box-shadow', 'شفافية': 'opacity', 'حجم_الخط': 'font-size', 'وزن_الخط': 'font-weight',
        'محاذاة': 'text-align', 'عرض': 'width', 'ارتفاع': 'height', 'مسافة_داخلية': 'padding', 'مسافة_خارجية': 'margin', 'خط': 'font-family',
        // الأبعاد والحدود القصوى/الدنيا
        'عرض_أقصى': 'max-width', 'عرض_أدنى': 'min-width', 'ارتفاع_أقصى': 'max-height', 'ارتفاع_أدنى': 'min-height',
        // الحدود
        'حد': 'border', 'سمك_الحد': 'border-width', 'نمط_الحد': 'border-style', 'لون_الحد': 'border-color',
        // النص والخط
        'ارتفاع_السطر': 'line-height', 'تباعد_الأسطر': 'line-height', 'تباعد_الأحرف': 'letter-spacing',
        'تحويل_النص': 'text-transform', 'زخرفة_النص': 'text-decoration', 'نمط_الخط': 'font-style',
        'مسافة_بيضاء': 'white-space', 'اتجاه_النص': 'direction', 'محاذاة_عمودية': 'vertical-align',
        // العرض والتموضع
        'عرض_الكتلة': 'display', 'موضع': 'position', 'أعلى': 'top', 'أسفل': 'bottom', 'يمين': 'right', 'يسار': 'left',
        'ترتيب_الطبقة': 'z-index', 'رؤية': 'visibility', 'تجاوز': 'overflow', 'تجاوز_أفقي': 'overflow-x', 'تجاوز_عمودي': 'overflow-y',
        // المؤشر والتفاعل
        'مؤشر': 'cursor', 'تحديد_النص': 'user-select', 'أحداث_المؤشر': 'pointer-events',
        // التحويلات والحركة
        'تحويل': 'transform', 'انتقال': 'transition', 'حركة': 'animation', 'فلتر': 'filter',
        // الخلفية التفصيلية
        'صورة_الخلفية': 'background-image', 'موضع_الخلفية': 'background-position', 'حجم_الخلفية': 'background-size', 'تكرار_الخلفية': 'background-repeat',
        // مرن (Flexbox) وشبكة (Grid)
        'فجوة': 'gap', 'اتجاه_مرن': 'flex-direction', 'محاذاة_العناصر': 'align-items', 'تبرير_المحتوى': 'justify-content',
        'محاذاة_ذاتية': 'align-self', 'نمو_مرن': 'flex-grow', 'انكماش_مرن': 'flex-shrink', 'أساس_مرن': 'flex-basis', 'ترتيب': 'order',
        'أعمدة_الشبكة': 'grid-template-columns', 'صفوف_الشبكة': 'grid-template-rows', 'عمود_الشبكة': 'grid-column', 'صف_الشبكة': 'grid-row',
        // الصور والأشكال
        'ملاءمة_الكائن': 'object-fit', 'نسبة_الأبعاد': 'aspect-ratio'
    });
    function cssName(k) { return String(k).replace(/[A-Z]/g, m => '-' + m.toLowerCase()); }
    function style(runtime, obj) {
        const o = runtime.toJS(obj) || {};
        return Object.entries(o).filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => {
            const key = STYLE_PROP_ALIASES[k] || cssName(k);
            const isColor = /^(color|background|borderColor)$/i.test(key);
            return `${key}:${isColor ? colorValue(v) : v};`;
        }).join('');
    }
    function cls(runtime, obj) { const o = runtime.toJS(obj) || {}; return Object.entries(o).filter(([, v]) => v).map(([k]) => k).join(' '); }
    const DHAD_COLORS = { "أسود": "black", "فضي": "silver", "رمادي": "gray", "رمادي-داكن": "darkgray", "رمادي-فاتح": "lightgray", "رمادي-فحمي": "dimgray", "رمادي-أردوازي": "slategray", "رمادي-أردوازي-داكن": "darkslategray", "رمادي-أردوازي-فاتح": "lightslategray", "أبيض": "white", "عاجي": "ivory", "أبيض-دخاني": "whitesmoke", "أبيض-زهري": "mistyrose", "أبيض-ليموني": "lemonchiffon", "أبيض-وردي": "lavenderblush", "أبيض-زخرفي": "floralwhite", "أبيض-صدفي": "seashell", "أبيض-سماوي": "azure", "أبيض-أخضر": "honeydew", "أبيض-قمحي": "cornsilk", "أحمر": "red", "أحمر-داكن": "darkred", "أحمر-فاتح": "lightcoral", "قرمزي": "crimson", "قرمزي-داكن": "firebrick", "قرمزي-هندي": "indianred", "أحمر-بني": "brown", "أحمر-بنفسجي": "mediumvioletred", "أحمر-أرجواني": "maroon", "طماطمي": "tomato", "مرجاني": "coral", "مرجاني-فاتح": "lightcoral", "سلموني": "salmon", "سلموني-فاتح": "lightsalmon", "سلموني-داكن": "darksalmon", "وردي": "pink", "وردي-فاتح": "lightpink", "وردي-داكن": "deeppink", "وردي-ساخن": "hotpink", "زهري": "hotpink", "فوشيا": "fuchsia", "فوشيا-داكن": "magenta", "أرجواني": "purple", "أرجواني-داكن": "darkmagenta", "أرجواني-فاتح": "plum", "بنفسجي": "rebeccapurple", "بنفسجي-داكن": "indigo", "بنفسجي-متوسط": "mediumpurple", "بنفسجي-فاتح": "lavender", "خزامي": "lavender", "بنفسجي-مزرق": "blueviolet", "أوركيد": "orchid", "أوركيد-داكن": "darkorchid", "أوركيد-متوسط": "mediumorchid", "أوركيد-فاتح": "thistle", "باذنجاني": "indigo", "أزرق": "blue", "أزرق-داكن": "darkblue", "أزرق-فاتح": "lightblue", "أزرق-متوسط": "mediumblue", "أزرق-ملكي": "royalblue", "أزرق-ملكي-فاتح": "cornflowerblue", "أزرق-فولاذي": "steelblue", "أزرق-فولاذي-فاتح": "lightsteelblue", "أزرق-سماء": "skyblue", "أزرق-سماء-فاتح": "lightskyblue", "أزرق-سماوي": "deepskyblue", "أزرق-كاديت": "cadetblue", "أزرق-مسحوق": "powderblue", "أزرق-ليلي": "midnightblue", "كحلي": "navy", "نيلي": "indigo", "سماوي": "cyan", "سماوي-داكن": "darkcyan", "سماوي-فاتح": "lightcyan", "تركوازي": "turquoise", "تركوازي-داكن": "darkturquoise", "تركوازي-فاتح": "paleturquoise", "فيروزي": "aquamarine", "فيروزي-متوسط": "mediumturquoise", "أخضر": "green", "أخضر-داكن": "darkgreen", "أخضر-فاتح": "lightgreen", "أخضر-متوسط": "mediumseagreen", "أخضر-بحري": "seagreen", "أخضر-بحري-داكن": "darkseagreen", "أخضر-بحري-فاتح": "lightseagreen", "أخضر-مائل-للأزرق": "teal", "أخضر-مصفر": "yellowgreen", "أخضر-ليموني": "limegreen", "ليموني": "lime", "ليموني-فاتح": "lawngreen", "ليموني-أصفر": "greenyellow", "زيتوني": "olive", "زيتوني-داكن": "darkolivegreen", "زيتوني-فاتح": "olivedrab", "نعناعي": "mintcream", "نعناعي-متوسط": "mediumaquamarine", "أخضر-ربيعي": "springgreen", "أخضر-ربيعي-متوسط": "mediumspringgreen", "أخضر-غابي": "forestgreen", "أخضر-أصفر": "chartreuse", "تفاحي": "yellowgreen", "أصفر": "yellow", "أصفر-فاتح": "lightyellow", "أصفر-ذهبي": "gold", "ذهبي": "gold", "ذهبي-داكن": "goldenrod", "ذهبي-فاتح": "palegoldenrod", "كاكي": "khaki", "كاكي-فاتح": "lemonchiffon", "أصفر-مائل-للأخضر": "greenyellow", "برتقالي": "orange", "برتقالي-داكن": "darkorange", "برتقالي-أحمر": "orangered", "برتقالي-فاتح": "lightsalmon", "خوخي": "peachpuff", "خوخي-فاتح": "moccasin", "بني": "brown", "بني-فاتح": "tan", "بني-رملي": "sandybrown", "بني-ذهبي": "goldenrod", "بني-شوكولاتي": "chocolate", "شوكولاتي": "chocolate", "بني-داكن": "saddlebrown", "بني-وردي": "rosybrown", "بني-مصفر": "peru", "قمحي": "wheat", "قمحي-فاتح": "blanchedalmond", "بيج": "beige", "رملي": "sandybrown", "أزرق-بنفسجي": "slateblue", "أزرق-بنفسجي-داكن": "darkslateblue", "أرجواني-أزرق": "darkviolet", "شفاف": "transparent" };
    function normalizeColorName(value) {
        const v = String(value ?? '').trim().replace(/[ـ\s]+/g, '-').replace(/-{2,}/g, '-');
        return v;
    }
    function colorValue(value) {
        if (value && typeof value === 'object' && value.value !== undefined)
            value = value.value;
        const v = normalizeColorName(value);
        return DHAD_COLORS[v] || String(value ?? '');
    }
    function hexToRgb(value) {
        const v = String(value).trim();
        const m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (!m)
            return null;
        const h = m[1].length === 3 ? m[1].split('').map(x => x + x).join('') : m[1];
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    const CSS_NAMED_COLOR_HEX = { aquamarine: '#7FFFD4', azure: '#F0FFFF', beige: '#F5F5DC', black: '#000000', blanchedalmond: '#FFEBCD', blue: '#0000FF', blueviolet: '#8A2BE2', brown: '#A52A2A', cadetblue: '#5F9EA0', chartreuse: '#7FFF00', chocolate: '#D2691E', coral: '#FF7F50', cornflowerblue: '#6495ED', cornsilk: '#FFF8DC', crimson: '#DC143C', cyan: '#00FFFF', darkblue: '#00008B', darkcyan: '#008B8B', darkgray: '#A9A9A9', darkgreen: '#006400', darkmagenta: '#8B008B', darkolivegreen: '#556B2F', darkorange: '#FF8C00', darkorchid: '#9932CC', darkred: '#8B0000', darksalmon: '#E9967A', darkseagreen: '#8FBC8F', darkslateblue: '#483D8B', darkslategray: '#2F4F4F', darkturquoise: '#00CED1', darkviolet: '#9400D3', deeppink: '#FF1493', deepskyblue: '#00BFFF', dimgray: '#696969', firebrick: '#B22222', floralwhite: '#FFFAF0', forestgreen: '#228B22', fuchsia: '#FF00FF', gold: '#FFD700', goldenrod: '#DAA520', gray: '#808080', green: '#008000', greenyellow: '#ADFF2F', honeydew: '#F0FFF0', hotpink: '#FF69B4', indianred: '#CD5C5C', indigo: '#4B0082', ivory: '#FFFFF0', khaki: '#F0E68C', lavender: '#E6E6FA', lavenderblush: '#FFF0F5', lawngreen: '#7CFC00', lemonchiffon: '#FFFACD', lightblue: '#ADD8E6', lightcoral: '#F08080', lightcyan: '#E0FFFF', lightgray: '#D3D3D3', lightgreen: '#90EE90', lightpink: '#FFB6C1', lightsalmon: '#FFA07A', lightseagreen: '#20B2AA', lightskyblue: '#87CEFA', lightslategray: '#778899', lightsteelblue: '#B0C4DE', lightyellow: '#FFFFE0', lime: '#00FF00', limegreen: '#32CD32', magenta: '#FF00FF', maroon: '#800000', mediumaquamarine: '#66CDAA', mediumblue: '#0000CD', mediumorchid: '#BA55D3', mediumpurple: '#9370DB', mediumseagreen: '#3CB371', mediumspringgreen: '#00FA9A', mediumturquoise: '#48D1CC', mediumvioletred: '#C71585', midnightblue: '#191970', mintcream: '#F5FFFA', mistyrose: '#FFE4E1', moccasin: '#FFE4B5', navy: '#000080', olive: '#808000', olivedrab: '#6B8E23', orange: '#FFA500', orangered: '#FF4500', orchid: '#DA70D6', palegoldenrod: '#EEE8AA', paleturquoise: '#AFEEEE', peachpuff: '#FFDAB9', peru: '#CD853F', pink: '#FFC0CB', plum: '#DDA0DD', powderblue: '#B0E0E6', purple: '#800080', rebeccapurple: '#663399', red: '#FF0000', rosybrown: '#BC8F8F', royalblue: '#4169E1', saddlebrown: '#8B4513', salmon: '#FA8072', sandybrown: '#F4A460', seagreen: '#2E8B57', seashell: '#FFF5EE', silver: '#C0C0C0', skyblue: '#87CEEB', slateblue: '#6A5ACD', slategray: '#708090', springgreen: '#00FF7F', steelblue: '#4682B4', tan: '#D2B48C', teal: '#008080', thistle: '#D8BFD8', tomato: '#FF6347', turquoise: '#40E0D0', wheat: '#F5DEB3', white: '#FFFFFF', whitesmoke: '#F5F5F5', yellow: '#FFFF00', yellowgreen: '#9ACD32' };
    function resolveRgb(value) {
        const direct = hexToRgb(value);
        if (direct)
            return direct;
        const key = String(value ?? '').trim().toLowerCase();
        const hex = CSS_NAMED_COLOR_HEX[key];
        return hex ? hexToRgb(hex) : null;
    }
    function rgbToHex(rgb) { return '#' + rgb.map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase(); }
    function colorAlpha(value, alpha) {
        const c = colorValue(value), a = Math.max(0, Math.min(1, Number(alpha)));
        const rgb = resolveRgb(c);
        if (rgb)
            return `rgba(${rgb.join(',')},${a})`;
        const m = c.match(/^rgba?\(([^)]+)\)$/i);
        if (m) {
            const parts = m[1].split(',').map(Number);
            if (parts.length >= 3)
                return `rgba(${parts.slice(0, 3).join(',')},${a})`;
        }
        return c;
    }
    function mixColors(a, b, ratio = .5) {
        const x = resolveRgb(colorValue(a)), y = resolveRgb(colorValue(b));
        if (!x || !y)
            throw err.TypeError('خلط_الألوان() يحتاج لونين بصيغة Hex أو أسماء ألوان قابلة للتحويل');
        const r = Math.max(0, Math.min(1, Number(ratio)));
        return rgbToHex(x.map((v, i) => v + (y[i] - v) * r));
    }
    function adjustColor(value, amount) {
        const rgb = resolveRgb(colorValue(value));
        if (!rgb)
            throw err.TypeError('تفتيح_اللون() وتغميق_اللون() تحتاج لونًا بصيغة Hex أو اسمًا قابلاً للتحويل');
        const a = Math.max(-1, Math.min(1, Number(amount)));
        return rgbToHex(rgb.map(v => a >= 0 ? v + (255 - v) * a : v * (1 + a)));
    }
    function gradientValue(values) {
        const colors = values.map(colorValue).filter(Boolean);
        if (colors.length < 2)
            throw err.TypeError('التدرج يحتاج لونين على الأقل');
        return `linear-gradient(90deg,${colors.join(',')})`;
    }
    function html(tag, content, attrs = '') { return `<${tag}${attrs}>${content || ''}</${tag}>`; }
    function buildDesign(runtime) {
        const n = (fn, name, min = 0, max = null) => runtime.native(fn, { name, min, max });
        const fields = {
            CSS: n(([rules]) => String(rules || ''), 'CSS', 1, 1),
            قاعدة_كائن: n(([selector, declarations]) => new CSSRule(selector, runtime.toJS(declarations) || {}), 'قاعدة_كائن', 2, 2),
            ورقة_CSS: n(([rules, scope]) => { if (!Array.isArray(rules))
                throw err.TypeError('ورقة_CSS() تحتاج قائمة قواعد'); return new CSSStyleSheetModel(rules, scope ? { scope: cssScope(scope) } : {}); }, 'ورقة_CSS', 1, 2),
            CSS_مُقيد: n(([rules, scope]) => { if (!Array.isArray(rules))
                throw err.TypeError('CSS_مُقيد() تحتاج قائمة قواعد'); return new CSSStyleSheetModel(rules, { scope: cssScope(scope || 'component') }); }, 'CSS_مُقيد', 1, 2),
            رمز: n(([name, value]) => token(name, value), 'رمز', 2, 2),
            ثيم: n(([tokens]) => { const o = runtime.toJS(tokens) || {}; return Object.entries(o).map(([k, v]) => `--dhad-${String(k).replace(/[^A-Za-z0-9_-]/g, '-')}:${colorValue(v)};`).join(''); }, 'ثيم', 1, 1),
            سمة: n(([tokens]) => { const o = runtime.toJS(tokens) || {}; return Object.entries(o).map(([k, v]) => `--dhad-${String(k).replace(/[^A-Za-z0-9_-]/g, '-')}:${colorValue(v)};`).join(''); }, 'سمة', 1, 1),
            مفتاح_حركة: n(([name, frames]) => { const f = runtime.toJS(frames) || {}; return `@keyframes ${name}{${Object.entries(f).map(([k, v]) => `${k}{${style(runtime, v)}}`).join('')}}`; }, 'مفتاح_حركة', 2, 2),
            دعم: n(([condition, rules]) => `@supports ${condition}{${rules || ''}}`, 'دعم', 2, 2),
            استعلام_حاوية: n(([condition, rules]) => `@container ${condition || ''}{${rules || ''}}`, 'استعلام_حاوية', 2, 2),
            قاعدة: n(([selector, rules]) => `${selector}{${rules}}`, 'قاعدة', 2, 2),
            خاصية: n(([name, value]) => `${cssName(name)}:${value};`, 'خاصية', 2, 2),
            نمط: n(([obj]) => style(runtime, obj), 'نمط', 1, 1),
            أصناف: n(([obj]) => cls(runtime, obj), 'أصناف', 1, 1),
            عنصر: n(([tagName, content, options]) => { const o = runtime.toJS(options) || {}; const c = o.class || o.صنف || ''; const s = o.style || o.نمط || ''; const id = o.id || o.معرف; const attrs = (id ? ` id="${esc(id)}"` : '') + (c ? ` class="${esc(c)}"` : '') + (s ? ` style="${esc(s)}"` : ''); return html(tagName, content, attrs); }, 'عنصر', 2, 3),
            صندوق: n(([content, options]) => { const o = runtime.toJS(options) || {}; const c = o.class || o.صنف || 'dhad-box'; const s = o.style || o.نمط || ''; return `<div class="${esc(c)}"${s ? ` style="${esc(s)}"` : ''}>${content || ''}</div>`; }, 'صندوق', 1, 2),
            حاوية: n(([content, maxWidth]) => `<div class="dhad-container" style="max-width:${esc(maxWidth || '1200px')}">${content || ''}</div>`, 'حاوية', 1, 2),
            شبكة: n(([content, columns, gap]) => `<div class="dhad-grid" style="--dhad-columns:${Math.max(1, Number(columns) || 1)};--dhad-gap:${esc(gap === undefined ? '1rem' : gap)}">${content || ''}</div>`, 'شبكة', 1, 3),
            مرن: n(([content, direction, gap]) => `<div class="dhad-flex" style="--dhad-direction:${esc(direction || 'row')};--dhad-gap:${esc(gap === undefined ? '1rem' : gap)}">${content || ''}</div>`, 'مرن', 1, 3),
            عمودي: n(([content, gap]) => `<div class="dhad-stack" style="--dhad-gap:${esc(gap || '1rem')}">${content || ''}</div>`, 'عمودي', 1, 2),
            أفقي: n(([content, gap, align]) => `<div class="dhad-row" style="--dhad-gap:${esc(gap || '1rem')};--dhad-align:${esc(align || 'center')}">${content || ''}</div>`, 'أفقي', 1, 3),
            وسط: n(([content]) => `<div class="dhad-center">${content || ''}</div>`, 'وسط', 1, 1),
            زر: n(([text, variant, options]) => { const o = runtime.toJS(options) || {}; const extra = style(runtime, o); return `<button class="dhad-btn dhad-btn-${esc(variant || 'primary')}"${extra ? ` style="${esc(extra)}"` : ''}>${esc(text)}</button>`; }, 'زر', 1, 3),
            رابط: n(([text, href, variant]) => `<a class="dhad-link dhad-link-${esc(variant || 'default')}" href="${esc(href || '#')}">${esc(text)}</a>`, 'رابط', 1, 3),
            بطاقة: n(([title, content, variant, options]) => { const o = runtime.toJS(options) || {}; const extra = style(runtime, o); return `<article class="dhad-card dhad-card-${esc(variant || 'default')}"${extra ? ` style="${esc(extra)}"` : ''}><h3>${esc(title)}</h3><div>${content || ''}</div></article>`; }, 'بطاقة', 2, 4),
            بطاقة_آمنة: n(([title, content, variant]) => { let c = ''; if (content instanceof TrustedHTML)
                c = content.value;
            else if (content instanceof SafeText)
                c = esc(content.value);
            else if (content instanceof VNode)
                c = vnodeToHTML(content);
            else
                c = esc(content); return `<article class="dhad-card dhad-card-${esc(variant || 'default')}"><h3>${esc(title)}</h3><div>${c}</div></article>`; }, 'بطاقة_آمنة', 2, 3),
            حقل: n(([label, type, name, placeholder]) => `<label class="dhad-field"><span>${esc(label)}</span><input type="${esc(type || 'text')}" name="${esc(name || '')}" placeholder="${esc(placeholder || '')}"></label>`, 'حقل', 1, 4),
            اختيار: n(([label, name, options]) => { if (!Array.isArray(options))
                throw err.TypeError('تصميم.اختيار() تحتاج قائمة'); return `<label class="dhad-field"><span>${esc(label)}</span><select name="${esc(name || '')}">${options.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></label>`; }, 'اختيار', 2, 3),
            خانة: n(([label, name, checked]) => `<label class="dhad-check"><input type="checkbox" name="${esc(name || '')}"${checked ? ' checked' : ''}><span>${esc(label)}</span></label>`, 'خانة', 1, 3),
            عنوان: n(([text, level]) => { const l = Math.min(6, Math.max(1, Number(level) || 2)); return `<h${l}>${esc(text)}</h${l}>`; }, 'عنوان', 1, 2),
            نص: n(([text, options]) => { const o = runtime.toJS(options) || {}; const extra = style(runtime, o); return `<p${extra ? ` style="${esc(extra)}"` : ''}>${esc(text)}</p>`; }, 'نص', 1, 2),
            قائمة: n(([items, ordered]) => { if (!Array.isArray(items))
                throw err.TypeError('تصميم.قائمة() تحتاج قائمة'); const t = ordered ? 'ol' : 'ul'; return `<${t} class="dhad-list">${items.map(x => `<li>${esc(x)}</li>`).join('')}</${t}>`; }, 'قائمة', 1, 2),
            شارة: n(([text, variant]) => `<span class="dhad-badge dhad-badge-${esc(variant || 'default')}">${esc(text)}</span>`, 'شارة', 1, 2),
            تنبيه: n(([text, variant]) => `<div role="alert" class="dhad-alert dhad-alert-${esc(variant || 'info')}">${esc(text)}</div>`, 'تنبيه', 1, 2),
            مؤشر: n(([value, max]) => { const m = Math.max(1, Number(max) || 100); const v = Math.min(m, Math.max(0, Number(value) || 0)); return `<progress class="dhad-progress" value="${v}" max="${m}">${v}</progress>`; }, 'مؤشر', 1, 2),
            تحميل: n(() => `<span class="dhad-spinner" aria-label="جاري التحميل" role="status"></span>`, 'تحميل', 0, 0),
            هيكل: n(([width, height]) => `<div class="dhad-skeleton" style="width:${esc(width || '100%')};height:${esc(height || '1rem')};"></div>`, 'هيكل', 0, 2),
            صورة: n(([src, alt, shape]) => `<img class="dhad-image dhad-image-${esc(shape || 'rounded')}" src="${esc(src)}" alt="${esc(alt || '')}">`, 'صورة', 1, 3),
            أفاتار: n(([src, name, size]) => `<img class="dhad-avatar" style="--dhad-avatar-size:${esc(size || '48px')}" src="${esc(src)}" alt="${esc(name || '')}">`, 'أفاتار', 1, 3),
            اقتباس: n(([text, author]) => `<figure class="dhad-quote"><blockquote>${esc(text)}</blockquote>${author ? `<figcaption>${esc(author)}</figcaption>` : ''}</figure>`, 'اقتباس', 1, 2),
            جدول: n(([headers, rows]) => { if (!Array.isArray(headers) || !Array.isArray(rows))
                throw err.TypeError('تصميم.جدول() تحتاج عناوين وصفوف'); return `<div class="dhad-table-wrap"><table class="dhad-table"><thead><tr>${headers.map(x => `<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${(Array.isArray(r) ? r : []).map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; }, 'جدول', 2, 2),
            بطاقة_إحصاء: n(([label, value, detail]) => `<article class="dhad-stat"><span>${esc(label)}</span><strong>${esc(value)}</strong>${detail ? `<small>${esc(detail)}</small>` : ''}</article>`, 'بطاقة_إحصاء', 2, 3),
            بطل: n(([eyebrow, title, description, actions]) => `<section class="dhad-hero"><div class="dhad-container">${eyebrow ? `<span class="dhad-badge dhad-badge-primary">${esc(eyebrow)}</span>` : ''}<h1>${esc(title)}</h1>${description ? `<p>${esc(description)}</p>` : ''}${actions || ''}</div></section>`, 'بطل', 2, 4),
            شريط_تنقل: n(([brand, links]) => `<nav class="dhad-nav"><div class="dhad-container"><div class="dhad-nav-inner"><strong>${esc(brand)}</strong><div class="dhad-nav-links">${Array.isArray(links) ? links.map(x => { const o = runtime.toJS(x) || {}; return `<a href="${esc(o.href || o.رابط || '#')}">${esc(o.text || o.نص || 'رابط')}</a>`; }).join('') : ''}</div></div></div></nav>`, 'شريط_تنقل', 2, 2),
            حوار: n(([title, content, closeText]) => `<dialog class="dhad-dialog"><div class="dhad-dialog-box"><h2>${esc(title)}</h2><div>${content || ''}</div>${closeText ? `<button class="dhad-btn dhad-btn-secondary" type="button">${esc(closeText)}</button>` : ''}</div></dialog>`, 'حوار', 2, 3),
            تبويب: n(([tabs]) => { if (!Array.isArray(tabs))
                throw err.TypeError('تصميم.تبويب() تحتاج قائمة'); return `<div class="dhad-tabs">${tabs.map((x, i) => { const o = runtime.toJS(x) || {}; return `<a class="dhad-tab${i === 0 ? ' active' : ''}" href="${esc(o.href || '#')}" aria-selected="${i === 0 ? 'true' : 'false'}">${esc(o.text || o.نص || 'تبويب')}</a>`; }).join('')}</div>`; }, 'تبويب', 1, 1),
            مساحة: n(([size]) => `<div aria-hidden="true" style="height:${esc(size)};width:${esc(size)}"></div>`, 'مساحة', 1, 1),
            استجابة: n(([breakpoint, css]) => `@media (min-width:${esc(breakpoint)}){${css || ''}}`, 'استجابة', 2, 2),
            نقطة_توقف: n(([name, min, max]) => `@media (min-width:${esc(min || '0px')})${max ? ` and (max-width:${esc(max)})` : ''}`, 'نقطة_توقف', 1, 3),
            متغير: n(([name, value]) => `--${String(name).replace(/^--/, '')}:${value};`, 'متغير', 2, 2),
            لون: n(([name, value]) => `--dhad-${String(name)}:${value};`, 'لون', 2, 2),
            نظام: n(([options]) => { const o = runtime.toJS(options) || {}; const primary = colorValue(o.primary || o.أساسي || '#7b3f2a'), secondary = colorValue(o.secondary || o.ثانوي || '#c58b4e'), surface = colorValue(o.surface || o.سطح || '#fffdf8'), text = colorValue(o.text || o.نص || '#17202a'), radius = o.radius || o.دائري || '16px', font = o.font || o.خط || 'system-ui,sans-serif'; return `:root{--dhad-primary:${primary};--dhad-secondary:${secondary};--dhad-surface:${surface};--dhad-text:${text};--dhad-radius:${radius};--dhad-font:${font};}`; }, 'نظام', 1, 1),
            CSS_أساسي: n(() => `:root{font-family:var(--dhad-font,system-ui,sans-serif);color-scheme:light}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--dhad-font,system-ui,sans-serif);color:var(--dhad-text,#17202a);background:var(--dhad-surface,#fff);line-height:1.75}.dhad-container{width:min(100% - 2rem,1200px);margin-inline:auto}.dhad-grid{display:grid;grid-template-columns:repeat(var(--dhad-columns,1),minmax(0,1fr));gap:var(--dhad-gap,1rem)}.dhad-flex{display:flex;flex-direction:var(--dhad-direction,row);gap:var(--dhad-gap,1rem);flex-wrap:wrap}.dhad-stack{display:flex;flex-direction:column;gap:var(--dhad-gap,1rem)}.dhad-row{display:flex;align-items:var(--dhad-align,center);gap:var(--dhad-gap,1rem);flex-wrap:wrap}.dhad-center{display:grid;place-items:center}.dhad-btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:var(--dhad-radius,12px);padding:.7rem 1rem;cursor:pointer;font:inherit}.dhad-btn-primary{background:var(--dhad-primary,#2563eb);color:#fff}.dhad-btn-secondary{background:transparent;color:var(--dhad-primary,#2563eb);border:1px solid currentColor}.dhad-link{color:var(--dhad-primary,#2563eb);text-decoration:none}.dhad-card{padding:1.25rem;border:1px solid color-mix(in srgb,var(--dhad-text,#17202a) 14%,transparent);border-radius:var(--dhad-radius,16px);background:var(--dhad-surface,#fff)}.dhad-field{display:grid;gap:.4rem}.dhad-field input,.dhad-field select{width:100%;padding:.7rem;border:1px solid #cfcfcf;border-radius:10px;font:inherit;background:#fff}.dhad-check{display:flex;gap:.5rem;align-items:center}.dhad-badge{display:inline-flex;width:max-content;padding:.2rem .6rem;border-radius:999px;font-size:.85rem;background:#eee}.dhad-badge-primary{background:color-mix(in srgb,var(--dhad-primary,#2563eb) 15%,#fff);color:var(--dhad-primary,#2563eb)}.dhad-alert{padding:.8rem 1rem;border-radius:10px}.dhad-alert-info{background:#e8f1ff}.dhad-alert-success{background:#e5f7ec;color:#175c31}.dhad-alert-warning{background:#fff4d6;color:#704d00}.dhad-alert-danger{background:#fde8e8;color:#8a1c1c}.dhad-progress{width:100%;height:.7rem}.dhad-spinner{display:inline-block;width:1.2rem;height:1.2rem;border:.18rem solid #ddd;border-top-color:var(--dhad-primary,#2563eb);border-radius:50%;animation:dhad-spin 1s linear infinite}.dhad-skeleton{background:linear-gradient(90deg,#eee,#f7f7f7,#eee);border-radius:8px;animation:dhad-pulse 1.5s infinite}.dhad-image{max-width:100%;height:auto}.dhad-image-rounded{border-radius:var(--dhad-radius,16px)}.dhad-image-circle{aspect-ratio:1;border-radius:50%;object-fit:cover}.dhad-avatar{width:var(--dhad-avatar-size,48px);height:var(--dhad-avatar-size,48px);border-radius:50%;object-fit:cover}.dhad-quote{padding:1rem;border-inline-start:4px solid var(--dhad-primary,#2563eb);background:#f7f7f7}.dhad-table-wrap{overflow:auto}.dhad-table{width:100%;border-collapse:collapse}.dhad-table th,.dhad-table td{padding:.7rem;border-bottom:1px solid #ddd;text-align:start}.dhad-stat{padding:1rem;border:1px solid #ddd;border-radius:var(--dhad-radius,16px);display:grid;gap:.2rem}.dhad-stat span{opacity:.7}.dhad-stat strong{font-size:2rem}.dhad-stat small{opacity:.65}.dhad-hero{padding:6rem 0;background:linear-gradient(135deg,color-mix(in srgb,var(--dhad-primary,#2563eb) 12%,#fff),#fff)}.dhad-hero h1{font-size:clamp(2.5rem,7vw,5rem);line-height:1.05;margin:.5rem 0}.dhad-hero p{max-width:760px;font-size:1.15rem;opacity:.8}.dhad-nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--dhad-surface,#fff) 92%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid #ddd}.dhad-nav-inner{min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:1rem}.dhad-nav-links{display:flex;gap:1rem;flex-wrap:wrap}.dhad-dialog{border:0;border-radius:18px;padding:0;max-width:min(92vw,600px)}.dhad-dialog-box{padding:1.5rem}.dhad-tabs{display:flex;gap:.5rem;border-bottom:1px solid #ddd;flex-wrap:wrap}.dhad-tab{padding:.6rem .9rem;text-decoration:none;color:inherit;border-bottom:2px solid transparent}.dhad-tab.active{color:var(--dhad-primary,#2563eb);border-color:currentColor}@keyframes dhad-spin{to{transform:rotate(360deg)}}@keyframes dhad-pulse{50%{opacity:.55}}@media(max-width:760px){.dhad-grid{grid-template-columns:1fr!important}.dhad-nav-links{display:none}.dhad-hero{padding:4rem 0}}`, 'CSS_أساسي', 0, 0),
            استجابة_شائعة: n(() => `@media(max-width:760px){.dhad-hide-mobile{display:none!important}.dhad-stack-mobile{display:flex!important;flex-direction:column!important}.dhad-full-mobile{width:100%!important}}@media(min-width:761px){.dhad-hide-desktop{display:none!important}}`, 'استجابة_شائعة', 0, 0),
        };
        fields.مسافة = n(([size]) => `margin:${esc(size)};padding:${esc(size)};`, 'مسافة', 1, 1);
        fields.شبكة = n(([columns, gap]) => `display:grid;grid-template-columns:repeat(${Math.max(1, Number(columns) || 1)},minmax(0,1fr));gap:${esc(gap || '1rem')};`, 'شبكة', 1, 2);
        fields.مرن = n(([direction, gap, align, justify]) => `display:flex;flex-direction:${esc(direction || 'row')};gap:${esc(gap || '1rem')};align-items:${esc(align || 'center')};justify-content:${esc(justify || 'flex-start')};flex-wrap:wrap;`, 'مرن', 0, 4);
        fields.خط = n(([size, weight, lineHeight]) => `font-size:${esc(size || '1rem')};font-weight:${esc(weight || '400')};line-height:${esc(lineHeight || '1.6')};`, 'خط', 0, 3);
        fields.ظل = n(([value]) => `box-shadow:${esc(value || '0 8px 30px rgba(0,0,0,.08)')};`, 'ظل', 0, 1);
        fields.حركة = n(([property, duration, easing]) => `transition:${esc(property || 'all')} ${esc(duration || '200ms')} ${esc(easing || 'ease')};`, 'حركة', 0, 3);
        fields.شفافية = n(([value]) => `opacity:${Math.min(1, Math.max(0, Number(value) || 0))};`, 'شفافية', 1, 1);
        fields.تدوير = n(([value]) => `border-radius:${esc(value)};`, 'تدوير', 1, 1);
        fields.مسافة_داخلية = n(([value]) => `padding:${esc(value)};`, 'مسافة_داخلية', 1, 1);
        fields.مسافة_خارجية = n(([value]) => `margin:${esc(value)};`, 'مسافة_خارجية', 1, 1);
        fields.عرض = n(([value]) => `width:${esc(value)};`, 'عرض', 1, 1);
        fields.ارتفاع = n(([value]) => `height:${esc(value)};`, 'ارتفاع', 1, 1);
        fields.موضع = n(([position, top, right, bottom, left, z]) => `position:${esc(position || 'relative')};${top != null ? `top:${esc(top)};` : ''}${right != null ? `right:${esc(right)};` : ''}${bottom != null ? `bottom:${esc(bottom)};` : ''}${left != null ? `left:${esc(left)};` : ''}${z != null ? `z-index:${esc(z)};` : ''}`, 'موضع', 0, 6);
        fields.لون_نص = n(([value]) => `color:${esc(colorValue(value))};`, 'لون_نص', 1, 1);
        fields.لون_خلفية = n(([value]) => `background:${esc(colorValue(value))};`, 'لون_خلفية', 1, 1);
        fields.لون_حد = n(([value]) => `border-color:${esc(colorValue(value))};`, 'لون_حد', 1, 1);
        fields.تدرج = n((values) => `background:${esc(gradientValue(values))};`, 'تدرج', 2, null);
        fields.لون_شفاف = n(([value]) => `color:${esc(colorValue(value))};opacity:0.5;`, 'لون_شفاف', 1, 1);
        fields.ألوان = n(() => Object.freeze({ ...DHAD_COLORS }), 'ألوان', 0, 0);
        fields.اسم_لون = n(([value]) => normalizeColorName(value), 'اسم_لون', 1, 1);
        fields.لون = n(([value]) => colorValue(value), 'لون', 1, 1);
        fields.شفافية_لون = n(([value, alpha]) => colorAlpha(value, alpha), 'شفافية_لون', 2, 2);
        fields.خلط_ألوان = n(([a, b, ratio]) => mixColors(a, b, ratio === undefined ? .5 : ratio), 'خلط_ألوان', 2, 3);
        fields.تفتيح_اللون = n(([value, amount]) => adjustColor(value, Math.abs(Number(amount ?? .2))), 'تفتيح_اللون', 1, 2);
        fields.تغميق_اللون = n(([value, amount]) => adjustColor(value, -Math.abs(Number(amount ?? .2))), 'تغميق_اللون', 1, 2);
        fields.تدرج_خطي = n((values) => `linear-gradient(90deg,${values.map(colorValue).filter(Boolean).join(',')})`, 'تدرج_خطي', 2, null);
        fields.حدود = n(([width, styleValue, color]) => `border:${esc(width || '1px')} ${esc(styleValue || 'solid')} ${esc(color || 'currentColor')};`, 'حدود', 0, 3);
        fields.تظليل_نص = n(([value]) => `text-shadow:${esc(value)};`, 'تظليل_نص', 1, 1);
        fields.محاذاة = n(([value]) => `text-align:${esc(value || 'start')};`, 'محاذاة', 0, 1);
        fields.تجاوز = n(([value]) => `overflow:${esc(value || 'auto')};`, 'تجاوز', 0, 1);
        fields.شبكة_متجاوبة = n(([columns, gap, breakpoint]) => `display:grid;grid-template-columns:repeat(${Math.max(1, Number(columns) || 1)},minmax(0,1fr));gap:${esc(gap || '1rem')};@media(max-width:${esc(breakpoint || '760px')}){grid-template-columns:1fr;}`, 'شبكة_متجاوبة', 1, 3);
        fields.بطاقة_مرنة = n(([content, options]) => { const o = runtime.toJS(options) || {}; return `<article style="${style(runtime, { padding: o.padding || '1.25rem', border: o.border || '1px solid #ddd', borderRadius: o.radius || '16px', background: o.background || 'var(--dhad-surface,#fff)', boxShadow: o.shadow || '0 8px 30px rgba(0,0,0,.06)' })}">${content || ''}</article>`; }, 'بطاقة_مرنة', 1, 2);
        fields.صورة_متجاوبة = n(([src, alt, options]) => { const o = runtime.toJS(options) || {}; return `<img src="${esc(src)}" alt="${esc(alt || '')}" loading="${esc(o.loading || 'lazy')}" decoding="async" style="width:${esc(o.width || '100%')};height:${esc(o.height || 'auto')};object-fit:${esc(o.fit || 'cover')};border-radius:${esc(o.radius || '16px')};">`; }, 'صورة_متجاوبة', 1, 3);
        fields.زر_متقدم = n(([text, variant, size, disabled]) => `<button type="button" class="dhad-btn dhad-btn-${esc(variant || 'primary')}" data-size="${esc(size || 'md')}"${disabled ? ' disabled' : ''}>${esc(text)}</button>`, 'زر_متقدم', 1, 4);
        fields.شبكة_بطاقات = n(([items, columns]) => { if (!Array.isArray(items))
            throw err.TypeError('شبكة_بطاقات() تحتاج قائمة'); const c = Math.max(1, Number(columns) || 3); return `<div style="display:grid;grid-template-columns:repeat(${c},minmax(0,1fr));gap:1rem">${items.map(x => `<article class="dhad-card">${runtime.stringify(x)}</article>`).join('')}</div>`; }, 'شبكة_بطاقات', 1, 2);
        fields.إخفاء_مرئي = n(([mobile, desktop]) => `@media(max-width:760px){${mobile || ''}}@media(min-width:761px){${desktop || ''}}`, 'إخفاء_مرئي', 0, 2);
        fields.دعم_الوضع_الداكن = n(([light, dark]) => `@media(prefers-color-scheme:dark){${dark || ''}}${light ? `@media(prefers-color-scheme:light){${light}}` : ''}`, 'دعم_الوضع_الداكن', 0, 2);
        return new DhadModule('تصميم', new Map(Object.entries(fields)), { readonly: true, api: runtime.apiVersion, version: '1.0.0' });
    }
    'use strict';
    function buildStdlib(runtime) {
        const native = (fn, name, min = 0, max = null) => runtime.native(fn, { name, min, max });
        const moduleFor = (name, fields) => new DhadModule(name, new Map(Object.entries(fields)), { readonly: true, api: runtime.apiVersion });
        const m = new Map();
        m.set('نصوص', moduleFor('نصوص', {
            أحرف: native(([s]) => Array.from(String(s)), 'أحرف', 1, 1),
            كبير: native(([s]) => String(s).toUpperCase(), 'كبير', 1, 1),
            صغير: native(([s]) => String(s).toLowerCase(), 'صغير', 1, 1),
            يحتوي: native(([s, q]) => String(s).includes(String(q)), 'يحتوي', 2, 2),
            قطع: native(([s, a, b]) => String(s).slice(a, b), 'قطع', 2, 3),
            استبدل: native(([s, a, b]) => String(s).split(String(a)).join(String(b)), 'استبدل', 3, 3),
            تكرار: native(([s, n]) => String(s).repeat(n), 'تكرار', 2, 2),
            تقسيم: native(([s, sep]) => String(s).split(String(sep)), 'تقسيم', 2, 2)
        }));
        m.set('قوائم', moduleFor('قوائم', {
            أضف: native(([l, v]) => { l.push(v); return l; }, 'أضف', 2, 2),
            عكس: native(([l]) => l.slice().reverse(), 'عكس', 1, 1),
            رتب: native(([l]) => l.slice().sort((a, b) => a < b ? -1 : a > b ? 1 : 0), 'رتب', 1, 1),
            يحتوي: native(([l, v]) => l.some(x => runtime.equals(x, v)), 'يحتوي', 2, 2),
            فهرس: native(([l, v]) => l.findIndex(x => runtime.equals(x, v)), 'فهرس', 2, 2),
            حذف: native(([l, i]) => { l.splice(i, 1); return l; }, 'حذف', 2, 2),
            إدراج: native(([l, i, v]) => { l.splice(i, 0, v); return l; }, 'إدراج', 3, 3),
            خريطة: native(([l, fn]) => l.map((x, i) => runtime.callValue(fn, [x])), 'خريطة', 2, 2),
            تصفية: native(([l, fn]) => l.filter((x, i) => runtime.truthy(runtime.callValue(fn, [x]))), 'تصفية', 2, 2),
            اختزال: native(([l, fn, initial]) => { let acc = initial, start = 0; if (acc === undefined && l.length) {
                acc = l[0];
                start = 1;
            } for (let i = start; i < l.length; i++)
                acc = runtime.callValue(fn, [acc, l[i], i]); return acc; }, 'اختزال', 2, 3)
        }));
        const list = (fn, name, min = 1, max = null) => native(fn, name, min, max);
        const needList = (v, name) => { if (!Array.isArray(v))
            throw err.TypeError(`${name}() تحتاج قائمة`); };
        const callback = (fn, name) => { if (!runtime.isCallable(fn))
            throw err.TypeError(`${name}() تحتاج دالة`); };
        m.get('قوائم').fields.set('بحث', list(([l, fn]) => { needList(l, 'بحث'); callback(fn, 'بحث'); return l.find((x, i) => runtime.truthy(runtime.callValue(fn, [x, i]))); }, 'بحث', 2, 2));
        m.get('قوائم').fields.set('بعض', list(([l, fn]) => { needList(l, 'بعض'); callback(fn, 'بعض'); return l.some((x, i) => runtime.truthy(runtime.callValue(fn, [x, i]))); }, 'بعض', 2, 2));
        m.get('قوائم').fields.set('كل', list(([l, fn]) => { needList(l, 'كل'); callback(fn, 'كل'); return l.every((x, i) => runtime.truthy(runtime.callValue(fn, [x, i]))); }, 'كل', 2, 2));
        m.get('قوائم').fields.set('فريد', list(([l]) => { needList(l, 'فريد'); const out = []; for (const x of l)
            if (!out.some(y => runtime.equals(x, y)))
                out.push(x); return out; }, 'فريد', 1, 1));
        m.get('قوائم').fields.set('تسطيح', list(([l, depth]) => { needList(l, 'تسطيح'); let d = depth === undefined ? Infinity : Number(depth); const flat = a => a.reduce((o, x) => Array.isArray(x) && d > 0 ? o.concat((d--, flat(x))) : o.concat([x]), []); return flat(l); }, 'تسطيح', 1, 2));
        m.get('قوائم').fields.set('تجميع', list(([l, size]) => { needList(l, 'تجميع'); const n = Math.max(1, Math.floor(Number(size) || 1)), out = []; for (let i = 0; i < l.length; i += n)
            out.push(l.slice(i, i + n)); return out; }, 'تجميع', 2, 2));
        m.get('قوائم').fields.set('دمج', list(([a, b]) => { needList(a, 'دمج'); needList(b, 'دمج'); return a.map((x, i) => [x, b[i]]); }, 'دمج', 2, 2));
        m.get('قوائم').fields.set('تكرار', list(([value, count]) => { const n = Math.max(0, Math.floor(Number(count) || 0)); return Array.from({ length: n }, () => value); }, 'تكرار', 2, 2));
        m.get('قوائم').fields.set('مدى', list(([start, end, step]) => { start = Number(start); end = Number(end); step = step === undefined ? 1 : Number(step); if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step) || step === 0)
            throw err.TypeError('مدى() يحتاج أرقامًا صحيحة غير صفرية للخطوة'); const out = []; if ((step > 0 && start > end) || (step < 0 && start < end))
            return out; for (let x = start; step > 0 ? x <= end : x >= end; x += step) {
            out.push(x);
            if (out.length > 1000000)
                throw err.RuntimeError('مدى() تجاوز مليون عنصر');
        } return out; }, 'مدى', 2, 3));
        m.get('قوائم').fields.set('مجموع', list(([l]) => { needList(l, 'مجموع'); return l.reduce((s, x) => { if (typeof x !== 'number')
            throw err.TypeError('مجموع() تحتاج قائمة أرقام'); return s + x; }, 0); }, 'مجموع', 1, 1));
        m.get('قوائم').fields.set('متوسط', list(([l]) => { needList(l, 'متوسط'); if (!l.length)
            return null; return l.reduce((s, x) => { if (typeof x !== 'number')
            throw err.TypeError('متوسط() تحتاج قائمة أرقام'); return s + x; }, 0) / l.length; }, 'متوسط', 1, 1));
        m.get('قوائم').fields.set('أصغر', list(([l]) => { needList(l, 'أصغر'); return l.length ? Math.min(...l) : null; }, 'أصغر', 1, 1));
        m.get('قوائم').fields.set('أكبر', list(([l]) => { needList(l, 'أكبر'); return l.length ? Math.max(...l) : null; }, 'أكبر', 1, 1));
        m.get('قوائم').fields.set('عداد', list(([l, fn]) => { needList(l, 'عداد'); callback(fn, 'عداد'); let n = 0; l.forEach((x, i) => { if (runtime.truthy(runtime.callValue(fn, [x, i])))
            n++; }); return n; }, 'عداد', 2, 2));
        m.get('قوائم').fields.set('مجموعات', list(([l, fn]) => { needList(l, 'مجموعات'); callback(fn, 'مجموعات'); const out = {}; l.forEach((x, i) => { const k = String(runtime.callValue(fn, [x, i])); (out[k] ??= []).push(x); }); return runtime.normalize(out); }, 'مجموعات', 2, 2));
        m.get('قوائم').fields.set('إزاحة', list(([l, n]) => { needList(l, 'إزاحة'); if (!l.length)
            return []; n = ((Math.trunc(Number(n) || 0) % l.length) + l.length) % l.length; return l.slice(n).concat(l.slice(0, n)); }, 'إزاحة', 2, 2));
        m.get('قوائم').fields.set('صف_مرتب', list(([l, fn]) => { needList(l, 'صف_مرتب'); callback(fn, 'صف_مرتب'); return l.slice().sort((a, b) => { const x = runtime.callValue(fn, [a]), y = runtime.callValue(fn, [b]); return x < y ? -1 : x > y ? 1 : 0; }); }, 'صف_مرتب', 2, 2));
        m.get('ويب', buildWeb(runtime));
        m.set('ألوان', moduleFor('ألوان', {
            ...DHAD_COLORS,
            لون: native(([value]) => colorValue(value), 'لون', 1, 1),
            اسم: native(([value]) => normalizeColorName(value), 'اسم', 1, 1),
            شفافية: native(([value, alpha]) => colorAlpha(value, alpha), 'شفافية', 2, 2),
            خلط: native(([a, b, ratio]) => mixColors(a, b, ratio === undefined ? .5 : ratio), 'خلط', 2, 3),
            تفتيح: native(([value, amount]) => adjustColor(value, Math.abs(Number(amount ?? .2))), 'تفتيح', 1, 2),
            تغميق: native(([value, amount]) => adjustColor(value, -Math.abs(Number(amount ?? .2))), 'تغميق', 1, 2),
            تدرج: native((values) => gradientValue(values), 'تدرج', 2, null),
            تدرج_خطي: native((values) => `linear-gradient(90deg,${values.map(colorValue).join(',')})`, 'تدرج_خطي', 2, null),
            سمة: native(([tokens]) => { const o = runtime.toJS(tokens) || {}; return Object.entries(o).map(([k, v]) => `--dhad-${String(k).replace(/[^A-Za-z0-9_-]/g, '-')}:${colorValue(v)};`).join(''); }, 'سمة', 1, 1)
        }));
        m.set('تصميم', buildDesign(runtime));
        m.set('JSON', moduleFor('JSON', {
            حلل: native(([s]) => runtime.normalize(JSON.parse(s)), 'حلل', 1, 1),
            حوّل: native(([v]) => JSON.stringify(runtime.toJS(v)), 'حوّل', 1, 1)
        }));
        const cartKey = 'dhad_cart_v1';
        const readCart = () => { runtime.requireCapability('storage'); try {
            const raw = localStorage.getItem(cartKey);
            const a = raw ? JSON.parse(raw) : [];
            return Array.isArray(a) ? a : [];
        }
        catch (_) {
            return [];
        } };
        const writeCart = a => { runtime.requireCapability('storage'); localStorage.setItem(cartKey, JSON.stringify(a)); return runtime.normalize(a); };
        m.set('متجر', moduleFor('متجر', {
            السلة: native(() => { runtime.requireCapability('storage'); return runtime.normalize(readCart()); }, 'السلة', 0, 0),
            أضف_للسلة: native(([product, quantity]) => { const p = runtime.toJS(product) || {}; const id = String(p.id ?? p.معرف ?? p.sku ?? p.رمز ?? ''); if (!id)
                throw err.TypeError('متجر.أضف_للسلة() يحتاج منتجًا بمعرف'); const q = Math.max(1, Math.floor(Number(quantity) || 1)); const a = readCart(); const old = a.find(x => String(x.id) === id); if (old)
                old.quantity += q;
            else
                a.push({ id, name: String(p.name ?? p.اسم ?? ''), price: Number(p.price ?? p.سعر ?? 0), quantity: q, image: String(p.image ?? p.صورة ?? '') }); return writeCart(a); }, 'أضف_للسلة', 1, 2),
            حذف_من_السلة: native(([id]) => writeCart(readCart().filter(x => String(x.id) !== String(id))), 'حذف_من_السلة', 1, 1),
            تحديث_الكمية: native(([id, quantity]) => { const q = Math.max(0, Math.floor(Number(quantity) || 0)); const a = readCart().map(x => String(x.id) === String(id) ? Object.assign({}, x, { quantity: q }) : x).filter(x => x.quantity > 0); return writeCart(a); }, 'تحديث_الكمية', 2, 2),
            تفريغ_السلة: native(() => writeCart([]), 'تفريغ_السلة', 0, 0),
            إجمالي: native(() => { runtime.requireCapability('storage'); return readCart().reduce((sum, x) => sum + (Number(x.price) || 0) * (Number(x.quantity) || 0), 0); }, 'إجمالي', 0, 0),
            عدد_العناصر: native(() => { runtime.requireCapability('storage'); return readCart().reduce((sum, x) => sum + (Number(x.quantity) || 0), 0); }, 'عدد_العناصر', 0, 0),
            تنسيق_عملة: native(([amount, currency, locale]) => new Intl.NumberFormat(String(locale || 'ar'), { style: 'currency', currency: String(currency || 'EGP'), maximumFractionDigits: 2 }).format(Number(amount) || 0), 'تنسيق_عملة', 1, 3),
            حفظ_منتجات: native(([key, products]) => { runtime.requireCapability('storage'); const a = Array.isArray(products) ? products : []; localStorage.setItem('dhad_products_' + String(key), JSON.stringify(runtime.toJS(a))); return products; }, 'حفظ_منتجات', 2, 2),
            تحميل_منتجات: native(([key]) => { runtime.requireCapability('storage'); try {
                const raw = localStorage.getItem('dhad_products_' + String(key));
                return raw ? runtime.normalize(JSON.parse(raw)) : [];
            }
            catch (_) {
                return [];
            } }, 'تحميل_منتجات', 1, 1)
        }));
        return m;
    }
    'use strict';
    class CancellationError extends Error {
        constructor(message = 'تم إلغاء المهمة') { super(message); this.name = 'CancellationError'; }
    }
    class CancellationToken {
        constructor() { this.cancelled = false; this.reason = null; this.listeners = new Set(); }
        cancel(reason = 'تم إلغاء المهمة') { if (this.cancelled)
            return; this.cancelled = true; this.reason = reason; for (const fn of this.listeners)
            fn(reason); this.listeners.clear(); }
        throwIfCancelled() { if (this.cancelled)
            throw new CancellationError(this.reason); }
        onCancel(fn) { if (this.cancelled)
            fn(this.reason);
        else
            this.listeners.add(fn); return () => this.listeners.delete(fn); }
    }
    class Task {
        constructor(executor, token) { this.token = token || new CancellationToken(); this.state = 'pending'; this.promise = Promise.resolve().then(() => { this.token.throwIfCancelled(); return executor(this.token); }).then(v => { this.state = 'fulfilled'; return v; }, e => { this.state = 'rejected'; throw e; }); }
        cancel(reason) { this.token.cancel(reason); }
        then(...a) { return this.promise.then(...a); }
        catch(...a) { return this.promise.catch(...a); }
        finally(...a) { return this.promise.finally(...a); }
    }
    class Scheduler {
        constructor() { this.tasks = new Set(); }
        spawn(executor, token) { const t = new Task(executor, token); this.tasks.add(t); t.finally(() => this.tasks.delete(t)).catch(() => { }); return t; }
        async all(tasks) { return Promise.all(tasks.map(t => t.promise || t)); }
        async race(tasks) { return Promise.race(tasks.map(t => t.promise || t)); }
        delay(ms, token) { return this.spawn(async (t) => { await new Promise((resolve, reject) => { const id = setTimeout(resolve, ms); const off = t.onCancel(() => { clearTimeout(id); reject(new CancellationError(t.reason)); }); }); return null; }, token); }
        pending() { return this.tasks.size; }
    }
    'use strict';
    class Compiler {
        constructor(sharedFunctions = null) { this.code = []; this.functions = sharedFunctions || []; this.loopStack = []; }
        emit(op, ...args) { const i = this.code.length; this.code.push({ op, args }); return i; }
        patch(i, target, ...rest) { this.code[i].args[0] = target; if (rest.length)
            this.code[i].args[1] = rest[0]; }
        compile(source, options = {}) { const ast = new Parser(new Lexer(source).tokenize()).parseProgram(); this.compileBlock(ast.body); this.emit('HALT'); const bc = { version: 2, entry: this.code, functions: this.functions }; return options.optimize === false ? bc : optimizeBytecode(bc); }
        compileBlock(stmts) { for (const s of stmts)
            this.statement(s); }
        statement(n) { switch (n.type) {
            case 'Print':
                for (const a of n.args)
                    this.expr(a);
                this.emit('PRINT', n.args.length);
                break;
            case 'VarDecl':
                n.init ? this.expr(n.init) : this.emit('PUSH', null);
                this.emit('DECLARE', n.name, false);
                break;
            case 'ConstDecl':
                this.expr(n.init);
                this.emit('DECLARE', n.name, true);
                break;
            case 'ExprStmt':
                this.expr(n.expr);
                this.emit('POP');
                break;
            case 'Block':
                this.emit('SCOPE_PUSH');
                this.compileBlock(n.body);
                this.emit('SCOPE_POP');
                break;
            case 'If': {
                this.expr(n.cond);
                const jf = this.emit('JUMP_IF_FALSE', -1);
                this.emit('POP');
                this.emit('SCOPE_PUSH');
                this.compileBlock(n.thenBlock.body);
                this.emit('SCOPE_POP');
                const jend = this.emit('JUMP', -1);
                this.patch(jf, this.code.length);
                this.emit('POP');
                if (n.elseBranch) {
                    this.emit('SCOPE_PUSH');
                    this.statement(n.elseBranch);
                    this.emit('SCOPE_POP');
                }
                this.patch(jend, this.code.length);
                break;
            }
            case 'While': {
                const start = this.code.length;
                this.expr(n.cond);
                const jf = this.emit('JUMP_IF_FALSE', -1);
                this.emit('POP');
                this.emit('SCOPE_PUSH');
                const frame = { breaks: [], continues: [], continueTarget: start };
                this.loopStack.push(frame);
                this.compileBlock(n.body.body);
                this.loopStack.pop();
                this.emit('SCOPE_POP');
                this.emit('JUMP', start);
                const end = this.code.length;
                this.patch(jf, end);
                this.emit('POP');
                for (const x of frame.breaks)
                    this.patch(x, end);
                for (const x of frame.continues)
                    this.patch(x, start);
                break;
            }
            case 'For': {
                this.expr(n.from);
                this.expr(n.to);
                this.emit('FOR_INIT', n.varName);
                const start = this.code.length;
                const jf = this.emit('FOR_NEXT', -1);
                this.emit('SCOPE_PUSH');
                const frame = { breaks: [], continues: [], continueTarget: start };
                this.loopStack.push(frame);
                this.compileBlock(n.body.body);
                this.loopStack.pop();
                this.emit('SCOPE_POP');
                this.emit('JUMP', start);
                const end = this.code.length;
                this.patch(jf, end);
                this.emit('FOR_END');
                for (const x of frame.breaks)
                    this.patch(x, end);
                for (const x of frame.continues)
                    this.patch(x, start);
                break;
            }
            case 'Try': {
                const enter = this.emit('TRY_ENTER', -1, -1, n.catchName || null);
                this.compileBlock(n.tryBlock.body);
                this.emit('TRY_EXIT');
                const jumpAfter = this.emit('JUMP', -1);
                let catchIp = -1, finallyIp = -1;
                if (n.catchBlock) {
                    catchIp = this.code.length;
                    this.emit('CATCH_BIND', n.catchName || 'خطأ');
                    this.compileBlock(n.catchBlock.body);
                    this.emit('CLEAR_PENDING');
                }
                if (n.finallyBlock) {
                    finallyIp = this.code.length;
                    this.compileBlock(n.finallyBlock.body);
                }
                this.emit('RETHROW_PENDING');
                const end = this.code.length;
                this.patch(enter, catchIp, finallyIp);
                this.patch(jumpAfter, finallyIp >= 0 ? finallyIp : end);
                break;
            }
            case 'FuncDecl': {
                const sub = new Compiler(this.functions);
                sub.compileBlock(n.body.body);
                sub.emit('PUSH', null);
                sub.emit('RETURN');
                const fn = { name: n.name, params: n.params, code: sub.code, component: !!n.component, async: !!n.async };
                this.functions.push(fn);
                this.emit('MAKE_FUNCTION', this.functions.length - 1, n.name);
                this.emit('DECLARE', n.name, false);
                break;
            }
            case 'Return':
                if (n.value)
                    this.expr(n.value);
                else
                    this.emit('PUSH', null);
                this.emit('RETURN');
                break;
            case 'Break':
                if (!this.loopStack.length)
                    throw err.SyntaxError("'توقف' مسموح فقط داخل حلقة");
                this.emit('JUMP', -1);
                this.loopStack[this.loopStack.length - 1].breaks.push(this.code.length - 1);
                break;
            case 'Continue':
                if (!this.loopStack.length)
                    throw err.SyntaxError("'استمر' مسموح فقط داخل حلقة");
                this.emit('JUMP', -1);
                this.loopStack[this.loopStack.length - 1].continues.push(this.code.length - 1);
                break;
            case 'Import': {
                const binding = n.alias || n.name.split('/').pop().replace(/\.dhad$/, '') || n.name;
                this.emit('IMPORT', n.name);
                this.emit('DECLARE', binding, false);
                break;
            }
            case 'Export':
                this.emit('EXPORT', n.names);
                break;
            default: throw err.RuntimeError(`تعليمة AST غير مدعومة في Compiler: ${n.type}`);
        } }
        expr(n) { switch (n.type) {
            case 'Number':
            case 'String':
            case 'Bool':
            case 'Null':
                this.emit('PUSH', n.type === 'Number' || n.type === 'String' || n.type === 'Bool' ? n.value : null);
                break;
            case 'Ident':
                this.emit('LOAD', n.name);
                break;
            case 'List':
                for (const x of n.items)
                    this.expr(x);
                this.emit('MAKE_LIST', n.items.length);
                break;
            case 'Object':
                for (const e of n.entries) {
                    this.emit('PUSH', e.key);
                    this.expr(e.value);
                }
                this.emit('MAKE_OBJECT', n.entries.length);
                break;
            case 'FuncExpr': {
                const sub = new Compiler(this.functions);
                sub.compileBlock(n.body.body);
                sub.emit('PUSH', null);
                sub.emit('RETURN');
                this.functions.push({ name: 'دالة_مجهولة', params: n.params, code: sub.code });
                this.emit('MAKE_FUNCTION', this.functions.length - 1, 'دالة_مجهولة');
                break;
            }
            case 'Assign': {
                if (n.target.type === 'Ident') {
                    this.expr(n.value);
                    this.emit('STORE', n.target.name);
                    this.emit('LOAD', n.target.name);
                }
                else if (n.target.type === 'Index') {
                    this.expr(n.target.object);
                    this.expr(n.target.index);
                    this.expr(n.value);
                    this.emit('SET_INDEX');
                }
                else if (n.target.type === 'Member') {
                    this.expr(n.target.object);
                    this.expr(n.value);
                    this.emit('SET_MEMBER', n.target.property);
                }
                break;
            }
            case 'Logical':
                this.expr(n.left);
                this.emit('TO_BOOL');
                const j = n.op === 'أو' ? this.emit('JUMP_IF_TRUE_KEEP', -1) : this.emit('JUMP_IF_FALSE_KEEP', -1);
                this.emit('POP');
                this.expr(n.right);
                this.patch(j, this.code.length);
                break;
            case 'Unary':
                this.expr(n.operand);
                this.emit(n.op === '-' ? 'NEG' : 'NOT');
                break;
            case 'Binary':
                this.expr(n.left);
                this.expr(n.right);
                this.emit('BIN', n.op);
                break;
            case 'Call':
                this.expr(n.callee);
                for (const a of n.args)
                    this.expr(a);
                this.emit('CALL', n.args.length);
                break;
            case 'Markup':
                for (const p of n.props) {
                    this.emit('PUSH', p.key);
                    this.expr(p.value);
                }
                for (const c of n.children)
                    this.expr(c);
                this.emit('MAKE_MARKUP', n.name, n.props.length, n.children.length);
                break;
            case 'MarkupText':
                this.emit('PUSH', new SafeText(n.value));
                break;
            case 'Await':
                this.expr(n.operand);
                this.emit('AWAIT');
                break;
            case 'Index':
                this.expr(n.object);
                this.expr(n.index);
                this.emit('GET_INDEX');
                break;
            case 'Member':
                this.expr(n.object);
                this.emit('GET_MEMBER', n.property);
                break;
            default: throw err.RuntimeError(`تعبير AST غير مدعوم في Compiler: ${n.type}`);
        } }
    }
    class VMFunction {
        constructor(meta, closure) { this.meta = meta; this.closure = closure; this.__dhadComponent = !!meta.component; this.__dhadAsync = !!meta.async; }
    }
    class BytecodeVM {
        constructor(interpreterFactory) { this.interpreterFactory = interpreterFactory; const host = interpreterFactory ? interpreterFactory() : null; this.runtime = host ? host.runtime : new DhadRuntime(); this.global = new Environment(); this.runtime.registerModule('رياضيات', buildMathModule(this.runtime), { version: 'builtin', api: this.runtime.apiVersion }); for (const [n, m] of buildStdlib(this.runtime))
            this.runtime.registerModule(n, m, { version: 'builtin', api: this.runtime.apiVersion }); this.runtime.registerModule('ويب', buildWeb(this.runtime), { version: 'builtin', api: this.runtime.apiVersion }); installGlobalBuiltins(this.global, null, this.runtime); this.runtime.callValue = (fn, args) => this.call(fn, args); if (host && host.onPrint)
            this.runtime.onPrint = host.onPrint; this.maxSteps = 2000000; this.steps = 0; }
        run(bytecode, source) { try {
            if (!bytecode || bytecode.version !== 2)
                throw err.RuntimeError('إصدار Bytecode غير مدعوم');
            this.functions = bytecode.functions || [];
            return this.execute(bytecode.entry, this.global, this.functions);
        }
        catch (e) {
            throw normalizeError(e);
        } }
        execute(code, env, functions) { const stack = []; const scopes = []; const loops = []; const handlers = []; let pendingError = null; let ip = 0; const pop = () => stack.pop(); const truth = v => this.runtime.truthy(v); while (ip < code.length) {
            if (++this.steps > this.maxSteps)
                throw err.RuntimeError('تجاوز Bytecode VM الحد الأقصى للتنفيذ');
            const ins = code[ip++];
            try {
                switch (ins.op) {
                    case 'PUSH':
                        stack.push(ins.args[0]);
                        break;
                    case 'POP':
                        pop();
                        break;
                    case 'DECLARE':
                        env.declare(ins.args[0], pop(), ins.args[1]);
                        break;
                    case 'LOAD':
                        stack.push(env.get(ins.args[0]));
                        break;
                    case 'STORE': {
                        const v = pop();
                        env.set(ins.args[0], v);
                        stack.push(v);
                        break;
                    }
                    case 'SCOPE_PUSH':
                        scopes.push(env);
                        env = new Environment(env);
                        break;
                    case 'SCOPE_POP':
                        env = scopes.pop();
                        break;
                    case 'PRINT': {
                        const n = ins.args[0], vals = stack.splice(stack.length - n, n);
                        this.runtime.onPrint(vals.map(v => this.runtime.stringify(v)).join(' '));
                        break;
                    }
                    case 'JUMP':
                        ip = ins.args[0];
                        break;
                    case 'JUMP_IF_FALSE':
                        if (!truth(stack[stack.length - 1]))
                            ip = ins.args[0];
                        break;
                    case 'JUMP_IF_TRUE_KEEP':
                        if (truth(stack[stack.length - 1]))
                            ip = ins.args[0];
                        break;
                    case 'JUMP_IF_FALSE_KEEP':
                        if (!truth(stack[stack.length - 1]))
                            ip = ins.args[0];
                        break;
                    case 'TO_BOOL':
                        stack[stack.length - 1] = truth(stack[stack.length - 1]);
                        break;
                    case 'NEG': {
                        const v = pop();
                        if (typeof v !== 'number')
                            throw err.TypeError('عملية (-) تحتاج رقمًا');
                        stack.push(-v);
                        break;
                    }
                    case 'NOT':
                        stack.push(!truth(pop()));
                        break;
                    case 'BIN': {
                        const r = pop(), l = pop();
                        stack.push(this.binary(ins.args[0], l, r));
                        break;
                    }
                    case 'MAKE_LIST': {
                        const n = ins.args[0];
                        stack.push(stack.splice(stack.length - n, n));
                        break;
                    }
                    case 'MAKE_MARKUP': {
                        const [name, np, nc] = ins.args;
                        const children = stack.splice(stack.length - nc, nc);
                        const pairs = stack.splice(stack.length - np * 2, np * 2);
                        const props = new DhadObject();
                        for (let i = 0; i < pairs.length; i += 2)
                            props.fields.set(pairs[i], pairs[i + 1]);
                        let comp = null;
                        try {
                            comp = env.get(name);
                        }
                        catch (_) { }
                        if (comp instanceof VMFunction && comp.meta.component) {
                            stack.push(this.call(comp, [props, children]));
                        }
                        else
                            stack.push(new VNode(name, this.runtime.toJS(props), children));
                        break;
                    }
                    case 'MAKE_OBJECT': {
                        const n = ins.args[0], o = new DhadObject();
                        for (let i = 0; i < n; i++) {
                            const v = pop(), k = pop();
                            o.fields.set(k, v);
                        }
                        stack.push(o);
                        break;
                    }
                    case 'GET_INDEX': {
                        const idx = pop(), obj = pop();
                        if (obj instanceof DhadObject) {
                            if (typeof idx !== 'string' || !obj.fields.has(idx))
                                throw err.IndexError('المفتاح غير موجود في القاموس');
                            stack.push(obj.fields.get(idx));
                            break;
                        }
                        if (!Array.isArray(obj) && typeof obj !== 'string')
                            throw err.TypeError('لا يمكن الفهرسة إلا في نص أو قائمة أو قاموس');
                        if (typeof idx !== 'number' || !Number.isInteger(idx) || idx < 0 || idx >= obj.length)
                            throw err.IndexError('الفهرس خارج الحدود');
                        stack.push(obj[idx]);
                        break;
                    }
                    case 'SET_INDEX': {
                        const val = pop(), idx = pop(), obj = pop();
                        if (obj instanceof DhadObject) {
                            if (typeof idx !== 'string')
                                throw err.TypeError('مفتاح القاموس يجب أن يكون نصًا');
                            obj.fields.set(idx, val);
                            stack.push(val);
                            break;
                        }
                        if (!Array.isArray(obj))
                            throw err.TypeError('الإسناد بالفهرسة يحتاج قائمة أو قاموس');
                        if (typeof idx !== 'number' || !Number.isInteger(idx) || idx < 0 || idx >= obj.length)
                            throw err.IndexError('الفهرس خارج الحدود');
                        obj[idx] = val;
                        stack.push(val);
                        break;
                    }
                    case 'GET_MEMBER': {
                        const obj = pop();
                        const p = ins.args[0];
                        if (obj instanceof DhadError) {
                            const fields = { الرسالة: obj.message, النوع: obj.kind, الرمز: obj.code, السطر: obj.line ?? null, العمود: obj.column ?? null, الطول: obj.length ?? 1, النص: obj.text ?? null, الاقتراح: obj.suggestion ?? null, المصدر: obj.source ?? null, سلسلة_الاستدعاء: obj.stackTrace ?? [] };
                            if (!(p in fields))
                                throw err.NameError(`'${p}' غير موجود داخل الخطأ`);
                            stack.push(fields[p]);
                            break;
                        }
                        if ((obj instanceof DhadObject || obj instanceof DhadModule) && obj.fields.has(p)) {
                            stack.push(obj.fields.get(p));
                            break;
                        }
                        throw err.NameError(`'${p}' غير موجود`);
                    }
                    case 'SET_MEMBER': {
                        const val = pop(), obj = pop();
                        if (!(obj instanceof DhadModule) || obj.readonly)
                            throw err.TypeError('الوحدة للقراءة فقط');
                        obj.fields.set(ins.args[0], val);
                        stack.push(val);
                        break;
                    }
                    case 'TRY_ENTER':
                        handlers.push({ catchIp: ins.args[0], finallyIp: ins.args[1], catchName: ins.args[2] });
                        break;
                    case 'TRY_EXIT':
                        handlers.pop();
                        break;
                    case 'CATCH_BIND': {
                        if (pendingError) {
                            env.declare(ins.args[0] || 'خطأ', pendingError, false);
                            pendingError = null;
                        }
                        break;
                    }
                    case 'CLEAR_PENDING':
                        pendingError = null;
                        break;
                    case 'RETHROW_PENDING':
                        if (pendingError) {
                            const e = pendingError;
                            pendingError = null;
                            throw e;
                        }
                        break;
                    case 'MAKE_FUNCTION':
                        stack.push(new VMFunction(functions[ins.args[0]], env));
                        break;
                    case 'CALL': {
                        const n = ins.args[0], args = stack.splice(stack.length - n, n), fn = pop();
                        stack.push(this.call(fn, args));
                        break;
                    }
                    case 'AWAIT': {
                        const v = pop();
                        if (v && typeof v.then === 'function')
                            throw err.RuntimeError('Bytecode VM: انتظر يحتاج async backend');
                        stack.push(v);
                        break;
                    }
                    case 'IMPORT': {
                        const name = ins.args[0], mod = this.runtime.importModule(name, '<bytecode>', {});
                        stack.push(mod);
                        break;
                    }
                    case 'EXPORT': break;
                    case 'FOR_INIT': {
                        const to = pop(), from = pop();
                        if (typeof from !== 'number' || typeof to !== 'number')
                            throw err.TypeError('حدود حلقة لكل يجب أن تكون أرقامًا');
                        loops.push({ varName: ins.args[0], current: from, to, step: to >= from ? 1 : -1 });
                        break;
                    }
                    case 'FOR_NEXT': {
                        const f = loops[loops.length - 1];
                        if (!f) {
                            ip = ins.args[0];
                            break;
                        }
                        if ((f.step > 0 && f.current > f.to) || (f.step < 0 && f.current < f.to)) {
                            ip = ins.args[0];
                            break;
                        }
                        env.declare(f.varName, f.current, false);
                        f.current += f.step;
                        break;
                    }
                    case 'FOR_END':
                        loops.pop();
                        break;
                    case 'RETURN': return pop();
                    case 'HALT': return stack.length ? pop() : null;
                    default: throw err.RuntimeError(`تعليمة Bytecode غير معروفة: ${ins.op}`);
                }
            }
            catch (e) {
                if (handlers.length) {
                    const h = handlers.pop();
                    pendingError = normalizeError(e);
                    ip = h.catchIp >= 0 ? h.catchIp : (h.finallyIp >= 0 ? h.finallyIp : code.length);
                    continue;
                }
                throw e;
            }
        } }
        call(fn, args, loc = {}) {
            if (fn && fn.__native) {
                const v = fn.call(args);
                return v === undefined ? null : v;
            }
            if (fn instanceof DhadFunction) {
                if (fn.decl && fn.decl.async)
                    throw err.RuntimeError('الدالة غير_متزامن لا تعمل داخل Bytecode VM حاليًا؛ شغّل الملف بدون --vm.');
                if (this.interpreterFactory) {
                    const host = this.interpreterFactory();
                    if (host && typeof host.callValue === 'function')
                        return host.callValue(fn, args, loc);
                }
                throw err.RuntimeError('تعذر تشغيل دالة الوحدة المستوردة من Bytecode VM');
            }
            if (fn && fn.__dhadAsync)
                throw err.RuntimeError('الدالة غير_متزامن لا تعمل داخل Bytecode VM حاليًا؛ شغّل الملف بدون --vm.');
            if (fn instanceof VMFunction) {
                if (args.length !== fn.meta.params.length)
                    throw err.ArgumentError(`الدالة '${fn.meta.name}' تحتاج ${fn.meta.params.length} وسيطًا لكن استُقبل ${args.length}`);
                const e = new Environment(fn.closure);
                fn.meta.params.forEach((p, i) => e.declare(typeof p === 'string' ? p : p.name, args[i]));
                return this.execute(fn.meta.code, e, this.functions || []);
            }
            throw err.TypeError('القيمة ليست دالة قابلة للاستدعاء', loc);
        }
        binary(op, l, r) { if (op === '+') {
            if (typeof l === 'string' || typeof r === 'string')
                return this.runtime.stringify(l) + this.runtime.stringify(r);
            if (Array.isArray(l) && Array.isArray(r))
                return l.concat(r);
            if (typeof l === 'number' && typeof r === 'number')
                return l + r;
            throw err.TypeError('لا يمكن جمع هذه القيم');
        } if (['-', '*', '/', '%'].includes(op)) {
            if (typeof l !== 'number' || typeof r !== 'number')
                throw err.TypeError(`العملية '${op}' تحتاج أرقامًا`);
            if ((op === '/' || op === '%') && r === 0)
                throw err.RuntimeError('القسمة على صفر');
            return op === '-' ? l - r : op === '*' ? l * r : op === '/' ? l / r : l % r;
        } if (op === '==')
            return this.runtime.equals(l, r); if (op === '!=')
            return !this.runtime.equals(l, r); if (['<', '>', '<=', '>='].includes(op)) {
            if (typeof l !== typeof r || (typeof l !== 'number' && typeof l !== 'string'))
                throw err.TypeError('لا يمكن المقارنة بين هذه القيم');
            return op === '<' ? l < r : op === '>' ? l > r : op === '<=' ? l <= r : l >= r;
        } throw err.RuntimeError(`عملية غير معروفة: '${op}'`); }
    }
    function compile(source, options = {}) { return new Compiler().compile(source, options); }
    class LanguageService {
        constructor(options = {}) {
            this.strictTypes = !!options.strictTypes;
            this.words = Object.freeze([
                ...new Set(['اطبع', 'خلي', 'ثابت', 'إذا', 'وإلا', 'طالما', 'لكل', 'من', 'إلى', 'دالة', 'إرجع', 'توقف', 'استمر', 'استورد', 'تصدير', 'صحيح', 'خطأ', 'لاشيء', 'و', 'أو', 'ليس', 'حاول', 'التقط', 'أخيرًا', 'غير_متزامن', 'انتظر', 'مكوّن', 'ويب', 'تصميم', 'ألوان', 'قوائم', 'رياضيات', 'نصوص', 'JSON', 'متجر', 'موجه', 'طول', 'نوع', 'نطاق', 'تحويل', 'عدد', 'نص'])
            ]);
        }
        analyze(source) {
            const text = String(source ?? '');
            try {
                const program = new Parser(new Lexer(text).tokenize()).parseProgram();
                const analyzer = new SemanticAnalyzer({ strictTypes: this.strictTypes });
                return { diagnostics: analyzer.analyze(program), program };
            }
            catch (e) {
                return { diagnostics: [normalizeError(e)], program: null };
            }
        }
        diagnostics(source) { return this.analyze(source).diagnostics; }
        completions(prefix = '') {
            const q = String(prefix ?? '').trim();
            return this.words.filter(w => !q || w.startsWith(q)).map(label => ({ label, kind: /^(ويب|تصميم|ألوان|قوائم|رياضيات|نصوص|JSON|متجر|موجه)$/.test(label) ? 'library' : 'keyword' }));
        }
    }
    return { Lexer, Parser, Interpreter, SemanticAnalyzer, LanguageService, DhadError, DhadModule, DhadRuntime, ModuleRegistry, err, formatError, normalizeError, KIND_LABELS_AR, NODE_SHAPES, TrustedHTML, SafeText, VNode, Renderer, h, ReactiveState, createState, CSSRule, CSSStyleSheetModel, BytecodeVM, compile };
});
