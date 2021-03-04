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
      accessDayStr: { notNull: true, dataType: 'string' },
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

  // jsstore不能在array或object中进行快速的数据搜索/过滤
  //   因此在select进行搜索时, 额外创建一个字符串property以代替原数组字段
  // 使用join('')是为了将数组拼合结果由'1,2,3,4,5'变为'12345'
  TBL_ASSIST_SET.forEach(item => {
    item.accessDayStr = item.accessDay.join('');
  });

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