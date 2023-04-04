export const NEW_ELEMENT_ID = -1

export const ASYNC_STORAGE_KEYS = {
  GROCERY_LIST: 'grocery-list',
  RECIPES_LIST: 'recipes-list',
  WEEK_MENU: 'week-menu',
  USER_CONFIG: 'user-config'
}

export const WEEK_MENU_MOCKUP = [
  {
    dayId: 1,
    dayName: 'Monday',
    lunch: null,
    dinner: null
  },
  {
    dayId: 2,
    dayName: 'Tuesday',
    lunch: null,
    dinner: null
  },
  {
    dayId: 3,
    dayName: 'Wednesday',
    lunch: null,
    dinner: null
  },
  {
    dayId: 4,
    dayName: 'Thursday',
    lunch: null,
    dinner: null
  },
  {
    dayId: 5,
    dayName: 'Friday',
    lunch: null,
    dinner: null
  },
  {
    dayId: 6,
    dayName: 'Saturday',
    lunch: null,
    dinner: null
  },
  {
    dayId: 7,
    dayName: 'Sunday',
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
