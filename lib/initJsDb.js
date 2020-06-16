/*
data example - TBL_ASSIST_SET
{
  "name": "睦月如月",
  "canUpgrade": true,
  "accessDay": [0, 1, 2, 3, 4, 5, 6],
  "equipId": "nWnhwPEYaS"
}
*/

const JSSTORE_WORKER_JS_LOCATION = 'lib/js.store/jsstore.worker.js';
let dbName = 'JsStore_Test';

function getDbSchema() {
  let tblProduct = {
    name: 'ASSIST',
    columns: {
      id: { primaryKey: true, autoIncrement: true },
      name: { notNull: true, dataType: 'string' },
      canUpgrade: { notNull: true, dataType: 'boolean' },
      accessDay: { notNull: true, dataType: 'array' },
      equipId: { notNull: true, dataType: 'string' }
    }
  };

  let db = {
    name: dbName,
    tables: [tblProduct]
  };
  return db;
}

let connection = new JsStore.Connection(new Worker(JSSTORE_WORKER_JS_LOCATION));
console.assert((!!connection), 'DB Connect failed');

async function initJsStore() {
  let database = getDbSchema();
  const isDbCreated = await connection.initDb(database);
  if (isDbCreated === true) {
    console.log('db created');
    await initTblAssist();
  } else {
    console.log('db opened');
  }
}

// init IndexedDB data
async function initTblAssist() {
  let noOfDataInserted = await connection.insert({
    into: 'ASSIST',
    values: TBL_ASSIST_SET
  });

  if (noOfDataInserted > 0) {
    console.log('Initialization processed.');
  } else {
    console.warn('Initialization failed.');
  }
}

initJsStore();