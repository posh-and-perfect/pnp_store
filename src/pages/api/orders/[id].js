import orders from "@data/orders";


export default function handler(req, res) {
    const { query: { id } } = req;

    // console.log(orders);

    const order = orders.filter(order => order.id === parseInt(id));

    if (!order) {
        res.status(404).json([]);
    } else {
        res.status(200).json(order);
    }
}