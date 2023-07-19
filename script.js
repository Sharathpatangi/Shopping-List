const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector(".items");
const clearAllButton = document.getElementById("clear");
const filterInput = document.querySelector("#filter");

//Display locally stored items
function diplayLocalItems() {
  let locallyStoredItems = getLocalItems();

  locallyStoredItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item} <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
          </button>`;
    itemList.appendChild(li);
  });
  updateUI();
}

//Dynamic UI check
function updateUI() {
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearAllButton.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearAllButton.style.display = "block";
    filterInput.style.display = "block";
  }
}

updateUI();

//Getting local items
function getLocalItems() {
  let locallyStoredItems;

  if (localStorage.getItem("items") === null) {
    locallyStoredItems = [];
  } else {
    locallyStoredItems = JSON.parse(localStorage.getItem("items"));
  }
  return locallyStoredItems;
}

//Add new item
function addNewItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item.");
    return;
  }

  //preventing duplicate entries

  let locallyStoredItems = getLocalItems();
  if (locallyStoredItems.includes(newItem)) {
    alert("Item already exist in the list");
    itemInput.value = "";
    return;
  }

  //creating new list item
  const li = document.createElement("li");
  li.innerHTML = `${newItem} <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
          </button>`;
  itemList.appendChild(li);

  localStoreItems(newItem);

  itemInput.value = "";

  updateUI();
}

//Local storage of items
function localStoreItems(item) {
  let locallyStoredItems = getLocalItems();
  locallyStoredItems.push(item);

  localStorage.setItem("items", JSON.stringify(locallyStoredItems));
}

//Remove an item
function removeItem(e) {
  if (e.target.tagName === "I") {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeFromLocal(e.target.parentElement.parentElement.textContent);
    }
  }
  updateUI();
}

//Remove an item from storage
function removeFromLocal(item) {
  let locallyStoredItems = getLocalItems();
  locallyStoredItems = locallyStoredItems.filter(
    (localItem) => localItem !== item.trim()
  );

  //   locallyStoredItems.forEach((localItem) => {
  //     console.log(
  //       localItem.toLowerCase().length,
  //       item.toLowerCase().trim().length
  //     );
  //     if (localItem.toLowerCase() !== item.toLowerCase().trim()) {
  //       console.log("hh");
  //     }
  //   });

  console.log(locallyStoredItems);
  localStorage.setItem("items", JSON.stringify(locallyStoredItems));
}

//Remove all items
function clearAllItems(e) {
  //itemList.remove();
  itemList.innerHTML = "";
  localStorage.removeItem("items");
  updateUI();
}

//Filter items
function filterItems(e) {
  const searchItem = e.target.value.toLowerCase();
  const items = document.querySelectorAll("li");

  items.forEach((item) => {
    listItem = item.firstChild.textContent.toLowerCase();
    if (listItem.indexOf(searchItem) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

itemForm.addEventListener("submit", addNewItem);
itemList.addEventListener("click", removeItem);
clearAllButton.addEventListener("click", clearAllItems);
filterInput.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", diplayLocalItems);
