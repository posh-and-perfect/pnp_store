import orders from "@data/orders";


export default function handler(req, res) {
    res.status(200).json(orders);
}