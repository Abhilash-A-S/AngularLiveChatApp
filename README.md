# Angular live chat using express.js and socket IO.

## Commmands.
  1) Run `ng new project-name` to generate a  new angular application.
  2) Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
  3) Run `ng start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
  4) Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
  5) Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
  6) Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Chat Application work flow.
  1) Run `ng start` for a dev server. Navigate to `http://localhost:4200/`.
  2) A popup window will display for tempoary login. The login details are temporary, on tab close the data will removed ![image](https://user-images.githubusercontent.com/45873495/183449502-87912a48-37bd-49ac-b7d7-5fc339bd825a.png)
  ![image](https://user-images.githubusercontent.com/45873495/183449798-121287b1-80eb-48dc-9c47-5fcc33e20274.png)
  3) After login it will navigate to the online user listing page. There we can see all the users in the application.![image](https://user-images.githubusercontent.com/45873495/183451141-dae27f5c-a251-416d-b333-865bee681180.png).

 4)  _If there is no user logined in the application then it will show `No Online Users` message.Online users are in the order of created time. We can search users based on the name also._
 
 ![image](https://user-images.githubusercontent.com/45873495/183451726-8dcf8e13-ae18-4622-8787-7437b2a873ae.png). ![image](https://user-images.githubusercontent.com/45873495/183452841-943d7648-fd7b-4c92-9356-abbb381d40a6.png).
  
  5) Clicking on the user section will navigate into the individual chat page.![image](https://user-images.githubusercontent.com/45873495/183455320-892de979-a549-48eb-95e8-0f5bbc66a7f9.png).
  6) Active friend is highlighted with a color.
  
  ![image](https://user-images.githubusercontent.com/45873495/183455752-c8ed2b7d-37d0-40b6-b087-48e8c47802b5.png).
  ![image](https://user-images.githubusercontent.com/45873495/183461472-e0a79904-e702-464b-858e-2d01d953a3bf.png).
  
  7) If the fiend is not in the chat box or another person's chat box then the notification message will be sent to the friend.
![image](https://user-images.githubusercontent.com/45873495/183462233-327ea27b-2fab-447f-94a8-e470cd0ee355.png).
![image](https://user-images.githubusercontent.com/45873495/183462405-7e2fc000-2fb5-4a37-9630-8ca19171a5c6.png).

 8) ![image](https://user-images.githubusercontent.com/45873495/183462967-8075cb4f-1a5b-4b4c-8a36-8fec8388caf7.png)
 9) If we click on the home button it will navigate into the home screen(user listing page).![image](https://user-images.githubusercontent.com/45873495/183463905-ced7521e-7384-48d3-b5a9-bb92e5951ced.png).
 ![image](https://user-images.githubusercontent.com/45873495/183463816-74c9fbc1-70e9-4e6c-a54c-e9598a4e9efa.png).
 
 _A green tick mark is displayed on the user listing page once the user is added as friend._