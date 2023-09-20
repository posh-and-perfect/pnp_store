// ./SRC/PAGES/ACCOUNT/INDEX.JS

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { refresh } from "next-auth/react";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import Header from "@components/header";
import Footer from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import ContentWrapper from "@components/wrapper";
import dummyOrders from "@data/orders";


const Profile = ({ session }) => {
  const router = useRouter();
  const logo = "/assets/images/logo/logo_hztl_tr.png"

  const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    creditCards: [],
  });

  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  useEffect(() => {
    if (!session) {
      router.push("/account/signin");
    }
  }, [session, router]);

  useEffect(() => {
    // Function to fetch user data when the component mounts
    const fetchUserData = async () => {
      if (session && session.user) {
        try {
          const response = await fetch("/api/user");
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % dummyOrders.length);
  };

  const prevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + dummyOrders.length) % dummyOrders.length);
  };

  useEffect(() => {
    // Function to slide images every three seconds
    const slideImages = () => {
      setImageIndex((prevIndex) => (prevIndex + 1) % dummyOrders.length);
    };

    // Start the interval when the component mounts
    const interval = setInterval(slideImages, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts  

  const handleUpdateUser = async () => {
    try {
      // Validate the user data to ensure required fields are not empty
      if (!user.name || !user.email || !user.phone || !user.address) {
        setUpdateError("Please fill in all required fields.");
        setTimeout(() => setUpdateError(null), 3000); // Hide the error message after 5 seconds
        return;
      }

      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setUpdateError(null); // Reset the error state on successful update
        setUpdateSuccess("Update successful");
        setTimeout(() => setUpdateSuccess(null), 3000); // Hide the error message after 5 seconds
        await refresh();
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Failed to update user:", errorData.error);
        setUpdateError("Failed to update user. Please try again later.");
        setTimeout(() => setUpdateError(null), 3000); // Hide the error message after 5 seconds
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      setUpdateError("Failed to update user. Please try again later.");
      setTimeout(() => setUpdateError(null), 3000); // Hide the error message after 5 seconds
    }
  };


  return (
    <Fragment>
      <Head>
        <title>My Account - Posh and Perfect</title>
        <meta
          name="description"
          content="Best Zambian Online Store for Authentic Fashion Brands"
        />
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

        {/* Display an error message if user update fails */}
        {updateError && (
          <div className="row mt-3 justify-content-center">
            <div className="col-md-8">
              <div className="alert alert-danger" role="alert">
                {updateError}
              </div>
            </div>
          </div>
        )}

        {/* Display a success message if user update succeeds */}
        {updateSuccess && (
          <div className="row mt-3 justify-content-center">
            <div className="col-md-8">
              <div className="alert alert-success" role="alert">
                {updateSuccess}
              </div>
            </div>
          </div>
        )}

        <div className="row mt-5 justify-content-center">
          <div className="col-md-8">
            <div className="card text-center">
              <img
                src={user.avatar}
                className="card-img-top"
                alt="Profile"
                style={{ maxWidth: "200px" }}
              />
            </div>
            <table className="table mt-4">
              <tbody>
                <tr>
                  <td>Name: </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Username:</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleUpdateUser}>
              Update Profile
            </button>
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-md-8">
            <div className="card card-custom">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.date}</td>
                        <td>{order.total}</td>
                        <td>
                          {order.status === "completed" ? (
                            <p style={{ color: "green" }}>Delivered on:<br />{order.deliveryDate}</p>
                          ) : (
                            <p style={{ color: "red" }}>{order.status}</p>
                          )}
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <div
                              id={`carousel-${order.id}`}
                              className="carousel slide"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-inner">
                                {order.products.map((product, index) => (
                                  <div
                                    key={index}
                                    className={`carousel-item ${index === imageIndex ? "active" : ""}`}
                                  >
                                    <img
                                      src={product.image}
                                      className="d-block w-100"
                                      alt={product.name}
                                      style={{ maxWidth: "150px" }}
                                    />
                                    <p><strong>{product.name}</strong></p>
                                  </div>
                                ))}
                              </div>
                              <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#carousel-${order.id}`}
                                data-bs-slide="prev"
                                onClick={prevImage}
                              >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                              </button>
                              <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#carousel-${order.id}`}
                                data-bs-slide="next"
                                onClick={nextImage}
                              >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer logo={logo} />
      </ContentWrapper>
    </Fragment>
  );
};


export default Profile;


export async function getServerSideProps(context) {
  const session = await getSession(context); // Get the session on the server side

  if (!session?.user) {
    // If there is no user session, redirect to the signin page
    return {
      redirect: {
        destination: "/account/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session }, // Pass the session as props to the frontend
  };
}