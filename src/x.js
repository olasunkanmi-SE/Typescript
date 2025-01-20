const combineDuplicateOrders = (orders) => {
  const combinedOrders = [];
  const orderMap = {};

  orders.forEach((order) => {
    const orderNo = order.orderNo;

    if (!orderMap[orderNo]) {
      orderMap[orderNo] = {
        ...order,
        paymentMethod: [],
        referenceNumber: [],
      };
      combinedOrders.push(orderMap[orderNo]);
    }
    orderMap[orderNo].paymentMethod.push(order.paymentMethod);
    orderMap[orderNo].referenceNumber.push(order.referenceNumber);
  });

  combinedOrders.forEach((order) => {
    order.paymentMethod = order.paymentMethod.join(", ");
    order.referenceNumber = order.referenceNumber.join(", ");
  });

  return combinedOrders;
};

const y = [
  {
    orderNo: "24AA0535",
    amount: 50000,
    currency: "MYR",
    paymentMethod: "Online Banking / TT / ATM",
    referenceNumber: "Abc1234",
  },
  {
    orderNo: "24AA0535",
    amount: 0,
    currency: "USD",
    paymentMethod: "Online Banking / TT / ATM",
    referenceNumber: "Ea98880",
  },
  {
    orderNo: "24AA0536",
    amount: 10000,
    currency: "USD",
    paymentMethod: "Online Banking / TT / ATM",
    referenceNumber: "Ea98880",
  },
];

console.log(combineDuplicateOrders(y));
