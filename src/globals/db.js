import { Client } from 'pg';

export function getDBClient(){
    return new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://ohqmuazuwjhluz:f0e6b48f709290d12ff994bc0435f16fc9c60cf194d9809508d0168d59552a1a@ec2-54-197-234-117.compute-1.amazonaws.com:5432/d3v0igscdvakr',
      ssl: process.env.DATABASE_URL? true: true,
    });
  }