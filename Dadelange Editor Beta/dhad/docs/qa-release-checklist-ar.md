# قائمة QA للإطلاق

## آلي

- اختبارات اللغة: `node tests/language.test.js`
- اختبارات IDE: `node tests/ide.test.js`
- فحوصات الإنتاج: `node tests/production.test.js`
- تحقق المشروع: `./ci/verify_project.sh`
- Android instrumentation: `./ci/run_android_instrumentation.sh`

## يدوي قبل المتجر

- فتح وحفظ ملف أكبر من 55 MiB يجب أن يُرفض بوضوح.
- ملف Unicode/عربي مع أسماء طويلة.
- إلغاء File Picker.
- تدوير الشاشة أثناء التحرير.
- background/foreground ثم قتل العملية واسترجاع المشروع.
- تشغيل Release بعد R8.
- TalkBack: أسماء الأزرار، ترتيب التركيز، رسائل الأخطاء، تكبير النص 200%.
- اختبار شبكة غير موثوقة ورفض cleartext.
- مراجعة Bridge وفتح الروابط الخارجية.
- فحص AAB بالتوقيع الصحيح.
- إكمال Play Console: سياسة الخصوصية، Data Safety، Content Rating، Store Listing.
