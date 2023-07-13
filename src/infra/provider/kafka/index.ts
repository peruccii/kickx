const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  brokers: ['large-goshawk-12565-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'bGFyZ2UtZ29zaGF3ay0xMjU2NSRB8fTVaRG8hvzw0XBKyCHvBAh3Tfb01KSpqAY',
    password: '********',
  },
  ssl: true,
})

export { kafka }