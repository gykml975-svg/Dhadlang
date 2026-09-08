# مواصفات IDE

## مكتمل
- حفظ محلي عبر localStorage وIndexedDB.
- ملفات متعددة وحد 500 ملف.
- autosave واستعادة المسودة.
- Language Service للتشخيص والإكمال.
- Find References وGo to Definition وRename Symbol.
- تشخيص تنفيذ أولي يحدد أول خطأ ثابت.
- أخطاء موحدة واقتراحات عربية.
- package manifest للمشروع.
- Android instrumentation smoke tests.
- WebView/Bridge hardening.

## خارج نطاق التنفيذ الآلي الكامل
- debugger تفاعلي حقيقي (step over/into/out، watch، call stack): يحتاج hooks داخل VM وتوقفًا تعاونيًا أثناء التنفيذ.
- profiler دقيق: يحتاج قياسات زمن/ذاكرة من WebView وAndroid.

هذه البنود لها تصميم أولي ويمكن إضافتها دون تغيير صيغة ملفات المشاريع.
