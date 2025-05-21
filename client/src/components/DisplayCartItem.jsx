import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import imageEmpty from "../assets/cart.png";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };
  return (
    <section className="bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/***display items */}
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 border border-green-500 bg-green-50 text-green-700 rounded-full shadow-sm">
                <p className="font-medium">Your total savings</p>
                <p className="font-semibold">
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={item?._id + "cartItemDisplay"}
                        className="flex  w-full gap-4"
                      >
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className="object-scale-down"
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold">
                            {DisplayPriceInRupees(
                              pricewithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPriceInRupees(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Total Quantity</p>
                  <p className="flex items-center gap-2">{totalQty} item</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p className="flex items-center gap-2">Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Total Price</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={imageEmpty}
                className="w-48 h-40 my-9 object-scale-down"
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-red-700 px-4 py-2 text-white font-semibold rounded-full my-6"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {/* {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInRupees(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Proceed to check out
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )} */}
        {cartItem[0] && (
          <div className="p-1">
            <div className="bg-gradient-to-r from-red-700 to-rose-500 text-white shadow-lg rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-lg font-semibold">
                Total: {DisplayPriceInRupees(totalPrice)}
              </div>
              <button
                onClick={redirectToCheckoutPage}
                className="bg-white text-rose-600 font-medium text-sm sm:text-base md:text-sm px-4 py-2 rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                Proceed to Checkout
                <FaCaretRight className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
