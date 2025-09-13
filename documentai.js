const {DocumentProcessorServiceClient} = require('@google-cloud/documentai').v1;
const fs = require('fs').promises;

// استبدل هذه القيم بقيم مشروعك
const projectId = 'eastern-amp-471710-u4';
const location = 'us'; // أو 'eu'
const processorId = 'abc7c6209dbadfc1';
const filePath = 'input.pdf'; // مسار المستند

// إنشاء عميل Document AI
const client = new DocumentProcessorServiceClient();

async function processDocument() {
  try {
    // إنشاء اسم المورد الكامل للمعالج
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // قراءة محتوى المستند
    const documents = await fs.readFile(filePath);
    
    // تحويل المستند إلى تنسيق base64
    const encodedDocument = Buffer.from(documents).toString('base64');

    // إعداد طلب معالجة المستند
    const request = {
      name,
      rawDocument: {
        content: encodedDocument,
        mimeType: 'application/pdf',
      },
    };

    // إرسال الطلب لمعالجة المستند
    const [result] = await client.processDocument(request);
    const {document} = result;

    // استخراج النصوص من المستند
    console.log('النص المستخرج:');
    console.log(document.text);

  if (document.entities) {
  const entitiesJson = {};

  for (const entity of document.entities) {
    const key = entity.type;
    const value = entity.mentionText || '';

    // لو الحقل مكرر (زي nationality مرتين)، ناخد آخر قيمة أو ندمجهم
    entitiesJson[key] = value;
  }

  console.log('الحقول المستخرجة (JSON):');
  console.log(entitiesJson);
}


  } catch (error) {
    console.error('حدث خطأ أثناء معالجة المستند:', error);
  }
}

// تشغيل الدالة
processDocument();