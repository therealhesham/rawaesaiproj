const {DocumentProcessorServiceClient} = require('@google-cloud/documentai');

async function enableProcessor() {
  // TODO: Replace these values
// تهيئة Document AI من متغيرات البيئة أو القيم الافتراضية
const projectId = process.env.GCP_PROJECT_ID || 'eastern-amp-471710-u4';
const location = process.env.GCP_LOCATION || 'us';
const processorId = process.env.GCP_PROCESSOR_ID || 'abc7c6209dbadfc1';

  const client = new DocumentProcessorServiceClient();

  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  const [operation] = await client.disableProcessor({name});

  console.log('Enabling processor, waiting for operation to complete...');
  const [response] = await operation.promise();

  console.log('Processor enabled:', response);
}

enableProcessor().catch(console.error);
