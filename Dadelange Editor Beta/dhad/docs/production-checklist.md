# قائمة جاهزية الإنتاج

## منفذ في المصدر
- [x] cleartext HTTP معطل.
- [x] Universal Access من file URLs معطل.
- [x] الروابط الخارجية لا تُحمّل داخل WebView.
- [x] Bridge محصور في origin أصول التطبيق.
- [x] حد 55 MiB للقراءة والكتابة.
- [x] autosave واستعادة المشروع.
- [x] IndexedDB للملفات الكبيرة.
- [x] الوضع الداكن.
- [x] backup/data-extraction rules.
- [x] release لا يستخدم debug signing fallback.
- [x] R8/minify/shrink في release.
- [x] اختبارات Android instrumentation مضافة.
- [x] manifest مشروع `dhad.project.json`.
- [x] Go to Definition / Find References / Rename Symbol / تشخيص التنفيذ الأساسي.

## يتطلب حساب/جهازًا أو قرارًا خارجيًا
- [ ] وضع keystore الإنتاجي الفعلي في Codemagic Secrets.
- [ ] تشغيل instrumentation على جهاز/محاكي Android فعلي في CI.
- [ ] اختبار TalkBack فعلي.
- [ ] نشر سياسة الخصوصية على URL عام وإدخالها في Play Console.
- [ ] إكمال Data Safety وContent Rating وStore Listing.
- [ ] تفعيل Crash reporting بعد تحديد مزود وسياسة الخصوصية.
- [ ] مراجعة اختراق مستقلة قبل الإطلاق التجاري.
