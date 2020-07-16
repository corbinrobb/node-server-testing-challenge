const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/', async (req, res) => {
  const data = await db('data');
  res.status(200).json(data);
})

server.post('/', async (req, res) => {
  const [id] = await db('data').insert(req.body);

  const added = await db('data').where({ id });

  res.status(201).json(added[0]);
})

server.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const removed = await db('data').where({id});

  await db('data').where({ id }).del()

  res.status(200).json(removed[0]);
})

module.exports = server;