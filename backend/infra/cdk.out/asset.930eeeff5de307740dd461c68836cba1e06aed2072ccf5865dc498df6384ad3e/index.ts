export const handler = async (event: any) => {
  console.log("Lambda invoked with event:", event);
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from the users-service!'),
  };
};