### Jesteś w repozytorium 'espodnie_frontend'. To repozytorium zawiera front-end aplikacji e-spodnie.

Aby pobrać ten projekt na swój komputer i przetestować działanie.<br/>
1.)pobierz to repozytorium poleceniem:<br/>
```git clone https://github.com/michalwisniewski93/espodnie_frontend.git```<br/>
2.)następnie wpisz komendę <br/>
```npm install``` <br/>
by zainstalowały się dependencies i pobrał folder node-modules<br/>
3.)następnie wpisz komendę <br/>
```npm start``` <br/>
by odpalić serwer przygotowany przez środowisko create-react-app <br/>


frontend powinien 'odpalić' się Tobie pod adresem ```http://localhost:3000```<br/><br/>

Ale aby testować aplikację, potrzebujesz jeszcze backendu<br/>

Backend znajduje się w repozytorium o adresie 'espodnie_backend'<br/> 

1.) Pobierz to repozytorium poleceniem<br/>
```git clone https://github.com/michalwisniewski93/espodnie_backend.git``` <br/>
2.) wpisz komendę <br/>
```npm install``` <br/>
aby zainstalowały się dependencies i pobrał folder node modules<br/>
3.) odpal osobną konsolę<br/>
4.) wpisz ```node index.js``` <br/>
5.) poczekaj chwilę aż otrzymasz potwierdzenie że połączenie zostało nawiązane również z bazą danych<br/>
Baza danych jest w chmurze na MongoDB Atlas, więc nie musisz jej dodatkowo pobierać.<br/>
6.) backend działać powinien pod adresem ```http://localhost:5000``` (tak jest podpięte na frontendzie).<br/><br/>

Jeżeli masz zajęte te porty i nie możesz ich odblokować  na maszynie lokalnej to wejdź do repozytorium:
espodnie-frontend-vercel
i analogicznie dla backendu
espodnie-backend-vercel
w tych repozytoriach znajduje się wersja frontendu i analogicznie backendu już podpięta pod chmurę w vercel.



