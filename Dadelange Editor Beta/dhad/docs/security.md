# نموذج الأمان

- WebView لا يسمح بـ Universal Access من `file://`.
- cleartext HTTP معطل.
- الروابط الخارجية تُفتح خارج WebView.
- JavaScript bridge محصور في الصفحة المحلية للتطبيق؛ لا ينبغي تحميل محتوى خارجي داخل نفس WebView.
- ملفات المستخدم تقرأ وتكتب عبر Storage Access Framework مع حد 55 MiB.
- تشغيل البرنامج من داخل IDE يستخدم Document منفصلًا عن واجهة المحرر، ويمنع عناصر DOM التنفيذية مثل script/iframe/object/embed، ويضع صلاحيات الشبكة/التخزين/الحافظة/النوافذ/التنقل خلف منح صريح.
