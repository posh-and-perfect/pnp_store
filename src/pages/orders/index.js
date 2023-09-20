import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import Breadcrumb from '@components/ui/breadcrumb';
import Header from '@components/header';
import Footer from '@components/footer';
import { HomePagesNavData as navContent } from '@data/navbar';
import ContentWrapper from "@components/wrapper";



const OrdersPage = () => {

  const logo = "/assets/images/logo/logo_hztl_tr.png"

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders/1');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Your orders</title>
        <meta name="description" content="Best Zambian Online Store for Authentic Fashion Brands" />
      </Head>

      <Header
        logo={logo}
        dark={false}
        navData={navContent}
        navbarAlignment="center"
        showNotificationBar={false}
      />
      

      <ContentWrapper>
        <Breadcrumb />
        <div className="container">
          <h1 className="mt-4 mb-3">Your Orders</h1>
          {Array.isArray(orders) && orders.length > 0 ? (
            <div className="row">
              {orders.map((order) => (
                <div className="col-md-6 col-lg-4 mb-4" key={order.id}>
                  <div className="card h-100">
                    <img
                      src={order.productImage}
                      className="card-img-top"
                      alt={order.productName}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{order.productName}</h5>
                      <p className="card-text">Discount: {order.discount}%</p>
                      {order.deliveryDate && (
                        <p className="card-text">Delivery Date: {order.deliveryDate}</p>
                      )}
                      {order.expectedDeliveryDate && (
                        <p className="card-text">Expected Delivery Date: {order.expectedDeliveryDate}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </ContentWrapper>

      <Footer logo={logo} />
    </Fragment>

  );
};

export default OrdersPage;