import Router from 'koa-router'
import { getDBClient } from '@/globals/db'

async function queryVehicleMotion(client) {
  const result = await client.query('SELECT * FROM vaster.vehicle_motion ORDER BY id ASC LIMIT 10000;');
  for (let row of result.rows) {
    console.log(JSON.stringify(row));
  }
  return result.rows;
}

async function queryInsertVehicleMotion(client, vehicle_id,diver_id,route_id,company_id, latitude, longitude) {
  const query = `INSERT INTO vaster."vehicle_motion" 
    (vehicle_id, driver_id, route_id, company_id, latitude, longitude)
    VALUES (${vehicle_id}, ${diver_id}, ${route_id}, ${company_id}, ${latitude}, ${longitude});`;
    console.log('query Insert VehicleMotion',query);
  return await client.query(query);
}


function getVehicleMotion(client) {
  return async (context, next) => {
    const client = getDBClient();
    context.response.status = 200;
    client.connect();
    const VehicleMotion = await queryVehicleMotion(client);
    context.body = JSON.stringify(VehicleMotion);
    client.end();
    next();
  };
}

async function motion(vehicle_id='1',diver_id='1',route_id='1',company_id='1', latitude='0',longitude='0') {
  let client = getDBClient();
  client.connect();
  await queryInsertVehicleMotion(client, vehicle_id,diver_id,route_id,company_id,latitude,longitude);
  client.end();
}

function postMotion() {
  return async (context, next) => {
    motion(context.request.body.vehicle_id, context.request.body.diver_id, 
      context.request.body.route_id, context.request.body.company_id,
      context.request.body.latitude, context.request.body.longitude);
    context.response.status = 200;
    next();
  };
}

export function buildVehicleMotion() {
  const router = new Router();
  router.get('/vehicleMotion', getVehicleMotion());
  router.post('/vehiclemotion', postMotion());
  return router.routes();
}
