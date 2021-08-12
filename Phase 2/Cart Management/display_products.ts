import { iCart } from "./iCart";

let productsData: any;
let cartItems: iCart[] = [];

async function fetchProducts() {


  const response = await fetch("https://fakestoreapi.com/products");
  productsData = await response.json();
  // console.log(typeof(productsData));

  let card_header = "<div id='card row'>";
  let card_content = ``;
  let card_footer = "</div>";

  for await (const ele of productsData) {
    // console.log(`${ele.title} ${ele.price} ${ele.description}\n`);
    card_content += `<div class="card col" style="width: 18rem; height: 30rem;margin: 20px">
                      <img height="250em" src="${ele.image}" alt="Image failed to load">
                      <div class="card-body">
                        <h5 class="card-title">${ele.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">$ ${ele.price}</h6>
                        <button type="submit" class="btn btn-primary" onclick="addToCart(${ele.id})">Add to cart</button>
                      </div>
                    </div>
    `;
  }
  card_content = card_header + card_content + card_footer;
  // document.getElementById("allProducts")?.innerHTML = card_content;
  const element: HTMLElement = document.getElementById(
    "allProducts"
  ) as HTMLElement;
  element.innerHTML = card_content;
}

function displayCart() {
  // if cart is not empty
  if (cartItems) {
    let cart_item_card_header = "<div id=' cartCardDiv' >";
    let cart_item_card_content = ``;
    let cart_item_card_footer = "</div>";
    let sum: number = 0;    

    for (const ele of cartItems) {
      cart_item_card_content += `<div class="card ">
                        <div class="card-body">
                            <h6 class="card-title">${ele.title}</h6>
                            <p class="card-subtitle mb-2 text-muted">${ele.quantity} x $${ele.pricePerItem}</p>
                            <button class="btn btn-outline-primary type="button" onClick="incrementQuantity(${ele.id})">+</button>
                            <label id="quantityInput">${ele.quantity}</label>                            
                            <button class="btn btn-outline-primary type="button" onClick="decrementQuantity(${ele.id})">-</button>
                            <button class="btn btn-danger type="button" onClick="deleteItem(${ele.id})">Delete</button>
                        </div>
                        </div>
        `;
        sum+= (ele.quantity * ele.pricePerItem)
    }
    sum = Math.round(sum * 100) / 100;

    cart_item_card_content = cart_item_card_header + cart_item_card_content + cart_item_card_footer;

    const canvas_body_content: HTMLElement = document.getElementById("canvas-body") as HTMLElement;
    canvas_body_content.innerHTML = cart_item_card_content + `<h5>Total:\t${sum}</h5>`
  }
  else { // cart is empty. display a message
    let canvas_body_content: HTMLElement = document.getElementById("canvas-body") as HTMLElement;
    canvas_body_content.innerHTML = "<p>Your cart looks empty. Let's add some stuff.. </p>"
  }
}

function incrementQuantity(id: number){
  for (const ele of cartItems) {
    if (ele.id === id) {
      ele.quantity += 1;
      break;
    }
  }
  displayCart();
}

function decrementQuantity(id: number){
  for (const ele of cartItems) {
    if (ele.id === id) {
      ele.quantity -= 1;
      if(ele.quantity <= 0) {deleteItem(ele.id);}
      break;
    }
  }
  displayCart();
}

function deleteItem(id: number) {//ele: number) {

  let updatedCartObj: iCart[] = cartItems;
  cartItems = updatedCartObj.filter(e => e.id != id);
  alert("Item deleted!!")
  displayCart();
}


function addToCart(id: number) {
  try {
    // if cart is not empty
    if (cartItems) {

      let duplicate: boolean = false;  // keeps track of duplicate items in the cart

      // find the item in the cart that matches the id of the currently selected item (or id passed throught the parameter)
      for (const ele of cartItems) {
        if (ele.id === id) {  // if the id matches, incremen t the quantity by 1 and mark it as duplicate
          ele.quantity += 1;
          duplicate = true;
          break;
        }
      }

      // No duplicate found, so add this new item to the cart
      if (duplicate == false) {
        const obj: iCart[] = cartItems; // temporary cart interface object array
        const product: object = productsData.find((e: any) => e.id === id); // find the product from the external json with the matching id
        // create an interface object and copy the data from the product above
        const item: iCart = {
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
    } else { // cart is empty

      const obj: iCart[] = []; // // initialize the temporary cart interface object array to an empty array
      const product: object = productsData.find((e: any) => e.id === id);  // find the product from the external json with the matching id
      // create an interface object and copy the data from the product above
      const item: iCart = {
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
  } catch (error) {
    console.log("Error = " + error);
  }

}

function find(items: iCart[], id: number): number {
  items.forEach((element) => {
    if (element.id === id) {
      return element.id;
    }
  });
  return -1;
}
