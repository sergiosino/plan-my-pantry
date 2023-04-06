import { USER_CONFIG_PARAMS } from './constants'

export const RECIPES_MOCKUP = [
  { id: '6a61af05-5ac0-46d9-bc0f-c818e23c8afb', name: 'Arroz a la cubana', ingredients: ['Salsa de tomate', 'Arroz', 'Salchichas'], notes: '' },
  { id: '0e6292bc-28ed-4461-a171-8760b6142bd4', name: 'Atún con tomate', ingredients: ['Guisantes', 'Salsa de tomate', 'Patatas', 'Filetes de atún'], notes: '' },
  { id: 'f292fb3c-3f03-432d-a7d5-103d83c6c2da', name: 'Bocadillo de pollo', ingredients: ['Queso lonchas', 'Tomate rama', 'Lechuga', 'Filetes de pollo'], notes: '' },
  { id: 'b4dbf587-2596-4fd0-bd56-5f010d12ff3f', name: 'Curry', ingredients: ['Filetes de pollo', 'Garbanzos', 'Pimientos 3 colores', 'Leche de coco', 'Arroz'], notes: '' },
  { id: '40aff6f4-a2a9-4409-a129-fc34b06f26d4', name: 'Ensalada de garbanzos', ingredients: ['Atún', 'Queso', 'Aguacate', 'Cherries', 'Garbanzos'], notes: '' },
  { id: '5c235bcd-d207-46fd-86c7-b12fb28c667a', name: 'Ensalada de pollo', ingredients: ['Aceitunas', 'Lechuga', 'Queso', 'Filetes de pollo'], notes: '' },
  { id: 'd1ee7aa1-a250-4fe9-b371-121b83e762d5', name: 'Ensaladilla', ingredients: ['Mayonesa', 'Aceitunas', 'Atún', 'Patatas', 'Zanahorias', 'Guisantes'], notes: '' },
  { id: '6f7af2bb-50de-46ad-8f5b-0cc1a92f367e', name: 'Espaguetis', ingredients: ['Atún', 'Salsa de tomate', 'Espaguetis'], notes: '' },
  { id: 'b8e02ddd-964c-41fe-a4eb-595e062cc8be', name: 'Fajitas de pollo', ingredients: ['Pan fajitas', 'Guacamole', 'Pimientos 3 colores', 'Filetes de pollo'], notes: '' },
  { id: '741fa9e1-b689-45dd-a9d4-c7c5a037a5a5', name: 'Fajitas enrolladas', ingredients: ['Pan fajitas', 'Lechuga', 'Tomate', 'Filetes de pollo', 'Queso mozarela', 'Yogurt griego'], notes: '' },
  { id: 'd7a4441a-fb2c-4240-9317-a1f58bda5092', name: 'Filetes de pollo con verdura', ingredients: ['Filetes de pollo', 'Zanahorias', 'Brocoli'], notes: '' },
  { id: 'ef6f5603-d4db-47bd-af32-68de867b644f', name: 'Hamburguesa', ingredients: ['Queso lonchas', 'Pan hamburguesa', 'Hamburguesa'], notes: '' },
  { id: '1ffa36cb-aa0e-4508-a43a-c1d87ec6cc3c', name: 'Huevos rellenos', ingredients: ['Salsa de tomate', 'Atún', 'Huevos'], notes: '' },
  { id: '396f675a-787d-4e4d-ba9e-40e6f121247a', name: 'Lentejas', ingredients: ['Pimiento rojo', 'Ajo', 'Tomate de rama', 'Patatas', 'Puerro', 'Zanahorias', 'Lentejas'], notes: '' },
  { id: 'af87dda6-b83d-46eb-9d52-9e7b1eb5aa1f', name: 'Lubina con arroz', ingredients: ['Pimientos 3 colores', 'Arroz', 'Lubina', 'Limón'], notes: '' },
  { id: '0c78abc8-ce18-47c3-98ea-45a6d63148f6', name: 'Macarrones con ternera picada', ingredients: ['Macarrones', 'Salsa de tomate', 'Ternera picada'], notes: '' },
  { id: '10872d05-6226-433c-a34a-c91b2bd38fff', name: 'Montadito vasco', ingredients: ['Panecillos montadito', 'Anchoas', 'Queso', 'Pimiento piquillo'], notes: '' },
  { id: 'f911cb59-c318-4103-91fa-3659221d33c6', name: 'Paella', ingredients: ['Filetes de pollo', 'Cebollas', 'Tomate de rama', 'Pimiento rojo', 'Guisantes', 'Arroz'], notes: '' },
  { id: 'ed0ec621-217a-48bf-bf75-9a03446ce9a3', name: 'Pavo con verdura', ingredients: ['Filetes de pavo', 'Brocoli', 'Zanahorias', 'Guisantes'], notes: '' },
  { id: '5d2837c4-94c5-4fab-a956-c2edc4d0491b', name: 'Pizza', ingredients: ['Pizza'], notes: '' },
  { id: '29c32f3d-05fc-47dc-b391-abcce028b09d', name: 'Salmón con patata cocida', ingredients: ['Salmón', 'Patatas', 'Aguacate'], notes: '' },
  { id: 'c8a3ac82-c70a-4bc6-9b64-4c989f37efa8', name: 'Sandwitch', ingredients: ['Pan bimbo', 'Jamón york', 'Queso lonchas'], notes: '' },
  { id: '04e98807-ae0e-4383-a16b-ab22637e651e', name: 'Tortilla española', ingredients: ['Aceite', 'Cebollas', 'Patatas', 'Huevos'], notes: '' },
  { id: 'd450f157-a84d-4e05-8195-34504761c919', name: 'Tortilla francesa', ingredients: ['Huevos'] }
]

export const WEEK_MENU_MOCKUP = [
  { dayId: 1, lunch: null, dinner: null },
  { dayId: 2, lunch: null, dinner: null },
  { dayId: 3, lunch: null, dinner: null },
  { dayId: 4, lunch: null, dinner: null },
  { dayId: 5, lunch: null, dinner: null },
  { dayId: 6, lunch: null, dinner: null },
  { dayId: 7, lunch: null, dinner: null }
]

export const USER_CONFIG_MOCKUP = {
  [USER_CONFIG_PARAMS.SHOW_WELCOME_PAGE]: true,
  [USER_CONFIG_PARAMS.SHOW_HEADER_HELP_ICON]: true
}
