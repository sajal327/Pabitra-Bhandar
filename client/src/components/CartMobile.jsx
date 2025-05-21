import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="fixed bottom-0 p-0 w-full ">
          <div className="bg-gradient-to-r from-red-700 to-rose-500 text-white shadow-md rounded-t-xl px-4 py-3 text-sm flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="bg-white text-rose-600 p-2 rounded-full shadow">
                <FaCartShopping />
              </div>
              <div className="text-xs leading-tight">
                <p className="font-semibold">{totalQty} items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>
            <Link
              to={"/cart"}
              className="bg-white text-rose-600 font-medium px-3 py-1 rounded-full flex items-center gap-1 hover:bg-rose-600 hover:text-white transition-all duration-300 text-sm"
            >
              View Cart
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}

      {/* {cartItem[0] && (
        <div className="sticky bottom-0 p-2">
          <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit">
                <FaCartShopping />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>

            <Link to={"/cart"} className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CartMobileLink;
