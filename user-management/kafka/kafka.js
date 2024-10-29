import kafka from "kafka";

const kafkaInstance = new kafka({
  clientId: "user-management-service",
  brokers: ["localhost:9092"],
});

export const producer = kafkaInstance.producer();
export const consumer = kafkaInstance.consumer({
  groupId: "user-management-group",
});

export const initKafka = async () => {
  try {
    await consumer.connect();
    await producer.connect();
    console.log("Kafka producer  and consumer connected successfully");
  } catch (error) {
    console.log("Error connecting to kafka", error);
  }
};
