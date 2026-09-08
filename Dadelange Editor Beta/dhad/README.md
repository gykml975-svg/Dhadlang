# ضاد — مشروع Android جاهز لـ Codemagic

هذه النسخة مُحسّنة للبناء السحابي وتقليل مشاكل اختلاف إصدارات Gradle وبيئة CI.

## ما تم تحسينه
- تثبيت Gradle على الإصدار **8.7** عبر bootstrap متحقق من SHA-256 في `gradlew`/`gradlew.bat`.
- `gradle.properties` مضبوط لـ UTF-8 وذاكرة Gradle وAndroidX.
- فحص تلقائي للملفات الأساسية قبل البناء عبر `ci/verify_project.sh`.
- Codemagic يستخدم `./gradlew` بدل الاعتماد على Gradle المثبت مسبقًا في الجهاز.
- استخدام `--stacktrace` لإظهار سبب الخطأ بوضوح إذا حدث فشل.
- إزالة اعتماد AppCompat غير المستخدم لتقليل الاعتماديات الخارجية.
- إصلاح حفظ الملفات عبر Storage Access Framework باستخدام `OutputStream` بدل افتراض نوع محدد.
- فتح الملف يعرض اسمه الحقيقي عندما يوفره مزود الملفات.

## مسارات Codemagic
- `android-debug` → ينتج APK للتجربة.
- `android-release-apk` → ينتج Release APK.
- `android-release-aab` → ينتج AAB للنشر على Google Play بعد إعداد التوقيع.

## الاستخدام
1. ارفع المشروع إلى GitHub أو GitLab أو Bitbucket.
2. أضف المستودع إلى Codemagic.
3. تأكد أن `codemagic.yaml` موجود في جذر المستودع.
4. شغّل `android-debug` أولًا للتأكد من نجاح البناء.
5. بعد نجاحه، استخدم `android-release-apk` أو `android-release-aab`.

## التوقيع
نسخة Release الحالية **تتطلب** إعداد توقيع إنتاجي؛ إذا لم توجد أسرار التوقيع يفشل البناء عمدًا. هذا يمنع إخراج Release موقّعًا بمفتاح debug.

للنشر الفعلي، أضف keystore الخاص بالتطبيق إلى Codemagic Secrets واضبط المتغيرات المطلوبة في workflow. لا تُحفظ الأسرار داخل Git.

## ملاحظة عن Gradle Wrapper
الملف `gradlew` هنا عبارة عن bootstrap صغير يثبت الإصدار المحدد من Gradle عند الحاجة، لأن بيئة إعداد المشروع لم تكن تحتوي على Gradle لتوليد `gradle-wrapper.jar` القياسي. عند تشغيله على Codemagic سيستخدم Gradle 8.7 المثبت مسبقًا إن كان الإصدار مطابقًا، وإلا ينزله ويتحقق من SHA-256 الرسمي ثم يخزنه في مجلد Gradle للمستخدم.


## قدرات الويب والإنتاج
- الحد الأقصى لفتح/قراءة الملف الواحد في Android: 55 MiB.
- المحرر يستخدم وضع ملف كبير فوق 1.5 MiB لتعطيل التلوين المكلف وتقليل استهلاك الذاكرة.
- المشاريع والملفات الكبيرة تُحفظ عبر IndexedDB، مع fallback للملفات الصغيرة في localStorage.
- لغة ضاد تدعم SPA عبر المكوّنات التفاعلية، الحالة التفاعلية، التصيير التفاضلي، الموجه، التحميل الكسول، Fetch/JSON، WebSocket، Workers، Local/Session Storage.
- تمت إضافة أدوات متجر أساسية: السلة، الكميات، الإجمالي، تنسيق العملة، وتخزين/تحميل كتالوج محلي.
- هذه القدرات تدعم بناء واجهات SPA ومتاجر إلكترونية كبيرة، بينما المصادقة والدفع وقاعدة البيانات الخلفية تظل خدمات Backend يجب ربطها عبر API آمن.


## ما تمت إضافته في الإصدار 1.0.0 المحسن

- إصلاح تسجيل وحدة `ويب` داخل Interpreter وBytecode VM.
- اختبار DOM/Async منفصل عن اختبارات Node الخالصة.
- `Dhad.LanguageService` للتشخيص والإكمال والـreferences الأساسية.
- autosave وخدمات lifecycle مشتركة مع Android.
- تنظيف WebView والـJavaScript bridge عند إغلاق Activity.
- وضع Dark للنظام وBackup rules أكثر تحفظًا.
- Release signing إجباري بدل debug fallback، مع minify/shrink.
- مواصفة لغة، استراتيجية اختبار، نموذج أمان، وخطة IDE وقائمة production.

## إصلاح حرج (بعد المراجعة)
- **إصلاح فشل بناء مؤكد:** `ProductionDiagnostics.java` يستخدم `BuildConfig.VERSION_NAME`، لكن AGP 8.0+ (المشروع يستخدم 8.6.1) يعطّل توليد `BuildConfig` افتراضيًا. بدون `buildFeatures { buildConfig true }` في `app/build.gradle` كان البناء سيفشل بالكامل على Codemagic برسالة `cannot find symbol: class BuildConfig`. تم إصلاحه، وأُضيف فحص وقائي في `ci/verify_project.sh` يمنع تكرار هذا الخطأ مستقبلًا.

## مثال ويب جاهز

لإنشاء موقع متجر كامل بلغة ضاد، افتح `examples/موقع_متجر.ضاد` أو اختر **موقع متجر بضاد** من الأمثلة الجاهزة داخل IDE.

لإغلاق فجوات الإنتاج راجع `docs/production-gap-closure-ar.md` وشغّل `node tests/production.test.js`.
