const items = [
  {
    title: "DIOR",
    description:
      "24 миниатюрных средства - для ухода за кожей и макияжа, изысканные ароматы и ароматическая свеча",
    price: 600,
    img: "./img/1.jpg",
  },
  {
    title: "YVES SAINT LAURENT",
    description:
      "5 популярных полноформатных продукта и 18 мини-версий - для макияжа, ароматы и уход за кожей",
    price: 287,
    img: "./img/2.jpg",
  },
  {
    title: "LANCOME",
    description: "24 продукта - для макияжа и ухода за кожей, ароматы",
    price: 190,
    img: "./img/3.jpg",
  },
  {
    title: "SPACE NK",
    description: "33 продукта - уход за волосами и кожей, ароматическая свеча ",
    price: 270,
    img: "./img/4.jpg",
  },
  {
    title: "LOOK FANTASTIC",
    description: "27 продуктов для макияжа и ухода за кожей",
    price: 113,
    img: "./img/5.jpg",
  },
  {
    title: "GIORGIO ARMANI",
    description: "24 продукта - для ухода за кожей и макияжа, ароматы ",
    price: 310,
    img: "./img/6.jpg",
  },
  {
    title: "CULT BEAUTY",
    description: "39 продуктов (!) из которых 20 - полноформатные ",
    price: 258,
    img: "./img/7.jpg",
  },
  {
    title: "CHARLOTTE TILBURY ",
    description: "12 продуктов для макияжа и ухода за кожей",
    price: 183,
    img: "./img/8.jpg",
  },
  {
    title: "LA MER",
    description: "12 уходовых средств для лица и тела",
    price: 540,
    img: "./img/9.jpg",
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });

  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;

  const item = itemTemplate.content.cloneNode(true);

  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}€`;

  return item;
}

const searchInput = document.querySelector("#search-input");

const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});
