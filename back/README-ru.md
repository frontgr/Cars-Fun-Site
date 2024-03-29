# Документация для Cars-API

### Получение записи/записей вне панели
/cars ['GET']
/car ['GET']

### Вход в панель администратора
/login ['POST']

### Управление записями
/panel/cars ['GET']

/panel/car ['POST']

/panel/car ['DELETE']

/panel/car ['PUT']

### Управление админами
/admins ['GET']

/admin ['POST']

/admin ['DELETE']

/admin ['PUT']


## Получение всех записей
  ### Запрос: '/cars', Метод: ['GET'],
  ### Запрашиваемые значения: Не запрашивает значений
  Возвращает: все записи из базы данных. Status code: 200 (OK)
  
  (Предназначен для вывода записей на основной странице, так как не запрашивает входа в учетную запись)


  ### Запрос: '/car', Метод: ['GET'],
  ### Запрашиваемые значения: /car?_id=1
  Возвращает: запись из базы данных. Status code: 200 (OK)
  
  Возвращает: None. Status code: 400 (BAD REQUEST)



## Вход в панель администратора
  ### Запрос: '/login', Метод: ['POST'],
  ### Запрашиваемые значения: Запришивает из формы [login, password]
  Возвращает: {"msg": "Login successful"}. Status code: 200 (OK)
  
  Возвращает: {"msg": "The data did not pass validation"}. Status code: 400 (BAD REQUEST)



## Управление записями

  ## Показать все записи
  
  ### Запрос: '/panel/cars', Метод: ['GET'],
  ### Запрашиваемые значения: Не запрашивает значений
  Возвращает: все записи из базы данных. Status code: 200 (OK)
  
  (Расчитана на админ панель так как доступна только если пользователь зашел в учетную запись)

      
  ## Добавление записи
  
  ### Запрос: '/panel/car', Метод: ['POST'],
  ### Запрашиваемые значения: Запрашивает из формы [name, number, type, speed_up, max_speed, description, cover_photo, photo1, photo2, photo3 ... photo20]
  Возвращает: None. Status code: 201 (CREATED)

      
  ## Удалить запись
  
  ### Запрос: '/panel/car', Метод: ['DELETE'],
  ### Запрашиваемые значения: /panel/car?_id=1
  Возвращает: None. Status code: 204 (NO CONTENT)

      
  ## Обновить данные в записе
  ### Запрос: '/panel/car', Метод: ['PUT'],
  ### Запрашиваемые значения: Запрашивает только те поля которые были изменены, а так же /panel/car?_id=1
  (ВНИМАНИЕ! на данный момент нельзя обновлять название записи)
  
  Возвращает: None. Status code: 200 (OK)



## Управление админами

  ## Показать всех админов
  ### Запрос: '/panel/admins', Метод: ['GET']
  ### Запрашиваемые значения: Не запрашивает значений
  Возвращает: учетные записи всех админов. Status code: 200 (OK)

  
  ## Добавить админа
  ### Запрос: '/panel/admin', Метод: ['POST']
  ### Запрашиваемые значения: Запрашивает из формы [login, password, add_users, delete_users, edit_users, add_cars, delete_cars, edit_cars]
  (ВНИМАНИЕ! Все поля описывающие права доступа содержат True если пользователь имеет это право или False в противном случае)
  
  Возвращает: None. Status code: 201 (CREATED)
  
  Возвращает: {"msg": "Not all fields are filled or an unexpected value has been passed"}. Status code: 400 (BAD REQUEST)

  
  ## Удалить админа
  ### Запрос: '/panel/admin', Метод: ['DELETE']
  ### Запрашиваемые значения: /panel/admin?_id=1

  Возвращает: None. Status code: 204 (NO CONTENT)

  
  ## Обновить данные админа
  ### Запрос: '/panel/admin', Метод: ['PUT']
  ### Запрашиваемые значения: Запрашивает только те поля которые были изменены, а так же /panel/admin?_id=1
  (ВНИМАНИЕ! На данный момент нельзя обновлять пароль)
  
  Возвращает: None. Status code: 200 (OK)
  
  Возвращает: {"msg": "Not all fields are filled or an unexpected value has been passed"}. Status code: 400 (BAD REQUEST)
  
