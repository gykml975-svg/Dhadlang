# مراجعة أمنية داخلية

## نتائج المراجعة
- JavaScript Bridge لا يقبل أوامر `openFile`/`saveFile` إلا عندما يكون عنوان WebView داخل `file:///android_asset/`.
- الروابط HTTP/HTTPS لا تُحمّل داخل WebView؛ تُمرر إلى Intent خارجي.
- `file://` لا يملك Universal Access، كما أن Safe Browsing مفعّل حيث يدعمه النظام.
- Cleartext HTTP معطل.
- ملفات المستخدم تمر عبر Storage Access Framework وبحد 55 MiB، مع فحص إضافي أثناء القراءة.
- حفظ المحتوى من Bridge يُرفض إذا تجاوز 55 MiB قبل فتح واجهة الحفظ.
- لا يوجد fallback لتوقيع release بمفتاح debug.

## حدود ما يمكن إثباته آليًا
لا يمكن للـCI إثبات سلامة كل WebView/Chrome إصدارًا بإصدار، ولا يمكنه إثبات أمان خدمة خارجية يكتبها المستخدم. يجب إجراء اختبار اختراق خارجي قبل اعتماد التطبيق في بيئة عالية الحساسية.

- واجهة التنفيذ تستخدم Document منفصلًا عن واجهة IDE لمنع البرنامج من قراءة أو تعديل عناصر المحرر مباشرة.
- WebSocket والتحميل الديناميكي للحزم وعمليات السلة والحافظة أصبحت خلف capability gates.
- عناصر DOM التنفيذية (script/iframe/object/embed/base/frame/frameset) محظورة داخل بيئة التنفيذ.
- روابط DOM الخطرة (`javascript:`, `vbscript:`, وdata HTML/JavaScript) مرفوضة.
