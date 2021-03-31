/*
data sample - TBL_ASSIST_SET
{
  "name": "睦月如月",
  "canUpgrade": true,
  "accessDay": [0, 1, 2, 3, 4, 5, 6],
  "equipId": "nWnhwPEYaS"
}
*/

const JSSTORE_WORKER_JS_LOCATION = 'lib/js.store/jsstore.worker.js';
let dbName = 'JsStore_Test';  // TODO 合适的时机使用更正式的数据库名称

// jsstore尚不能在array或object中进行快速的数据搜索/过滤
//   应对需要在数组中搜索需要数据, 表中需额外创建字符串字段代替数组发挥作用, 以空间换取搜索数组功能的实现
function getDbSchema() {

  let tblAssist = {
    name: 'ASSIST',
    columns: {
      id: { primaryKey: true, autoIncrement: true },
      name: { notNull: true, dataType: 'string' },
      canUpgrade: { notNull: true, dataType: 'boolean' },
      accessDay: { notNull: true, dataType: 'array' },
      accessDayStr: { notNull: true, dataType: 'string' },
      equipId: { notNull: true, dataType: 'number' }
    }
  };

  let tblEquipName = {
    name: 'EQUIP_NAME',
    columns: {
      id: { primaryKey: true, dataType: 'number' },
      name: { notNull: true, dataType: 'string' }
    }
  };

  let db = {
    name: dbName,
    tables: [tblAssist, tblEquipName]
  };
  return db;
}

let connection = new JsStore.Connection(new Worker(JSSTORE_WORKER_JS_LOCATION));
console.assert((!!connection), '数据库连接失败.');

async function initJsStore() {

  let database = getDbSchema();
  const isDbCreated = await connection.initDb(database);
  if (isDbCreated === true) {
    console.log('数据库已创建.');
    await initTblAssist();
    await initTblEquipName();
  } else {
    console.log('数据库已连接.');
  }
}

// init IndexedDB table ASSIST
async function initTblAssist() {

  const TBL_NAME = 'ASSIST';

  // 本小段代码在初始化表数据前从字段'accessDay'中获取数据并加以处理放入字段'accessDayStr',
  //   使用join('')是为了将数组拼合结果由'1,2,3,4,5'变为'12345', 用于实现jsstore不能遍历搜索数组的特性
  TBL_ASSIST_SET.forEach(item => {
    item.accessDayStr = item.accessDay.join('');
  });

  let dataInsertCount = await connection.insert({
    into: TBL_NAME,
    values: TBL_ASSIST_SET
  });

  if (dataInsertCount > 0) {
    console.log(`表'${ TBL_NAME }'初始化已完成.`);
  } else {
    console.warn(`初始化失败, 表'${ TBL_NAME }'没有录入数据.`);
  }
}

async function initTblEquipName() {

  const TBL_NAME = 'EQUIP_NAME';

  let dataInsertCnt = await connection.insert({
    into: TBL_NAME,
    values: TBL_EQUIP_NAME_SET
  });

  if (dataInsertCnt > 0) {
    console.log(`表'${ TBL_NAME }'初始化已完成.`);
  } else {
    console.warn(`初始化失败, 表'${ TBL_NAME }'没有录入数据.`);
  }
}

initJsStore();