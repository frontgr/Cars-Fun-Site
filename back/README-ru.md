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
/panel/admins ['GET']

/panel/admin ['POST']

/panel/admin ['DELETE']

/panel/admin ['PUT']


## Получение всех записей
  ### Запрос: 
    curl -X GET "http://localhost:5000/cars"
  
  ### Возвращает:
    Status code: 200 (OK)
    {"0": {"cover_photo": "111111/cover_photo.webp",
          "description": "The best racer",
          "folder_id": "111111",
          "is_hidden": false,
          "max_speed": 350,
          "name": "Leo",
          "number": 21,
          "photos": ["111111/photo_0.webp", "111111/photo_1.webp"],
          "speed_up": 1,
          "type": "racer"},
      "1": {...}
    }
  
  (Предназначен для вывода записей на основной странице, так как не запрашивает входа в учетную запись)


  ### Запрос: 
    curl -X GET "http://localhost:5000/car?id=id"
  
  ### Возвращает: 
    Status code: 200 (OK)
    {"cover_photo": "111111/cover_photo.webp",
    "description": "The best racer",
    "folder_id": "111111",
    "id": "66ff223",
    "is_hidden": false,
    "max_speed": 350,
    "name": "Leo",
    "number": 21,
    "photos": ["111111/photo_0.webp", "111111/photo_1.webp"],
    "speed_up": 1,
    "type": "racer"
    }

Или 

    Status code: 400 (BAD REQUEST)
    {"msg": "Record not found"}



## Вход в панель администратора
  ### Запрос: 
    curl -X POST http://localhost:5000/login \
    -F "login=your_login" \
    -F "password=your_password"
  (-F = form-data)
  
  ### Возвращает:
      Status code: 200 (OK)
      {"msg": "Login successful"}
  
  Или
      
      Status code: 400 (BAD REQUEST)
      {"msg": "The data did not pass validation"}



## Управление записями

  ## Показать все записи
  
  ### Запрос: 
    curl -X GET "http://localhost:5000/panel/cars" \
    -H "Authorization: Bearer your_token_here"
  (-H = Header)
    
  ### Возвращает:
    Status code: 200 (OK)
    {"0": {"cover_photo": "111111/cover_photo.webp",
          "description": "The best racer",
          "folder_id": "111111",
          "id": "66ff223",
          "is_hidden": false,
          "max_speed": 350,
          "name": "Leo",
          "number": 21,
          "photos": ["111111/photo_0.webp", "111111/photo_1.webp"],
          "speed_up": 1,
          "type": "racer"},
     "1": {...}
    }
  (Дополнительно возвращает "id" записи в отличие от публичного ендпоинта)

      
  ## Добавление записи
  
  ### Запрос: 
    curl -X POST http://localhost:5000/car \
    -H "Authorization: Bearer your_token_here" \
    -F "name=name" \
    -F "number=number" \
    -F "type=type" \
    -F "speed_up=speed_up" \
    -F "max_speed=max_speed" \
    -F "description=description" \
    -F "cover_photo=@/path/to/cover_photo.jpg" \
    -F "photos=@/path/to/photo1.jpg" \
    -F "photos=@/path/to/photo2.jpg"
  (-H = Header)
  
  (-F = form-data)
    
 ### Возвращает: 
     Status code: 201 (CREATED)
     {"msg": "The record was successfully added"}

      
  ## Удалить запись
  
  ### Запрос: 
      curl -X DELETE "http://localhost:5000/panel/car?id=id" \
      -H "Authorization: Bearer your_token_here" \
  (-H = Header)
      
 ### Возвращает:
     Status code: 204 (NO CONTENT)
     None

      
  ## Обновить данные в записе
  ### Запрос: 
      curl -X PUT "http://localhost:5000/panel/car?id=id" \
      -H "Authorization: Bearer your_token_here" \
      -F "name=name" \
      -F "number=number" \
      -F "type=type" \
  (только те поля которые были изменены)
  
  (-H = Header)
  
  (-F = form-data)
  
  ### Возвращает:
      Status code: 200 (OK)
      {"msg": "The record data was successfully updated"}



## Управление админами

  ## Показать всех админов
  ### Запрос: 
    curl -X GET "http://localhost:5000/panel/admins" \
    -H "Authorization: Bearer your_token_here"
  (-H = Header)
  
  ### Возвращает:
    Status code: 200 (OK)
    {"0": {"add_cars": true,
          "add_users": true,
          "delete_cars": true,
          "delete_users": true,
          "edit_cars": true,
          "edit_users": true,
          "id": "66ff223",
          "login": "RootAdmin"},
      "1": {...}
    }

  
  ## Добавить админа
  ### Запрос: 
    curl -X POST http://localhost:5000/panel/admin \
    -H "Authorization: Bearer your_token_here"
    -F "login=login" \
    -F "password=password" \
    -F "add_users=False" \
    -F "edit_users=False" \
    -F "delete_users=False" \
    -F "add_cars=False" \
    -F "edit_cars=False" \
    -F "delete_cars=False"
  (-H = Header)
  
  (-F = form-data)
  
  ### Возвращает:
    Status code: 201 (CREATED)
    {"msg": "The admin was successfully created"}

  Или 
     
     Status code: 400 (BAD REQUEST)
     {"msg": "An admin with this username already exists"}

  
  ## Удалить админа
  ### Запрос:  
      curl -X DELETE "http://localhost:5000/panel/admin?id=id" \
      -H "Authorization: Bearer your_token_here" \
  (-H = Header)
  
  ### Возвращает:
     Status code: 204 (NO CONTENT)
     None

  
  ## Обновить данные админа
  ### Запрос: 
    curl -X PUT "http://localhost:5000/panel/admin?id=id" \
      -H "Authorization: Bearer your_token_here" \
      -F "password=password" \
      -F "delete_users" \
  (только те поля которые были изменены)

  (-H = Header)
  
  (-F = form-data)
  
 ### Возвращает:
     Status code: 200 (OK)
     {"msg": "The admin's data was successfully updated"}
  
