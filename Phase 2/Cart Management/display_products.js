"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var productsData;
var cartItems = [];
function fetchProducts() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, card_header, card_content, card_footer, productsData_1, productsData_1_1, ele, e_1_1, element;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/products")];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    productsData = _b.sent();
                    card_header = "<div id='card row'>";
                    card_content = "";
                    card_footer = "</div>";
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 8, 9, 14]);
                    productsData_1 = __asyncValues(productsData);
                    _b.label = 4;
                case 4: return [4 /*yield*/, productsData_1.next()];
                case 5:
                    if (!(productsData_1_1 = _b.sent(), !productsData_1_1.done)) return [3 /*break*/, 7];
                    ele = productsData_1_1.value;
                    // console.log(`${ele.title} ${ele.price} ${ele.description}\n`);
                    card_content += "<div class=\"card col\" style=\"width: 18rem; height: 30rem;margin: 20px\">\n                      <img height=\"250em\" src=\"" + ele.image + "\" alt=\"Image failed to load\">\n                      <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + ele.title + "</h5>\n                        <h6 class=\"card-subtitle mb-2 text-muted\">$ " + ele.price + "</h6>\n                        <button type=\"submit\" class=\"btn btn-primary\" onclick=\"addToCart(" + ele.id + ")\">Add to cart</button>\n                      </div>\n                    </div>\n    ";
                    _b.label = 6;
                case 6: return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(productsData_1_1 && !productsData_1_1.done && (_a = productsData_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(productsData_1)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    card_content = card_header + card_content + card_footer;
                    element = document.getElementById("allProducts");
                    element.innerHTML = card_content;
                    return [2 /*return*/];
            }
        });
    });
}
function displayCart() {
    // if cart is not empty
    if (cartItems) {
        var cart_item_card_header = "<div id=' cartCardDiv' >";
        var cart_item_card_content = "";
        var cart_item_card_footer = "</div>";
        var sum = 0;
        for (var _i = 0, cartItems_1 = cartItems; _i < cartItems_1.length; _i++) {
            var ele = cartItems_1[_i];
            cart_item_card_content += "<div class=\"card \">\n                        <div class=\"card-body\">\n                            <h6 class=\"card-title\">" + ele.title + "</h6>\n                            <p class=\"card-subtitle mb-2 text-muted\">" + ele.quantity + " x $" + ele.pricePerItem + "</p>\n                            <button class=\"btn btn-outline-primary type=\"button\" onClick=\"incrementQuantity(" + ele.id + ")\">+</button>\n                            <label id=\"quantityInput\">" + ele.quantity + "</label>                            \n                            <button class=\"btn btn-outline-primary type=\"button\" onClick=\"decrementQuantity(" + ele.id + ")\">-</button>\n                            <button class=\"btn btn-danger type=\"button\" onClick=\"deleteItem(" + ele.id + ")\">Delete</button>\n                        </div>\n                        </div>\n        ";
            sum += (ele.quantity * ele.pricePerItem);
        }
        sum = Math.round(sum * 100) / 100;
        cart_item_card_content = cart_item_card_header + cart_item_card_content + cart_item_card_footer;
        var canvas_body_content = document.getElementById("canvas-body");
        canvas_body_content.innerHTML = cart_item_card_content + ("<h5>Total:\t" + sum + "</h5>");
    }
    else { // cart is empty. display a message
        var canvas_body_content = document.getElementById("canvas-body");
        canvas_body_content.innerHTML = "<p>Your cart looks empty. Let's add some stuff.. </p>";
    }
}
function incrementQuantity(id) {
    for (var _i = 0, cartItems_2 = cartItems; _i < cartItems_2.length; _i++) {
        var ele = cartItems_2[_i];
        if (ele.id === id) {
            ele.quantity += 1;
            break;
        }
    }
    displayCart();
}
function decrementQuantity(id) {
    for (var _i = 0, cartItems_3 = cartItems; _i < cartItems_3.length; _i++) {
        var ele = cartItems_3[_i];
        if (ele.id === id) {
            ele.quantity -= 1;
            if (ele.quantity <= 0) {
                deleteItem(ele.id);
            }
            break;
        }
    }
    displayCart();
}
function deleteItem(id) {
    var updatedCartObj = cartItems;
    cartItems = updatedCartObj.filter(function (e) { return e.id != id; });
    alert("Item deleted!!");
    displayCart();
}
function addToCart(id) {
    try {
        // if cart is not empty
        if (cartItems) {
            var duplicate = false; // keeps track of duplicate items in the cart
            // find the item in the cart that matches the id of the currently selected item (or id passed throught the parameter)
            for (var _i = 0, cartItems_4 = cartItems; _i < cartItems_4.length; _i++) {
                var ele = cartItems_4[_i];
                if (ele.id === id) { // if the id matches, incremen t the quantity by 1 and mark it as duplicate
                    ele.quantity += 1;
                    duplicate = true;
                    break;
                }
            }
            // No duplicate found, so add this new item to the cart
            if (duplicate == false) {
                var obj = cartItems; // temporary cart interface object array
                var product = productsData.find(function (e) { return e.id === id; }); // find the product from the external json with the matching id
                // create an interface object and copy the data from the product above
                var item = {
                    id: product.id,
                    title: product.title,
                    quantity: 1,
                    pricePerItem: product.price,
                };
                // push the interface object to the temporary interface object array
                obj.push(item);
                // reassign the cartItem with the temporary object
                cartItems = obj;
            }
        }
        else { // cart is empty
            var obj = []; // // initialize the temporary cart interface object array to an empty array
            var product = productsData.find(function (e) { return e.id === id; }); // find the product from the external json with the matching id
            // create an interface object and copy the data from the product above
            var item = {
                id: product.id,
                title: product.title,
                quantity: 1,
                pricePerItem: product.price,
            };
            // push the interface object to the temporary interface object array
            obj.push(item);
            // reassign the cartItem with the temporary object
            cartItems = obj;
        }
        // console.log(cartItems);
    }
    catch (error) {
        console.log("Error = " + error);
    }
}
function find(items, id) {
    items.forEach(function (element) {
        if (element.id === id) {
            return element.id;
        }
    });
    return -1;
}
