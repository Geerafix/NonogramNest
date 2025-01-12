# NonogramNest
Instrukcja uruchamiania aplikacji.

1. **Pobranie i instalacja PostgreSQL**  
   Pobierz i zainstaluj system zarządzania bazami danych PostgreSQL:  
   [https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)


2. **Pobranie i instalacja Node.js**  
   Pobierz i zainstaluj środowisko Node.js:  
   [https://nodejs.org/en](https://nodejs.org/en)


3. **Konfiguracja pgAdmin**  
   Skonfiguruj pgAdmin z następującymi ustawieniami:
    - Użytkownik: `postgres`
    - Hasło: `admin`
    - Sieć: `localhost`
    - Port: `5432`


4. **Utworzenie bazy danych**  
   Utwórz bazę danych o nazwie określonej w pliku `.env` w zmiennej `db_name` (domyślna nazwa: `nonogram-nest`).

   > Jeśli zmieniasz nazwę bazy danych:
   > 1. Utwórz nową bazę danych w pgAdmin.
   > 2. Zaktualizuj zmienną `db_name` w pliku `.env`.

5. **Instalacja zależności**  
   Przejdź do głównego katalogu projektu i uruchom:

   ```bash
   npm install
   ```
   Gdyby zaistniały problemy z zależnościami należy je zainstalować ręcznie.


6. **Uruchomienie aplikacji**  
   W głównym katalogu aplikacji uruchom plik:

   ```bash
   _startup.bat
   ```
   
7. **Dostęp do aplikacji**  
   Jeśli wszystko przebiegło pomyślnie, aplikacja powinna działać pod adresem:  

   http://localhost:4000


8. **Uruchamianie testów**  
   Zamknij uruchomioną aplikację, a następnie uruchom plik testowy:

   ```bash
   _test.bat
   ```
   Błędy dotyczące zajętego portu można zignorować – nie wpływają one na wyniki testów.