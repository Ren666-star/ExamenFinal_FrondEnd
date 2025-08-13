import React from 'react';
import Navbar from '../../components/JSX/Navbar';
import DishCard from '../../components/JSX/DishCard';
import '../CSS/DailyMenu.css';

// ---------------------------
// Componente DailyMenu
// Muestra el menú del día, dividido en categorías (entrada, segundo, postre)
// Cada categoría renderiza un set de DishCards
// ---------------------------
const DailyMenu = () => {
  // Menú estático para el ejemplo
  const menu = {
    entrada: [
      {
        id: 1,
        name: "Ensalada César",
        price: "20.00",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
        description: "Ensalada fresca con lechuga romana, croutons, queso parmesano y aderezo césar.",
        ingredients: ["Lechuga romana", "Croutons", "Queso parmesano", "Aderezo césar"],
        preparation: "1. Lavar la lechuga. 2. Mezclar con los demás ingredientes. 3. Servir con aderezo."
      },
      {
        id: 2,
        name: "Sopa de Verduras",
        price: "18.00",
        image: "https://comedera.com/wp-content/uploads/sites/9/2013/05/sopa-de-verduras-1.jpg",
        description: "Sopa caliente con una variedad de verduras frescas.",
        ingredients: ["Zanahoria", "Papa", "Apio", "Arveja", "Caldo de pollo"],
        preparation: "1. Hervir los ingredientes. 2. Cocinar por 30 minutos. 3. Servir caliente."
      },
      {
        id: 7,
        name: "Bruschettas",
        price: "15.00",
        image: "https://www.sanpellegrino.com/es/sites/g/files/xknfdk2326/files/styles/amp_1200x900_4_3/public/bruschetta_0.jpg.webp?itok=KrEQiHy2",
        description: "Pan tostado con tomate, ajo, albahaca y aceite de oliva.",
        ingredients: ["Pan", "Tomate", "Ajo", "Albahaca", "Aceite de oliva"],
        preparation: "1. Tostar pan. 2. Picar tomate y mezclar con ingredientes. 3. Servir sobre el pan."
      }
    ],
    segundo: [
      {
        id: 3,
        name: "Pasta Carbonara",
        price: "22.00",
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
        description: "Pasta al dente con salsa cremosa de huevo, queso pecorino y panceta.",
        ingredients: ["Pasta", "Huevos", "Queso pecorino", "Panceta", "Pimienta negra"],
        preparation: "1. Cocinar pasta. 2. Dorar panceta. 3. Mezclar con huevo y queso. 4. Servir."
      },
      {
        id: 4,
        name: "Lomo Saltado",
        price: "25.00",
        image: "https://www.ilcb.edu.pe/repositorioaps/data/1/2/2/not/el-lomo-saltado/images/LOMO-SALTADO.jpg",
        description: "Carne salteada con cebolla, tomate, y papas fritas. Acompañado de arroz.",
        ingredients: ["Carne", "Cebolla", "Tomate", "Papas", "Sillao", "Arroz"],
        preparation: "1. Saltear ingredientes. 2. Cocinar por 10 minutos. 3. Servir con arroz."
      },
      {
        id: 8,
        name: "Pollo al Curry",
        price: "24.00",
        image: "https://recetasdecocina.elmundo.es/wp-content/uploads/2022/09/pollo-al-curry-receta-facil.jpg",
        description: "Pollo en salsa de curry con arroz blanco.",
        ingredients: ["Pollo", "Curry", "Leche de coco", "Cebolla", "Arroz"],
        preparation: "1. Cocinar pollo. 2. Preparar salsa curry. 3. Servir con arroz."
      }
    ],
    postre: [
      {
        id: 5,
        name: "Tiramisú",
        price: "12.00",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        description: "Postre italiano con bizcocho, café y crema de mascarpone.",
        ingredients: ["Bizcochos", "Café", "Mascarpone", "Huevos", "Cacao en polvo"],
        preparation: "1. Preparar crema. 2. Alternar capas. 3. Refrigerar 3 horas."
      },
      {
        id: 6,
        name: "Helado artesanal",
        price: "10.00",
        image: "https://directoriohoreca.com/sites/default/files/%C2%BFQu%C3%A9%20es%20un%20helado%20artesanal%20y%20que%20diferencia%20existen%20con%20uno%20industrial%20%281%29.jpg",
        description: "Helado cremoso de frutas naturales.",
        ingredients: ["Fruta fresca", "Leche", "Azúcar", "Crema"],
        preparation: "1. Licuar ingredientes. 2. Congelar. 3. Servir frío."
      },
      {
        id: 9,
        name: "Brownie con nueces",
        price: "11.00",
        image: "https://i.ytimg.com/vi/LZf4_kvwhHM/maxresdefault.jpg",
        description: "Bizcocho de chocolate con nueces servido con una bola de helado.",
        ingredients: ["Chocolate", "Harina", "Azúcar", "Huevos", "Nueces"],
        preparation: "1. Mezclar ingredientes. 2. Hornear. 3. Servir con helado."
      }
    ]
  };

  return (
    <div className="daily-menu">
      <Navbar />
      <h1>Menú del Día</h1>

      {/* Map por categorías, protegido contra null o undefined */}
      {['entrada', 'segundo', 'postre'].map((category) => (
        <div key={category}>
          <h2 className="menu-category">
            {category === 'entrada'
              ? 'Platos de Entrada'
              : category === 'segundo'
              ? 'Platos de Fondo'
              : 'Postres'}
          </h2>

          <div className="dishes-grid">
            {(menu[category] || []).map((dish) => (
              dish && <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyMenu;
