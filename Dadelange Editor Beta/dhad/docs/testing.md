# استراتيجية الاختبار

## طبقات الاختبار
1. Lexer: Unicode، العربية، الأرقام، Bidi، النصوص والتعليقات.
2. Parser: الجمل، التعبيرات، precedence، الوحدات، async وmarkup.
3. Runtime: القيم، الأخطاء، الحدود، الاستيراد، async.
4. Browser: DOM، fetch، WebSocket، rendering وstorage عبر بيئة DOM حقيقية.
5. Android E2E: الفتح، الحفظ، الاستعادة، rotation، الخلفية، الوضع الداكن وTalkBack.
6. Fuzzing: مدخلات Unicode عشوائية وdeep nesting وملفات كبيرة.

## قاعدة CI
لا تُقبل إضافة ميزة لغوية دون اختبار regression، ولا تُعامل اختبارات DOM كاختبارات Node خالصة.
