# Release وGoogle Play

## قبل الإصدار
- إعداد keystore إنتاجي في Codemagic Secrets.
- تعيين `CM_KEYSTORE_PATH`, `CM_KEYSTORE_PASSWORD`, `CM_KEY_ALIAS`, `CM_KEY_PASSWORD`.
- بناء `bundleRelease` واختبار AAB.
- مراجعة `versionCode` و`versionName` لكل إصدار.
- فحص R8/ProGuard واختبار التطبيق بعد minification.
- إعداد Adaptive Icon مضاف بالفعل في الإصدار الحالي.
- تجهيز سياسة الخصوصية وData Safety وContent Rating وStore Listing.
- اختبار Android lifecycle، استعادة المسودة، فتح/حفظ الملفات، الوضع الداكن، TalkBack، وفشل/نجاح الشبكة.

## ممنوع في الإنتاج
- Debug signing.
- أسرار داخل Git.
- cleartext HTTP.
- تحميل صفحات خارجية داخل origin التطبيق.
