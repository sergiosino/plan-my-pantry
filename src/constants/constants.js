import { FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESTDAY, WEDNESDAY } from './texts/texts'

export const NEW_ELEMENT_ID = -1

export const STORAGE_KEYS = {
  GROCERY_LIST: 'grocery-list',
  RECIPES_LIST: 'recipes-list',
  WEEK_MENU: 'week-menu',
  USER_CONFIG: 'user-config'
}

export const WEEK_DAYS = {
  1: MONDAY,
  2: TUESTDAY,
  3: WEDNESDAY,
  4: THURSDAY,
  5: FRIDAY,
  6: SATURDAY,
  7: SUNDAY
}

export const WEEK_MENU_MOCKUP = [
  {
    dayId: 1,
    lunch: null,
    dinner: null
  },
  {
    dayId: 2,
    lunch: null,
    dinner: null
  },
  {
    dayId: 3,
    lunch: null,
    dinner: null
  },
  {
    dayId: 4,
    lunch: null,
    dinner: null
  },
  {
    dayId: 5,
    lunch: null,
    dinner: null
  },
  {
    dayId: 6,
    lunch: null,
    dinner: null
  },
  {
    dayId: 7,
    lunch: null,
    dinner: null
  }
]

export const USER_CONFIG_PARAMS = {
  SHOW_WELCOME_PAGE: 'showWelcomePage',
  SHOW_HEADER_HELP_ICON: 'showHeaderHelpIcon'
}

export const USER_CONFIG_MOCKUP = {
  [USER_CONFIG_PARAMS.SHOW_WELCOME_PAGE]: true,
  [USER_CONFIG_PARAMS.SHOW_HEADER_HELP_ICON]: true
}
