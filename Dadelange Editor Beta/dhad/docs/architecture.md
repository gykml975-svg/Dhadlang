# معمارية ضاد

- `app/src/main/assets/dhad.browser.js`: اللغة، Lexer/Parser/Runtime، الخدمات الأساسية.
- `app/src/main/assets/index.html`: واجهة IDE وتجربة الكتابة؛ لا يتم تغيير محرر النص نفسه عند إضافة خدمات الإدارة.
- `app/src/main/java/org/dhadlang/android/MainActivity.java`: حاوية Android، lifecycle، WebView وStorage Access Framework.
- `tests/`: اختبارات اللغة وخدمات IDE.
- `ci/`: بوابة التحقق قبل البناء.
- `docs/`: مواصفة اللغة، الأمن، الاختبارات، النشر وخارطة IDE.

التوسع القادم يفصل طبقات IDE إلى وحدات JavaScript مستقلة أثناء عملية build، مع إبقاء asset النهائي واحدًا لضمان سرعة التشغيل وعدم تغيير تجربة المحرر.
