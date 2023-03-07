console.log(
  `
  1.При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50
   - При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20
   - Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20
   - Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10
  2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50
   - При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25
   - ользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25
  3. В разделе contacts реализован select с выбором городов +25
   - В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15
   - При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10
   100 баллов
 `
);


//burger menu

const burgerItem = document.querySelector('.burger-menu');
const menu = document.querySelector('.header-nav');
const menuCloseItem = document.querySelector('.header-nav-close');
const menuLink = document.querySelectorAll('.header-nav-link');
burgerItem.addEventListener('click', () => {
  menu.classList.add('header-nav-active');
})
menuCloseItem.addEventListener('click', () => {
  menu.classList.remove('header-nav-active');
});
Array.from(menuLink).map(el => el.addEventListener('click', () => {
  console.log(111);
  menu.classList.remove('header-nav-active');
}));  



// tabs

const tabButtons = Array.from(document.getElementsByClassName('service-button'))
let selectedCategories = []

tabButtons.map(e => {
  e.addEventListener('click', (event) => {
    if (Array.from(document.getElementsByClassName('service-button--active')).length === 2 
      && !event.target.classList.contains('service-button--active')) {
      return;
    }
    event.target.classList.toggle('service-button--active')

    const category = event.target.getAttribute('data-category');
    selectedCategories.includes(category)
      ? selectedCategories = selectedCategories.filter(el => el !== category)
      : selectedCategories.push(category)


    const allCards = Array.from(document.getElementsByClassName('service-element'))
    const filtredCards = allCards.filter(el => !selectedCategories.includes(el.getAttribute('data-category')))

    allCards.map(el => el.classList.remove('service-element--blured'))
    selectedCategories.length && filtredCards.map(el => el.classList.add('service-element--blured'))
  })
})

// tabs end

//accordeon

const accordeonItems = Array.from(document.querySelectorAll('.accordeon-item'));
const dropdownButtons = Array.from(document.querySelectorAll('.accordeon-arrow'));
const dropupButtons = Array.from(document.querySelectorAll('.accordeon-arrow-open'))

dropdownButtons.map(el => el.addEventListener('click', (event) => {
  accordeonItems.map(el => el.classList.remove('accordeon-item--active'))
  event.target.parentElement.parentElement.classList.add('accordeon-item--active')
}))
dropupButtons.map(el => el.addEventListener('click', (event) => {
  accordeonItems.map(el => el.classList.remove('accordeon-item--active'))
}))

function scrollToContacts() {
  scrollTo(document.getElementById('contacts'))
}


// contacts

const cityData = [
  {
    id: 1,
    cityName: 'Canandaigua, NY',
    phone: '+1	585	393 0001',
    address: '151 Charlotte Street',
  },
  {
    id: 2,
    cityName: 'New York City',
    phone: '+1	212	456 0002',
    address: '9 East 91st Street',
  },
  {
    id: 3,
    cityName: 'Yonkers, NY',
    phone: '+1	914	678 0003',
    address: '511 Warburton Ave',
  },
  {
    id: 4,
    cityName: 'Sherrill, NY',
    phone: '+1	315	908 0004',
    address: '14 WEST Noyes BLVD',
  },
]

function openSelect() {
  document.querySelector('.city-select').classList.toggle('city-select_active')
}

function selectCity(id) {
  openSelect();
  document.querySelector('.contacts').classList.add('contacts_active')
  const selectedCity = cityData.find(el => el.id == id)
  document.querySelector('.city-title').innerHTML = selectedCity.cityName;
  
  document.querySelector('#city-card-name').innerHTML = selectedCity.cityName;
  document.querySelector('#city-card-phone').innerHTML = selectedCity.phone;
  document.querySelector('#city-card-address').innerHTML = selectedCity.address;
  
  document.querySelector('.city-card-button').setAttribute('href', `tel:  ${selectedCity.phone}`)
}